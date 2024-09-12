/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "orange" : "#F93B1D",
      },
      fontFamily:{
        'fira':['FiraGO','sans-serif'],
      }
    },
  },
  plugins: [],
}


