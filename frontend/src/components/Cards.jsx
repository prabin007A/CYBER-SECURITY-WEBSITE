import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StaggerItem } from "./Reveal";

export const SolutionCard = ({ solution }) => {
    const Icon = solution.icon;
    return (
        <StaggerItem className="h-full">
            <Link
                to={`/solutions/${solution.slug}`}
                data-testid={`solution-card-${solution.slug}`}
                className="group flex h-full flex-col border border-navy-900/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(11,17,32,0.10)]"
            >
                <span className="flex h-12 w-12 items-center justify-center border border-cyan-500/30 bg-cyan-500/5 text-cyan-600 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-navy-900">{solution.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{solution.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-blue-600">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
            </Link>
        </StaggerItem>
    );
};

export const IndustryCard = ({ industry }) => {
    const Icon = industry.icon;
    return (
        <StaggerItem className="h-full">
            <Link
                to="/industries"
                data-testid={`industry-card-${industry.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="group flex h-full flex-col border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
                <span className="flex h-11 w-11 items-center justify-center border border-cyan-400/30 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400 group-hover:text-navy-900">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white">{industry.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{industry.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-400">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
            </Link>
        </StaggerItem>
    );
};

export const ValueCard = ({ value, index }) => {
    const Icon = value.icon;
    return (
        <StaggerItem className="h-full">
            <div data-testid={`value-card-${value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="group flex h-full flex-col items-start border border-navy-900/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_16px_40px_rgba(11,17,32,0.08)]">
                <div className="flex w-full items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center bg-navy-900 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-navy-900">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{value.name}</h3>
            </div>
        </StaggerItem>
    );
};

export const CapabilityCard = ({ capability, dark = false }) => {
    const Icon = capability.icon;
    return (
        <StaggerItem className="h-full">
            <div
                data-testid={`capability-card-${capability.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className={`group h-full border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    dark
                        ? "border-white/10 bg-white/[0.03] hover:border-cyan-400/40"
                        : "border-navy-900/10 bg-white hover:border-cyan-500/50 hover:shadow-[0_16px_40px_rgba(11,17,32,0.08)]"
                }`}
            >
                <span className={`flex h-12 w-12 items-center justify-center transition-colors duration-300 ${dark ? "border border-cyan-400/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-900" : "border border-cyan-500/30 bg-cyan-500/5 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white"}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={`mt-6 font-display text-lg font-bold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>{capability.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{capability.description}</p>
            </div>
        </StaggerItem>
    );
};

export const BlogCard = ({ post }) => (
    <StaggerItem className="h-full">
        <Link
            to={`/blog/${post.slug}`}
            data-testid={`blog-card-${post.slug}`}
            className="group flex h-full flex-col border border-navy-900/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(11,17,32,0.10)]"
        >
            <div className="relative flex h-40 items-end overflow-hidden bg-navy-900 p-5">
                <div className="absolute inset-0 opacity-40">
                    <div className="glow-drift absolute -left-10 -top-10 h-48 w-48 rounded-full bg-cyan-500/30 blur-3xl" />
                    <div className="glow-drift absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-blue-600/30 blur-3xl" style={{ animationDelay: "4s" }} />
                </div>
                <span className="relative z-10 border border-cyan-400/40 bg-navy-950/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
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
                <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-blue-600">
                    Read Article
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
            </div>
        </Link>
    </StaggerItem>
);
