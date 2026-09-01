import type { Metadata } from "next";
import LegalView from "@/views/LegalView";

export const metadata: Metadata = {
    title: "Privacy Policy | MITS",
    description: "Privacy Policy for the MITS website.",
};

export default function Page() {
    return <LegalView kind="privacy" />;
}
