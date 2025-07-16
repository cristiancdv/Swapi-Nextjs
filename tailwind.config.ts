import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [
    heroui({
      themes:{
        light:{
          colors:{
            primary: '#FFD34E'
          }
        },
        dark:{
          colors:{
            primary: '#FFD34E'
          }
        }
      }
    })
  ],
};

export default config;
