import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          base: "#090909",
          surface: "#141414",
          secondary: "#1D1D1D",
        },
        red: {
          primary: "#FF5257",
        },
        text: {
          primary: "#F2F1ED",
          muted: "#8E8E8E",
        },
        border: {
          default: "#2C2C2C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        section: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "card-title": ["1.25rem", { lineHeight: "1.3", fontWeight: "700" }],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "500" }],
      },
      borderRadius: {
        "card-lg": "2rem",
        "card-sm": "1.25rem",
        btn: "0.75rem",
        pill: "9999px",
      },
      keyframes: {
        "pulse-pin": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.8)", opacity: "0.4" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      animation: {
        "pulse-pin": "pulse-pin 2s ease-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "counter-up": "counter-up 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
