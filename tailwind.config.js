const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                header: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            ...colors,
            primary: colors.orange,
            secondary: colors.blue,
            neutral: colors.gray,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
