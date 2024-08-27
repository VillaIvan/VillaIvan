import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        secondary: ["Noto Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#0F7261",
        secondary: "#999999",
        oscure: "#101010",
      },
    },
  },
  plugins: [],
};
