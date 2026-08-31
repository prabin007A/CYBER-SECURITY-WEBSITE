import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { NAV_LINKS } from "../data/content";

const Logo = ({ dark }) => (
    <Link to="/" data-testid="header-logo" className="flex items-center gap-2.5" aria-label="MITS home">
        <span className="flex h-9 w-9 items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className={`font-display text-xl font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>
            MITS
        </span>
    </Link>
);

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const dark = !scrolled && !open;

    return (
        <header
            data-testid="site-header"
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                scrolled ? "border-b border-navy-900/10 bg-white/90 shadow-[0_8px_30px_rgba(11,17,32,0.06)] backdrop-blur-xl" : "bg-transparent"
            }`}
        >
            <div className="container-x flex h-[76px] items-center justify-between">
                <Logo dark={dark} />

                <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            data-testid={`nav-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            className={({ isActive }) =>
                                `relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-cyan-500 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                                    isActive
                                        ? `after:scale-x-100 ${dark ? "text-white" : "text-navy-900"}`
                                        : dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-navy-900"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden xl:block">
                    <Link
                        to="/contact"
                        data-testid="header-cta-request-consultation"
                        className="group relative inline-flex items-center overflow-hidden bg-blue-600 px-6 py-2.5 font-display text-[13px] font-semibold tracking-wide text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-cyan-500 transition-transform duration-300 group-hover:scale-y-100" aria-hidden="true" />
                        <span className="relative z-10">Request Consultation</span>
                    </Link>
                </div>

                <button
                    type="button"
                    data-testid="mobile-menu-button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-label={open ? "Close menu" : "Open menu"}
                    className={`flex h-11 w-11 items-center justify-center transition-colors xl:hidden ${dark ? "text-white" : "text-navy-900"}`}
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
                        className="fixed inset-0 top-[76px] z-40 bg-navy-950/60 backdrop-blur-sm xl:hidden"
                        onClick={() => setOpen(false)}
                    >
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto bg-navy-900 px-8 py-10"
                            aria-label="Mobile"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                                >
                                    <NavLink
                                        to={link.to}
                                        data-testid={`mobile-nav-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                        className={({ isActive }) =>
                                            `block border-b border-white/10 py-4 font-display text-lg font-semibold ${isActive ? "text-cyan-400" : "text-slate-200"}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-8"
                            >
                                <Link
                                    to="/contact"
                                    data-testid="mobile-cta-request-consultation"
                                    className="block bg-blue-600 px-6 py-4 text-center font-display text-sm font-semibold text-white"
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
