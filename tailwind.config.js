/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#FBF9F5',
          light: '#FFFFFF',
          card: '#F5F1E9',
          dark: '#EFEAE0',
        },
        charcoal: {
          DEFAULT: '#1C1D20',
          heading: '#2D2F34',
          muted: '#686C75',
          light: '#A0A4AD',
        },
        brass: {
          DEFAULT: '#B8860B',
          light: '#C59B27',
          dark: '#8B6508',
        },
        aegean: {
          DEFAULT: '#1E3A45',
          light: '#2B4F5E',
          deep: '#12252D',
        },
        stone: {
          border: '#E5E0D5',
          subtle: '#F0ECF3',
        },
        ember: '#8B2613',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'horizon-gradient': 'linear-gradient(90deg, transparent 0%, #B8860B 50%, transparent 100%)',
        'light-gradient': 'linear-gradient(180deg, #FBF9F5 0%, #F5F1E9 100%)',
        'sand-sea-gradient': 'linear-gradient(180deg, #FBF9F5 0%, #E9EFF2 100%)',
      },
      boxShadow: {
        'brass-glow': '0 0 20px rgba(184, 134, 11, 0.15)',
        'card-light': '0 20px 40px rgba(0, 0, 0, 0.05)',
        'glass-light': '0 10px 30px rgba(0, 0, 0, 0.03)',
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.4em',
      }
    },
  },
  plugins: [],
}
