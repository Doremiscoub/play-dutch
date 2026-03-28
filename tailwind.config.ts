
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
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Shadcn semantic tokens
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

        // Dutch brand colors
        'dutch-blue': "hsl(var(--dutch-blue))",
        'dutch-purple': "hsl(var(--dutch-purple))",
        'dutch-orange': "hsl(var(--dutch-orange))",
        'dutch-green': "hsl(var(--dutch-green))",

        // Trinity color scales (for direct usage)
        'trinity-blue': {
          DEFAULT: "hsl(var(--dutch-blue))",
          50: "hsl(221, 100%, 97%)",
          100: "hsl(221, 95%, 93%)",
          200: "hsl(221, 90%, 85%)",
          300: "hsl(221, 85%, 72%)",
          400: "hsl(221, 83%, 60%)",
          500: "hsl(var(--dutch-blue))",
          600: "hsl(221, 83%, 46%)",
          700: "hsl(221, 85%, 37%)",
          800: "hsl(221, 88%, 28%)",
          900: "hsl(221, 90%, 18%)",
        },
        'trinity-purple': {
          DEFAULT: "hsl(var(--dutch-purple))",
          50: "hsl(258, 100%, 97%)",
          100: "hsl(258, 95%, 93%)",
          200: "hsl(258, 90%, 85%)",
          300: "hsl(258, 85%, 75%)",
          400: "hsl(var(--dutch-purple))",
          500: "hsl(258, 85%, 58%)",
          600: "hsl(258, 88%, 48%)",
          700: "hsl(258, 90%, 38%)",
          800: "hsl(258, 92%, 28%)",
          900: "hsl(258, 95%, 18%)",
        },
        'trinity-orange': {
          DEFAULT: "hsl(var(--dutch-orange))",
          50: "hsl(25, 100%, 97%)",
          100: "hsl(25, 95%, 92%)",
          200: "hsl(25, 90%, 84%)",
          300: "hsl(25, 85%, 72%)",
          400: "hsl(25, 90%, 60%)",
          500: "hsl(var(--dutch-orange))",
          600: "hsl(25, 95%, 44%)",
          700: "hsl(25, 98%, 34%)",
          800: "hsl(25, 100%, 24%)",
          900: "hsl(25, 100%, 16%)",
        },
        'trinity-green': {
          DEFAULT: "hsl(var(--dutch-green))",
          50: "hsl(142, 100%, 97%)",
          100: "hsl(142, 85%, 90%)",
          200: "hsl(142, 80%, 80%)",
          300: "hsl(142, 75%, 65%)",
          400: "hsl(142, 71%, 52%)",
          500: "hsl(var(--dutch-green))",
          600: "hsl(142, 71%, 38%)",
          700: "hsl(142, 71%, 30%)",
          800: "hsl(142, 75%, 22%)",
          900: "hsl(142, 85%, 14%)",
        },
        'trinity-red': {
          DEFAULT: "hsl(0, 84%, 60%)",
          50: "hsl(0, 100%, 97%)",
          100: "hsl(0, 95%, 90%)",
          200: "hsl(0, 90%, 82%)",
          300: "hsl(0, 85%, 72%)",
          400: "hsl(0, 84%, 66%)",
          500: "hsl(0, 84%, 60%)",
          600: "hsl(0, 84%, 52%)",
          700: "hsl(0, 84%, 44%)",
          800: "hsl(0, 85%, 34%)",
          900: "hsl(0, 85%, 20%)",
        },

        // Semantic
        'success': "hsl(var(--dutch-green))",
        'warning': "hsl(45, 95%, 53%)",
        'error': "hsl(0, 85%, 60%)",
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
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glass': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'glass-lg': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'elevated': '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'elevated-lg': '0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
