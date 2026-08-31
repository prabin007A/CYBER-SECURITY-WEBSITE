# MITS Corporate Website — PRD

## Original Problem Statement
Build a modern, premium corporate website for MITS — an IT solutions and cybersecurity company. Light corporate design with deep navy sections, cyan/blue accents, premium subtle animations (framer-motion + lenis), custom SVG/CSS abstract visuals (no stock/hacker imagery), full page set (Home, About, Cyber Security Services, Solutions + 6 detail pages, Industries, Technology Partners placeholder, Blog with search/filters/pagination, Contact with DB-backed form), strict "do not invent company data" rule, exact approved headings preserved, removed sections (Testimonials, Latest Blogs on Home, Pricing, Our Team) excluded.

## Architecture
- Frontend: React 19 + react-router-dom 7 (lazy routes), Tailwind + custom design tokens (Outfit/IBM Plex Sans/IBM Plex Mono), framer-motion reveals + page transitions, lenis smooth scroll (skips on prefers-reduced-motion), sonner toasts
- Backend: FastAPI, MongoDB (motor). POST /api/contact — pydantic validation (EmailStr, phone regex), HTML-strip sanitization, honeypot field, in-memory rate limit (5/10min per IP), security headers middleware. GET /api/health.
- Content: centralized in /app/frontend/src/data/content.js (solutions, industries, steps, values, demo blog posts) — CMS-ready.

## User Personas
- Enterprise decision-makers evaluating IT/cybersecurity partners
- IT leaders researching solutions per industry
- Prospective technology partners

## Core Requirements (static)
Exact headings preserved; 6 solutions; 8 industries; 6-step approach timeline; 4-step methodology; contact form with all specified fields; no invented stats/clients/partners/team; placeholder partner slots; demo-labeled blog content.

## Implemented (2026-07)
- Full site: all 12 routes + 404 + privacy/terms placeholders
- Kinetic hero (masked line reveal, parallax SVG network, floating shield), editorial marquee, scroll-linked timeline animations
- Contact form: client + server validation, success/error states, rate limiting, honeypot, DB storage
- Email notifications (2026-07): Emergent-managed Resend — every consultation submission triggers an instant branded notification email to the team inbox (env: CONTACT_NOTIFY_EMAIL, currently test address delivered@resend.dev pending real inbox), Reply-To set to the lead's email, non-blocking send, guardrail gate applied
- Partner system (2026-07): config-driven PARTNERS array in content.js + /public/partners/ drop-in folder; 10 official partners listed (Microsoft, Cisco, Fortinet, Check Point, CrowdStrike, ManageEngine, Tenable, Palo Alto Networks, Infraon, Sangfor) as navy wordmark cards in a 5x2 grid; logo files upgrade cards automatically when dropped in
- Motion system (2026-07): global scroll progress bar, hero mouse parallax (shield + glows), radar sweep behind shield, animated gradient headline, scroll hint, word-by-word quote reveal with drawing accent line, 3D tilt on solution/industry cards; all gated by reduced-motion settings
- Cookie consent (2026-07): preferences banner (Accept All / Reject All / Customize with analytics toggle), persisted choice, linked to Privacy Policy
- Analytics (2026-07): env-driven GA4 architecture (REACT_APP_GA_MEASUREMENT_ID), consent-gated loading, anonymized IPs, SPA pageview tracking on route change; no-op until a measurement ID is provided
- Blog: search, category filters, pagination, featured article, article template with related posts
- SEO per page (title/description/OG), semantic HTML, data-testids, reduced-motion support
- Verified: backend curl (health, valid submit, 422 validation, honeypot, email 202 Accepted), screenshots of home/about/contact/blog flows, cookie banner interactions, mobile drawer + no horizontal scroll at 390px

## Backlog
- P0: Replace CONTACT_NOTIFY_EMAIL (currently test address delivered@resend.dev) with the real MITS team inbox
- P1: Real MITS content (contact details, partner logos into /public/partners/ + PARTNERS array, real blog articles, intro video)
- P1: Provide GA4 measurement ID to activate analytics (REACT_APP_GA_MEASUREMENT_ID)
- P2: Publish approved Privacy Policy & Terms text
- P2: CMS backend for blog/partners

## Next Tasks
1. Swap in real notification inbox email for contact alerts
2. Add official partner logos + contact details
3. Activate analytics with real GA4 measurement ID
4. Replace demo blog posts with real MITS articles
