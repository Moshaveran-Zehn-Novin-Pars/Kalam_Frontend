/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // === KALAM Design System (from Figma) ===
                primary: {
                    DEFAULT: '#51A46B',   // main green
                    dark:    '#417F56',   // darker green
                    light:   '#E5F2E9',   // background green
                    border:  '#D6E0D6',   // border green
                },
                neutral: {
                    12:    '#212121',     // darkest text
                    10:    '#505050',     // body text
                    gray2: '#EDEDED',     // light border
                },
                border: {
                    DEFAULT: '#E9E8E3',   // card border
                    green:   '#51A46B',   // green border
                },

                // Status badge colors (from Figma)
                status: {
                    pending:    '#F5A623',   // yellow
                    preparing:  '#9B59B6',   // purple
                    shipping:   '#51A46B',   // green
                    cancelled:  '#E74C3C',   // red
                    completed:  '#27AE60',   // darker green
                    disputed:   '#E67E22',   // orange
                },
            },

            fontFamily: {
                sans:   ['var(--font-iran)', 'IRANSansX', 'sans-serif'],
                kamran: ['Kamran_Font', 'sans-serif'],
            },

            borderRadius: {
                'card':   '20px',
                'button': '10px',
                'tag':    '10px',
            },

            boxShadow: {
                'card': '0 2px 8px rgba(0,0,0,0.06)',
                'card-hover': '0 4px 16px rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [],
}
