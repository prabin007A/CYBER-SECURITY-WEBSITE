"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Play, ShieldCheck, Activity } from "lucide-react";
import NetworkVisual, { ShieldMark } from "@/components/NetworkVisual";
import CtaButton from "@/components/CtaButton";
import { SectionHeader, Reveal, Stagger } from "@/components/Reveal";
import { WordReveal, CountUp, Parallax, ScaleReveal } from "@/components/Motion";
import { SolutionCard, IndustryCard } from "@/components/Cards";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTABand from "@/components/CTABand";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SOLUTIONS, INDUSTRIES, APPROACH_STEPS } from "@/data/content";

const STATS = [
    { value: 6, suffix: "+", label: "Solution Areas", color: "text-cobalt-soft" },
    { value: 8, suffix: "", label: "Industries Served", color: "text-crimson" },
    { value: 10, suffix: "", label: "Technology Partners", color: "text-signal" },
    { value: 24, suffix: "/7", label: "Security Monitoring", color: "text-violet-300" },
];

const HeadlineLine = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
    <span className="block overflow-hidden pb-1">
        <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.span>
    </span>
);

const OrbitalVisual = () => (
    <div className="relative aspect-square w-full">
        <div className="radar-sweep absolute inset-[8%]" aria-hidden="true" />
        <div className="absolute inset-0 rounded-full border border-cobalt/15 spin-slow" style={{ transformOrigin: "center" }} aria-hidden="true" />
        <div className="absolute inset-[14%] rounded-full border border-crimson/15 spin-reverse" style={{ transformOrigin: "center" }} aria-hidden="true" />
        {/* Orbiting nodes */}
        <div className="absolute inset-0 spin-slow" style={{ transformOrigin: "center" }} aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-signal shadow-[0_0_16px_4px_rgba(0,240,255,0.6)]" />
            <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-crimson shadow-[0_0_16px_4px_rgba(255,46,76,0.5)]" />
        </div>
        <div className="float-soft relative flex h-full items-center justify-center">
            <ShieldMark className="w-[72%] opacity-95" />
        </div>
    </div>
);

function Hero() {
    const ref = useRef<HTMLElement>(null);
    const [videoOpen, setVideoOpen] = useState(false);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
    const shieldY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
    const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 40, damping: 18 });
    const smy = useSpring(my, { stiffness: 40, damping: 18 });
    const shieldMX = useTransform(smx, (v) => v * 34);
    const shieldMY = useTransform(smy, (v) => v * 22);
    const glowMX = useTransform(smx, (v) => v * -52);
    const glowMY = useTransform(smy, (v) => v * -36);

    const onMouseMove = (e: React.MouseEvent) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
    };

    return (
        <section ref={ref} data-testid="home-hero" onMouseMove={onMouseMove} className="relative flex min-h-[100svh] items-center overflow-hidden bg-command-900 pt-28">
            <div className="grid-texture grid-texture-fade absolute inset-0" aria-hidden="true" />
            <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
                <NetworkVisual density={22} seed={7} className="h-full w-full opacity-40" />
            </motion.div>
            <motion.div style={{ x: glowMX, y: glowMY }} className="absolute inset-0" aria-hidden="true">
                <div className="glow-drift absolute right-[8%] top-[18%] h-96 w-96 rounded-full bg-cobalt/15 blur-3xl" />
                <div className="glow-drift absolute bottom-[8%] left-[4%] h-80 w-80 rounded-full bg-signal/12 blur-3xl" style={{ animationDelay: "6s" }} />
                <div className="glow-drift absolute left-[30%] top-[10%] h-80 w-80 rounded-full bg-crimson/14 blur-[120px]" style={{ animationDelay: "3s" }} />
                <div className="glow-drift absolute bottom-[20%] right-[28%] h-64 w-64 rounded-full bg-violet-600/10 blur-[110px]" style={{ animationDelay: "9s" }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-command-900 via-transparent to-command-900/60" aria-hidden="true" />

            <motion.div style={{ y: shieldY, opacity: fade }} className="pointer-events-none absolute right-[5%] top-1/2 hidden w-[380px] -translate-y-1/2 lg:block xl:w-[460px]" aria-hidden="true">
                <motion.div style={{ x: shieldMX, y: shieldMY }}>
                    <OrbitalVisual />
                </motion.div>
            </motion.div>

            <motion.div style={{ opacity: fade }} className="container-x relative z-10 w-full py-20">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/5 px-4 py-1.5"
                    data-testid="hero-status-pill"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">System Status · Protected</span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="overline mt-6"
                    data-testid="hero-overline"
                >
                    IT Solutions · Cybersecurity · Cloud · AI
                </motion.p>
                <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl" data-testid="hero-headline">
                    <HeadlineLine delay={0.25}>Beyond Defense.</HeadlineLine>
                    <HeadlineLine delay={0.4}>
                        <span className="gradient-text-animated bg-gradient-to-r from-cobalt-soft via-signal to-crimson bg-clip-text text-transparent">Ahead of Threats</span>
                    </HeadlineLine>
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.65 }}
                    className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
                    data-testid="hero-subheading"
                >
                    Advanced cybersecurity solutions designed to protect your business, secure your data, and enable digital transformation with confidence
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="mt-10 flex flex-wrap items-center gap-4"
                >
                    <CtaButton to="/contact" variant="primary" testId="hero-cta-request-consultation">Request Consultation</CtaButton>
                    <button
                        type="button"
                        data-testid="hero-cta-watch-video"
                        onClick={() => setVideoOpen(true)}
                        className="group inline-flex items-center gap-3 rounded-xl border border-white/20 px-6 py-3.5 font-display text-sm font-semibold text-slate-100 transition-colors duration-300 hover:border-signal hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                    >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:scale-110">
                            <Play className="ml-0.5 h-3 w-3 fill-current" aria-hidden="true" />
                        </span>
                        Watch Introduction Video
                    </button>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
                aria-hidden="true"
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
                <span className="hint-bob block h-8 w-px bg-gradient-to-b from-signal to-transparent" />
            </motion.div>

            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogContent data-testid="intro-video-modal" className="glass-strong border-white/10 text-slate-200 sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-display text-white">Introduction Video</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Our introduction video is coming soon. In the meantime, request a consultation and we will walk you through who we are and how we work.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-command-950">
                        <ShieldMark className="w-24 opacity-60" />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default function HomeView() {
    return (
        <>
            <Hero />

            <section data-testid="who-we-protect" className="relative overflow-hidden bg-command-900 py-24 lg:py-32">
                <NetworkVisual density={10} seed={13} className="absolute inset-0 h-full w-full opacity-15" />
                <div className="container-x relative z-10">
                    <SectionHeader
                        index="01"
                        overline="Who We Protect"
                        title="Who We Protect"
                        description="From critical infrastructure to growing businesses, we secure the organizations that keep the world running."
                    />
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {INDUSTRIES.map((industry, i) => (
                            <IndustryCard key={industry.name} industry={industry} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <section data-testid="stats-band" className="relative overflow-hidden border-y border-white/5 bg-command-950 py-16 lg:py-20">
                <div className="grid-texture grid-texture-fade absolute inset-0 opacity-50" aria-hidden="true" />
                <div className="glow-drift absolute -top-20 left-[15%] h-56 w-56 rounded-full bg-cobalt/15 blur-[100px]" aria-hidden="true" />
                <div className="glow-drift absolute -bottom-16 right-[12%] h-56 w-56 rounded-full bg-crimson/12 blur-[100px]" style={{ animationDelay: "5s" }} aria-hidden="true" />
                <div className="container-x relative z-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.1}>
                            <p className={`font-display text-4xl font-extrabold sm:text-5xl ${s.color}`} data-testid={`stat-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                                <CountUp value={s.value} suffix={s.suffix} />
                            </p>
                            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section data-testid="our-solutions" className="relative overflow-hidden bg-command-900 py-24 lg:py-32">
                <div className="container-x">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <SectionHeader
                            index="02"
                            overline="Our Solutions"
                            title="Our Solutions"
                            description="Six integrated capability areas that bring security, intelligence, and scale to your technology landscape."
                        />
                    </div>
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {SOLUTIONS.map((solution, i) => (
                            <SolutionCard key={solution.slug} solution={solution} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <section data-testid="why-cyber-security-matters" className="relative overflow-hidden border-y border-white/10 bg-command-950 py-24 lg:py-32">
                <div className="grid-texture grid-texture-fade absolute inset-0 opacity-50" aria-hidden="true" />
                <Parallax speed={0.2} className="pointer-events-none absolute -top-8 right-4 select-none">
                    <span className="font-display text-[10rem] font-extrabold leading-none text-white/[0.04] lg:text-[16rem]">03</span>
                </Parallax>
                <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs tracking-[0.25em] text-signal">03</span>
                            <span className="h-px w-10 bg-signal/50" aria-hidden="true" />
                            <p className="overline">Why Cyber Security Matters</p>
                        </div>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Why Cyber Security Matters
                        </h2>
                        <div className="relative mt-7 pl-6">
                            <motion.span
                                className="absolute left-0 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-cobalt via-signal to-crimson"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                aria-hidden="true"
                            />
                            <WordReveal
                                text="Cyber threats are evolving rapidly. Proactive prevention is always more effective and cost-efficient than recovery"
                                className="font-display text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl"
                            />
                        </div>
                        <p className="mt-6 text-base leading-relaxed text-slate-400">
                            Security is no longer an IT checkbox — it is a business strategy. Organizations that invest in proactive protection operate with greater confidence, earn deeper trust, and move faster than those forced to react.
                        </p>
                    </Reveal>
                    <ScaleReveal className="relative">
                        <Parallax speed={0.1}>
                            <div className="glow-border relative mx-auto max-w-md rounded-2xl border border-white/10 bg-command-800/70 p-10 backdrop-blur-xl">
                                <div className="float-soft">
                                    <ShieldMark className="w-full" />
                                </div>
                                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                                    {[
                                        { label: "Detect", cls: "text-cobalt-soft", icon: Activity },
                                        { label: "Prevent", cls: "text-signal", icon: ShieldCheck },
                                        { label: "Respond", cls: "text-crimson", icon: Activity },
                                    ].map(({ label, cls }) => (
                                        <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3">
                                            <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${cls}`}>{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Parallax>
                    </ScaleReveal>
                </div>
            </section>

            <section data-testid="our-approach" className="relative overflow-hidden bg-command-900 py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="04"
                        overline="Our Approach"
                        title="Our Approach"
                        description="Discover – Assess – Protect – Monitor – Respond – Improve. A continuous cycle that keeps your defenses ahead of evolving threats."
                    />
                    <div className="mt-16">
                        <ProcessTimeline steps={APPROACH_STEPS} />
                    </div>
                </div>
            </section>

            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text="Stay ahead of evolving cyber threats with proactive security solutions designed to protect your business today and prepare you for tomorrow"
                ctaLabel="Schedule a Consultation"
            />
        </>
    );
}
