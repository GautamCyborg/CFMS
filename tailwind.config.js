/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {colors: {
      Navy: {
        50: '#3e5172',
        100: '#9fb6c3',
        },
        coral:{
          50:'#f9b49b',
          100:'#f9e9de',
          200:'#cc6c5c'
        }
    }
  },
  },
  plugins: [],
}