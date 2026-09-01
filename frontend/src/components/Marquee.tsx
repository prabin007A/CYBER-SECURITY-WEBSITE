"use client";

export default function Marquee({ items, dark = true }: { items: string[]; dark?: boolean }) {
    const row = [...items, ...items];
    return (
        <div data-testid="editorial-marquee" className={`overflow-hidden border-y py-6 ${dark ? "border-white/10 bg-navy-950" : "border-navy-900/10 bg-white"}`} aria-hidden="true">
            <div className="marquee-track flex w-max items-center gap-10">
                {row.map((item, i) => (
                    <span key={i} className="flex items-center gap-10">
                        <span className={`whitespace-nowrap font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${dark ? "text-outline-light" : "text-outline-dark"}`}>
                            {item}
                        </span>
                        <span className="h-2 w-2 rotate-45 bg-cyan-500" />
                    </span>
                ))}
            </div>
        </div>
    );
}
