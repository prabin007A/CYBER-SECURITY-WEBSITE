"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useInView } from "framer-motion";

export const TiltCard = ({ children, className = "", max = 5 }: { children: React.ReactNode; className?: string; max?: number }) => {
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 180, damping: 22 });
    const sry = useSpring(ry, { stiffness: 180, damping: 22 });
    return (
        <motion.div
            className={`h-full ${className}`}
            style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                ry.set(((e.clientX - r.left) / r.width - 0.5) * max);
                rx.set(-((e.clientY - r.top) / r.height - 0.5) * max);
            }}
            onMouseLeave={() => {
                rx.set(0);
                ry.set(0);
            }}
        >
            {children}
        </motion.div>
    );
};

export const WordReveal = ({ text, className = "" }: { text: string; className?: string }) => {
    const words = text.split(" ");
    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
            aria-label={text}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    className="inline-block"
                    variants={{
                        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                    }}
                >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                </motion.span>
            ))}
        </motion.span>
    );
};

export const TitleReveal = ({ text, className = "" }: { text: string; className?: string }) => {
    const words = text.split(" ");
    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-70px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055 } } }}
            aria-label={text}
        >
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    <motion.span
                        aria-hidden="true"
                        className="inline-block"
                        variants={{
                            hidden: { y: "115%" },
                            show: { y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                        }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </motion.span>
    );
};

export const Parallax = ({ children, speed = 0.15, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [speed * 140, -speed * 140]);
    return (
        <motion.div ref={ref} className={className} style={{ y }}>
            {children}
        </motion.div>
    );
};

export const ScaleReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.9, y: 32 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

export const CountUp = ({ value, suffix = "", className = "", duration = 1.8 }: { value: number; suffix?: string; className?: string; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let raf: number;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, duration]);
    return (
        <span ref={ref} className={className}>
            {display}
            {suffix}
        </span>
    );
};

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
    return (
        <motion.div
            data-testid="scroll-progress"
            className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-rose-400"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
};
