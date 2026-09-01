import type { Metadata } from "next";
import NotFoundView from "@/views/NotFoundView";

export const metadata: Metadata = {
    title: "Page Not Found | MITS",
    description: "The page you are looking for could not be found.",
};

export default function NotFound() {
    return <NotFoundView />;
}
