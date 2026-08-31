import { Reveal } from "./Reveal";
import CtaButton from "./CtaButton";
import NetworkVisual from "./NetworkVisual";

export default function CTABand({ heading = "Secure Today. Prepare for Tomorrow", text, ctaLabel = "Schedule a Consultation", ctaTo = "/contact" }) {
    return (
        <section data-testid="cta-band" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
            <NetworkVisual density={14} seed={21} className="absolute inset-0 h-full w-full opacity-30" />
            <div className="glow-drift absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" aria-hidden="true" />
            <div className="container-x relative z-10">
                <Reveal className="max-w-3xl">
                    <p className="overline">Ready When You Are</p>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {heading}
                    </h2>
                    {text && <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">{text}</p>}
                    <div className="mt-9">
                        <CtaButton to={ctaTo} variant="primary" testId="cta-band-button">{ctaLabel}</CtaButton>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
