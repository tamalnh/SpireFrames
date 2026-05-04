import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Logical tokens — values driven by CSS variables, switched per theme.
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        sage: "rgb(var(--c-accent) / <alpha-value>)", // accent (Gold)
        mist: "rgb(var(--c-muted) / <alpha-value>)", // muted accent
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
        hairline: "rgb(var(--c-hairline) / <alpha-value>)"
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        "wide-2": "0.18em"
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 0.61, 0.36, 1)"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        rotateWord: {
          "0%, 22%": { opacity: "1", transform: "translateY(0)" },
          "30%, 100%": { opacity: "0", transform: "translateY(-8px)" }
        }
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both",
        fadeIn: "fadeIn 0.6s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        marquee: "marquee 28s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        floatySlow: "floaty 9s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
