import type { Metadata } from "next";
import PartnersView from "@/views/PartnersView";

export const metadata: Metadata = {
    title: "Technology Partners | MITS",
    description: "Technology partnerships that help MITS deliver secure and scalable solutions.",
};

export default function Page() {
    return <PartnersView />;
}
