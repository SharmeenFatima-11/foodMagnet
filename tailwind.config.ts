import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'hero': "url('/background.png')",
        "gradient-radial": 'radial-gradient(#B6B5FF, transparent)',
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#03263E",
          600: "#033150",
          100: "#00839E",
          300: "#0A446A",
          500: "#0A446A",
          primary: '#143881'
        },
        navy: {
          DEFAULT: "#030348"
        },
        brown: {
          DEFAULT: "#A67777"
        },
        grey: {
          DEFAULT: "#03263E"
        },
        skyblue: {
          DEFAULT: "#00839E"
        },
        lightGreen: {
          DEFAULT: "#39EC35"
        },
        yellow: {
          DEFAULT: "#FFCA0F"
        },
        lightgrey: {
          DEFAULT: "#2CC6A1"
        },
      },
      screens: {
        '3xl': { "min": "1736px" },
        '4xl': { 'min': '1936px' },
      },
    },
  },
  plugins: [],
};

export default config;
