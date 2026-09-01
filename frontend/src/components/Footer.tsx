"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS, CONTACT_PLACEHOLDER_NOTE } from "@/data/content";
import CtaButton from "./CtaButton";

const companyLinks = [
    { label: "About", to: "/about" },
    { label: "Industries", to: "/industries" },
    { label: "Technology Partners", to: "/technology-partners" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

export default function Footer() {
    return (
        <footer data-testid="site-footer" className="bg-navy-950 text-slate-300">
            <div className="container-x border-b border-white/10 py-16 lg:py-20">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <div>
                        <p className="overline">Next Step</p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                            <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">Secure Today. Prepare for Tomorrow.</span>
                        </h2>
                    </div>
                    <CtaButton to="/contact" variant="primary" testId="footer-cta-talk-to-us">Talk to Us</CtaButton>
                </div>
            </div>

            <div className="container-x grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link href="/" className="inline-flex items-center" aria-label="MITS home">
                        <Image src="/mits-logo-white.png" alt="MITS" width={200} height={131} className="h-12 w-auto" />
                    </Link>
                    <p className="mt-5 text-sm leading-relaxed text-slate-400">
                        An IT solutions and cybersecurity company focused on building secure, resilient, and future-ready digital environments.
                    </p>
                </div>

                <nav aria-label="Company">
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-violet-400">Company</h3>
                    <ul className="mt-5 space-y-3">
                        {companyLinks.map((l) => (
                            <li key={l.to}>
                                <Link href={l.to} data-testid={`footer-company-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white">
                                    {l.label}
                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-label="Solutions">
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">Solutions</h3>
                    <ul className="mt-5 space-y-3">
                        {SOLUTIONS.map((s) => (
                            <li key={s.slug}>
                                <Link href={`/solutions/${s.slug}`} data-testid={`footer-solution-${s.slug}`} className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white">
                                    {s.title}
                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-amber-400">Contact</h3>
                    <p className="mt-5 text-sm leading-relaxed text-slate-400">{CONTACT_PLACEHOLDER_NOTE}</p>
                    <Link href="/contact" data-testid="footer-contact-link" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300">
                        Request a consultation
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-x flex flex-col items-start justify-between gap-4 py-7 text-xs text-slate-500 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} MITS. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" data-testid="footer-privacy-link" className="transition-colors hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" data-testid="footer-terms-link" className="transition-colors hover:text-slate-300">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
