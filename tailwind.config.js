/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                cursive: ['Dancing Script', 'cursive'],
            },
            colors: {
                romantic: {
                    900: '#1A0510', // Deep dark purple/red
                    800: '#2B0A1A',
                    500: '#D946EF', // Neon Fuchsia
                    300: '#F472B6', // Soft Pink
                    100: '#FCE7F3', // Light Pink
                },
                neon: {
                    pink: '#ff007f',
                    blue: '#00fff2',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
