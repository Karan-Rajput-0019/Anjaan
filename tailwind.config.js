/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'xs': '320px',
            'sm': '768px',
            'md': '1024px',
            'lg': '1280px',
            'xl': '1920px',
        },
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
            fontSize: {
                'adaptive-base': 'clamp(14px, 1.2vw, 18px)',
                'adaptive-lg': 'clamp(18px, 2vw, 24px)',
                'adaptive-xl': 'clamp(24px, 3vw, 36px)',
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'responsive-p': 'clamp(1rem, 3vw, 2rem)',
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
