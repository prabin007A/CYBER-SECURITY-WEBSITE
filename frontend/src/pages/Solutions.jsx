import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { SectionHeader, Stagger } from "../components/Reveal";
import { SolutionCard } from "../components/Cards";
import CTABand from "../components/CTABand";
import { SOLUTIONS } from "../data/content";

export default function Solutions() {
    return (
        <>
            <Seo
                title="Solutions | MITS"
                description="Cyber defense, governance risk & compliance, cybersecurity, AR/VR, AI for business, and cloud solutions from MITS."
            />
            <PageHero
                overline="Solutions"
                title="Integrated Technology Solutions"
                description="Six capability areas that work together to make your organization more secure, more intelligent, and ready to scale."
                seed={23}
            />
            <section data-testid="solutions-grid" className="bg-slate-50 py-24 lg:py-32">
                <div className="container-x">
                    <SectionHeader
                        index="01"
                        overline="Our Solutions"
                        title="Explore Each Capability"
                        description="Select a solution to learn more about how it works and what it can do for your business."
                    />
                    <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {SOLUTIONS.map((solution, i) => (
                            <SolutionCard key={solution.slug} solution={solution} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>
            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text="Not sure where to start? Let's discuss your environment and design the right combination of solutions."
                ctaLabel="Schedule a Consultation"
            />
        </>
    );
}
