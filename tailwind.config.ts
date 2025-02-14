import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {},
  plugins: []
} satisfies Config
