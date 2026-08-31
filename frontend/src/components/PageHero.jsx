import { motion } from "framer-motion";
import NetworkVisual from "./NetworkVisual";

export default function PageHero({ overline, title, description, children, seed = 11 }) {
    return (
        <section className="relative overflow-hidden bg-navy-900 pb-20 pt-40 lg:pb-28 lg:pt-48">
            <NetworkVisual density={16} seed={seed} className="absolute inset-0 h-full w-full opacity-25" />
            <div className="glow-drift absolute -right-24 top-10 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" aria-hidden="true" />
            <div className="glow-drift absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" style={{ animationDelay: "5s" }} aria-hidden="true" />
            <div className="container-x relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    {overline && (
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-cyan-400/50" aria-hidden="true" />
                            <p className="overline">{overline}</p>
                        </div>
                    )}
                    <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">{description}</p>}
                    {children && <div className="mt-9">{children}</div>}
                </motion.div>
            </div>
        </section>
    );
}
