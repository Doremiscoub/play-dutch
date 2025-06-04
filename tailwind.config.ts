import type { Config } from "tailwindcss";
import { COLORS, TYPOGRAPHY, BORDERS, SHADOWS, ANIMATIONS } from "./src/config/theme";
import { GAME_TYPOGRAPHY } from "./src/config/theme/gameTypography";

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
					'blue-light': COLORS.blue.light,
					'blue-dark': COLORS.blue.dark, 
					orange: COLORS.orange.DEFAULT,
					'orange-light': COLORS.orange.light,
					'orange-dark': COLORS.orange.dark,
					purple: COLORS.purple.DEFAULT,
					'purple-light': COLORS.purple.light,
					'purple-dark': COLORS.purple.dark,
					pink: COLORS.pink,
					red: COLORS.red,
					green: COLORS.green,
					yellow: COLORS.yellow,
					background: COLORS.gray[50],
					card: COLORS.white,
					primary: COLORS.blue.DEFAULT,
				},
				// Game-inspired colors
				game: {
					red: '#E31C25',      // UNO Red
					blue: '#0066CC',     // UNO Blue  
					green: '#28AA3D',    // UNO Green
					yellow: '#FEDF00',   // UNO Yellow
					purple: '#9C27B0',   // Pokémon Psychic
					orange: '#F57D31',   // Pokémon Fire
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
				// Game-inspired shadows
				'game-card': '8px 8px 0 rgba(0, 0, 0, 0.3)',
				'game-button': '0 6px 0 rgba(0, 0, 0, 0.2)',
				'game-inset': 'inset 0 2px 0 rgba(255, 255, 255, 0.3)',
			},
			fontFamily: {
				// Keep existing
				sans: ['SF Pro Text', 'SF Pro Display', 'system-ui', 'sans-serif'],
				mono: TYPOGRAPHY.fontFamily.mono,
				apple: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'system-ui', 'sans-serif'],
				// Game-inspired fonts
				game: GAME_TYPOGRAPHY.fontFamily.game,
				action: GAME_TYPOGRAPHY.fontFamily.action,
				score: GAME_TYPOGRAPHY.fontFamily.score,
				adventure: GAME_TYPOGRAPHY.fontFamily.adventure,
				body: GAME_TYPOGRAPHY.fontFamily.body,
				classic: GAME_TYPOGRAPHY.fontFamily.classic,
			},
			fontSize: {
				// Add game typography sizes
				...GAME_TYPOGRAPHY.fontSize,
			},
			fontWeight: {
				// Add game typography weights
				...GAME_TYPOGRAPHY.fontWeight,
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
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				// Game-inspired animations
				'game-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'card-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(90deg)' },
					'100%': { transform: 'rotateY(0deg)' }
				}
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
				'shimmer': 'shimmer 3s infinite linear',
				'game-bounce': 'game-bounce 1s infinite ease-in-out',
				'card-flip': 'card-flip 0.6s ease-in-out',
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
			// Game-inspired border widths
			borderWidth: {
				'3': '3px',
				'5': '5px',
				'6': '6px',
			},
			// Game-inspired spacing
			spacing: {
				'18': '4.5rem',
				'72': '18rem',
				'84': '21rem',
				'96': '24rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
