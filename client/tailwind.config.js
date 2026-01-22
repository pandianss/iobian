/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/modules/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-color': '#254aa0', // IOB Royal Blue
                'primary-hover': '#1e3a8a',
                'secondary-color': '#fccb05', // IOB Gold
                'accent-color': '#0089cf',
                'bg-color': '#f8fafc',
                'surface-color': '#ffffff',
                'text-primary': '#0f172a',
                'text-secondary': '#64748b',
                'text-inverse': '#ffffff',
                'success-color': '#10b981',
                'warning-color': '#f59e0b',
                'error-color': '#ef4444',
                'border-color': '#e2e8f0',
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(135deg, #254aa0 0%, #172554 100%)',
                'gold-gradient': 'linear-gradient(135deg, #fccb05 0%, #f59e0b 100%)',
                'danger-gradient': 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
            }
        },
    },
    plugins: [],
}
