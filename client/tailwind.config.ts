import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#C9A84C",
        goldLight: "#DCBD6B",
        goldDark: "#9A7F3A",
        ivory: "#F0EADB",
        bg: "#060606",
        bg2: "#0A0A0A",
      },
      fontFamily: {
        brand: ["Bebas Neue", "cursive"],
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
