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
            // ...allColors,
            transparent: 'transparent',
            white: allColors.white,
            gray: allColors.coolGray,
            red: allColors.red,
            green: allColors.green,
            yellow: allColors.yellow,
            primary: colors.purple,
        },
    },
    variants: {
        extend: {
            borderWidth: ['first'],
            display: ['group-hover'],
            inset: ['group-hover'],
            margin: ['last'],
        },
    },
    plugins: [],
}
