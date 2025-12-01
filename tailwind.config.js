/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cinzel)'], 
        sans: ['var(--font-inter)'],
      },
      colors: {
        // Custom color palette untuk tema vintage
        paper: {
          light: '#f5f5f0',
          DEFAULT: '#e5e0d1',
          dark: '#d6cbb8',
          darker: '#c4b89a',
        },
        ink: {
          light: '#78716c',
          DEFAULT: '#44403c',
          dark: '#292524',
        },
        accent: {
          light: '#d97706',
          DEFAULT: '#b45309',
          dark: '#92400e',
        },
      },
      animation: {
        'fog-slow': 'fog-flow 60s linear infinite',
        'fog-fast': 'fog-flow 40s linear infinite',
        'water-flow': 'water-flow 15s ease-in-out infinite',
        'water-flow-reverse': 'water-flow-reverse 20s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'fog-flow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      boxShadow: {
        'vintage': '4px 4px 0px #292524',
        'vintage-lg': '8px 8px 0px rgba(0,0,0,0.2)',
        'inner-glow': 'inset 0 0 100px rgba(214,203,184,0.8)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};