import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { getConsent, setConsent, initAnalytics, analyticsAvailable } from "../lib/analytics";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showPrefs, setShowPrefs] = useState(false);
    const [analyticsOn, setAnalyticsOn] = useState(false);

    useEffect(() => {
        const consent = getConsent();
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1600);
            return () => clearTimeout(timer);
        }
        if (consent.analytics) initAnalytics();
        return undefined;
    }, []);

    const apply = (analytics) => {
        setConsent({ necessary: true, analytics });
        if (analytics) initAnalytics();
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    data-testid="cookie-consent-banner"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[70] border-t border-white/10 bg-navy-950/95 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md sm:border"
                    role="dialog"
                    aria-label="Cookie preferences"
                >
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center border border-cyan-400/30 text-cyan-400">
                                    <Cookie className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <h2 className="font-display text-base font-bold text-white">Cookie Preferences</h2>
                            </div>
                            <button
                                type="button"
                                data-testid="cookie-close-button"
                                onClick={() => apply(false)}
                                aria-label="Dismiss and reject optional cookies"
                                className="text-slate-500 transition-colors hover:text-slate-300"
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-slate-400">
                            We use necessary cookies to make this site work. With your permission, we would also like to use analytics cookies to understand how the site is used. Read our{" "}
                            <Link to="/privacy-policy" className="text-cyan-400 underline-offset-2 hover:underline">Privacy Policy</Link>.
                        </p>

                        <AnimatePresence>
                            {showPrefs && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold text-slate-200">Necessary</p>
                                                <p className="text-[11px] text-slate-500">Required for the site to function.</p>
                                            </div>
                                            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-400">Always on</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold text-slate-200">Analytics</p>
                                                <p className="text-[11px] text-slate-500">
                                                    Anonymous usage insights{analyticsAvailable() ? "" : " (not yet configured)"}.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={analyticsOn}
                                                data-testid="cookie-analytics-toggle"
                                                onClick={() => setAnalyticsOn((v) => !v)}
                                                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${analyticsOn ? "bg-cyan-500" : "bg-navy-700"}`}
                                            >
                                                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300 ${analyticsOn ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-5 flex flex-wrap gap-2.5">
                            {showPrefs ? (
                                <button
                                    type="button"
                                    data-testid="cookie-save-preferences"
                                    onClick={() => apply(analyticsOn)}
                                    className="bg-cyan-500 px-5 py-2.5 font-display text-xs font-semibold text-navy-950 transition-colors hover:bg-cyan-400"
                                >
                                    Save Preferences
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        data-testid="cookie-accept-all"
                                        onClick={() => apply(true)}
                                        className="bg-cyan-500 px-5 py-2.5 font-display text-xs font-semibold text-navy-950 transition-colors hover:bg-cyan-400"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        type="button"
                                        data-testid="cookie-reject-all"
                                        onClick={() => apply(false)}
                                        className="border border-slate-600 px-5 py-2.5 font-display text-xs font-semibold text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
                                    >
                                        Reject All
                                    </button>
                                    <button
                                        type="button"
                                        data-testid="cookie-customize"
                                        onClick={() => setShowPrefs(true)}
                                        className="px-3 py-2.5 font-display text-xs font-semibold text-slate-400 transition-colors hover:text-cyan-300"
                                    >
                                        Customize
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
