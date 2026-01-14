/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#c084fc',
                secondary: '#ec4899',
                accent: '#f0abfc',
                'accent-glow': '#e879f9',
                'bg-primary': '#0a0015',
                'bg-secondary': '#1a0b2e',
                'text-primary': '#fae8ff',
                'text-secondary': '#e9d5ff',
                'text-muted': '#c4b5fd',
                success: '#86efac',
                warning: '#fcd34d',
                error: '#fda4af',
                info: '#a5b4fc',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            borderRadius: {
                'soft': '12px',
                'softer': '16px',
                'softest': '24px',
            },
            backdropBlur: {
                'glass': '12px',
            },
            transitionDuration: {
                'smooth': '300ms',
                'graceful': '500ms',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(236, 72, 153, 0.3)',
                'glow-lg': '0 0 40px rgba(236, 72, 153, 0.4)',
                'purple-glow': '0 0 20px rgba(192, 132, 252, 0.3)',
                'purple-glow-lg': '0 0 40px rgba(192, 132, 252, 0.4)',
            },
        },
    },
    plugins: [],
}
