import { useParams, Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, Stagger } from "../components/Reveal";
import { SolutionCard } from "../components/Cards";
import CTABand from "../components/CTABand";
import NetworkVisual from "../components/NetworkVisual";
import CtaButton from "../components/CtaButton";
import NotFound from "./NotFound";
import { SOLUTIONS } from "../data/content";

export default function SolutionDetail() {
    const { slug } = useParams();
    const solution = SOLUTIONS.find((s) => s.slug === slug);

    if (!solution) return <NotFound />;

    const Icon = solution.icon;
    const related = SOLUTIONS.filter((s) => s.slug !== slug).slice(0, 3);

    return (
        <>
            <Seo title={`${solution.title} | MITS`} description={solution.description} />
            <section className="relative overflow-hidden bg-navy-900 pb-20 pt-40 lg:pb-28 lg:pt-48">
                <NetworkVisual density={14} seed={51} className="absolute inset-0 h-full w-full opacity-25" />
                <div className="container-x relative z-10">
                    <Reveal>
                        <Link to="/solutions" data-testid="back-to-solutions" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-cyan-400">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All Solutions
                        </Link>
                        <div className="mt-8 flex items-start gap-6">
                            <span className="hidden h-16 w-16 shrink-0 items-center justify-center border border-cyan-400/30 text-cyan-400 sm:flex">
                                <Icon className="h-8 w-8" aria-hidden="true" />
                            </span>
                            <div>
                                <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{solution.title}</h1>
                                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{solution.description}</p>
                            </div>
                        </div>
                        <div className="mt-9">
                            <CtaButton to="/contact" variant="primary" testId="solution-detail-cta">Request Consultation</CtaButton>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section data-testid="solution-overview" className="bg-white py-24 lg:py-32">
                <div className="container-x grid gap-14 lg:grid-cols-2">
                    <Reveal>
                        <p className="overline">Overview</p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900">How It Helps Your Business</h2>
                        <p className="mt-6 text-base leading-relaxed text-slate-600">{solution.overview}</p>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p className="overline">Focus Areas</p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900">What We Focus On</h2>
                        <ul className="mt-6 space-y-4">
                            {solution.focus.map((item) => (
                                <li key={item} className="flex items-start gap-4 border border-navy-900/10 bg-slate-50 p-4">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-cyan-500/10 text-cyan-600">
                                        <Check className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            <section className="bg-slate-50 py-24 lg:py-32">
                <div className="container-x">
                    <Reveal>
                        <p className="overline">Related</p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900">Explore More Solutions</h2>
                    </Reveal>
                    <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {related.map((s, i) => (
                            <SolutionCard key={s.slug} solution={s} index={i} />
                        ))}
                    </Stagger>
                </div>
            </section>

            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text={`Let's discuss how ${solution.title} can support your business goals.`}
                ctaLabel="Schedule a Consultation"
            />
        </>
    );
}
