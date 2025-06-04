
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
				// Couleurs game unifiées basées sur notre configuration de thème
				game: {
					primary: COLORS.blue.DEFAULT,    // Main blue
					secondary: COLORS.purple.DEFAULT, // Purple accent  
					accent: COLORS.orange.DEFAULT,   // Orange highlights
					red: '#E31C25',                  // UNO Red
					blue: '#0066CC',                 // UNO Blue  
					green: '#28AA3D',                // UNO Green
					yellow: '#FEDF00',               // UNO Yellow
					purple: '#9C27B0',               // Pokémon Psychic
					orange: '#F57D31',               // Pokémon Fire
					background: COLORS.gray[50],
					card: COLORS.white,
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
				'game-bounce': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					},
				},
				'card-flip': {
					'0%': {
						transform: 'rotateY(0deg)',
					},
					'50%': {
						transform: 'rotateY(90deg)',
					},
					'100%': {
						transform: 'rotateY(0deg)',
					},
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'pulse-soft': 'pulse-soft 2s infinite ease-in-out',
				'scale': 'scale 0.2s ease-out',
				'float': 'float 6s infinite ease-in-out',
				'game-bounce': 'game-bounce 2s infinite ease-in-out',
				'card-flip': 'card-flip 0.3s ease-out',
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
