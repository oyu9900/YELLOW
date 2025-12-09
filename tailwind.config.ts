import type { Config } from 'tailwindcss'
import { join } from 'path'

const config: Config = {
  content: [
    join(__dirname, 'apps/web/app/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'apps/web/components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'libs/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1915ff',
      },
    },
  },
  plugins: [],
}

export default config
