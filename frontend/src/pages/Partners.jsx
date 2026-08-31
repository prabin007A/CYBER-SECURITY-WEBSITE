import { Hexagon } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { SectionHeader, Reveal, Stagger, StaggerItem } from "../components/Reveal";
import CTABand from "../components/CTABand";

const SLOTS = Array.from({ length: 6 }, (_, i) => i + 1);

export default function Partners() {
    return (
        <>
            <Seo
                title="Technology Partners | MITS"
                description="Technology partnerships that help MITS deliver secure and scalable solutions."
            />
            <PageHero
                overline="Technology Partners"
                title="Stronger Together"
                description="Technology partnerships that help us deliver secure and scalable solutions."
                seed={43}
            />
            <section data-testid="partners-section" className="bg-slate-50 py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="01"
                        overline="Ecosystem"
                        title="Our Partner Ecosystem"
                        description="We work with leading technology providers to bring proven platforms and tools into every solution we deliver. Our official partner roster will be published here soon."
                    />
                    <Stagger className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                        {SLOTS.map((slot) => (
                            <StaggerItem key={slot}>
                                <div
                                    data-testid={`partner-slot-${slot}`}
                                    className="flex aspect-[3/2] flex-col items-center justify-center gap-2 border border-dashed border-navy-900/20 bg-white text-slate-400 transition-colors duration-300 hover:border-cyan-500/50 hover:text-cyan-600"
                                >
                                    <Hexagon className="h-6 w-6" aria-hidden="true" />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Partner {String(slot).padStart(2, "0")}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                    <Reveal className="mt-10">
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                            These spaces are reserved for our official technology partners. Logos and partner details will be added once announced.
                        </p>
                    </Reveal>
                </div>
            </section>
            <CTABand
                heading="Interested in Partnering With MITS?"
                text="Let's explore how we can deliver secure, scalable solutions together."
                ctaLabel="Talk to Us"
            />
        </>
    );
}
