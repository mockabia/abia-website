/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg  }"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "770px",
      mdb: { max: "769px" },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
