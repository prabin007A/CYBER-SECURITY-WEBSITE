"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";

const Logo = () => (
    <Link href="/" data-testid="header-logo" className="flex items-center" aria-label="MITS home">
        <Image src="/mits-logo-dark.png" alt="MITS" width={200} height={131} className="h-10 w-auto" priority />
    </Link>
);

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <header data-testid="site-header" className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
            <div
                className={`container-x flex h-[64px] items-center justify-between rounded-full border px-4 transition-all duration-500 sm:px-6 ${
                    scrolled || open
                        ? "glass-strong border-cobalt/25 shadow-[0_12px_40px_-10px_rgba(30,80,255,0.35)]"
                        : "glass border-white/10"
                }`}
            >
                <Logo />

                <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
                    {NAV_LINKS.map((link) => {
                        const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
                        return (
                            <Link
                                key={link.to}
                                href={link.to}
                                data-testid={`nav-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                className={`relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-cobalt after:to-crimson after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                                    isActive ? "text-white after:scale-x-100" : "text-slate-300 hover:text-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden xl:block">
                    <Link
                        href="/contact"
                        data-testid="header-cta-request-consultation"
                        className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-cobalt to-crimson px-6 py-2.5 font-display text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-cobalt/25 transition-all hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                    >
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-signal to-cobalt transition-transform duration-300 group-hover:scale-y-100" aria-hidden="true" />
                        <span className="relative z-10">Request Consultation</span>
                    </Link>
                </div>

                <button
                    type="button"
                    data-testid="mobile-menu-button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label={open ? "Close menu" : "Open menu"}
                    className="flex h-10 w-10 items-center justify-center text-white transition-colors xl:hidden"
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 top-0 z-40 bg-command-950/70 backdrop-blur-sm xl:hidden"
                        onClick={() => setOpen(false)}
                    >
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-strong absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto border-l border-white/10 px-8 py-8"
                            aria-label="Mobile"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6 flex justify-end">
                                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center text-white">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            {NAV_LINKS.map((link, i) => {
                                const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
                                return (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                                    >
                                        <Link
                                            href={link.to}
                                            data-testid={`mobile-nav-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                            className={`block border-b border-white/10 py-4 font-display text-lg font-semibold ${isActive ? "text-cobalt-soft" : "text-slate-200"}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/contact"
                                    data-testid="mobile-cta-request-consultation"
                                    className="block rounded-full bg-gradient-to-r from-cobalt to-crimson px-6 py-4 text-center font-display text-sm font-semibold text-white"
                                >
                                    Request Consultation
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
