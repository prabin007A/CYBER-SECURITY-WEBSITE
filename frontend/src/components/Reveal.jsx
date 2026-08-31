import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

export const Stagger = ({ children, className = "" }) => (
    <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = "" }) => (
    <motion.div
        className={className}
        variants={{
            hidden: { opacity: 0, y: 26 },
            show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
        }}
    >
        {children}
    </motion.div>
);

export const SectionHeader = ({ index, overline, title, description, dark = false, className = "" }) => (
    <Reveal className={`max-w-3xl ${className}`}>
        <div className="flex items-center gap-4">
            {index && (
                <span className={`font-mono text-xs tracking-[0.25em] ${dark ? "text-cyan-400" : "text-cyan-600"}`}>
                    {index}
                </span>
            )}
            <span className={`h-px w-10 ${dark ? "bg-cyan-400/50" : "bg-cyan-500/50"}`} aria-hidden="true" />
            <p className="overline" data-testid={`overline-${overline?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{overline}</p>
        </div>
        <h2 className={`mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${dark ? "text-slate-50" : "text-navy-900"}`}>
            {title}
        </h2>
        {description && (
            <p className={`mt-5 text-base leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {description}
            </p>
        )}
    </Reveal>
);
