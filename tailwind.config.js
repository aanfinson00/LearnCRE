/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        copper: {
          DEFAULT: '#d4895a',
          soft: '#e3a982',
          deep: '#b87040',
          ink: '#8f5430',
        },
        warm: {
          black: '#1c1917',
          ink: '#2a2623',
          stone: '#4a4340',
          mute: '#7d7470',
          line: '#d9d1c6',
          paper: '#ebe4d8',
          white: '#f5f0eb',
        },
        signal: {
          good: '#6b8e5a',
          'good-ink': '#3f5634',
          bad: '#b5554a',
          'bad-ink': '#6d3029',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      fontWeight: {
        display: '200',
      },
      transitionTimingFunction: {
        aa: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        aa: '250ms',
        'aa-fast': '150ms',
        'aa-slow': '400ms',
      },
      boxShadow: {
        aa: '0 1px 2px rgba(28, 25, 23, 0.04), 0 8px 24px rgba(28, 25, 23, 0.06)',
        'aa-inset': 'inset 0 0 0 1px rgba(28, 25, 23, 0.08)',
      },
    },
  },
  plugins: [],
};
