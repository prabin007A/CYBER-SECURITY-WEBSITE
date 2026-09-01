import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleView from "@/views/BlogArticleView";
import { BLOG_POSTS } from "@/data/content";

export function generateStaticParams() {
    return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Page Not Found | MITS" };
    return {
        title: `${post.title} | MITS Blog`,
        description: post.excerpt,
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) notFound();
    return <BlogArticleView slug={slug} />;
}
