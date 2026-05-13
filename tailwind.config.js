/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        itau: {
          orange: '#EC7000',
          blue: '#1F3B6B',
          'orange-light': '#F5A623',
          'blue-light': '#2D5BA0',
        },
      },
      fontFamily: {
        itau: ['"Itau Display Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
