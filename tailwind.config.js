const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mac: {
          // macOS colors
          'window-gray': '#E7E7E7',
          'window-gray-dark': '#1E1E1E',
          'menubar-gray': 'rgba(236, 236, 236, 0.8)',
          'menubar-gray-dark': 'rgba(45, 45, 45, 0.8)',
          'desktop-purple': '#5F4B8B',
          'desktop-blue': '#0069c0',
          red: '#FF605C',
          yellow: '#FFBD44',
          green: '#00CA4E',
          border: '#CCCCCC',
          'border-dark': '#555555',
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Text',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      boxShadow: {
        mac: '0 10px 30px rgba(0, 0, 0, 0.2)',
        'mac-sm': '0 5px 10px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
