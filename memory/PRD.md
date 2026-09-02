# MITS

> Update (June 2026): Marquee ticker removed from Home page. Contact notification email set to prabinraj48@gmail.com (verified sending via Resend, HTTP 202).
> Update 2 (June 2026): Marquee removed from About page. Site-wide colorful refresh ("Prismatic Enterprise"): 5-color accent cycling (cyan/violet/emerald/amber/rose) across all cards (Cards.jsx ACCENTS), SectionHeader overlines (Reveal.jsx), ProcessTimeline steps, Partner cards; gradient primary CTA buttons (blue→indigo→violet); multi-color ambient glows on heroes/CTA bands; colorful footer headings. Verified via testing agent — 100% pass, no console errors on any page.
> Update 3 (June 2026): Added premium scroll effects: word-mask TitleReveal on all section H2s, Parallax wrapper (Home '03' numeral + shield panel), ScaleReveal, CountUp stats band on Home (6+/8/10/24-7), PageHero scroll-exit parallax+fade on all subpages, card-sheen hover sweep, multicolor scroll progress bar. Testing agent: 100% pass, no overflow at 1920px/390px. Corporate Website — PRD
> Update 4 (June 2026): MAJOR — Frontend migrated from React (CRA + JS) to Next.js 15 (App Router) + TypeScript, preserving all UI/UX, colors, Framer Motion + Lenis animations, routing, and backend integrations. Old CRA code backed up at /app/frontend_cra_backup. Full regression by testing agent: 100% pass (iteration_3.json) — all 12 routes render, nav/mobile-menu work, contact form POSTs to /api/contact (200), scroll/enter animations fire. Route-EXIT animations intentionally dropped (App Router limitation, user-approved).
> Update 5 (June 2026): Replaced shield+"MITS" text logo with the real MITS logo image (/public/mits-logo.png, blue 'mits' wordmark) in Header and Footer, rendered inside a white rounded chip for consistent contrast on dark hero, white scrolled header, and dark footer. Fixed lint config: added **/.next/ to .gitignore and /app/frontend/.oxlintrc.json to exclude Next.js build artifacts from linting.
> Update 6 (June 2026): Logo refined per user — removed the white chip, enlarged the logo (h-14), and made it background-aware: dark states (top-of-page hero header + dark footer) use a white-text/red-swoosh version (/public/mits-logo-dark.png), while the white/scrolled header uses the original blue+red logo (/public/mits-logo.png). White-only variant also generated (/public/mits-logo-white.png, currently unused).
> Update 7 (June 2026): Fixed reported tab-switch delay. Root cause: template.tsx animated every route change with opacity 0->1 + translateY 14px->0 over 0.35s, producing a visible slide+fade before content appeared. Changed to a fast 0.18s opacity-only fade. Testing agent (iteration_4.json): 100% frontend pass, warm/revisit navigations ~260-320ms, no regressions. Note: residual per-route fetch overhead in preview is inherent to Next.js DEV mode; the deployed production build prefetches static/SSG routes for near-instant switching.
> Update 8 (June 2026): FULL UI REDESIGN — new dark "Cyber Command Precision" theme (design_guidelines.json). Command-navy backgrounds (#070B14) with cobalt (#1E50FF) + crimson (#FF2E4C) + cyan-signal (#00F0FF) accents anchored to the MITS logo. New fonts: Plus Jakarta Sans / Inter / JetBrains Mono. Floating pill glass header, orbital shield hero with live "System Status · Protected" telemetry pill + grid textures, glassmorphism cards with glow-borders + hover lift, gradient cobalt→crimson CTAs, refined Framer Motion entrance/hover/scroll effects. All content, routes, and the MongoDB contact form preserved. Foundation (globals.css, tailwind.config.js, layout fonts) + shared components (Header, Footer, Cards, CtaButton, PageHero, CTABand, ProcessTimeline, NetworkVisual, Reveal/SectionHeader, ContactForm) rewritten; all 11 secondary views converted to dark via controlled script; HomeView rebuilt with orbital hero. Fixed a pre-existing WordReveal space-collapse bug in Motion.tsx. Testing agent (iteration_5.json): all 17 routes render, nav/mobile/cookie/hero-modal/contact-form all pass on 1920px + 390px; the one real bug (WordReveal) fixed and verified.
> Update 9 (June 2026): REVERTED the Update 8 redesign per user request. Restored all redesign-touched source files (frontend/src, tailwind.config.js, design_guidelines.json) to checkpoint aefc7ef (the post tab-switch-fix / logo state) via git checkout — no git reset. The site is back to the previous colorful "Prismatic Enterprise" light+navy theme. The MITS logo (white-text/red-swoosh on dark, blue+red on light) and the 0.18s tab-switch fix remain intact. Verified: all 10 sampled routes return HTTP 200 and home/who-we-protect render correctly via screenshot.

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
