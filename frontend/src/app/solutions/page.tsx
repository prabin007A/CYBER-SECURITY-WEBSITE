import type { Metadata } from "next";
import SolutionsView from "@/views/SolutionsView";

export const metadata: Metadata = {
    title: "Solutions | MITS",
    description: "Cyber defense, governance risk & compliance, cybersecurity, AR/VR, AI for business, and cloud solutions from MITS.",
};

export default function Page() {
    return <SolutionsView />;
}
