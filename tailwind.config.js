/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-border-color': '#E9E8E3',
            },
            fontFamily: {
                iran: ['YourChosenPersianFont', 'sans-serif'], // نام فونت فارسی خود را جایگزین کنید
            },
        },
    },
    plugins: [],
}
