/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary:"#1e90ff",
        secondary:"#ff6347",
        black:"#1e1e1e",
        white:"#ffffff",
      }
    },
  },
  plugins: [],
}