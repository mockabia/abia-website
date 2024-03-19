/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg  }"],
  theme: {
    extend: {
      colors: {
        "abia-color": "var(--abia-color)",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        source: ["Source Sans 3", "sans-serif"],
      },
    },
    screens: {
      sm: "640px",
      md: "769px",
      mdb: { max: "769px" },
      lg: "1024px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
