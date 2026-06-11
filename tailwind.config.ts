import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * Tailwind CSS v4 configuration.
 *
 * In v4 the config is loaded from `src/index.css` via the `@config` directive.
 * Custom theme tokens and the glow utility plugin live here so the design
 * system has a single, typed source of truth.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00f5ff', // electric cyan
        secondary: '#7c3aed', // violet
        dark: '#050816', // base background
        darkAlt: '#0d1224', // elevated surfaces
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 245, 255, 0.45)',
        'glow-secondary': '0 0 20px rgba(124, 58, 237, 0.45)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-glow-primary': {
          textShadow:
            '0 0 8px rgba(0, 245, 255, 0.8), 0 0 24px rgba(0, 245, 255, 0.5)',
        },
        '.text-glow-secondary': {
          textShadow:
            '0 0 8px rgba(124, 58, 237, 0.8), 0 0 24px rgba(124, 58, 237, 0.5)',
        },
        '.border-glow-primary': {
          borderColor: 'rgba(0, 245, 255, 0.5)',
          boxShadow:
            '0 0 12px rgba(0, 245, 255, 0.35), inset 0 0 12px rgba(0, 245, 255, 0.12)',
        },
        '.border-glow-secondary': {
          borderColor: 'rgba(124, 58, 237, 0.5)',
          boxShadow:
            '0 0 12px rgba(124, 58, 237, 0.35), inset 0 0 12px rgba(124, 58, 237, 0.12)',
        },
        '.glass': {
          background: 'rgba(13, 18, 36, 0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        },
      });
    }),
  ],
};

export default config;
