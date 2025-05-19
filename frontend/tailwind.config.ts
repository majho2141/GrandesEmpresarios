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
        primary: '#2E4057',    // Azul Profundo
        secondary: '#048BA8',  // Azul Turquesa
        accent: '#F18F01',     // Naranja Enérgico
        success: '#99C24D',    // Verde Crecimiento
        background: '#F4F4F8', // Blanco Hueso
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        // Montserrat
        'h1-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-desktop': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-mobile': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2-desktop': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-mobile': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'h3-desktop': ['22px', { lineHeight: '1.4', fontWeight: '500' }],
        
        // Open Sans
        'body-mobile': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-desktop': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-medium': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'nav': ['15px', { lineHeight: '1.5', fontWeight: '600' }],
        
        // Roboto Mono
        'mono-mobile': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'mono-desktop': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}

export default config 