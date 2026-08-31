import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";
import Seo from "../components/Seo";
import NetworkVisual, { ShieldMark } from "../components/NetworkVisual";
import CtaButton from "../components/CtaButton";
import { SectionHeader, Reveal, Stagger } from "../components/Reveal";
import { WordReveal } from "../components/Motion";
import { SolutionCard, IndustryCard } from "../components/Cards";
import ProcessTimeline from "../components/ProcessTimeline";
import CTABand from "../components/CTABand";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { SOLUTIONS, INDUSTRIES, APPROACH_STEPS } from "../data/content";

const HeadlineLine = ({ children, delay }) => (
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

function Hero() {
    const ref = useRef(null);
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

    const onMouseMove = (e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
    };

    return (
        <section ref={ref} data-testid="home-hero" onMouseMove={onMouseMove} className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-900 pt-24">
            <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
                <NetworkVisual density={22} seed={7} className="h-full w-full opacity-40" />
            </motion.div>
            <motion.div style={{ x: glowMX, y: glowMY }} className="absolute inset-0" aria-hidden="true">
                <div className="glow-drift absolute right-[8%] top-[18%] h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
                <div className="glow-drift absolute bottom-[8%] left-[4%] h-80 w-80 rounded-full bg-cyan-500/12 blur-3xl" style={{ animationDelay: "6s" }} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/60" aria-hidden="true" />

            <motion.div style={{ y: shieldY, opacity: fade }} className="pointer-events-none absolute right-[6%] top-1/2 hidden w-[380px] -translate-y-1/2 lg:block xl:w-[440px]" aria-hidden="true">
                <motion.div style={{ x: shieldMX, y: shieldMY }} className="relative">
                    <div className="radar-sweep absolute -inset-10" />
                    <div className="float-soft relative">
                        <ShieldMark className="w-full opacity-90" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div style={{ opacity: fade }} className="container-x relative z-10 w-full py-20">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="overline"
                    data-testid="hero-overline"
                >
                    IT Solutions · Cybersecurity · Cloud · AI
                </motion.p>
                <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl" data-testid="hero-headline">
                    <HeadlineLine delay={0.25}>Beyond Defense.</HeadlineLine>
                    <HeadlineLine delay={0.4}>
                        <span className="gradient-text-animated bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Ahead of Threats</span>
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
                        className="group inline-flex items-center gap-3 border border-slate-500/60 px-6 py-3.5 font-display text-sm font-semibold text-slate-100 transition-colors duration-300 hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
                <span className="hint-bob block h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
            </motion.div>

            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                <DialogContent data-testid="intro-video-modal" className="border-navy-800 bg-navy-900 text-slate-200 sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-display text-white">Introduction Video</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Our introduction video is coming soon. In the meantime, request a consultation and we will walk you through who we are and how we work.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex aspect-video items-center justify-center border border-white/10 bg-navy-950">
                        <ShieldMark className="w-24 opacity-60" />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default function Home() {
    return (
        <>
            <Seo
                title="MITS | Cybersecurity & IT Solutions"
                description="Advanced cybersecurity and scalable IT solutions designed to protect businesses, secure data, and enable digital transformation."
            />
            <Hero />

            <section data-testid="who-we-protect" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
                <NetworkVisual density={10} seed={13} className="absolute inset-0 h-full w-full opacity-15" />
                <div className="container-x relative z-10">
                    <SectionHeader
                        index="01"
                        overline="Who We Protect"
                        title="Who We Protect"
                        description="From critical infrastructure to growing businesses, we secure the organizations that keep the world running."
                        dark
                    />
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {INDUSTRIES.map((industry) => (
                            <IndustryCard key={industry.name} industry={industry} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <section data-testid="our-solutions" className="bg-slate-50 py-24 lg:py-32">
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
                        {SOLUTIONS.map((solution) => (
                            <SolutionCard key={solution.slug} solution={solution} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <section data-testid="why-cyber-security-matters" className="relative overflow-hidden border-y border-navy-900/10 bg-white py-24 lg:py-32">
                <span className="pointer-events-none absolute -top-8 right-4 select-none font-display text-[10rem] font-extrabold leading-none text-navy-900/[0.04] lg:text-[16rem]" aria-hidden="true">03</span>
                <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs tracking-[0.25em] text-cyan-600">03</span>
                            <span className="h-px w-10 bg-cyan-500/50" aria-hidden="true" />
                            <p className="overline">Why Cyber Security Matters</p>
                        </div>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
                            Why Cyber Security Matters
                        </h2>
                        <div className="relative mt-7 pl-6">
                            <motion.span
                                className="absolute left-0 top-0 h-full w-0.5 origin-top bg-cyan-500"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                aria-hidden="true"
                            />
                            <WordReveal
                                text="Cyber threats are evolving rapidly. Proactive prevention is always more effective and cost-efficient than recovery"
                                className="font-display text-xl font-medium leading-relaxed text-navy-800 sm:text-2xl"
                            />
                        </div>
                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            Security is no longer an IT checkbox — it is a business strategy. Organizations that invest in proactive protection operate with greater confidence, earn deeper trust, and move faster than those forced to react.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15} className="relative">
                        <div className="relative mx-auto max-w-md border border-navy-900/10 bg-slate-50 p-10">
                            <div className="float-soft">
                                <ShieldMark className="w-full" />
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                                {["Detect", "Prevent", "Respond"].map((label) => (
                                    <div key={label} className="border border-navy-900/10 bg-white px-2 py-3">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-600">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section data-testid="our-approach" className="bg-slate-50 py-24 lg:py-32">
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
