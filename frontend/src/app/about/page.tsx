import type { Metadata } from "next";
import AboutView from "@/views/AboutView";

export const metadata: Metadata = {
    title: "About MITS | Technology That Protects. Solutions That Perform.",
    description: "MITS is an IT solutions and cybersecurity company focused on building secure, resilient, and future-ready digital environments.",
};

export default function Page() {
    return <AboutView />;
}
