

/**
 * Configuration des composants d'interface utilisateur - Style VisionOS
 */
import { COLORS } from './colors';
import { DESIGN_COLORS } from '@/design/tokens/colors';

export const GLASS = {
  light: {
    background: DESIGN_COLORS.semantic.overlay.medium,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${DESIGN_COLORS.semantic.glass.border}`,
  },
  medium: {
    background: DESIGN_COLORS.semantic.overlay.subtle,
    backdropFilter: 'blur(15px)',
    border: `1px solid ${DESIGN_COLORS.semantic.glass.border}`,
  },
  heavy: {
    background: DESIGN_COLORS.semantic.overlay.subtle,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${DESIGN_COLORS.semantic.glass.border}`,
  },
  dark: {
    background: 'rgba(30, 30, 30, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
};

export const COMPONENT_STYLES = {
  button: {
    base: 'transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: `bg-[${COLORS.blue.DEFAULT}] text-white hover:bg-[${COLORS.blue.dark}]`,
    secondary: `bg-[${COLORS.purple.DEFAULT}] text-white hover:bg-[${COLORS.purple.dark}]`,
    accent: `bg-[${COLORS.orange.DEFAULT}] text-white hover:bg-[${COLORS.orange.dark}]`,
    ghost: 'bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/90',
  },
  card: {
    base: 'overflow-hidden transition-all',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm',
    hover: 'hover:shadow-md hover:bg-white/80 transform-gpu hover:-translate-y-1 transition-all',
  },
  text: {
    heading: {
      base: 'font-medium',
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
    },
    body: {
      base: 'text-gray-700',
    },
  },
  input: {
    base: 'transition-all focus:outline-none focus:ring-2',
    default: 'bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-blue-500/20',
    glass: 'bg-white/60 backdrop-blur-xl border border-white/50 focus:border-white/70 focus:ring-white/30',
  },
};

