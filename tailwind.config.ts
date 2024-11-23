import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        geistSans: ['var(--font-geist-sans)'],
        geistMono: ['var(--font-geist-mono)']
      },
      keyframes: {
        'logo-marquee-move': {
          to: {
            transform: 'translateX(-50%)'
          }
        }
      },
      animation: {
        'logo-marquee': 'logo-marquee-move 60s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;