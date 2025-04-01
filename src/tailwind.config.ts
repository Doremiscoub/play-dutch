
import type { Config } from "tailwindcss";
import { COLORS, TYPOGRAPHY, BORDERS, SHADOWS, ANIMATIONS } from "./config/theme";

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
				// Couleurs Dutch basées sur notre configuration de thème
				dutch: {
					blue: COLORS.blue.DEFAULT,
					orange: COLORS.orange.DEFAULT,
					purple: COLORS.purple.DEFAULT,
					pink: COLORS.pink,
					red: COLORS.red,
					green: COLORS.green,
					yellow: COLORS.yellow,
					background: COLORS.gray[50],
					card: COLORS.white,
				},
				ios: {
					blue: '#007AFF',
					green: '#34C759',
					indigo: '#5856D6',
					orange: '#FF9500',
					pink: '#FF2D55',
					purple: '#AF52DE',
					red: '#FF3B30',
					teal: '#5AC8FA',
					yellow: '#FFCC00',
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
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
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
			},
			backdropBlur: {
				xs: '2px',
			},
			fontFamily: {
				sans: TYPOGRAPHY.fontFamily.sans,
				mono: TYPOGRAPHY.fontFamily.mono,
			},
			boxShadow: {
				card: SHADOWS.card,
				glass: SHADOWS.glassCard,
				button: SHADOWS.glassButton,
			},
			transitionDuration: {
				DEFAULT: ANIMATIONS.duration.normal,
				fast: ANIMATIONS.duration.fast,
				slow: ANIMATIONS.duration.slow,
			},
			transitionTimingFunction: {
				DEFAULT: ANIMATIONS.easing.inOut,
				bounce: ANIMATIONS.easing.bounce,
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
