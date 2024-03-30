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
        fade: "fadeIn .15s ease-out",
      },
      keyframes: {
        shiftIn: {
          from: {
            opacity: 0,
            top: "49%",
          },
          to: { opacity: 1 },
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
