
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dutch Color Scheme - iOS Inspired
        'dutch-blue': {
          DEFAULT: '#0A84FF',
          50: '#E6F3FF',
          100: '#B3DCFF',
          200: '#80C5FF',
          300: '#4DAFFF',
          400: '#1A98FF',
          500: '#0A84FF',
          600: '#0062CC',
          700: '#004B99',
          800: '#003366',
          900: '#001B33',
        },
        'dutch-purple': {
          DEFAULT: '#8B5CF6',
          50: '#F3F0FF',
          100: '#E0D4FF',
          200: '#C4B5FD',
          300: '#A78BFA',
          400: '#8B5CF6',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3C1A78',
        },
        'dutch-orange': {
          DEFAULT: '#FF9F0A',
          50: '#FFF8E6',
          100: '#FFECB3',
          200: '#FFE080',
          300: '#FFD54D',
          400: '#FFCA1A',
          500: '#FF9F0A',
          600: '#E67700',
          700: '#CC5500',
          800: '#B33300',
          900: '#801A00',
        },
        // iOS Color System
        'ios-blue': '#0A84FF',
        'ios-purple': '#8B5CF6',
        'ios-orange': '#FF9F0A',
        'ios-green': '#30D158',
        'ios-red': '#FF453A',
        'ios-yellow': '#FFD60A',
        'ios-pink': '#FF375F',
        'ios-gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { 
            opacity: '1', 
            transform: 'scale(1) rotate(0deg)' 
          },
          '25%': { 
            opacity: '0.8', 
            transform: 'scale(1.02) rotate(90deg)' 
          },
          '50%': { 
            opacity: '1', 
            transform: 'scale(1.05) rotate(180deg)' 
          },
          '75%': { 
            opacity: '0.9', 
            transform: 'scale(1.01) rotate(270deg)' 
          },
        },
        'holographic': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: 'shimmer 2s infinite linear',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite 2s',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        sparkle: 'sparkle 2s ease-in-out infinite',
        holographic: 'holographic 3s ease infinite',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 16px 50px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'glass-xl': '0 24px 70px rgba(0, 0, 0, 0.18), inset 0 2px 0 rgba(255, 255, 255, 0.35)',
        'dutch': '0 10px 30px rgba(10, 132, 255, 0.2)',
        'dutch-lg': '0 20px 50px rgba(10, 132, 255, 0.3)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-orange': '0 0 20px rgba(255, 159, 10, 0.4)',
      },
      fontFamily: {
        'ios': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
