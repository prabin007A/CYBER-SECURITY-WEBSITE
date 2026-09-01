const CONSENT_KEY = "mits_cookie_consent";
export const CONSENT_EVENT = "mits-consent-changed";

export const getConsent = () => {
    try {
        const raw = localStorage.getItem(CONSENT_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const setConsent = (consent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...consent, ts: new Date().toISOString() }));
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
};

const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
let initialized = false;

export const analyticsAvailable = () => Boolean(MEASUREMENT_ID);

export const initAnalytics = () => {
    if (initialized || !MEASUREMENT_ID) return;
    const consent = getConsent();
    if (!consent || !consent.analytics) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });
    initialized = true;
};

export const trackPageView = (path) => {
    if (!initialized || !window.gtag) return;
    window.gtag("event", "page_view", { page_path: path, page_title: document.title });
};
