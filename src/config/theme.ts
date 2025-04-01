
/**
 * Configuration centralisée du thème Dutch
 * Ce fichier contient toutes les définitions de style, couleurs, et variables visuelles
 * qui sont utilisées à travers l'application pour garantir cohérence et maintenabilité
 */

// Types
export type ThemeType = 'default' | 'blue' | 'purple' | 'orange' | string;

// Couleurs de base
export const COLORS = {
  // Couleurs principales
  blue: {
    DEFAULT: '#1EAEDB',
    light: '#70D6F7',
    dark: '#1899C2',
  },
  purple: {
    DEFAULT: '#8B5CF6',
    light: '#C4B5FD',
    dark: '#7649F1',
  },
  orange: {
    DEFAULT: '#F97316',
    light: '#FDBA74',
    dark: '#EA580C',
  },
  // Couleurs additionnelles
  pink: '#D946EF',
  red: '#EF4444',
  green: '#10B981',
  yellow: '#FBBF24',
  // Neutres
  white: '#FFFFFF',
  black: '#000000',
  gray: {
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
};

// Typographie
export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'Inter, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Espacement
export const SPACING = {
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
};

// Bordures
export const BORDERS = {
  radius: {
    none: '0',
    sm: '0.25rem',     // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    full: '9999px',
  },
  width: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
};

// Ombres
export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
  md: '0 4px 6px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.03), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.02), 0 10px 10px rgba(0, 0, 0, 0.04)',
  card: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
  glassButton: '0 2px 10px rgba(0, 0, 0, 0.05)',
  glassCard: '0 8px 32px rgba(31, 38, 135, 0.1)',
};

// Animations
export const ANIMATIONS = {
  duration: {
    fastest: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slowest: '0.8s',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  transition: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    button: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Z-Index
export const Z_INDEX = {
  behind: -1,
  base: 0,
  elevated: 1,
  header: 10,
  modal: 20,
  toast: 30,
  tooltip: 40,
  max: 50,
};

// Configuration du glassmorphisme
export const GLASS = {
  light: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  heavy: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
};

// Configuration du fond animé
export const BACKGROUND_CONFIG = {
  grid: {
    size: '24px',
    color: '#DADADA',
    opacity: 0.1,
  },
  dots: {
    colors: [COLORS.purple.light, COLORS.orange.light, '#6EE7B7', COLORS.blue.light],
    sizes: ['2px', '4px', '6px', '8px'],
    count: { default: 40, subtle: 25, minimal: 15 },
    speed: { default: 0.5, subtle: 0.3, minimal: 0.2 },
  },
  waves: {
    primaryColor: '#E9D5FF', // Violet pâle
    secondaryColor: '#FDE68A', // Orange pâle
    heightPercentage: 20,
  },
};

// Définition des thèmes
export const THEMES = {
  default: {
    id: 'default',
    name: 'Défaut',
    colors: {
      primary: COLORS.blue.DEFAULT,
      secondary: COLORS.purple.DEFAULT,
      accent: COLORS.orange.DEFAULT,
      background: COLORS.gray[50],
    },
  },
  blue: {
    id: 'blue',
    name: 'Bleu',
    colors: {
      primary: COLORS.blue.DEFAULT,
      secondary: COLORS.blue.light,
      accent: '#93C5FD',
      background: '#EFF6FF',
    },
  },
  purple: {
    id: 'purple',
    name: 'Violet',
    colors: {
      primary: COLORS.purple.DEFAULT,
      secondary: COLORS.purple.light,
      accent: '#C4B5FD', 
      background: '#F5F3FF',
    },
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    colors: {
      primary: COLORS.orange.DEFAULT,
      secondary: COLORS.orange.light,
      accent: '#FDBA74',
      background: '#FFF7ED',
    },
  },
};

// Configuration des composants d'interface utilisateur communs
export const COMPONENT_STYLES = {
  // Styles de boutons
  button: {
    base: 'transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: `bg-[${COLORS.blue.DEFAULT}] text-white hover:bg-[${COLORS.blue.dark}]`,
    secondary: `bg-[${COLORS.purple.DEFAULT}] text-white hover:bg-[${COLORS.purple.dark}]`,
    accent: `bg-[${COLORS.orange.DEFAULT}] text-white hover:bg-[${COLORS.orange.dark}]`,
    ghost: 'bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm hover:bg-white/90',
    rounded: {
      sm: BORDERS.radius.sm,
      DEFAULT: BORDERS.radius.DEFAULT,
      md: BORDERS.radius.md,
      lg: BORDERS.radius.lg,
      xl: BORDERS.radius.xl,
      full: BORDERS.radius.full,
    },
    padding: {
      sm: `${SPACING[2]} ${SPACING[3]}`,
      DEFAULT: `${SPACING[3]} ${SPACING[4]}`,
      lg: `${SPACING[4]} ${SPACING[6]}`,
    },
  },
  
  // Styles de cartes
  card: {
    base: 'overflow-hidden transition-all',
    glass: 'bg-white/80 backdrop-blur-md border border-white/40 shadow-sm',
    rounded: BORDERS.radius.lg,
    padding: {
      sm: SPACING[3],
      DEFAULT: SPACING[4],
      lg: SPACING[6],
    },
    hover: 'hover:shadow-md hover:bg-white/90',
  },
  
  // Styles de texte
  text: {
    heading: {
      base: 'font-semibold',
      gradient: 'bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent',
      sizes: {
        sm: TYPOGRAPHY.fontSize.xl,
        DEFAULT: TYPOGRAPHY.fontSize['2xl'],
        lg: TYPOGRAPHY.fontSize['3xl'],
        xl: TYPOGRAPHY.fontSize['4xl'],
      },
    },
    body: {
      base: 'text-gray-600',
      sizes: {
        sm: TYPOGRAPHY.fontSize.sm,
        DEFAULT: TYPOGRAPHY.fontSize.base,
        lg: TYPOGRAPHY.fontSize.lg,
      },
    },
  },
  
  // Styles d'entrée
  input: {
    base: 'transition-all focus:outline-none focus:ring-2',
    default: 'bg-white/90 border border-gray-200 focus:border-dutch-blue focus:ring-dutch-blue/20',
    glass: 'bg-white/70 backdrop-blur-sm border border-white/30 focus:border-white/50 focus:ring-white/20',
    rounded: BORDERS.radius.md,
    padding: `${SPACING[2]} ${SPACING[3]}`,
  },
  
  // Styles d'effets
  effects: {
    confetti: {
      colors: [COLORS.blue.DEFAULT, COLORS.purple.DEFAULT, COLORS.orange.DEFAULT],
      duration: 3000,
    },
    badges: {
      base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      colors: {
        blue: `bg-blue-100 text-[${COLORS.blue.DEFAULT}]`,
        purple: `bg-purple-100 text-[${COLORS.purple.DEFAULT}]`,
        orange: `bg-orange-100 text-[${COLORS.orange.DEFAULT}]`,
        green: `bg-green-100 text-[${COLORS.green}]`,
        red: `bg-red-100 text-[${COLORS.red}]`,
      },
    },
  },
};

// Assemblage de la config complète
const themeConfig = {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  Z_INDEX,
  GLASS,
  BACKGROUND_CONFIG,
  THEMES,
  COMPONENT_STYLES,
};

export default themeConfig;
