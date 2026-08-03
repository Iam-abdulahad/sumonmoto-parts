/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0B1220',
          800: '#111827',
          700: '#1F2937',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1', // adding for borders/secondary buttons
          500: '#64748B',
          700: '#334155',
          900: '#0F172A',
        },
        accent: {
          100: '#FFEDD5',
          500: '#F97316',
          600: '#EA580C',
        },
        info: {
          500: '#2563EB',
        },
        success: {
          500: '#16A34A',
        },
        warning: {
          500: '#D97706',
        },
        danger: {
          500: '#DC2626',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      scrollBehavior: ['smooth'],
    },
  },
  plugins: [],
};
