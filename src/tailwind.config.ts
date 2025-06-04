import type { Config } from "tailwindcss";
import { COLORS, TYPOGRAPHY, BORDERS, SHADOWS, ANIMATIONS } from "./config/theme";
import { SEMANTIC_COLORS, GAME_COLORS, STATE_COLORS, SURFACE_COLORS } from "./config/theme/semantic-colors";

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
				
				// Système de couleurs Dutch sémantiques unifié
				game: {
					// Couleurs principales avec variants complets
					blue: GAME_COLORS.blue,
					'blue-light': GAME_COLORS.blueLight,
					'blue-dark': GAME_COLORS.blueDark,
					'blue-ultra-light': GAME_COLORS.blueUltraLight,
					
					purple: GAME_COLORS.purple,
					'purple-light': GAME_COLORS.purpleLight,
					'purple-dark': GAME_COLORS.purpleDark,
					'purple-ultra-light': GAME_COLORS.purpleUltraLight,
					
					orange: GAME_COLORS.orange,
					'orange-light': GAME_COLORS.orangeLight,
					'orange-dark': GAME_COLORS.orangeDark,
					'orange-ultra-light': GAME_COLORS.orangeUltraLight,
					
					// États avec variants
					success: GAME_COLORS.success,
					'success-light': GAME_COLORS.successLight,
					'success-dark': GAME_COLORS.successDark,
					'success-ultra-light': GAME_COLORS.successUltraLight,
					
					warning: GAME_COLORS.warning,
					'warning-light': GAME_COLORS.warningLight,
					'warning-dark': GAME_COLORS.warningDark,
					'warning-ultra-light': GAME_COLORS.warningUltraLight,
					
					error: GAME_COLORS.error,
					'error-light': GAME_COLORS.errorLight,
					'error-dark': GAME_COLORS.errorDark,
					'error-ultra-light': GAME_COLORS.errorUltraLight,
					
					info: GAME_COLORS.info,
					'info-light': GAME_COLORS.infoLight,
					'info-dark': GAME_COLORS.infoDark,
					'info-ultra-light': GAME_COLORS.infoUltraLight,
					
					// Surfaces
					background: GAME_COLORS.background,
					surface: GAME_COLORS.surface,
					'surface-container': GAME_COLORS.surfaceContainer,
				},
				
				// Tokens sémantiques séparés pour plus de flexibilité
				semantic: {
					primary: SEMANTIC_COLORS.primary,
					'primary-light': SEMANTIC_COLORS.primaryLight,
					'primary-dark': SEMANTIC_COLORS.primaryDark,
					'primary-ultra-light': SEMANTIC_COLORS.primaryUltraLight,
					
					secondary: SEMANTIC_COLORS.secondary,
					'secondary-light': SEMANTIC_COLORS.secondaryLight,
					'secondary-dark': SEMANTIC_COLORS.secondaryDark,
					'secondary-ultra-light': SEMANTIC_COLORS.secondaryUltraLight,
					
					accent: SEMANTIC_COLORS.accent,
					'accent-light': SEMANTIC_COLORS.accentLight,
					'accent-dark': SEMANTIC_COLORS.accentDark,
					'accent-ultra-light': SEMANTIC_COLORS.accentUltraLight,
					
					// États
					success: SEMANTIC_COLORS.success,
					'success-light': SEMANTIC_COLORS.successLight,
					'success-dark': SEMANTIC_COLORS.successDark,
					'success-ultra-light': SEMANTIC_COLORS.successUltraLight,
					
					warning: SEMANTIC_COLORS.warning,
					'warning-light': SEMANTIC_COLORS.warningLight,
					'warning-dark': SEMANTIC_COLORS.warningDark,
					'warning-ultra-light': SEMANTIC_COLORS.warningUltraLight,
					
					error: SEMANTIC_COLORS.error,
					'error-light': SEMANTIC_COLORS.errorLight,
					'error-dark': SEMANTIC_COLORS.errorDark,
					'error-ultra-light': SEMANTIC_COLORS.errorUltraLight,
					
					info: SEMANTIC_COLORS.info,
					'info-light': SEMANTIC_COLORS.infoLight,
					'info-dark': SEMANTIC_COLORS.infoDark,
					'info-ultra-light': SEMANTIC_COLORS.infoUltraLight,
					
					// Surfaces
					surface: SEMANTIC_COLORS.surface,
					'surface-variant': SEMANTIC_COLORS.surfaceVariant,
					'surface-container': SEMANTIC_COLORS.surfaceContainer,
					'surface-container-high': SEMANTIC_COLORS.surfaceContainerHigh,
					'surface-container-highest': SEMANTIC_COLORS.surfaceContainerHighest,
					
					// Bordures
					border: SEMANTIC_COLORS.border,
					'border-light': SEMANTIC_COLORS.borderLight,
					'border-strong': SEMANTIC_COLORS.borderStrong,
					'border-subtle': SEMANTIC_COLORS.borderSubtle,
					
					// Texte
					'on-surface': SEMANTIC_COLORS.onSurface,
					'on-surface-variant': SEMANTIC_COLORS.onSurfaceVariant,
					'on-surface-muted': SEMANTIC_COLORS.onSurfaceMuted,
					'on-surface-subtle': SEMANTIC_COLORS.onSurfaceSubtle,
					'on-surface-disabled': SEMANTIC_COLORS.onSurfaceDisabled,
				},
				
				// Couleurs legacy Dutch pour compatibilité
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
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
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
				'shimmer': 'shimmer 3s infinite linear',
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
