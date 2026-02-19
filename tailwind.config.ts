import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand (LLM Theme)
        primary: {
          300: '#ECF1FF', // Light brand background
          700: '#007AC8', // Main brand blue
          750: '#1E72A8', // Hover state
          800: '#0B5F95', // Pressed/active state
        },
        // Secondary/Accent
        secondary: {
          300: '#FEF9EF', // Cream background
          500: '#F3C060', // Gold/superlative
        },
        // Neutrals
        neutral: {
          0: '#FFFFFF',   // White
          50: '#F8F8FA',  // Light grey
          100: '#F3F5FB', // Light neutral
          200: '#EDEDED', // Divider
          300: '#ECF1FF', // Bright grey
          500: '#6A6A6A', // Medium grey
          800: '#333333', // Charcoal (body text)
          900: '#000000', // Black (headings)
        },
        // Feedback
        feedback: {
          error: '#EB4015',
          warning: '#FFB136',
          success: '#0C7663',
        },
        // Focus ring
        focus: '#80CAF4',
      },
      fontFamily: {
        display: ['var(--font-schnyder)', 'Georgia', 'Times New Roman', 'serif'],
        sans: [
          'var(--font-work-sans)',
          'Work Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif',
        ],
        body: [
          'var(--font-work-sans)',
          'Work Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'sans-serif',
        ],
      },
      fontSize: {
        // Responsive display sizes (use: text-display sm:text-display-md lg:text-display-lg)
        'display': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-md': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-xl': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg': ['2.25rem', { lineHeight: '1.15', fontWeight: '600' }],
        'headline-md': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.625' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'label': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'legal': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      maxWidth: {
        content: '640px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
        },
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
        '18': '72px',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
