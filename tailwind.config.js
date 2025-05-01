/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./src/**/*.{js,ts,jsx,tsx}'],
    sources: [
      {
        files: ['./src/**/*.{js,ts,jsx,tsx}'],
        negated: false, 
      }
    ],
  },
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
      fontSize: {
        xxs: ['10px', '12px'], 
      },
      colors: {
        'victory-bg': '#506ca6',
        'defeat-bg': '#a0575c',
        'remake-bg': '#9b9b9b',
        'victory-bg-focus': '#46639e',
        'defeat-bg-focus': '#944c51',
        'remake-bg-focus': '#929191',
        'victory-highlight': '#3785c4',
        'defeat-highlight': '#c43739',
        'remake-highlight': '#c6c6c6',
        'victory-item-bg': '#3f5684',
        'defeat-item-bg': '#7f4549',
        'remake-item-bg': '#828282',
      },
    },
    screens: {
      'mobile': '299px',
      'tablet': '767px',
      'laptop': '1024px',
      'desktop': '1199px'
    }
  },
  plugins: [],
}