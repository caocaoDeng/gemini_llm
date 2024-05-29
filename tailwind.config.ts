import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-50': '#f8fafc',
        'theme-100': '#f1f5f9',
        'theme-200': '#e2e8f0',
        'theme-300': '#cbd5e1',
        'theme-400': '#94a3b8',
        'theme-500': '#64748b',
        'theme-600': '#475569',
        'theme-700': '#334155',
        'theme-800': '#1e293b',
        'theme-900': '#0f172a',
        'theme-950': '#020617',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
