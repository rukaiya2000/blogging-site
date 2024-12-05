import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
      },
      width: {
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
      },
      colors: {
        "primary": "#F5F5F5",
        "secondary": "#E5E4E2",
        "tertiary": "#FF91A4",
        "lighter": "#f7fafc",
        "light": "#cbd5e0",
        "normal": "#a0aec0",
        "dark": "#4a5568",
        "darker": "#1a202c"
      },
      typography: {
        DEFAULT: {
          css: {
            pre: false,
            code: false,
            'pre code': false,
            'code::before': false,
            'code::after': false
          }
        }
      },
      display: ['group-hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography')({
      // Exclude default styles
      default: false,
      prose: false,
    }),
  ],
}
export default config
