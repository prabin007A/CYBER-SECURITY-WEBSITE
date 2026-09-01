"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NetworkVisual from "./NetworkVisual";

interface PageHeroProps {
    overline?: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
    seed?: number;
}

export default function PageHero({ overline, title, description, children, seed = 11 }: PageHeroProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    return (
        <section ref={ref} className="relative overflow-hidden bg-command-900 pb-20 pt-40 lg:pb-28 lg:pt-48">
            <div className="grid-texture grid-texture-fade absolute inset-0" aria-hidden="true" />
            <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
                <NetworkVisual density={16} seed={seed} className="h-full w-full opacity-25" />
            </motion.div>
            <div className="glow-drift absolute -right-24 top-10 h-80 w-80 rounded-full bg-cobalt/15 blur-3xl" aria-hidden="true" />
            <div className="glow-drift absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-signal/10 blur-3xl" style={{ animationDelay: "5s" }} aria-hidden="true" />
            <div className="glow-drift absolute left-[35%] top-[15%] h-72 w-72 rounded-full bg-crimson/12 blur-[110px]" style={{ animationDelay: "2.5s" }} aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-command-900 to-transparent" aria-hidden="true" />
            <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    {overline && (
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-gradient-to-r from-cobalt to-crimson" aria-hidden="true" />
                            <p className="overline">{overline}</p>
                        </div>
                    )}
                    <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-white via-cobalt-soft to-signal bg-clip-text text-transparent">{title}</span>
                    </h1>
                    {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">{description}</p>}
                    {children && <div className="mt-9">{children}</div>}
                </motion.div>
            </motion.div>
        </section>
    );
}
