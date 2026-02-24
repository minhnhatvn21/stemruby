import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        fireRed: '#ff2a2a',
        fireOrange: '#ff7a00',
        fireYellow: '#ffc400',
        coal: '#0a0a0a',
        smoke: '#2a2a2a'
      },
      animation: {
        flicker: 'flicker 1.7s infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite'
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255,122,0,.45)' },
          '50%': { boxShadow: '0 0 30px rgba(255,196,0,.6)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
