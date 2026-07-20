/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#f7f6f3',
        accent: '#d4af37',
        dark: '#0d0d0d',
        gray: '#5b5b5b',
        'gray-light': '#9a9a9a',
        'gray-dark': '#2a2a2a',
        cream: '#faf9f6',
        champagne: '#f5e6cc',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        number: ['"Space Grotesk"', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(2.5rem, 6vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'heading-2': ['clamp(2rem, 4vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-3': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.2' }],
        'heading-4': ['clamp(1.2rem, 2vw, 2rem)', { lineHeight: '1.3' }],
        'body-lg': ['clamp(1.1rem, 1.5vw, 1.35rem)', { lineHeight: '1.7' }],
        'body': ['clamp(0.95rem, 1.1vw, 1.1rem)', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': 'clamp(5rem, 12vw, 12rem)',
        'section-sm': 'clamp(3rem, 6vw, 6rem)',
        'gutter': 'clamp(1.5rem, 4vw, 4rem)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'luxury-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
