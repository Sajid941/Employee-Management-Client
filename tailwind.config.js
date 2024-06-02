/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins:"'Poppins', sans-serif",
      },
      colors:{
        mainColor: '#ff6700',
        dark:'#1d232a'
      }
    },
  },
  plugins: [require('daisyui'),],
}