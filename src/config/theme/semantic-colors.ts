
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
  
  // Actions secondaires
  secondary: COLORS.purple.DEFAULT,
  secondaryLight: COLORS.purple.light,
  secondaryDark: COLORS.purple.dark,
  
  // Éléments d'accentuation
  accent: COLORS.orange.DEFAULT,
  accentLight: COLORS.orange.light,
  accentDark: COLORS.orange.dark,
  
  // États
  success: COLORS.green,
  warning: COLORS.yellow,
  error: COLORS.red,
  info: COLORS.blue.light,
  
  // Surfaces
  surface: COLORS.white,
  surfaceVariant: COLORS.gray[50],
  surfaceContainer: COLORS.gray[100],
  
  // Bordures
  border: COLORS.gray[200],
  borderLight: COLORS.gray[100],
  borderStrong: COLORS.gray[300],
  
  // Texte
  onSurface: COLORS.gray[900],
  onSurfaceVariant: COLORS.gray[700],
  onSurfaceMuted: COLORS.gray[500],
  
  // Backgrounds spéciaux pour le jeu
  gameBackground: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
  cardBackground: 'rgba(255, 255, 255, 0.7)',
  modalBackground: 'rgba(255, 255, 255, 0.9)',
  
  // Glass effects
  glass: {
    light: 'rgba(255, 255, 255, 0.7)',
    medium: 'rgba(255, 255, 255, 0.6)',
    heavy: 'rgba(255, 255, 255, 0.5)',
  }
};

export const GAME_COLORS = {
  blue: SEMANTIC_COLORS.primary,
  blueLight: SEMANTIC_COLORS.primaryLight,
  blueDark: SEMANTIC_COLORS.primaryDark,
  purple: SEMANTIC_COLORS.secondary,
  purpleLight: SEMANTIC_COLORS.secondaryLight,
  purpleDark: SEMANTIC_COLORS.secondaryDark,
  orange: SEMANTIC_COLORS.accent,
  orangeLight: SEMANTIC_COLORS.accentLight,
  orangeDark: SEMANTIC_COLORS.accentDark,
  success: SEMANTIC_COLORS.success,
  warning: SEMANTIC_COLORS.warning,
  error: SEMANTIC_COLORS.error,
  background: SEMANTIC_COLORS.surfaceVariant,
  surface: SEMANTIC_COLORS.surface,
};
