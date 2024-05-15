/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '1.5': '1.5px',
      '2': '2px',
      '4': '4px',
      '5': '5px',
    },
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
      'mobile': '299px',
      'tablet': '767px',
      'laptop': '1023px',
      'desktop': '1199px'
    }
  },
  plugins: [],
}