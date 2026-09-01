"use client";

import { MessageSquare, ClipboardCheck, PhoneCall } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { CONTACT_PLACEHOLDER_NOTE } from "@/data/content";

const NEXT_STEPS = [
    { icon: MessageSquare, title: "Tell us your goals", text: "Share your technology and cybersecurity requirements through the form." },
    { icon: ClipboardCheck, title: "We review & prepare", text: "Our team reviews your request and prepares for a focused conversation." },
    { icon: PhoneCall, title: "Consultation", text: "We connect to discuss your environment and the right path forward." },
];

export default function ContactView() {
    return (
        <>
            <PageHero
                overline="Contact"
                title="Talk to Us"
                description="Whether you're strengthening security, modernizing infrastructure, or planning your next phase of digital transformation — let's discuss your technology and cybersecurity requirements."
                seed={61}
            />

            <section data-testid="contact-section" className="bg-command-950 py-24 lg:py-32">
                <div className="container-x grid gap-14 lg:grid-cols-5">
                    <Reveal className="lg:col-span-3">
                        <div className="border border-white/10 bg-white/[0.03] p-8 lg:p-12">
                            <p className="overline">Request Consultation</p>
                            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                                Start the Conversation
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                Fields marked <span className="text-signal">*</span> are required.
                            </p>
                            <div className="mt-8">
                                <ContactForm />
                            </div>
                        </div>
                    </Reveal>

                    <div className="lg:col-span-2">
                        <Stagger className="space-y-5">
                            {NEXT_STEPS.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <StaggerItem key={step.title}>
                                        <div data-testid={`contact-step-${i + 1}`} className="border border-white/10 bg-white/[0.03] p-7">
                                            <div className="flex items-center gap-4">
                                                <span className="flex h-11 w-11 items-center justify-center bg-command-950 text-cyan-400">
                                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                <div>
                                                    <span className="font-mono text-[11px] tracking-[0.2em] text-signal">STEP 0{i + 1}</span>
                                                    <h3 className="font-display text-base font-bold text-slate-100">{step.title}</h3>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm leading-relaxed text-slate-400">{step.text}</p>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                            <StaggerItem>
                                <div className="border border-dashed border-white/15 bg-white/[0.03] p-7">
                                    <p className="overline">Direct Contact</p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{CONTACT_PLACEHOLDER_NOTE}</p>
                                </div>
                            </StaggerItem>
                        </Stagger>
                    </div>
                </div>
            </section>
        </>
    );
}
