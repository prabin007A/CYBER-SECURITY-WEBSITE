"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, ChevronLeft, ChevronRight, Info } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal, Stagger } from "@/components/Reveal";
import { BlogCard } from "@/components/Cards";
import CTABand from "@/components/CTABand";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/content";

const PAGE_SIZE = 6;

export default function BlogView() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return BLOG_POSTS.filter((p) => {
            const matchesCategory = category === "All" || p.category === category;
            const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
            return matchesCategory && matchesQuery;
        });
    }, [query, category]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pagePosts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const showFeatured = currentPage === 1 && category === "All" && !query.trim() && filtered.length > 0;
    const featured = showFeatured ? pagePosts[0] : null;
    const gridPosts = showFeatured ? pagePosts.slice(1) : pagePosts;

    const selectCategory = (c: string) => { setCategory(c); setPage(1); };
    const search = (v: string) => { setQuery(v); setPage(1); };

    return (
        <>
            <PageHero
                overline="Blog"
                title="Insights & Perspectives"
                description="Thinking on cybersecurity, cloud, AI, IT, and digital transformation — written for leaders building secure, future-ready organizations."
                seed={53}
            />

            <section data-testid="blog-listing" className="bg-command-950 py-20 lg:py-28">
                <div className="container-x">
                    <Reveal className="flex items-start gap-3 border border-blue-600/20 bg-blue-600/5 p-4">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                        <p className="text-xs leading-relaxed text-slate-400">
                            Articles shown are clearly-labeled demo content for preview purposes. Official MITS publications will appear here once released.
                        </p>
                    </Reveal>

                    <Reveal delay={0.08} className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-md">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                            <input
                                type="search"
                                data-testid="blog-search-input"
                                value={query}
                                onChange={(e) => search(e.target.value)}
                                placeholder="Search articles…"
                                aria-label="Search articles"
                                className="w-full border border-white/12 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-400 transition-colors focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt/30"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                            {BLOG_CATEGORIES.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    data-testid={`blog-filter-${c.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                    onClick={() => selectCategory(c)}
                                    aria-pressed={category === c}
                                    className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                                        category === c
                                            ? "border-navy-900 bg-command-950 text-white"
                                            : "border-white/12 bg-white/[0.03] text-slate-400 hover:border-cobalt/60 hover:text-slate-100"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    {featured && (
                        <Reveal delay={0.1} className="mt-12">
                            <Link
                                href={`/blog/${featured.slug}`}
                                data-testid={`blog-featured-${featured.slug}`}
                                className="group grid overflow-hidden border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-cobalt/50 hover:shadow-[0_24px_60px_rgba(30,80,255,0.22)] lg:grid-cols-2"
                            >
                                <div className="relative flex min-h-[240px] items-end overflow-hidden bg-command-950 p-8">
                                    <div className="glow-drift absolute -left-12 -top-12 h-64 w-64 rounded-full bg-cobalt/25 blur-3xl" aria-hidden="true" />
                                    <div className="glow-drift absolute -bottom-16 -right-10 h-60 w-60 rounded-full bg-blue-600/25 blur-3xl" style={{ animationDelay: "4s" }} aria-hidden="true" />
                                    <span className="relative z-10 border border-cyan-400/40 bg-navy-950/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                                        Featured · {featured.category}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center p-8 lg:p-12">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                        {new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · Demo content
                                    </p>
                                    <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-blue-600 sm:text-3xl">
                                        {featured.title}
                                    </h2>
                                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{featured.excerpt}</p>
                                    <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-blue-600">
                                        Read Article
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    )}

                    {gridPosts.length > 0 ? (
                        <Stagger key={`${category}-${query}-${currentPage}`} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {gridPosts.map((post, i) => (
                                <BlogCard key={post.slug} post={post} index={i} />
                            ))}
                        </Stagger>
                    ) : (
                        !featured && (
                            <div data-testid="blog-empty-state" className="mt-12 border border-white/10 bg-white/[0.03] p-16 text-center">
                                <p className="font-display text-xl font-bold text-slate-100">No articles found</p>
                                <p className="mt-2 text-sm text-slate-400">Try a different search term or category.</p>
                            </div>
                        )
                    )}

                    {totalPages > 1 && (
                        <nav data-testid="blog-pagination" className="mt-14 flex items-center justify-center gap-3" aria-label="Blog pagination">
                            <button
                                type="button"
                                data-testid="blog-prev-page"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                                className="flex h-11 w-11 items-center justify-center border border-white/12 bg-white/[0.03] text-slate-100 transition-colors hover:border-cobalt/60 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    data-testid={`blog-page-${p}`}
                                    onClick={() => setPage(p)}
                                    aria-current={p === currentPage ? "page" : undefined}
                                    className={`h-11 w-11 border font-mono text-sm transition-colors ${
                                        p === currentPage
                                            ? "border-navy-900 bg-command-950 text-white"
                                            : "border-white/12 bg-white/[0.03] text-slate-100 hover:border-cobalt/60"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                type="button"
                                data-testid="blog-next-page"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                                className="flex h-11 w-11 items-center justify-center border border-white/12 bg-white/[0.03] text-slate-100 transition-colors hover:border-cobalt/60 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </nav>
                    )}
                </div>
            </section>

            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text="Have a topic you'd like us to cover, or a challenge you're facing? Start the conversation."
                ctaLabel="Talk to Us"
            />
        </>
    );
}
