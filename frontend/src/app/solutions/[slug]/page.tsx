import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailView from "@/views/SolutionDetailView";
import { SOLUTIONS } from "@/data/content";

export function generateStaticParams() {
    return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const solution = SOLUTIONS.find((s) => s.slug === slug);
    if (!solution) return { title: "Page Not Found | MITS" };
    return {
        title: `${solution.title} | MITS`,
        description: solution.description,
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const solution = SOLUTIONS.find((s) => s.slug === slug);
    if (!solution) notFound();
    return <SolutionDetailView slug={slug} />;
}
