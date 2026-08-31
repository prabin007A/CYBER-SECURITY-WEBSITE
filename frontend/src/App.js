import { useEffect, lazy, Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const CyberSecurityServices = lazy(() => import("@/pages/CyberSecurityServices"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const SolutionDetail = lazy(() => import("@/pages/SolutionDetail"));
const Industries = lazy(() => import("@/pages/Industries"));
const Partners = lazy(() => import("@/pages/Partners"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogArticle = lazy(() => import("@/pages/BlogArticle"));
const Contact = lazy(() => import("@/pages/Contact"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PageLoader = () => (
    <div data-testid="page-loader" className="flex min-h-[100svh] items-center justify-center bg-navy-900">
        <div className="skeleton-shimmer h-1.5 w-40 rounded-full" />
    </div>
);

const useSmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const lenis = new Lenis({ lerp: 0.09 });
        window.__lenis = lenis;
        let rafId;
        const raf = (time) => {
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

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);
    return null;
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
                <Suspense fallback={<PageLoader />}>
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cyber-security-services" element={<CyberSecurityServices />} />
                        <Route path="/solutions" element={<Solutions />} />
                        <Route path="/solutions/:slug" element={<SolutionDetail />} />
                        <Route path="/industries" element={<Industries />} />
                        <Route path="/technology-partners" element={<Partners />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogArticle />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<Legal kind="privacy" />} />
                        <Route path="/terms-and-conditions" element={<Legal kind="terms" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </motion.main>
        </AnimatePresence>
    );
};

function App() {
    useSmoothScroll();
    return (
        <MotionConfig reducedMotion="user">
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <AnimatedRoutes />
                <Footer />
                <Toaster position="top-right" richColors />
            </BrowserRouter>
        </MotionConfig>
    );
}

export default App;
