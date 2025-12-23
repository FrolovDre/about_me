/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'neon-pink': '#ff4fd8',
        'neon-cyan': '#4ef2ff',
        'neon-purple': '#a855f7',
        'neon-lime': '#b7ff5a',
        'vapor-night': '#050110',
        'vapor-dusk': '#14032b',
        'vapor-sky': '#2a0a4a',
      },
      boxShadow: {
        glow: '0 0 35px rgba(255, 79, 216, 0.25), 0 0 60px rgba(78, 242, 255, 0.15)',
        'glow-strong':
          '0 0 40px rgba(255, 79, 216, 0.35), 0 0 80px rgba(168, 85, 247, 0.25)',
        neon: '0 0 18px rgba(78, 242, 255, 0.35), 0 0 28px rgba(255, 79, 216, 0.25)',
      },
      backgroundImage: {
        'retro-grid':
          'linear-gradient(transparent 0%, transparent 96%, rgba(78, 242, 255, 0.25) 100%), linear-gradient(90deg, transparent 0%, transparent 96%, rgba(255, 79, 216, 0.25) 100%)',
        'vapor-sky':
          'radial-gradient(circle at 20% 20%, rgba(255, 79, 216, 0.35), transparent 55%), radial-gradient(circle at 80% 10%, rgba(78, 242, 255, 0.35), transparent 50%), linear-gradient(180deg, rgba(20, 3, 43, 0.95) 0%, rgba(5, 1, 16, 0.98) 70%)',
      },
    },
  },
  plugins: [],
};
