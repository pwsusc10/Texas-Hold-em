import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#AD975F',
        title: '#E9332F',
        gray: '#6D6D6D'
      },
      backgroundColor: {
        primary: '#0C0C0C',
        secondary: '#161616',
        tertiary: '#202020',
        quaternary: '#2E2E32',
        gray: '#6D6D6D',
        yellow: '#AD975F'
      },
      borderColor: {
        yellow: '#AD975F',
        deepdark: '#202020'
      },
      fontFamily: {}
    }
  },
  plugins: []
};
export default config;
