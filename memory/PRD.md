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
- Contact form: client + server validation, success/error states, rate limiting, honeypot, DB storage (no email sent — by design)
- Blog: search, category filters, pagination, featured article, article template with related posts
- SEO per page (title/description/OG), semantic HTML, data-testids, reduced-motion support
- Verified: backend curl (health, valid submit, 422 validation, honeypot), screenshots of home/about/contact/blog flows, mobile drawer + no horizontal scroll at 390px

## Backlog
- P0: none blocking
- P1: Real MITS content (contact details, partner logos, real blog articles, intro video)
- P1: Email notification for contact submissions (Resend) once approved
- P2: Analytics integration via env config (architecture ready)
- P2: Cookie consent banner
- P2: CMS backend for blog/partners

## Next Tasks
1. Wire email delivery for contact form (Resend integration)
2. Replace demo blog posts with real MITS articles
3. Add official partner logos + contact details
4. Add analytics provider via env vars
