import type { Metadata } from "next";
import LegalView from "@/views/LegalView";

export const metadata: Metadata = {
    title: "Terms & Conditions | MITS",
    description: "Terms & Conditions for the MITS website.",
};

export default function Page() {
    return <LegalView kind="terms" />;
}
