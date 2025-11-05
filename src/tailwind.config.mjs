/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.03em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.04em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.05em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.06em', fontWeight: '500' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.07em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.08em', fontWeight: '600' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '0.09em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.11em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.13em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "poppins-v2",
                paragraph: "open sans"
            },
            colors: {
                'brand-purple': '#8B5CF6',
                'brand-purple-light': '#A855F7',
                'brand-purple-accent': '#C084FC',
                'brand-purple-dark': '#7C3AED',
                'brand-blue': '#3B82F6',
                'brand-blue-light': '#60A5FA',
                'brand-blue-accent': '#93C5FD',
                'brand-blue-dark': '#2563EB',
                'light-gray': '#E0E0E0',
                destructive: '#FF4136',
                'destructive-foreground': '#FFFFFF',
                background: '#0F0A1A',
                secondary: '#8B5CF6',
                foreground: '#FFFFFF',
                'secondary-foreground': '#FFFFFF',
                'primary-foreground': '#FFFFFF',
                primary: '#8B5CF6'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
