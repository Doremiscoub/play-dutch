
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING, BORDERS, SHADOWS } from './layout';
import { ANIMATIONS } from './animations';
import { GLASS, COMPONENT_STYLES } from './components';
import { THEMES } from './themes';
import { SEMANTIC_COLORS, GAME_COLORS, STATE_COLORS, SURFACE_COLORS } from './semantic-colors';

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

// Configuration du fond animé optimisée
export const BACKGROUND_CONFIG = {
  grid: {
    size: '24px',
    color: '#DADADA',
    opacity: 0.08,
  },
  dots: {
    colors: ['#C4B5FD', '#FDBA74', '#6EE7B7', '#93C5FD'],
    sizes: ['2px', '4px', '6px'],
    count: { default: 30, subtle: 20, minimal: 10 },
    speed: { default: 0.4, subtle: 0.25, minimal: 0.15 },
  },
  waves: {
    primaryColor: '#E9D5FF',
    secondaryColor: '#FDE68A',
    heightPercentage: 15,
    animationDuration: 20,
  },
};

// Export all theme configurations
export {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  GLASS,
  THEMES,
  COMPONENT_STYLES,
  SEMANTIC_COLORS,
  GAME_COLORS,
  STATE_COLORS,
  SURFACE_COLORS,
};

// Export default configuration
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
  SEMANTIC_COLORS,
  GAME_COLORS,
  STATE_COLORS,
  SURFACE_COLORS,
};
