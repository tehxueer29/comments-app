import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./UI/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik"],
      },
      colors: {
        primary: {
          500: "#5358B6",
        },
        gray: {
          50: "#F5F6FA",
          100: "#F6F6F8",
          800: "#68727E",
          900: "#313944",
        },
        red: {
          500: "#EE6366",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
