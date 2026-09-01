"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaButtonProps {
    to?: string;
    children: React.ReactNode;
    variant?: "primary" | "dark" | "outlineLight" | "outlineDark" | "accent";
    testId?: string;
    onClick?: () => void;
    type?: "link" | "button";
    disabled?: boolean;
}

export default function CtaButton({ to = "/", children, variant = "primary", testId, onClick, type = "link", disabled = false }: CtaButtonProps) {
    const base =
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-command-900 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60";
    const styles = {
        primary: "bg-gradient-to-r from-cobalt to-crimson text-white shadow-lg shadow-cobalt/30 hover:shadow-cobalt/50 hover:text-white",
        accent: "bg-crimson text-white shadow-lg shadow-crimson/30 hover:text-white",
        dark: "glass-strong border border-white/10 text-white hover:text-white hover:border-cobalt/50",
        outlineLight: "border border-white/20 text-slate-100 hover:text-white hover:border-cobalt/60",
        outlineDark: "border border-white/20 text-slate-100 hover:text-white hover:border-cobalt/60",
    };
    const fill = {
        primary: "bg-gradient-to-r from-signal to-cobalt",
        accent: "bg-crimson-hover",
        dark: "bg-gradient-to-r from-cobalt to-crimson",
        outlineLight: "bg-white/[0.06]",
        outlineDark: "bg-white/[0.06]",
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
        <Link href={to} data-testid={testId} className={`${base} ${styles[variant]}`} onClick={onClick}>
            {inner}
        </Link>
    );
}
