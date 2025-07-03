
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
        // Shadcn UI semantic tokens
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
        
        // Dutch Trinity - Couleurs principales (utilisant des tokens sémantiques)
        'dutch-blue': "hsl(var(--dutch-blue))",
        'dutch-purple': "hsl(var(--dutch-purple))",
        'dutch-orange': "hsl(var(--dutch-orange))",
        'dutch-green': "hsl(var(--dutch-green))",
        
        // Variants Dutch Trinity avec échelle complète HSL
        'trinity-blue': {
          DEFAULT: "hsl(var(--dutch-blue))",
          50: "hsl(221, 100%, 97%)",
          100: "hsl(221, 95%, 92%)",
          200: "hsl(221, 90%, 84%)",
          300: "hsl(221, 85%, 72%)",
          400: "hsl(221, 80%, 60%)",
          500: "hsl(var(--dutch-blue))",
          600: "hsl(221, 83%, 45%)",
          700: "hsl(221, 85%, 35%)",
          800: "hsl(221, 88%, 25%)",
          900: "hsl(221, 90%, 15%)",
          950: "hsl(221, 95%, 8%)",
        },
        'trinity-purple': {
          DEFAULT: "hsl(var(--dutch-purple))",
          50: "hsl(258, 100%, 97%)",
          100: "hsl(258, 95%, 92%)",
          200: "hsl(258, 90%, 84%)",
          300: "hsl(258, 85%, 75%)",
          400: "hsl(var(--dutch-purple))",
          500: "hsl(258, 85%, 58%)",
          600: "hsl(258, 88%, 48%)",
          700: "hsl(258, 90%, 38%)",
          800: "hsl(258, 92%, 28%)",
          900: "hsl(258, 95%, 18%)",
          950: "hsl(258, 98%, 10%)",
        },
        'trinity-orange': {
          DEFAULT: "hsl(var(--dutch-orange))",
          50: "hsl(25, 100%, 97%)",
          100: "hsl(25, 95%, 92%)",
          200: "hsl(25, 90%, 84%)",
          300: "hsl(25, 85%, 72%)",
          400: "hsl(25, 80%, 60%)",
          500: "hsl(var(--dutch-orange))",
          600: "hsl(25, 95%, 45%)",
          700: "hsl(25, 98%, 35%)",
          800: "hsl(25, 100%, 25%)",
          900: "hsl(25, 100%, 15%)",
          950: "hsl(25, 100%, 8%)",
        },
        'trinity-green': {
          DEFAULT: "hsl(var(--dutch-green))",
          50: "hsl(142, 100%, 97%)",
          100: "hsl(142, 85%, 90%)",
          200: "hsl(142, 80%, 80%)",
          300: "hsl(142, 75%, 65%)",
          400: "hsl(142, 70%, 55%)",
          500: "hsl(var(--dutch-green))",
          600: "hsl(142, 71%, 40%)",
          700: "hsl(142, 71%, 35%)",
          800: "hsl(142, 75%, 25%)",
          900: "hsl(142, 85%, 15%)",
          950: "hsl(142, 90%, 8%)",
        },
        'trinity-red': {
          DEFAULT: "hsl(0, 84%, 60%)",
          50: "hsl(0, 100%, 97%)",
          100: "hsl(0, 95%, 90%)",
          200: "hsl(0, 90%, 80%)",
          300: "hsl(0, 85%, 70%)",
          400: "hsl(0, 84%, 65%)",
          500: "hsl(0, 84%, 60%)",
          600: "hsl(0, 84%, 55%)",
          700: "hsl(0, 84%, 50%)",
          800: "hsl(0, 85%, 40%)",
          900: "hsl(0, 85%, 15%)",
          950: "hsl(0, 90%, 8%)",
        },
        
        // Couleurs sémantiques Dutch
        'success': "hsl(var(--dutch-green))",
        'success-light': "hsl(142, 71%, 65%)",
        'success-dark': "hsl(142, 71%, 35%)",
        
        'warning': "hsl(45, 95%, 53%)",
        'warning-light': "hsl(45, 95%, 73%)",
        'warning-dark': "hsl(45, 95%, 33%)",
        
        'error': "hsl(0, 85%, 60%)",
        'error-light': "hsl(0, 85%, 80%)",
        'error-dark': "hsl(0, 85%, 40%)",
        
        // Surfaces glassmorphisme VisionOS
        'glass': {
          DEFAULT: "rgba(255, 255, 255, 0.7)",
          light: "rgba(255, 255, 255, 0.8)",
          medium: "rgba(255, 255, 255, 0.6)",
          heavy: "rgba(255, 255, 255, 0.5)",
          dark: "rgba(30, 30, 30, 0.7)",
        },
        
        // Neutral système unifié HSL
        neutral: {
          0: "hsl(0, 0%, 100%)",
          50: "hsl(210, 40%, 98%)",
          100: "hsl(210, 40%, 96%)",
          200: "hsl(214, 32%, 91%)",
          300: "hsl(213, 27%, 84%)",
          400: "hsl(215, 20%, 65%)",
          500: "hsl(215, 16%, 47%)",
          600: "hsl(215, 19%, 35%)",
          700: "hsl(215, 25%, 27%)",
          800: "hsl(217, 33%, 17%)",
          900: "hsl(222, 84%, 5%)",
          950: "hsl(229, 84%, 2%)",
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
        // Système d'ombres glassmorphisme VisionOS
        'glass': '0 8px 32px rgba(31, 38, 135, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-sm': '0 4px 16px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'glass-lg': '0 16px 50px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'glass-xl': '0 24px 70px rgba(31, 38, 135, 0.18), inset 0 2px 0 rgba(255, 255, 255, 0.35)',
        'glass-2xl': '0 32px 90px rgba(31, 38, 135, 0.22), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
        
        // Ombres Dutch Trinity
        'dutch-blue': '0 10px 30px hsla(var(--dutch-blue), 0.2)',
        'dutch-purple': '0 10px 30px hsla(var(--dutch-purple), 0.2)',
        'dutch-orange': '0 10px 30px hsla(var(--dutch-orange), 0.2)',
        'dutch-trinity': '0 10px 30px hsla(var(--dutch-blue), 0.1), 0 20px 50px hsla(var(--dutch-purple), 0.1), 0 30px 70px hsla(var(--dutch-orange), 0.05)',
        
        // Effets gaming
        'glow-blue': '0 0 20px hsla(var(--dutch-blue), 0.4), 0 0 40px hsla(var(--dutch-blue), 0.2)',
        'glow-purple': '0 0 20px hsla(var(--dutch-purple), 0.4), 0 0 40px hsla(var(--dutch-purple), 0.2)',
        'glow-orange': '0 0 20px hsla(var(--dutch-orange), 0.4), 0 0 40px hsla(var(--dutch-orange), 0.2)',
        'holographic': '0 0 30px hsla(var(--dutch-blue), 0.3), 0 0 60px hsla(var(--dutch-purple), 0.2), 0 0 90px hsla(var(--dutch-orange), 0.1)',
      },
      fontFamily: {
        // Dutch Typography System
        'sans': ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'gaming': ['Orbitron', 'Space Grotesk', 'system-ui', 'sans-serif'],
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
