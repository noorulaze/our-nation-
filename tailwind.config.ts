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
        brand: {
          50: "#f0f9f4",
          100: "#ddf2e6",
          200: "#bce4cf",
          300: "#8eccb1",
          400: "#59ad8e",
          500: "#349171",
          600: "#247458",
          700: "#176B4D",
          800: "#164e3a",
          900: "#134031",
          950: "#09241c",
          DEFAULT: "#176B4D",
        },
        accent: {
          DEFAULT: "#DDF2E6",
          foreground: "#176B4D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        malayalam: ["var(--font-malayalam)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
