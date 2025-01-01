/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#1D1F20',
        'secondary': '#FFD700',
        'accent' : '#1E3A8A',
        'darkAccent' : '#4A5568',
      }
    },
  },
  plugins: [],
}

