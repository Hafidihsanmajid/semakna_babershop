import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          amber: "#D49A58",
          "amber-hover": "#E0A96B",
          "amber-subtle": "rgba(212, 154, 88, 0.15)",
        },
        bg: {
          dark: "#121315",
          card: "rgba(28, 29, 33, 0.75)",
          "card-border": "rgba(212, 154, 88, 0.35)",
        },
        surface: {
          translucent: "rgba(255, 255, 255, 0.08)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B5B5B7",
          accent: "#D49A58",
          muted: "#7E8085",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        "serif-accent": ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        vintage: "0 10px 30px rgba(0, 0, 0, 0.6)",
      },
      borderRadius: {
        sharp: "2px",
        card: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
