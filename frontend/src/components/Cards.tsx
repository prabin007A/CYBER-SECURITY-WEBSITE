"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StaggerItem } from "./Reveal";
import { TiltCard } from "./Motion";
import type { Solution, Industry, Value, Capability, BlogPost } from "@/data/content";

export const ACCENTS = [
    {
        iconLight: "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white",
        iconDark: "border-cyan-400/40 bg-cyan-400/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-900",
        linkLight: "text-cyan-600",
        linkDark: "text-cyan-400",
        hoverLight: "hover:border-cyan-500/60 hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]",
        hoverDark: "hover:border-cyan-400/50 hover:shadow-[0_0_36px_rgba(6,182,212,0.16)]",
        badge: "border-cyan-400/40 text-cyan-300",
        orbA: "bg-cyan-500/30",
        orbB: "bg-blue-600/30",
    },
    {
        iconLight: "border-violet-500/30 bg-violet-500/10 text-violet-600 group-hover:bg-violet-500 group-hover:text-white",
        iconDark: "border-violet-400/40 bg-violet-400/10 text-violet-400 group-hover:bg-violet-400 group-hover:text-navy-900",
        linkLight: "text-violet-600",
        linkDark: "text-violet-400",
        hoverLight: "hover:border-violet-500/60 hover:shadow-[0_20px_50px_rgba(139,92,246,0.18)]",
        hoverDark: "hover:border-violet-400/50 hover:shadow-[0_0_36px_rgba(139,92,246,0.18)]",
        badge: "border-violet-400/40 text-violet-300",
        orbA: "bg-violet-500/30",
        orbB: "bg-fuchsia-600/30",
    },
    {
        iconLight: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
        iconDark: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-navy-900",
        linkLight: "text-emerald-600",
        linkDark: "text-emerald-400",
        hoverLight: "hover:border-emerald-500/60 hover:shadow-[0_20px_50px_rgba(16,185,129,0.18)]",
        hoverDark: "hover:border-emerald-400/50 hover:shadow-[0_0_36px_rgba(16,185,129,0.16)]",
        badge: "border-emerald-400/40 text-emerald-300",
        orbA: "bg-emerald-500/30",
        orbB: "bg-teal-600/30",
    },
    {
        iconLight: "border-amber-500/30 bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
        iconDark: "border-amber-400/40 bg-amber-400/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-navy-900",
        linkLight: "text-amber-600",
        linkDark: "text-amber-400",
        hoverLight: "hover:border-amber-500/60 hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)]",
        hoverDark: "hover:border-amber-400/50 hover:shadow-[0_0_36px_rgba(245,158,11,0.16)]",
        badge: "border-amber-400/40 text-amber-300",
        orbA: "bg-amber-500/30",
        orbB: "bg-orange-600/30",
    },
    {
        iconLight: "border-rose-500/30 bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
        iconDark: "border-rose-400/40 bg-rose-400/10 text-rose-400 group-hover:bg-rose-400 group-hover:text-navy-900",
        linkLight: "text-rose-600",
        linkDark: "text-rose-400",
        hoverLight: "hover:border-rose-500/60 hover:shadow-[0_20px_50px_rgba(244,63,94,0.18)]",
        hoverDark: "hover:border-rose-400/50 hover:shadow-[0_0_36px_rgba(244,63,94,0.16)]",
        badge: "border-rose-400/40 text-rose-300",
        orbA: "bg-rose-500/30",
        orbB: "bg-pink-600/30",
    },
];

export const accentAt = (index = 0) => ACCENTS[((index % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];

export const SolutionCard = ({ solution, index = 0 }: { solution: Solution; index?: number }) => {
    const Icon = solution.icon;
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <TiltCard>
                <Link
                    href={`/solutions/${solution.slug}`}
                    data-testid={`solution-card-${solution.slug}`}
                    className={`card-sheen group flex h-full flex-col border border-navy-900/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${a.hoverLight}`}
                >
                    <span className={`flex h-12 w-12 items-center justify-center border transition-colors duration-300 ${a.iconLight}`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-navy-900">{solution.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{solution.description}</p>
                    <span className={`mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold ${a.linkLight}`}>
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
                    className={`card-sheen group flex h-full flex-col border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${a.hoverDark}`}
                >
                    <span className={`flex h-11 w-11 items-center justify-center border transition-colors duration-300 ${a.iconDark}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white">{industry.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{industry.description}</p>
                    <span className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${a.linkDark}`}>
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
            <div data-testid={`value-card-${value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={`card-sheen group flex h-full flex-col items-start border border-navy-900/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 ${a.hoverLight}`}>
                <div className="flex w-full items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center border transition-colors duration-300 ${a.iconLight}`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{value.name}</h3>
            </div>
        </StaggerItem>
    );
};

export const CapabilityCard = ({ capability, dark = false, index = 0 }: { capability: Capability; dark?: boolean; index?: number }) => {
    const Icon = capability.icon;
    const a = accentAt(index);
    return (
        <StaggerItem className="h-full">
            <div
                data-testid={`capability-card-${capability.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className={`card-sheen group h-full border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    dark
                        ? `border-white/10 bg-white/[0.03] ${a.hoverDark}`
                        : `border-navy-900/10 bg-white ${a.hoverLight}`
                }`}
            >
                <span className={`flex h-12 w-12 items-center justify-center border transition-colors duration-300 ${dark ? a.iconDark : a.iconLight}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={`mt-6 font-display text-lg font-bold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>{capability.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{capability.description}</p>
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
                className={`card-sheen group flex h-full flex-col border border-navy-900/10 bg-white transition-all duration-300 hover:-translate-y-1 ${a.hoverLight}`}
            >
                <div className="relative flex h-40 items-end overflow-hidden bg-navy-900 p-5">
                    <div className="absolute inset-0 opacity-40">
                        <div className={`glow-drift absolute -left-10 -top-10 h-48 w-48 rounded-full blur-3xl ${a.orbA}`} />
                        <div className={`glow-drift absolute -bottom-12 -right-8 h-44 w-44 rounded-full blur-3xl ${a.orbB}`} style={{ animationDelay: "4s" }} />
                    </div>
                    <span className={`relative z-10 border bg-navy-950/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] ${a.badge}`}>
                        {post.category}
                    </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · Demo content
                    </p>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-navy-900 transition-colors group-hover:text-blue-600">
                        {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                    <span className={`mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold ${a.linkLight}`}>
                        Read Article
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                </div>
            </Link>
        </StaggerItem>
    );
};
