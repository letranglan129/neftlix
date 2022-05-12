module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './comps/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'red-primary': '#f13e45',
                'dark': '#26262c',
                'gray-light': '#9a9ba4',
                'dark-border': '#42434e',
            },
            backgroundImage: {
                'dark-gradient-home': 'linear-gradient(90deg, rgba(36,38,53,1) 0%, rgba(38,41,62,1) 18%, rgba(38,39,56,1) 36%, rgba(54,40,53,1) 72%)'
            },
            screens: {
                '960': '960px',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '3rem',
              },
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/line-clamp'), 

    ],
}
