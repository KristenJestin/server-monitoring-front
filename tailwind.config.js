const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const { lightBlue, ...allColors } = colors

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
            ...allColors,
            primary: colors.purple,
            secondary: colors.blue,
            neutral: colors.gray,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@vueform/slider/tailwind')],
}
