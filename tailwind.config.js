/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        appear: "shiftIn .15s ease-out",
        appearDown: "shiftInDown .2s ease-out",
        fade: "fadeIn .15s ease-out",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",
        "primary-dark": "rgb(var(--color-primary-dark) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        overlay: "rgb(var(--color-overlay) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        highlight: "rgb(var(--color-highlight) / <alpha-value>)",
      },
      keyframes: {
        shiftIn: {
          from: {
            opacity: 0,
            top: "49%",
          },
          to: { opacity: 1 },
        },
        shiftInDown: {
          from: {
            opacity: 0,
            transform: "translateY(2px)",
          },
          to: { opacity: 1, transform: "translateY(0px)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
};
