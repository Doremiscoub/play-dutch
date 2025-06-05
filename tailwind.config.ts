
import type { Config } from "tailwindcss";
import { COLORS, TYPOGRAPHY, BORDERS, SHADOWS, ANIMATIONS } from "./src/config/theme";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				
				// Couleurs Dutch complètes avec toutes les variantes
				'dutch-blue': '#0A84FF',
				'dutch-blue-50': '#E6F3FF',
				'dutch-blue-100': '#CCE7FF',
				'dutch-blue-200': '#99CFFF',
				'dutch-blue-300': '#66B7FF',
				'dutch-blue-400': '#339FFF',
				'dutch-blue-500': '#0A84FF',
				'dutch-blue-600': '#0062CC',
				'dutch-blue-700': '#004699',
				'dutch-blue-800': '#002A66',
				'dutch-blue-900': '#000E33',
				'dutch-blue-light': '#5AC8FA',
				'dutch-blue-dark': '#0062CC',
				
				'dutch-purple': '#8B5CF6',
				'dutch-purple-50': '#F3EEFF',
				'dutch-purple-100': '#E7DDFF',
				'dutch-purple-200': '#CFBBFF',
				'dutch-purple-300': '#B799FF',
				'dutch-purple-400': '#9F77FF',
				'dutch-purple-500': '#8B5CF6',
				'dutch-purple-600': '#6D28D9',
				'dutch-purple-700': '#5B21B6',
				'dutch-purple-800': '#4C1D95',
				'dutch-purple-900': '#3C1A78',
				'dutch-purple-light': '#C4B5FD',
				'dutch-purple-dark': '#6D28D9',
				
				'dutch-orange': '#FF9F0A',
				'dutch-orange-50': '#FFF4E6',
				'dutch-orange-100': '#FFE9CC',
				'dutch-orange-200': '#FFD399',
				'dutch-orange-300': '#FFBD66',
				'dutch-orange-400': '#FFA733',
				'dutch-orange-500': '#FF9F0A',
				'dutch-orange-600': '#E67700',
				'dutch-orange-700': '#CC5500',
				'dutch-orange-800': '#B33300',
				'dutch-orange-900': '#991100',
				'dutch-orange-light': '#FFD60A',
				'dutch-orange-dark': '#E67700',
				
				'dutch-pink': '#FF375F',
				'dutch-red': '#FF453A',
				'dutch-green': '#30D158',
				'dutch-yellow': '#FFD60A',
				'dutch-background': '#F2F2F7',
				'dutch-card': '#FFFFFF',
				'dutch-primary': '#0A84FF',
				
				// Namespace "dutch" pour compatibilité
				dutch: {
					blue: '#0A84FF',
					'blue-light': '#5AC8FA',
					'blue-dark': '#0062CC',
					orange: '#FF9F0A',
					'orange-light': '#FFD60A',
					'orange-dark': '#E67700',
					purple: '#8B5CF6',
					'purple-light': '#C4B5FD',
					'purple-dark': '#6D28D9',
					pink: '#FF375F',
					red: '#FF453A',
					green: '#30D158',
					yellow: '#FFD60A',
					background: '#F2F2F7',
					card: '#FFFFFF',
					primary: '#0A84FF',
				},
				
				// Couleurs iOS pour cohérence
				ios: {
					blue: '#0A84FF',
					green: '#30D158', 
					indigo: '#5856D6',
					orange: '#FF9F0A',
					pink: '#FF375F',
					purple: '#BF5AF2',
					red: '#FF453A',
					teal: '#64D2FF',
					yellow: '#FFD60A',
					gray: '#8E8E93',
					background: '#F2F2F7',
					card: '#FFFFFF',
					'dark-blue': '#0A84FF',
					'light-blue': '#64D2FF',
					'light-gray': '#E5E5EA',
					'ultra-light-gray': '#F2F2F7',
					'dark-gray': '#8E8E93',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': BORDERS.radius['2xl'],
				'3xl': BORDERS.radius['3xl'],
				'4xl': '2.5rem',
			},
			boxShadow: {
				card: SHADOWS.card,
				glass: SHADOWS.glassCard,
				button: SHADOWS.glassButton,
			},
			fontFamily: {
				sans: ['SF Pro Text', 'SF Pro Display', 'system-ui', 'sans-serif'],
				mono: TYPOGRAPHY.fontFamily.mono,
				apple: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1',
					},
					'50%': {
						opacity: '0.8',
					},
				},
				'scale': {
					'0%': {
						transform: 'scale(0.95)',
					},
					'100%': {
						transform: 'scale(1)',
					},
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
				'ios-bounce': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					},
				},
				'ios-pop': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0.7',
					},
					'70%': {
						transform: 'scale(1.05)',
						opacity: '1',
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1',
					},
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'pulse-soft': 'pulse-soft 2s infinite ease-in-out',
				'scale': 'scale 0.2s ease-out',
				'float': 'float 6s infinite ease-in-out',
				'ios-bounce': 'ios-bounce 2s infinite ease-in-out',
				'ios-pop': 'ios-pop 0.3s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
			},
			backdropBlur: {
				xs: '2px',
			},
			transitionDuration: {
				DEFAULT: ANIMATIONS.duration.normal,
				fast: ANIMATIONS.duration.fast,
				slow: ANIMATIONS.duration.slow,
			},
			transitionTimingFunction: {
				DEFAULT: ANIMATIONS.easing.inOut,
				bounce: ANIMATIONS.easing.bounce,
				ios: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-subtle': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
				'shimmer': 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
