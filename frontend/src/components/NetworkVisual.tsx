"use client";

import { useMemo } from "react";

const rand = (seed: number) => {
    let s = seed;
    return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
};

interface Point {
    x: number;
    y: number;
    s: number;
    d: number;
}

export default function NetworkVisual({ density = 18, className = "", seed = 7 }: { density?: number; className?: string; seed?: number }) {
    const { nodes, lines } = useMemo(() => {
        const r = rand(seed);
        const pts: Point[] = Array.from({ length: density }, () => ({
            x: 4 + r() * 92,
            y: 6 + r() * 88,
            s: 1.5 + r() * 2.5,
            d: r() * 4,
        }));
        const links: { a: Point; b: Point; d: number }[] = [];
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                if (Math.hypot(dx, dy) < 24 && links.length < density * 1.7) {
                    links.push({ a: pts[i], b: pts[j], d: r() * 3 });
                }
            }
        }
        return { nodes: pts, lines: links };
    }, [density, seed]);

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
            {lines.map((l, i) => (
                <line
                    key={`l-${i}`}
                    x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y}
                    stroke="rgba(30,80,255,0.28)" strokeWidth="0.18"
                    className="dash-flow" style={{ animationDelay: `${l.d}s` }}
                />
            ))}
            {nodes.map((n, i) => (
                <circle
                    key={`n-${i}`}
                    cx={n.x} cy={n.y} r={n.s * 0.35}
                    fill={i % 5 === 0 ? "#FF2E4C" : i % 3 === 0 ? "#00F0FF" : "#1E50FF"}
                    className="node-pulse" style={{ animationDelay: `${n.d}s` }}
                />
            ))}
        </svg>
    );
}

export function ShieldMark({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
            <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#1E50FF" stopOpacity="0.95" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,240,255,0.22)" strokeWidth="0.8" className="spin-slow" strokeDasharray="6 10" style={{ transformOrigin: "center" }} />
            <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,46,76,0.18)" strokeWidth="0.6" className="spin-reverse" strokeDasharray="2 12" style={{ transformOrigin: "center" }} />
            <path d="M60 22 L92 34 V62 C92 84 78 96 60 102 C42 96 28 84 28 62 V34 Z" fill="none" stroke="url(#shieldGrad)" strokeWidth="2" />
            <path d="M60 34 L80 42 V62 C80 76 71 85 60 90 C49 85 40 76 40 62 V42 Z" fill="rgba(30,80,255,0.10)" stroke="rgba(30,80,255,0.5)" strokeWidth="1" />
            <path d="M50 61 L57 68 L72 52" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
