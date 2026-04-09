import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "#080c12",
          1: "#0d1420",
          2: "#111c2e",
          3: "#172236",
          card: "#0f1929",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          hi: "rgba(255,255,255,0.14)",
        },
        amber: {
          DEFAULT: "#f5a623",
          dim: "rgba(245,166,35,0.12)",
          glow: "rgba(245,166,35,0.25)",
        },
        teal: {
          DEFAULT: "#2dd4bf",
          dim: "rgba(45,212,191,0.1)",
        },
        green: {
          DEFAULT: "#4ade80",
          dim: "rgba(74,222,128,0.1)",
        },
        red: {
          DEFAULT: "#f87171",
          dim: "rgba(248,113,113,0.1)",
        },
        blue: {
          DEFAULT: "#60a5fa",
          dim: "rgba(96,165,250,0.1)",
        },
        text: {
          1: "#e8edf5",
          2: "#8b95a8",
          3: "#4a5568",
        },
      },
      fontFamily: {
        head: ["'Space Mono'", "monospace"],
        body: ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
