
/**
 * Export centralisé des configurations de thème
 */
export * from './colors';
export * from './typography';
export * from './layout';
export * from './animations';
export * from './components';
export * from './themes';

// Valeurs Z-index
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
    primaryColor: '#E9D5FF',
    secondaryColor: '#FDE68A',
    heightPercentage: 20,
    animationDuration: 15,
  },
};

// Configuration par défaut
export default {
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

