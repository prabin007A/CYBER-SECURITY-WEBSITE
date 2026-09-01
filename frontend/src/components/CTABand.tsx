"use client";

import { Reveal } from "./Reveal";
import CtaButton from "./CtaButton";
import NetworkVisual from "./NetworkVisual";

interface CTABandProps {
    heading?: string;
    text?: string;
    ctaLabel?: string;
    ctaTo?: string;
}

export default function CTABand({ heading = "Secure Today. Prepare for Tomorrow", text, ctaLabel = "Schedule a Consultation", ctaTo = "/contact" }: CTABandProps) {
    return (
        <section data-testid="cta-band" className="relative overflow-hidden bg-command-950 py-24 lg:py-32">
            <div className="grid-texture grid-texture-fade absolute inset-0 opacity-60" aria-hidden="true" />
            <NetworkVisual density={14} seed={21} className="absolute inset-0 h-full w-full opacity-25" />
            <div className="glow-drift absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-cobalt/15 blur-3xl" aria-hidden="true" />
            <div className="glow-drift absolute -bottom-20 left-[8%] h-72 w-72 rounded-full bg-crimson/15 blur-[110px]" style={{ animationDelay: "4s" }} aria-hidden="true" />
            <div className="glow-drift absolute top-[30%] left-[45%] h-56 w-56 rounded-full bg-signal/10 blur-[100px]" style={{ animationDelay: "7s" }} aria-hidden="true" />
            <div className="container-x relative z-10">
                <Reveal className="max-w-3xl">
                    <p className="overline">Ready When You Are</p>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        <span className="bg-gradient-to-r from-white via-cobalt-soft to-crimson bg-clip-text text-transparent">{heading}</span>
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
