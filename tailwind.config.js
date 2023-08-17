/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            keyframes: {
                wave: {
                    '0%': {transform: 'rotate(0.0deg)'},
                    '10%': {transform: 'rotate(14deg)'},
                    '20%': {transform: 'rotate(-8deg)'},
                    '30%': {transform: 'rotate(14deg)'},
                    '40%': {transform: 'rotate(-4deg)'},
                    '50%': {transform: 'rotate(10.0deg)'},
                    '60%': {transform: 'rotate(0.0deg)'},
                    '100%': {transform: 'rotate(0.0deg)'},
                },
                fadeOut: {
                    '0%': {transition: 'visibility 0s 2s, opacity 2s linear'},
                    '100%': {transform: 'linear'},
                },
            },
            animation: {
                fade: 'fadeOut 5s ease-in-out',
                'waving-hand': 'wave 2s linear infinite',
            },
        },
    },
    plugins: [
        require('autoprefixer'),
        require('tailwindcss'),
    ],
}
