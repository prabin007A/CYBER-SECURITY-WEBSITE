from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import ipaddress
import os
import re
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, field_validator
from collections import defaultdict, deque
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="MITS Corporate Website API")
api_router = APIRouter(prefix="/api")

TAG_RE = re.compile(r"<[^>]*>")


def clean(value: str) -> str:
    return TAG_RE.sub("", value).strip()


# ---- Managed email (Emergent integration proxy) ----
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "MITS")
CONTACT_NOTIFY_EMAIL = os.environ.get("CONTACT_NOTIFY_EMAIL")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None):
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


async def notify_contact_request(doc: dict) -> None:
    if not (EMAIL_KEY and CONTACT_NOTIFY_EMAIL):
        return
    rows = []
    for label, key in [("Name", "full_name"), ("Company", "company"), ("Email", "email"),
                       ("Phone", "phone"), ("Industry", "industry"), ("Area of Interest", "interest"),
                       ("Message", "message")]:
        value = escape(doc.get(key) or "") or "&mdash;"
        rows.append(
            f'<tr><td style="padding:8px 14px;color:#64748B;font-size:13px;vertical-align:top;'
            f'border-bottom:1px solid #E2E8F0;">{label}</td>'
            f'<td style="padding:8px 14px;font-size:13px;color:#0F172A;vertical-align:top;'
            f'border-bottom:1px solid #E2E8F0;">{value}</td></tr>'
        )
    subject = f"New consultation request from {doc['full_name']}"
    html = (
        '<table role="presentation" width="100%" style="background:#F8FAFC;padding:24px 0;">'
        '<tr><td align="center"><table role="presentation" width="560" style="background:#FFFFFF;'
        'border:1px solid #E2E8F0;font-family:Arial,sans-serif;">'
        '<tr><td style="background:#0B1120;padding:20px 24px;color:#FFFFFF;font-size:16px;'
        'font-weight:bold;">New Consultation Request</td></tr>'
        f'<tr><td style="padding:20px 24px;"><table role="presentation" width="100%">{"".join(rows)}</table></td></tr>'
        '<tr><td style="padding:16px 24px;font-size:11px;color:#94A3B8;">Submitted via the MITS '
        'website contact form. Reply directly to this email to respond to the sender.</td></tr>'
        '</table></td></tr></table>'
    )
    try:
        email_id = await send_email(to=CONTACT_NOTIFY_EMAIL, subject=subject, html=html, reply_to=doc["email"])
        logger.info(f"Contact notification email sent: {email_id}")
    except Exception as e:
        logger.error(f"Contact notification email failed: {e}")


class ContactRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    company: str = Field(default="", max_length=160)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=24)
    industry: str = Field(default="", max_length=80)
    interest: str = Field(default="", max_length=120)
    message: str = Field(min_length=10, max_length=4000)
    website: str = Field(default="", max_length=120)  # honeypot

    @field_validator("phone")
    @classmethod
    def phone_format(cls, v: str) -> str:
        if not re.fullmatch(r"[+0-9][0-9\s\-()]{5,22}", v.strip()):
            raise ValueError("Please enter a valid phone number")
        return v.strip()


rate_buckets: dict[str, deque] = defaultdict(deque)
RATE_LIMIT = 5
RATE_WINDOW = timedelta(minutes=10)


def is_rate_limited(key: str) -> bool:
    now = datetime.now(timezone.utc)
    bucket = rate_buckets[key]
    while bucket and now - bucket[0] > RATE_WINDOW:
        bucket.popleft()
    if len(bucket) >= RATE_LIMIT:
        return True
    bucket.append(now)
    return False


@api_router.get("/")
async def root():
    return {"message": "MITS API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy"}


@api_router.post("/contact")
async def submit_contact(request: Request, payload: ContactRequest):
    if payload.website:
        return {"success": True, "message": "Thank you. Your request has been submitted successfully."}

    ip = request.client.host if request.client else "unknown"
    if is_rate_limited(ip):
        return JSONResponse(
            status_code=429,
            content={"detail": "Too many requests. Please try again later."},
        )

    doc = {
        "full_name": clean(payload.full_name),
        "company": clean(payload.company),
        "email": payload.email.lower(),
        "phone": clean(payload.phone),
        "industry": clean(payload.industry),
        "interest": clean(payload.interest),
        "message": clean(payload.message),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new",
    }
    await db.contact_requests.insert_one(doc)
    asyncio.create_task(notify_contact_request(doc))
    return {"success": True, "message": "Thank you. Your request has been submitted successfully."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
