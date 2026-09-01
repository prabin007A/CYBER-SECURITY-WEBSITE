"use client";

import PageHero from "@/components/PageHero";
import { SectionHeader, Stagger } from "@/components/Reveal";
import { IndustryCard } from "@/components/Cards";
import CTABand from "@/components/CTABand";
import { INDUSTRIES } from "@/data/content";

export default function IndustriesView() {
    return (
        <>
            <PageHero
                overline="Industries"
                title="Who We Protect"
                description="Security and technology expertise applied across the sectors that power the economy — with solutions shaped to each environment's unique demands."
                seed={37}
            />
            <section data-testid="industries-grid" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="01"
                        overline="Sectors"
                        title="Eight Industries. One Standard of Protection."
                        description="Every industry faces its own risks. Our approach adapts to yours."
                        dark
                    />
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {INDUSTRIES.map((industry, i) => (
                            <IndustryCard key={industry.name} industry={industry} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>
            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text="Tell us about your industry and environment — we'll design security and technology solutions around it."
                ctaLabel="Talk to Us"
            />
        </>
    );
}
