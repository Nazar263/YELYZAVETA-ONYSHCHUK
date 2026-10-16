import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0B',
        surface: '#171512',
        gold: '#B58A45',
        goldLight: '#D8B978',
        text: '#F5F1E8',
        muted: '#B8B1A6',
      },
      boxShadow: {
        soft: '0 22px 80px rgba(0, 0, 0, 0.45)',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gold-radial': 'radial-gradient(circle at top, rgba(181,138,69,0.7), transparent 60%)',
      },
    },
  },
  plugins: [],
};

export default config;
