/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans:  ['DIN Next Arabic', 'sans-serif'],
        aqmar: ['Aqmar', 'sans-serif'],
      },
      colors: {
        'green': '#226e33',
        'green-1': '#7DC38C',
        'brown': '#6E2D22',
      },
    },
  },
  plugins: [],
};
