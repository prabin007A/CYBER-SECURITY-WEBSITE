"use client";

import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export default function LegalView({ kind }: { kind: "privacy" | "terms" }) {
    const isPrivacy = kind === "privacy";
    const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";
    return (
        <>
            <PageHero overline="Legal" title={title} seed={77} />
            <section className="bg-command-900 py-20 lg:py-28">
                <div className="container-x max-w-3xl">
                    <Reveal>
                        <div data-testid="legal-placeholder" className="border border-dashed border-white/15 bg-white/[0.05] p-10">
                            <p className="font-display text-lg font-bold text-slate-100">Content to be published</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                The official {isPrivacy ? "privacy policy" : "terms and conditions"} for MITS will be published on this page once approved legal text is available. This page structure is ready for that content.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
