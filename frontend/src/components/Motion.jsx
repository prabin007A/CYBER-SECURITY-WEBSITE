import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";

export const TiltCard = ({ children, className = "", max = 5 }) => {
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

export const WordReveal = ({ text, className = "" }) => {
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
                    {i < words.length - 1 ? " " : ""}
                </motion.span>
            ))}
        </motion.span>
    );
};

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
    return (
        <motion.div
            data-testid="scroll-progress"
            className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
};
