import { Hexagon, ArrowUpRight } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { SectionHeader, Reveal, Stagger, StaggerItem } from "../components/Reveal";
import CTABand from "../components/CTABand";
import { PARTNERS } from "../data/content";

const SLOTS = Array.from({ length: 6 }, (_, i) => i + 1);

const PARTNER_HOVERS = [
    "hover:border-cyan-500/60 hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]",
    "hover:border-violet-500/60 hover:shadow-[0_20px_50px_rgba(139,92,246,0.18)]",
    "hover:border-emerald-500/60 hover:shadow-[0_20px_50px_rgba(16,185,129,0.18)]",
    "hover:border-amber-500/60 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]",
    "hover:border-rose-500/60 hover:shadow-[0_20px_50px_rgba(244,63,94,0.18)]",
];
const PARTNER_TEXT_HOVERS = [
    "group-hover:text-cyan-300",
    "group-hover:text-violet-300",
    "group-hover:text-emerald-300",
    "group-hover:text-amber-300",
    "group-hover:text-rose-300",
];

const PartnerCard = ({ partner, index = 0 }) => {
    const inner = (
        <>
            <div className="flex h-24 items-center justify-center border-b border-navy-900/10 bg-navy-900 px-6 transition-colors duration-300 group-hover:bg-navy-800">
                {partner.logo ? (
                    <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" className="max-h-12 w-auto object-contain" />
                ) : (
                    <span className={`text-center font-display text-xl font-extrabold tracking-tight text-slate-200 transition-colors duration-300 ${PARTNER_TEXT_HOVERS[index % 5]}`}>
                        {partner.name}
                    </span>
                )}
            </div>
            <div className="p-6">
                {partner.logo && <h3 className="font-display text-lg font-bold text-navy-900">{partner.name}</h3>}
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{partner.description}</p>
                {partner.url && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                        Visit partner <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                )}
            </div>
        </>
    );
    const cls = `card-sheen group block h-full border border-navy-900/10 bg-white text-left transition-all duration-300 hover:-translate-y-1 ${PARTNER_HOVERS[index % 5]}`;
    return (
        <StaggerItem className="h-full">
            {partner.url ? (
                <a href={partner.url} target="_blank" rel="noopener noreferrer" data-testid={`partner-card-${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={cls}>
                    {inner}
                </a>
            ) : (
                <div data-testid={`partner-card-${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={cls}>
                    {inner}
                </div>
            )}
        </StaggerItem>
    );
};

export default function Partners() {
    const hasPartners = PARTNERS.length > 0;
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
                        description={
                            hasPartners
                                ? "We work with leading technology providers to bring proven platforms and tools into every solution we deliver."
                                : "We work with leading technology providers to bring proven platforms and tools into every solution we deliver. Our official partner roster will be published here soon."
                        }
                    />
                    {hasPartners ? (
                        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            {PARTNERS.map((partner, i) => (
                                <PartnerCard key={partner.name} partner={partner} index={i} />
                            ))}
                        </Stagger>
                    ) : (
                        <>
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
                        </>
                    )}
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
