import type { Metadata } from "next";
import CyberSecurityServicesView from "@/views/CyberSecurityServicesView";

export const metadata: Metadata = {
    title: "Cyber Security Services | MITS",
    description: "Proactive threat detection, prevention, and rapid response solutions from MITS.",
};

export default function Page() {
    return <CyberSecurityServicesView />;
}
