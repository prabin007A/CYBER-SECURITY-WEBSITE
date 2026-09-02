import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
    title: "MITS | Cybersecurity & IT Solutions",
    description:
        "Advanced cybersecurity and scalable IT solutions designed to protect businesses, secure data, and enable digital transformation.",
    openGraph: {
        type: "website",
        title: "MITS | Cybersecurity & IT Solutions",
        description:
            "Advanced cybersecurity and scalable IT solutions designed to protect businesses, secure data, and enable digital transformation.",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0B1120",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Providers>{children}</Providers>
                <Script src="https://assets.emergent.sh/scripts/emergent-main.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
