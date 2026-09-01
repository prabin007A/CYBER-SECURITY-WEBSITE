import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { SectionHeader, Reveal, Stagger } from "../components/Reveal";
import { ValueCard } from "../components/Cards";
import ProcessTimeline from "../components/ProcessTimeline";
import CTABand from "../components/CTABand";
import NetworkVisual, { ShieldMark } from "../components/NetworkVisual";
import { VALUES, METHODOLOGY_STEPS, WHY_CHOOSE_CAPABILITIES } from "../data/content";

export default function About() {
    return (
        <>
            <Seo
                title="About MITS | Technology That Protects. Solutions That Perform."
                description="MITS is an IT solutions and cybersecurity company focused on building secure, resilient, and future-ready digital environments."
            />
            <PageHero
                overline="About MITS"
                title="Technology That Protects. Solutions That Perform."
                description="We help businesses navigate the digital landscape with secure, intelligent, and scalable IT solutions. From cybersecurity and cloud to infrastructure, automation, and managed operations, we deliver technology designed around your business needs."
                seed={17}
            />

            <section data-testid="about-we-are" className="bg-white py-24 lg:py-32">
                <div className="container-x grid items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs tracking-[0.25em] text-cyan-600">01</span>
                            <span className="h-px w-10 bg-cyan-500/50" aria-hidden="true" />
                            <p className="overline">Who We Are</p>
                        </div>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
                            We Are
                        </h2>
                        <p className="mt-7 font-display text-xl font-medium leading-relaxed text-navy-800 sm:text-2xl">
                            An IT solutions and cybersecurity company focused on building secure, resilient, and future-ready digital environments.
                        </p>
                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            By combining technology expertise with a business-focused approach, we help organizations improve performance, reduce risk, and embrace digital transformation with confidence.
                        </p>
                    </Reveal>
                    <Reveal delay={0.15} className="relative">
                        <div className="relative overflow-hidden border border-navy-900/10 bg-navy-900 p-10">
                            <NetworkVisual density={14} seed={29} className="absolute inset-0 h-full w-full opacity-40" />
                            <ShieldMark className="relative z-10 mx-auto w-56 float-soft" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section data-testid="about-mission-vision" className="bg-slate-50 py-24 lg:py-32">
                <div className="container-x grid gap-6 lg:grid-cols-2">
                    <Reveal className="h-full">
                        <div data-testid="mission-card" className="group h-full border border-navy-900/10 bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(11,17,32,0.10)] lg:p-12">
                            <div className="flex items-center justify-between">
                                <p className="overline">Mission</p>
                                <span className="font-display text-5xl font-extrabold text-navy-900/[0.07]">02</span>
                            </div>
                            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">Mission</h2>
                            <p className="mt-5 text-base leading-relaxed text-slate-600">
                                To empower businesses with secure, reliable, and innovative technology that simplifies operations, reduces risk, and drives sustainable growth.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.12} className="h-full">
                        <div data-testid="vision-card" className="group h-full border border-navy-900/10 bg-navy-900 p-10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 lg:p-12">
                            <div className="flex items-center justify-between">
                                <p className="overline">Vision</p>
                                <span className="font-display text-5xl font-extrabold text-white/[0.07]">03</span>
                            </div>
                            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">Vision</h2>
                            <p className="mt-5 text-base leading-relaxed text-slate-400">
                                To be a trusted technology partner, enabling organizations to grow securely and confidently in a rapidly evolving digital world.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section data-testid="about-values" className="bg-white py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="04"
                        overline="Values"
                        title="Values"
                        description="We believe in building lasting partnerships through transparency, continuous innovation, and a commitment to delivering meaningful business value."
                    />
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {VALUES.map((value, i) => (
                            <ValueCard key={value.name} value={value} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <section data-testid="about-why-choose-us" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
                <NetworkVisual density={12} seed={33} className="absolute inset-0 h-full w-full opacity-15" />
                <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-2">
                    <SectionHeader
                        index="05"
                        overline="Why Choose Us?"
                        title="One Partner. Multiple Technology Capabilities."
                        description="We bring IT, cybersecurity, cloud, infrastructure, and digital solutions together to simplify technology management and create a secure, connected, and resilient business environment."
                        dark
                    />
                    <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {WHY_CHOOSE_CAPABILITIES.map((cap) => {
                            const Icon = cap.icon;
                            return (
                                <div key={cap.name} data-testid={`capability-${cap.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="group flex flex-col items-center gap-3 border border-white/10 bg-white/[0.03] px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                                    <span className="flex h-11 w-11 items-center justify-center border border-cyan-400/30 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-navy-900">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <span className="font-display text-sm font-semibold text-slate-200">{cap.name}</span>
                                </div>
                            );
                        })}
                    </Stagger>
                </div>
            </section>

            <section data-testid="about-methodology" className="bg-slate-50 py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="06"
                        overline="Methodology"
                        title="Understand. Strategize. Implement. Evolve."
                        description="We understand your business, identify your challenges, and design solutions that are practical, scalable, secure, and aligned with your long-term goals."
                    />
                    <div className="mt-16">
                        <ProcessTimeline steps={METHODOLOGY_STEPS} />
                    </div>
                </div>
            </section>

            <CTABand
                heading="Secure Today. Prepare for Tomorrow."
                text="Build a stronger, smarter, and more resilient digital future with technology solutions designed around your business"
                ctaLabel="Talk to Us"
            />
        </>
    );
}
