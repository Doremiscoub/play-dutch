
/**
 * Configuration centralisée du thème Dutch - Inspiré iOS 19 & VisionOS
 * Ce fichier contient toutes les définitions de style, couleurs, et variables visuelles
 * qui sont utilisées à travers l'application pour garantir cohérence et maintenabilité
 */

// Types
export type ThemeType = 'default' | 'light' | 'dark';

// Couleurs de base - Palette inspirée iOS 19
export const COLORS = {
  // Couleurs principales
  blue: {
    DEFAULT: '#0A84FF', // iOS blue
    light: '#5AC8FA',
    dark: '#0062CC',
  },
  purple: {
    DEFAULT: '#8B5CF6', // Purple
    light: '#C4B5FD',
    dark: '#6D28D9',
  },
  orange: {
    DEFAULT: '#FF9F0A', // iOS orange
    light: '#FFD60A',
    dark: '#E67700',
  },
  // Couleurs additionnelles
  pink: '#FF375F',
  red: '#FF453A',
  green: '#30D158',
  yellow: '#FFD60A',
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

// Typographie - Style Apple
export const TYPOGRAPHY = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, "Segoe UI", Roboto, sans-serif',
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
    '5xl': '3rem',     // 48px
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

// Bordures - VisionOS inspired (très arrondis)
export const BORDERS = {
  radius: {
    none: '0',
    sm: '0.5rem',      // 8px
    DEFAULT: '1rem',   // 16px 
    md: '1.25rem',     // 20px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '2.5rem',   // 40px 
    '3xl': '3rem',     // 48px - VisionOS style
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

// Ombres - Subtiles comme dans iOS 19/VisionOS
export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.03)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)',
  md: '0 4px 6px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.03)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.02), 0 4px 6px rgba(0, 0, 0, 0.02)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.01), 0 10px 10px rgba(0, 0, 0, 0.02)',
  card: '0 2px 8px rgba(0, 0, 0, 0.03)',
  glassButton: '0 2px 10px rgba(0, 0, 0, 0.03)',
  glassCard: '0 8px 32px rgba(31, 38, 135, 0.05)',
};

// Animations - Inspirées iOS/VisionOS
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
    // iOS springy feeling
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Dynamic Island animation
    dynamicIsland: 'cubic-bezier(0.33, 1, 0.68, 1)',
  },
  transition: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    button: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
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

// Configuration du glassmorphisme - Inspiré VisionOS
export const GLASS = {
  light: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.7)',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
  heavy: {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  dark: {
    background: 'rgba(30, 30, 30, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
    colors: ['#C4B5FD', '#FDBA74', '#6EE7B7', '#93C5FD'],
    sizes: ['2px', '4px', '6px', '8px'],
    count: { default: 40, subtle: 25, minimal: 15 },
    speed: { default: 0.5, subtle: 0.3, minimal: 0.2 },
  },
  waves: {
    primaryColor: '#E9D5FF', // Violet pâle
    secondaryColor: '#FDE68A', // Orange pâle
    heightPercentage: 20,
    animationDuration: 15, // secondes
  },
};

// Définition des thèmes
export const THEMES = {
  default: {
    id: 'default',
    name: 'Dutch',
    colors: {
      primary: COLORS.blue.DEFAULT,
      secondary: COLORS.purple.DEFAULT,
      accent: COLORS.orange.DEFAULT,
      background: COLORS.gray[50],
    },
  },
  light: {
    id: 'light',
    name: 'Clair',
    colors: {
      primary: '#0A84FF', // iOS blue
      secondary: '#5856D6', // iOS indigo
      accent: '#FF9F0A', // iOS orange
      background: '#F2F2F7', // iOS light background
    },
  },
  dark: {
    id: 'dark',
    name: 'Sombre',
    colors: {
      primary: '#0A84FF', // iOS blue dark
      secondary: '#5E5CE6', // iOS indigo dark
      accent: '#FF9F0A', // iOS orange dark
      background: '#1C1C1E', // iOS dark background
    },
  },
};

// Configuration des composants d'interface utilisateur communs - Style VisionOS
export const COMPONENT_STYLES = {
  // Styles de boutons
  button: {
    base: 'transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: `bg-[${COLORS.blue.DEFAULT}] text-white hover:bg-[${COLORS.blue.dark}]`,
    secondary: `bg-[${COLORS.purple.DEFAULT}] text-white hover:bg-[${COLORS.purple.dark}]`,
    accent: `bg-[${COLORS.orange.DEFAULT}] text-white hover:bg-[${COLORS.orange.dark}]`,
    ghost: 'bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/90',
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
  
  // Styles de cartes - VisionOS inspired
  card: {
    base: 'overflow-hidden transition-all',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm',
    rounded: BORDERS.radius['2xl'],
    padding: {
      sm: SPACING[3],
      DEFAULT: SPACING[4],
      lg: SPACING[6],
    },
    hover: 'hover:shadow-md hover:bg-white/80 transform-gpu hover:-translate-y-1 transition-all',
  },
  
  // Styles de texte - Inspiré Apple
  text: {
    heading: {
      base: 'font-medium',
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
      sizes: {
        sm: TYPOGRAPHY.fontSize.xl,
        DEFAULT: TYPOGRAPHY.fontSize['2xl'],
        lg: TYPOGRAPHY.fontSize['3xl'],
        xl: TYPOGRAPHY.fontSize['4xl'],
      },
    },
    body: {
      base: 'text-gray-700',
      sizes: {
        sm: TYPOGRAPHY.fontSize.sm,
        DEFAULT: TYPOGRAPHY.fontSize.base,
        lg: TYPOGRAPHY.fontSize.lg,
      },
    },
  },
  
  // Styles d'entrée - Style iOS/VisionOS
  input: {
    base: 'transition-all focus:outline-none focus:ring-2',
    default: 'bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-blue-500/20',
    glass: 'bg-white/60 backdrop-blur-xl border border-white/50 focus:border-white/70 focus:ring-white/30',
    rounded: BORDERS.radius.xl,
    padding: `${SPACING[3]} ${SPACING[4]}`,
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
  
  // Configuration VisionOS
  visionOS: {
    glassPanel: 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-3xl',
    floatingButton: 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-md rounded-2xl transform-gpu transition-all hover:-translate-y-0.5 hover:shadow-lg',
    tooltip: 'bg-white/90 backdrop-blur-xl border border-white/70 shadow-md rounded-xl px-3 py-1.5 text-sm',
    header: 'bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-sm',
    navBar: 'bg-white/60 backdrop-blur-xl border-t border-white/30 shadow-sm',
    tooltip: 'bg-white/80 backdrop-blur-xl shadow-sm rounded-xl px-3 py-1.5',
    shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent',
  }
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
