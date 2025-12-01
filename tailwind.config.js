/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['"Open Sans"', 'sans-serif']
      },
      colors: {
        orange: {
          500: '#ED9C42'
        },
        dark: '#1A1A1A',
        darkbg: '#0F0F0F',
        darkcard: '#1E1E1E',
        muted: '#A0A0A0',
        lighttext: '#E5E5E5'
      }
    }
  },
  plugins: []
}
