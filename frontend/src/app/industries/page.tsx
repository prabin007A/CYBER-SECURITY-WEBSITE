import type { Metadata } from "next";
import IndustriesView from "@/views/IndustriesView";

export const metadata: Metadata = {
    title: "Industries | MITS",
    description: "Secure IT and cybersecurity solutions for government, energy, finance, healthcare, retail, manufacturing, education, and SMEs.",
};

export default function Page() {
    return <IndustriesView />;
}
