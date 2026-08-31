from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
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
