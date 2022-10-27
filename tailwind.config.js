/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/images/background.jpg')",
      },
      fontFamily: {
        title: ["Sanchez", "sans"],
        subTitle: ["Mr De Haviland"],
      },
      colors: {
        "primary-500": " #d88c43",
      },
    },
  },
  plugins: [],
};
