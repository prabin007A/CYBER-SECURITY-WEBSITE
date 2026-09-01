"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StaggerItem } from "./Reveal";
import { TiltCard } from "./Motion";
import type { Solution, Industry, Value, Capability, BlogPost } from "@/data/content";

export const ACCENTS = [
    {
        icon: "border-cobalt/40 bg-cobalt/10 text-cobalt-soft group-hover:bg-cobalt group-hover:text-white",
        link: "text-cobalt-soft",
        hover: "hover:border-cobalt/60 hover:shadow-[0_24px_60px_-15px_rgba(30,80,255,0.45)]",
        badge: "border-cobalt/40 text-cobalt-soft",
        orbA: "bg-cobalt/40",
        orbB: "bg-signal/25",
    },
    {
        icon: "border-crimson/40 bg-crimson/10 text-crimson group-hover:bg-crimson group-hover:text-white",
        link: "text-crimson",
        hover: "hover:border-crimson/60 hover:shadow-[0_24px_60px_-15px_rgba(255,46,76,0.4)]",
        badge: "border-crimson/40 text-crimson",
        orbA: "bg-crimson/35",
        orbB: "bg-cobalt/30",
    },
    {
        icon: "border-signal/40 bg-signal/10 text-signal group-hover:bg-signal group-hover:text-command-900",
        link: "text-signal",
        hover: "hover:border-signal/60 hover:shadow-[0_24px_60px_-15px_rgba(0,240,255,0.35)]",
        badge: "border-signal/40 text-signal",
        orbA: "bg-signal/30",
        orbB: "bg-cobalt/30",
    },
    {
        icon: "border-violet-400/40 bg-violet-400/10 text-violet-300 group-hover:bg-violet-400 group-hover:text-command-900",
        link: "text-violet-300",
        hover: "hover:border-violet-400/60 hover:shadow-[0_24px_60px_-15px_rgba(139,92,246,0.4)]",
        badge: "border-violet-400/40 text-violet-300",
        orbA: "bg-violet-500/35",
        orbB: "bg-crimson/25",
    },
    {
        icon: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-command-900",
        link: "text-emerald-300",
        hover: "hover:border-emerald-400/60 hover:shadow-[0_24px_60px_-15px_rgba(16,185,129,0.38)]",
        badge: "border-emerald-400/40 text-emerald-300",
        orbA: "bg-emerald-500/30",
        orbB: "bg-signal/25",
    },
];

export const accentAt = (index = 0) => ACCENTS[((index % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];

const CARD_BASE = "card-sheen glow-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-command-800/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5";

export const SolutionCard = ({ solution, index = 0 }: { solution: Solution; index?: number }) => {
    const Icon = solution.icon;
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <TiltCard>
                <Link
                    href={`/solutions/${solution.slug}`}
                    data-testid={`solution-card-${solution.slug}`}
                    className={`${CARD_BASE} p-8 ${a.hover}`}
                >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 ${a.icon}`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">{solution.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{solution.description}</p>
                    <span className={`mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold ${a.link}`}>
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                </Link>
            </TiltCard>
        </StaggerItem>
    );
};

export const IndustryCard = ({ industry, index = 0 }: { industry: Industry; index?: number }) => {
    const Icon = industry.icon;
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <TiltCard max={7}>
                <Link
                    href="/industries"
                    data-testid={`industry-card-${industry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className={`${CARD_BASE} p-7 ${a.hover}`}
                >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${a.icon}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white">{industry.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{industry.description}</p>
                    <span className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${a.link}`}>
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                </Link>
            </TiltCard>
        </StaggerItem>
    );
};

export const ValueCard = ({ value, index }: { value: Value; index: number }) => {
    const Icon = value.icon;
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <div data-testid={`value-card-${value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={`${CARD_BASE} items-start p-7 ${a.hover}`}>
                <div className="flex w-full items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${a.icon}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{value.name}</h3>
            </div>
        </StaggerItem>
    );
};

export const CapabilityCard = ({ capability, index = 0 }: { capability: Capability; dark?: boolean; index?: number }) => {
    const Icon = capability.icon;
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <div
                data-testid={`capability-card-${capability.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className={`${CARD_BASE} p-8 ${a.hover}`}
            >
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300 ${a.icon}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-white">{capability.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{capability.description}</p>
            </div>
        </StaggerItem>
    );
};

export const BlogCard = ({ post, index = 0 }: { post: BlogPost; index?: number }) => {
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <Link
                href={`/blog/${post.slug}`}
                data-testid={`blog-card-${post.slug}`}
                className={`${CARD_BASE} ${a.hover}`}
            >
                <div className="relative flex h-40 items-end overflow-hidden bg-command-950 p-5">
                    <div className="absolute inset-0 grid-texture opacity-30" aria-hidden="true" />
                    <div className="absolute inset-0 opacity-50">
                        <div className={`glow-drift absolute -left-10 -top-10 h-48 w-48 rounded-full blur-3xl ${a.orbA}`} />
                        <div className={`glow-drift absolute -bottom-12 -right-8 h-44 w-44 rounded-full blur-3xl ${a.orbB}`} style={{ animationDelay: "4s" }} />
                    </div>
                    <span className={`relative z-10 rounded-full border bg-command-950/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] ${a.badge}`}>
                        {post.category}
                    </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · Demo content
                    </p>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-cobalt-soft">
                        {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                    <span className={`mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold ${a.link}`}>
                        Read Article
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                </div>
            </Link>
        </StaggerItem>
    );
};
