/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        verdana: ['Verdana', 'Geneva', 'sans-serif'],
      },
      backgroundColor: {
        'black-opaque': 'rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'ping-slow': 'ping 3s linear infinite',
      }
    },
  },
  plugins: [],
}

