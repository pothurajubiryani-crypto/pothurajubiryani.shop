import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#B71C1C", light: "#E53935", dark: "#7F0000" },
        gold: { DEFAULT: "#D4A574", light: "#E8C9A0", dark: "#A67C52" },
        dark: { DEFAULT: "#0D0D0D", alt: "#1A1A1A", card: "#141414" },
        cream: "#FAF6F1",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
        "slide-in-left": "slideInLeft 0.4s ease-out forwards",
        "bounce-in": "bounceIn 0.5s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideInRight: { "0%": { opacity: "0", transform: "translateX(40px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        slideInLeft: { "0%": { opacity: "0", transform: "translateX(-40px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        bounceIn: { "0%": { transform: "scale(0.8)", opacity: "0" }, "60%": { transform: "scale(1.05)" }, "100%": { transform: "scale(1)", opacity: "1" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        pulseGlow: { "0%,100%": { boxShadow: "0 0 20px rgba(183,28,28,0.3)" }, "50%": { boxShadow: "0 0 40px rgba(183,28,28,0.6)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
    },
  },
  plugins: [],
};
export default config;
