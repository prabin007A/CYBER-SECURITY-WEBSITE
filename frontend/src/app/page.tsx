import type { Metadata } from "next";
import HomeView from "@/views/HomeView";

export const metadata: Metadata = {
    title: "MITS | Cybersecurity & IT Solutions",
    description: "Advanced cybersecurity and scalable IT solutions designed to protect businesses, secure data, and enable digital transformation.",
};

export default function Page() {
    return <HomeView />;
}
