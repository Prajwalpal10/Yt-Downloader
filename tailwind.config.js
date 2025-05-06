/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f8ff',
          100: '#cceeff',
          200: '#99ddff',
          300: '#66ccff',
          400: '#33bbff',
          500: '#00aaff',
          600: '#0088cc',
          700: '#006699',
          800: '#004466',
          900: '#002233',
        },
        secondary: {
          50: '#f0f0ff',
          100: '#e6e6ff',
          200: '#c7c7ff',
          300: '#a9a9ff',
          400: '#8b8bff',
          500: '#7B61FF',
          600: '#5c48cc',
          700: '#4a3ab3',
          800: '#352380',
          900: '#201466',
        },
        accent: {
          50: '#e6ffff',
          100: '#ccffff',
          200: '#99ffff',
          300: '#66ffff',
          400: '#33ffff',
          500: '#00F0FF',
          600: '#00c0cc',
          700: '#009099',
          800: '#006066',
          900: '#003033',
        },
        dark: {
          50: '#C0C7D9',
          100: '#A1ABB8',
          200: '#828FA0',
          300: '#636D7A',
          400: '#414A59',
          500: '#1E2A45',
          600: '#19243C',
          700: '#151F34',
          800: '#10192B',
          900: '#0B0E18',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};