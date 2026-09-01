"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { ScrollProgress } from "@/components/Motion";
import { initAnalytics, trackPageView } from "@/lib/analytics";

declare global {
    interface Window {
        __lenis: Lenis | null;
    }
}

const useSmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const lenis = new Lenis({ lerp: 0.09 });
        window.__lenis = lenis;
        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);
};

const RouteEffects = () => {
    const pathname = usePathname();
    useEffect(() => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
        initAnalytics();
        trackPageView(pathname);
    }, [pathname]);
    return null;
};

export default function Providers({ children }: { children: React.ReactNode }) {
    useSmoothScroll();
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60_000,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );
    return (
        <QueryClientProvider client={queryClient}>
            <MotionConfig reducedMotion="user">
                <RouteEffects />
                <ScrollProgress />
                <Header />
                {children}
                <Footer />
                <CookieConsent />
                <Toaster position="top-right" richColors />
            </MotionConfig>
        </QueryClientProvider>
    );
}
