import Seo from "../components/Seo";
import CtaButton from "../components/CtaButton";
import NetworkVisual from "../components/NetworkVisual";

export default function NotFound() {
    return (
        <>
            <Seo title="Page Not Found | MITS" description="The page you are looking for could not be found." />
            <section data-testid="not-found-page" className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-900 pt-24">
                <NetworkVisual density={14} seed={71} className="absolute inset-0 h-full w-full opacity-25" />
                <div className="container-x relative z-10 py-20">
                    <p className="overline">Error 404</p>
                    <h1 className="mt-5 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">Page Not Found</h1>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400">
                        The page you're looking for doesn't exist or may have been moved.
                    </p>
                    <div className="mt-10">
                        <CtaButton to="/" variant="primary" testId="not-found-return-home">Return Home</CtaButton>
                    </div>
                </div>
            </section>
        </>
    );
}
