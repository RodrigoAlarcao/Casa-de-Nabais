import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'serif'],
      },
      colors: {
        'cn-bg': 'var(--color-bg)',
        'cn-bg-alt': 'var(--color-bg-alt)',
        'cn-green': 'var(--color-green)',
        'cn-green-dark': 'var(--color-green-dark)',
        'cn-green-deep': 'var(--color-green-deep)',
        'cn-gold': 'var(--color-gold)',
        'cn-text': 'var(--color-text)',
        'cn-text-muted': 'var(--color-text-muted)',
        'cn-text-light': 'var(--color-text-light)',
      },
      maxWidth: {
        'site': '1200px',
      },
    },
  },
  plugins: [],
}

export default config
