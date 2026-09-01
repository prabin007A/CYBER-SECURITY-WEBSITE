import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import CtaButton from "../components/CtaButton";
import { SectionHeader, Reveal, Stagger } from "../components/Reveal";
import { CapabilityCard } from "../components/Cards";
import CTABand from "../components/CTABand";
import { ShieldMark } from "../components/NetworkVisual";
import { CYBER_CAPABILITIES, APPROACH_STEPS } from "../data/content";
import { Check } from "lucide-react";

const BENEFITS = [
    "Reduced risk of disruption, data loss, and downtime",
    "Continuous visibility across your digital environment",
    "Faster detection and structured response when incidents occur",
    "Security practices aligned with your business objectives",
    "A stronger foundation for digital transformation",
];

export default function CyberSecurityServices() {
    return (
        <>
            <Seo
                title="Cyber Security Services | MITS"
                description="Proactive threat detection, prevention, and rapid response solutions from MITS."
            />
            <PageHero
                overline="Cyber Security Services"
                title="Proactive Security for a Rapidly Evolving Threat Landscape"
                description="Proactive threat detection, prevention, and rapid response solutions — built to protect your business, your data, and your reputation."
                seed={41}
            >
                <CtaButton to="/contact" variant="primary" testId="cyber-hero-cta">Request Consultation</CtaButton>
            </PageHero>

            <section data-testid="cyber-overview" className="bg-white py-24 lg:py-32">
                <div className="container-x grid items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <SectionHeader
                            index="01"
                            overline="Overview"
                            title="Defense Built Around Your Business"
                        />
                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            Cybersecurity works best when it is proactive, layered, and aligned with how your organization actually operates. Our services focus on understanding your environment, reducing exposure, and building the capability to detect and respond before threats become incidents.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            From continuous monitoring to structured incident response, every capability is designed to keep your business secure, compliant, and confidently moving forward.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="relative border border-navy-900/10 bg-slate-50 p-10">
                            <div className="float-soft mx-auto max-w-sm">
                                <ShieldMark className="w-full" />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section data-testid="cyber-capabilities" className="bg-slate-50 py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="02"
                        overline="Capabilities"
                        title="Security Capabilities"
                        description="A complete defensive capability set — from prevention to response."
                    />
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {CYBER_CAPABILITIES.map((cap, i) => (
                            <CapabilityCard key={cap.title} capability={cap} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <section data-testid="cyber-benefits" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
                <div className="container-x grid items-center gap-14 lg:grid-cols-2">
                    <SectionHeader
                        index="03"
                        overline="Benefits"
                        title="What Proactive Security Delivers"
                        dark
                    />
                    <Stagger className="space-y-4">
                        {BENEFITS.map((benefit) => (
                            <div key={benefit} className="flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-cyan-400/40">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-cyan-500/15 text-cyan-400">
                                    <Check className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <p className="text-sm leading-relaxed text-slate-300">{benefit}</p>
                            </div>
                        ))}
                    </Stagger>
                </div>
                <div className="container-x relative z-10 mt-20">
                    <Reveal>
                        <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
                            Our security approach: {APPROACH_STEPS.map((s) => s.title).join(" – ")}
                        </p>
                    </Reveal>
                </div>
            </section>

            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text="Talk to us about building a proactive, resilient security posture for your organization."
                ctaLabel="Schedule a Consultation"
            />
        </>
    );
}
