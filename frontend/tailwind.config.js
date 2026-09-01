/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"],
                body: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            colors: {
                command: {
                    950: "#050810",
                    900: "#070B14",
                    800: "#0D1322",
                    700: "#141C30",
                    600: "#1E2942",
                },
                cobalt: {
                    DEFAULT: "#1E50FF",
                    hover: "#143ECC",
                    soft: "#4D74FF",
                },
                crimson: {
                    DEFAULT: "#FF2E4C",
                    hover: "#D91B36",
                },
                signal: "#00F0FF",
                navy: {
                    950: "#050810",
                    900: "#070B14",
                    800: "#0D1322",
                    700: "#141C30",
                    600: "#1E2942",
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
