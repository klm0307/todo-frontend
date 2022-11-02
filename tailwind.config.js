/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#75ccb9",
        secondary: "#b39ddb",
      },
    },
  },
  plugins: [],
};
