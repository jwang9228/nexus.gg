/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 1.75s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 0,
          }, 
          '50%': {
            opacity: 0.95,
          },
        },
      },
    },
    screens: {
      'mobile': '300px',
      'laptop': '800px',
      'desktop': '1200px'
    }
  },
  plugins: [],
}