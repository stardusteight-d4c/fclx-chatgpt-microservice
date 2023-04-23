/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#202123',
        gray: '#343541',
        text: '#d9d9e3',
        'text-variant': '#ececf1',
      },
    },
  },
  plugins: [],
}
