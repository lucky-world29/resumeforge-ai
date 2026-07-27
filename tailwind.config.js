/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#060816'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(148,163,184,0.08), 0 20px 80px rgba(37,99,235,0.15)',
        glass: '0 20px 60px rgba(15, 23, 42, 0.35)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at center, rgba(99,102,241,0.12) 0, transparent 32%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'panel-gradient': 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.12))'
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        blob: 'blob 15s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -22px) scale(1.08)' },
          '66%': { transform: 'translate(-12px, 18px) scale(0.94)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-300% 0' },
          '100%': { backgroundPosition: '300% 0' }
        }
      }
    }
  },
  plugins: []
};
