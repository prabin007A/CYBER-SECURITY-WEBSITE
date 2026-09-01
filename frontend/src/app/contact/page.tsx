import type { Metadata } from "next";
import ContactView from "@/views/ContactView";

export const metadata: Metadata = {
    title: "Contact MITS | Request a Consultation",
    description: "Talk to MITS about your technology and cybersecurity requirements. Request a consultation today.",
};

export default function Page() {
    return <ContactView />;
}
