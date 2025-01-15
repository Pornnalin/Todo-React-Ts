/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundDark: "#252525",
        backgroundLight: "#F7F7F7",
        primary: "#6C63FF",
        primaryHover: "#534CC2",
      },
    },
  },
  plugins: [],
};
