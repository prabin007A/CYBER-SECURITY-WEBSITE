"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/data/content";

export default function ProcessTimeline({ steps }: { steps: ProcessStep[]; dark?: boolean }) {
    return (
        <div className="relative">
            {/* Desktop: horizontal */}
            <div className="relative hidden lg:block">
                <div className="absolute left-0 right-0 top-6 h-px bg-white/10" aria-hidden="true" />
                <motion.div
                    className="absolute left-0 top-6 h-px origin-left bg-gradient-to-r from-cobalt via-signal to-crimson"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: "100%" }}
                    aria-hidden="true"
                />
                <ol className={`grid gap-8 ${steps.length === 6 ? "grid-cols-6" : "grid-cols-4"}`}>
                    {steps.map((step, i) => (
                        <Step key={step.number} step={step} index={i} horizontal />
                    ))}
                </ol>
            </div>

            {/* Mobile / tablet: vertical */}
            <div className="relative lg:hidden">
                <div className="absolute bottom-4 left-6 top-4 w-px bg-white/10" aria-hidden="true" />
                <motion.div
                    className="absolute left-6 top-4 w-px origin-top bg-gradient-to-b from-cobalt via-signal to-crimson"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "calc(100% - 2rem)" }}
                    aria-hidden="true"
                />
                <ol className="space-y-10">
                    {steps.map((step, i) => (
                        <Step key={step.number} step={step} index={i} />
                    ))}
                </ol>
            </div>
        </div>
    );
}

const STEP_ACCENTS = [
    "border-cobalt/40 text-cobalt-soft",
    "border-crimson/40 text-crimson",
    "border-signal/40 text-signal",
    "border-violet-400/40 text-violet-300",
    "border-emerald-400/40 text-emerald-300",
];

const Step = ({ step, index, horizontal }: { step: ProcessStep; index: number; horizontal?: boolean }) => {
    const Icon = step.icon;
    const a = STEP_ACCENTS[index % STEP_ACCENTS.length];
    return (
        <motion.li
            data-testid={`process-step-${step.number}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={horizontal ? "relative pt-16" : "relative pl-16"}
        >
            <span className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl border bg-command-800 ${a}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className={`font-mono text-xs tracking-[0.25em] ${a.split(" ")[1]}`}>
                {step.number}
            </span>
            <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-white">
                {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.description}
            </p>
        </motion.li>
    );
};
