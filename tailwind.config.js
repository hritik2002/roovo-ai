/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    // Add all possible file paths where you might use Tailwind classes
    "./src/**/*.{tsx,jsx,ts,js}",
    "./src/components/**/*.{tsx,jsx,ts,js}",
    "./components/**/*.{tsx,jsx,ts,js}",
    "./**/*.{tsx,jsx,ts,js}", // This will check all files in your project
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
