/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./**/*.{njk,md}", "./**/*.svg",],
  safelist: [],
  theme: {
    extend: {
      colors: {
        change: 'transparent',
      },
    },
  },
  plugins: [],
}