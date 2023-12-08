/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      width: {
        '1/9': '30%',
        '90': '90%'
      },
      flex: {
        'full': '0 1 100%'
      },
      boxShadow: {
        'down': '7px 7px 4px -3px rgba(0,0,0,0.64)',
        'myInnerBlack': '0px 0px 4px 2px rgba(0,0,0,0.50) inset',
      },
    },
  },
  plugins: [],
}

