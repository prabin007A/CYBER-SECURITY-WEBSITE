import type { Metadata } from "next";
import BlogView from "@/views/BlogView";

export const metadata: Metadata = {
    title: "Blog | MITS",
    description: "Insights on cybersecurity, cloud, AI, IT, and digital transformation from the MITS team.",
};

export default function Page() {
    return <BlogView />;
}
