import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CoupleCheck Design System (from Stitch)
        primary: {
          DEFAULT: "#AA2C32",
          container: "#FF7574",
          dim: "#992027",
          fixed: "#FF7574",
          "fixed-dim": "#F56364",
        },
        secondary: {
          DEFAULT: "#9E3653",
          container: "#FFC2CC",
          dim: "#8F2A47",
          fixed: "#FFC2CC",
          "fixed-dim": "#FFADBD",
        },
        tertiary: {
          DEFAULT: "#7343A9",
          container: "#CA9CFF",
          dim: "#66369C",
        },
        surface: {
          DEFAULT: "#F8F6F2",
          bright: "#F8F6F2",
          dim: "#D5D4D0",
          container: "#E9E8E4",
          "container-high": "#E3E2DE",
          "container-highest": "#DEDDD8",
          "container-low": "#F2F1EC",
          "container-lowest": "#FFFFFF",
          variant: "#DEDDD8",
        },
        on: {
          primary: "#FFEFEE",
          secondary: "#FFEFF0",
          surface: "#2E2F2D",
          "surface-variant": "#5B5C59",
          background: "#2E2F2D",
        },
        outline: {
          DEFAULT: "#777774",
          variant: "#AEADAA",
        },
        background: "#F8F6F2",
        coral: "#FF6B6B",
        "coral-light": "#FFE5E5",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        headline: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "1.5rem",
        button: "9999px",
        input: "1rem",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(0,0,0,0.06)",
        card: "0 4px 16px rgba(0,0,0,0.06)",
        floating: "0 8px 32px rgba(46,47,45,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.3s ease forwards",
        "fade-in": "fade-in 0.3s ease forwards",
        "slide-left": "slide-left 0.3s ease forwards",
        "slide-right": "slide-right 0.3s ease forwards",
        "scale-in": "scale-in 0.2s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
