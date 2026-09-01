"use client";

import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { Reveal, Stagger } from "@/components/Reveal";
import { BlogCard } from "@/components/Cards";
import CTABand from "@/components/CTABand";
import { BLOG_POSTS } from "@/data/content";

export default function BlogArticleView({ slug }: { slug: string }) {
    const post = BLOG_POSTS.find((p) => p.slug === slug)!;
    const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
    const relatedFinal = related.length > 0 ? related : BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

    return (
        <>
            <article data-testid="blog-article">
                <section className="relative overflow-hidden bg-command-950 pb-16 pt-40 lg:pb-24 lg:pt-48">
                    <div className="glow-drift absolute -right-20 top-10 h-72 w-72 rounded-full bg-cobalt/15 blur-3xl" aria-hidden="true" />
                    <div className="container-x relative z-10 max-w-4xl">
                        <Reveal>
                            <Link href="/blog" data-testid="back-to-blog" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-cyan-400">
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All Articles
                            </Link>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <span className="border border-cyan-400/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                                    {post.category}
                                </span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                </span>
                            </div>
                            <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                                {post.title}
                            </h1>
                            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                                By {post.author}
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="bg-command-900 py-16 lg:py-24">
                    <div className="container-x max-w-4xl">
                        {post.demo && (
                            <Reveal className="mb-10 flex items-start gap-3 border border-blue-600/20 bg-blue-600/5 p-4">
                                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                                <p className="text-xs leading-relaxed text-slate-400">
                                    This is a placeholder demo article for preview purposes and is not an official MITS publication.
                                </p>
                            </Reveal>
                        )}
                        <div className="relative mb-12 flex h-56 items-end overflow-hidden bg-command-950 p-8 sm:h-72">
                            <div className="glow-drift absolute -left-12 -top-12 h-64 w-64 rounded-full bg-cobalt/25 blur-3xl" aria-hidden="true" />
                            <div className="glow-drift absolute -bottom-16 -right-10 h-60 w-60 rounded-full bg-blue-600/25 blur-3xl" style={{ animationDelay: "4s" }} aria-hidden="true" />
                        </div>
                        <div className="space-y-6">
                            <p className="font-display text-xl font-medium leading-relaxed text-slate-200">{post.excerpt}</p>
                            {post.body.map((para, i) => (
                                <p key={i} className="text-base leading-relaxed text-slate-400">{para}</p>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-command-950 py-20 lg:py-28">
                    <div className="container-x">
                        <Reveal>
                            <p className="overline">Keep Reading</p>
                            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-100">Related Articles</h2>
                        </Reveal>
                        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                            {relatedFinal.map((p, i) => (
                                <BlogCard key={p.slug} post={p} index={i} />
                            ))}
                        </Stagger>
                    </div>
                </section>
            </article>
            <CTABand
                heading="Secure Today. Prepare for Tomorrow"
                text="Ready to turn insight into action? Let's talk about your environment."
                ctaLabel="Talk to Us"
            />
        </>
    );
}
