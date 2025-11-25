/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // sky-500 like
        accent: '#0284c7',
      },
    },
  },
  plugins: [],
};

