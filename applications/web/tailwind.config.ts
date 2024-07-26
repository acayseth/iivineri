import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/theme'

const config: Config = {
  media: 'class',
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('autoprefixer'),
    nextui({
      defaultExtendTheme: 'dark',
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            default: '#333333', // Dark Gray for text and icons
            primary: '#0070f3', // Blue for primary buttons and highlights
            secondary: '#7928ca', // Purple for secondary buttons and accents
            success: '#21c465', // Green for success messages and icons
            warning: '#f5a623', // Orange for warning messages and icons
            danger: '#e00', // Red for error messages and icons
            background: '#ffffff', // White for background
            foreground: '#000000', // Black for foreground text
            content1: '#4f4f4f', // Medium Gray for primary content
            content2: '#828282', // Light Gray for secondary content
            content3: '#bdbdbd', // Lighter Gray for tertiary content
            content4: '#e0e0e0', // Very Light Gray for quaternary content
            divider: '#dcdcdc', // Light Gray for dividers and borders
            focus: '#0070f3', // Blue for focus rings and highlights
            overlay: 'rgba(0, 0, 0, 0.25)', // Semi-transparent black for overlays
          },
        },
        dark: {
          colors: {
            default: '#e0e0e0', // Light Gray for text and icons
            primary: '#4d9ef7', // Light Blue for primary buttons and highlights
            secondary: '#b36bff', // Light Purple for secondary buttons and accents
            success: '#21c465', // Green for success messages and icons
            warning: '#f5a623', // Orange for warning messages and icons
            danger: '#ff4d4d', // Light Red for error messages and icons
            background: 'rgba(31,31,31,0.53)', // Dark Gray for background
            foreground: '#ffffff', // White for foreground text
            content1: '#e0e0e0', // Light Gray for primary content
            content2: '#bdbdbd', // Medium Gray for secondary content
            content3: '#828282', // Dark Gray for tertiary content
            content4: '#4f4f4f', // Very Dark Gray for quaternary content
            divider: '#333333', // Dark Gray for dividers and borders
            focus: '#4d9ef7', // Light Blue for focus rings and highlights
            overlay: 'rgba(255, 255, 255, 0.25)', // Semi-transparent white for overlays
          },
        },
      },
    }),
  ],
}
export default config
