import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CtaButton({ to, children, variant = "primary", testId, onClick, type = "link", disabled = false }) {
    const base =
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
    const styles = {
        primary: "bg-blue-600 text-white hover:text-white",
        dark: "bg-navy-900 text-white hover:text-white",
        outlineLight: "border border-slate-500/60 text-slate-100 hover:text-navy-900",
        outlineDark: "border border-navy-900/30 text-navy-900 hover:text-white",
    };
    const fill = {
        primary: "bg-cyan-500",
        dark: "bg-blue-600",
        outlineLight: "bg-slate-100",
        outlineDark: "bg-navy-900",
    };
    const inner = (
        <>
            <span className={`absolute inset-0 ${fill[variant]} origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100`} aria-hidden="true" />
            <span className="relative z-10">{children}</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </>
    );
    if (type === "button") {
        return (
            <button type="submit" data-testid={testId} disabled={disabled} onClick={onClick} className={`${base} ${styles[variant]}`}>
                {inner}
            </button>
        );
    }
    return (
        <Link to={to} data-testid={testId} className={`${base} ${styles[variant]}`} onClick={onClick}>
            {inner}
        </Link>
    );
}
