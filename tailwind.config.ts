import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ff8-dark': '#1a1a1a',
        'ff8-blue': '#001a4d',
        'ff8-cyan': '#00ffff',
        'ff8-accent': '#0066ff',
        'ff8-green': '#00cc00',
        'ff8-red': '#ff0000',
      },
      fontFamily: {
        ff8: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config