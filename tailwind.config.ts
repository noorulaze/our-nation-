import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        kerala: {
          cream: "#FAF7F0",
          ivory: "#F4EFE6",
          sand: "#EDE6D8",
          gold: "#C88A22",
          lightgold: "#F8F1E3",
          green: "#1B4D36",
          deepgreen: "#143C29",
          darkgreen: "#131A15",
        },
        brand: {
          50: "#F1F8F4",
          100: "#E0F1E7",
          200: "#BDE2CF",
          300: "#91CEAF",
          400: "#5EB58A",
          500: "#36996D",
          600: "#247D56",
          700: "#1B4D36", // Primary Kerala Forest Green from reference
          800: "#153E2B",
          900: "#102F21",
          950: "#0A1F16",
          DEFAULT: "#1B4D36",
        },
        accent: {
          DEFAULT: "#F4EFE6",
          foreground: "#1B4D36",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        malayalam: [
          "Manjari",
          "Gayathri",
          "Noto Serif Malayalam",
          "Noto Sans Malayalam",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 8px -1px rgba(27, 77, 54, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.04)",
        elevated: "0 10px 25px -3px rgba(27, 77, 54, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
