// tailwind.config.ts
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { green, grey, red, yellow, orange } from '@mui/material/colors'

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // paleta kolorów z MUI
      colors: {
        green,   // będziesz miał klasy bg-green-500 itp.
        grey,
        red,
        yellow,
        orange,
        primary: {
          DEFAULT: '#0F4C5C',    // np. bg-primary
          100:      '#9A031E',
          200:      '#5F0F40',
        },
        secondary: {
          DEFAULT: '#E36414',
          100:      '#FB8B24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
      fontWeight: {
        light:   '300',
        regular: '400',
        medium:  '500',
        bold:    '700',
      },
      fontSize: {
        xs:  '9px',
        sm:  '12px',
        md:  '15px',
        xl:  '18px',
        xxl: '22px',
      },
      spacing: {
        0:   '0rem',
        0.5: '0.25rem',
        1:   '0.5rem',
        2:   '1rem',
        3:   '1.5rem',
        4:   '2rem',
        5:   '2.5rem',
        6:   '3rem',
        7:   '3.5rem',
        8:   '4rem',
        9:   '4.5rem',
        10:  '5rem',
        11:  '5.5rem',
        12:  '6rem',
      },
      screens: {
        xs: '400px',
        sm: '640px',
        md: '900px',
        lg: '1024px',
        xl: '1536px',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.y-center':   { display: 'flex', alignItems: 'center' },
        '.x-center':   { display: 'flex', justifyContent: 'center' },
        '.xy-center':  { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        '.ellipsis':   { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
      })
    }),
  ],
}

export default config
