
/**
 * Couleurs sémantiques pour le jeu Dutch
 * Ces couleurs sont utilisées pour donner du sens aux éléments UI
 */
import { COLORS } from './colors';

export const SEMANTIC_COLORS = {
  // Actions principales
  primary: COLORS.blue.DEFAULT,
  primaryLight: COLORS.blue.light,
  primaryDark: COLORS.blue.dark,
  primaryUltraLight: '#E6F3FF',
  
  // Actions secondaires
  secondary: COLORS.purple.DEFAULT,
  secondaryLight: COLORS.purple.light,
  secondaryDark: COLORS.purple.dark,
  secondaryUltraLight: '#F3EEFF',
  
  // Éléments d'accentuation
  accent: COLORS.orange.DEFAULT,
  accentLight: COLORS.orange.light,
  accentDark: COLORS.orange.dark,
  accentUltraLight: '#FFF4E6',
  
  // États système
  success: COLORS.green,
  successLight: '#86EFAC',
  successDark: '#16A34A',
  successUltraLight: '#F0FDF4',
  
  warning: COLORS.yellow,
  warningLight: '#FDE047',
  warningDark: '#EAB308',
  warningUltraLight: '#FEFCE8',
  
  error: COLORS.red,
  errorLight: '#FCA5A5',
  errorDark: '#DC2626',
  errorUltraLight: '#FEF2F2',
  
  info: COLORS.blue.light,
  infoLight: '#BFDBFE',
  infoDark: '#1D4ED8',
  infoUltraLight: '#EFF6FF',
  
  // Surfaces et backgrounds
  surface: COLORS.white,
  surfaceVariant: COLORS.gray[50],
  surfaceContainer: COLORS.gray[100],
  surfaceContainerHigh: COLORS.gray[200],
  surfaceContainerHighest: COLORS.gray[300],
  
  // Bordures
  border: COLORS.gray[200],
  borderLight: COLORS.gray[100],
  borderStrong: COLORS.gray[300],
  borderSubtle: COLORS.gray[50],
  
  // Texte avec variants
  onSurface: COLORS.gray[900],
  onSurfaceVariant: COLORS.gray[700],
  onSurfaceMuted: COLORS.gray[500],
  onSurfaceSubtle: COLORS.gray[400],
  onSurfaceDisabled: COLORS.gray[300],
  
  // Backgrounds spéciaux pour le jeu
  gameBackground: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
  cardBackground: 'rgba(255, 255, 255, 0.7)',
  modalBackground: 'rgba(255, 255, 255, 0.9)',
  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  
  // Glass effects avec variants
  glass: {
    ultraLight: 'rgba(255, 255, 255, 0.8)',
    light: 'rgba(255, 255, 255, 0.7)',
    medium: 'rgba(255, 255, 255, 0.6)',
    heavy: 'rgba(255, 255, 255, 0.5)',
    dark: 'rgba(255, 255, 255, 0.4)',
  },
  
  // Neutral avec variants étendus
  neutral: {
    50: COLORS.gray[50],
    100: COLORS.gray[100],
    200: COLORS.gray[200],
    300: COLORS.gray[300],
    400: COLORS.gray[400],
    500: COLORS.gray[500],
    600: COLORS.gray[600],
    700: COLORS.gray[700],
    800: COLORS.gray[800],
    900: COLORS.gray[900],
  }
};

export const GAME_COLORS = {
  // Couleurs principales du jeu avec variants complets
  blue: SEMANTIC_COLORS.primary,
  blueLight: SEMANTIC_COLORS.primaryLight,
  blueDark: SEMANTIC_COLORS.primaryDark,
  blueUltraLight: SEMANTIC_COLORS.primaryUltraLight,
  
  purple: SEMANTIC_COLORS.secondary,
  purpleLight: SEMANTIC_COLORS.secondaryLight,
  purpleDark: SEMANTIC_COLORS.secondaryDark,
  purpleUltraLight: SEMANTIC_COLORS.secondaryUltraLight,
  
  orange: SEMANTIC_COLORS.accent,
  orangeLight: SEMANTIC_COLORS.accentLight,
  orangeDark: SEMANTIC_COLORS.accentDark,
  orangeUltraLight: SEMANTIC_COLORS.accentUltraLight,
  
  // États avec variants
  success: SEMANTIC_COLORS.success,
  successLight: SEMANTIC_COLORS.successLight,
  successDark: SEMANTIC_COLORS.successDark,
  successUltraLight: SEMANTIC_COLORS.successUltraLight,
  
  warning: SEMANTIC_COLORS.warning,
  warningLight: SEMANTIC_COLORS.warningLight,
  warningDark: SEMANTIC_COLORS.warningDark,
  warningUltraLight: SEMANTIC_COLORS.warningUltraLight,
  
  error: SEMANTIC_COLORS.error,
  errorLight: SEMANTIC_COLORS.errorLight,
  errorDark: SEMANTIC_COLORS.errorDark,
  errorUltraLight: SEMANTIC_COLORS.errorUltraLight,
  
  info: SEMANTIC_COLORS.info,
  infoLight: SEMANTIC_COLORS.infoLight,
  infoDark: SEMANTIC_COLORS.infoDark,
  infoUltraLight: SEMANTIC_COLORS.infoUltraLight,
  
  // Surfaces
  background: SEMANTIC_COLORS.surfaceVariant,
  surface: SEMANTIC_COLORS.surface,
  surfaceContainer: SEMANTIC_COLORS.surfaceContainer,
  
  // Neutres
  neutral: SEMANTIC_COLORS.neutral,
};

// Export des couleurs par catégorie pour faciliter l'utilisation
export const STATE_COLORS = {
  success: {
    DEFAULT: SEMANTIC_COLORS.success,
    light: SEMANTIC_COLORS.successLight,
    dark: SEMANTIC_COLORS.successDark,
    ultraLight: SEMANTIC_COLORS.successUltraLight,
  },
  warning: {
    DEFAULT: SEMANTIC_COLORS.warning,
    light: SEMANTIC_COLORS.warningLight,
    dark: SEMANTIC_COLORS.warningDark,
    ultraLight: SEMANTIC_COLORS.warningUltraLight,
  },
  error: {
    DEFAULT: SEMANTIC_COLORS.error,
    light: SEMANTIC_COLORS.errorLight,
    dark: SEMANTIC_COLORS.errorDark,
    ultraLight: SEMANTIC_COLORS.errorUltraLight,
  },
  info: {
    DEFAULT: SEMANTIC_COLORS.info,
    light: SEMANTIC_COLORS.infoLight,
    dark: SEMANTIC_COLORS.infoDark,
    ultraLight: SEMANTIC_COLORS.infoUltraLight,
  },
};

export const SURFACE_COLORS = {
  primary: SEMANTIC_COLORS.surface,
  variant: SEMANTIC_COLORS.surfaceVariant,
  container: SEMANTIC_COLORS.surfaceContainer,
  containerHigh: SEMANTIC_COLORS.surfaceContainerHigh,
  containerHighest: SEMANTIC_COLORS.surfaceContainerHighest,
};
