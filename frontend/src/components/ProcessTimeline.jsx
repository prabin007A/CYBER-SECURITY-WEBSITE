import { motion } from "framer-motion";

export default function ProcessTimeline({ steps, dark = false }) {
    return (
        <div className="relative">
            {/* Desktop: horizontal */}
            <div className="relative hidden lg:block">
                <div className={`absolute left-0 right-0 top-6 h-px ${dark ? "bg-white/10" : "bg-navy-900/10"}`} aria-hidden="true" />
                <motion.div
                    className="absolute left-0 top-6 h-px origin-left bg-gradient-to-r from-cyan-500 to-blue-600"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: "100%" }}
                    aria-hidden="true"
                />
                <ol className={`grid gap-8 ${steps.length === 6 ? "grid-cols-6" : "grid-cols-4"}`}>
                    {steps.map((step, i) => (
                        <Step key={step.number} step={step} index={i} dark={dark} horizontal />
                    ))}
                </ol>
            </div>

            {/* Mobile / tablet: vertical */}
            <div className="relative lg:hidden">
                <div className={`absolute bottom-4 left-6 top-4 w-px ${dark ? "bg-white/10" : "bg-navy-900/10"}`} aria-hidden="true" />
                <motion.div
                    className="absolute left-6 top-4 w-px origin-top bg-gradient-to-b from-cyan-500 to-blue-600"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "calc(100% - 2rem)" }}
                    aria-hidden="true"
                />
                <ol className="space-y-10">
                    {steps.map((step, i) => (
                        <Step key={step.number} step={step} index={i} dark={dark} />
                    ))}
                </ol>
            </div>
        </div>
    );
}

const Step = ({ step, index, dark, horizontal }) => {
    const Icon = step.icon;
    return (
        <motion.li
            data-testid={`process-step-${step.number}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={horizontal ? "relative pt-16" : "relative pl-16"}
        >
            <span
                className={`absolute flex h-12 w-12 items-center justify-center border transition-colors ${
                    dark ? "border-cyan-400/40 bg-navy-900 text-cyan-400" : "border-cyan-500/40 bg-white text-cyan-600"
                } ${horizontal ? "left-0 top-0" : "left-0 top-0"}`}
            >
                <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className={`font-mono text-xs tracking-[0.25em] ${dark ? "text-cyan-400" : "text-cyan-600"}`}>
                {step.number}
            </span>
            <h3 className={`mt-2 font-display text-lg font-bold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>
                {step.title}
            </h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {step.description}
            </p>
        </motion.li>
    );
};
