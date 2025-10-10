
/**
 * Design Tokens - Couleurs
 * Système de couleurs unifié pour Dutch
 */
export const DESIGN_COLORS = {
  // Dutch Trinity - Couleurs principales
  dutch: {
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#0A84FF', // dutch-blue principal
      600: '#0062CC',
      700: '#004B99',
      800: '#003366',
      900: '#002952',
    },
    purple: {
      50: '#F3EEFF',
      100: '#E9D5FF',
      200: '#D8B4FE',
      300: '#C19EFF', // Lavande pour animations
      400: '#A78BFA',
      500: '#8B5CF6', // dutch-purple principal
      600: '#6D28D9',
      700: '#5B21B6',
      800: '#4C1D95',
      900: '#3C1A78',
    },
    orange: {
      50: '#FFF4E6',
      100: '#FFE4CC',
      200: '#FFD7A8',
      300: '#FFDF75', // Jaune doré pour animations
      400: '#FFC247',
      500: '#FF9F0A', // dutch-orange principal
      600: '#E67700',
      700: '#CC6900',
      800: '#B35A00',
      900: '#994D00',
    },
  },
  
  // Couleurs Kids - Palette étendue
  kids: {
    pink: { 500: '#D946EF', 600: '#C026D3', 900: '#86198F' },
    lime: { 500: '#84CC16', 600: '#65A30D', 900: '#3F6212' },
    turquoise: { 500: '#06B6D4', 600: '#0891B2', 900: '#164E63' },
    mint: { 500: '#89FFD2', 600: '#5CE5B1', 900: '#00B87A' }, // Pour animations
  },
  
  // États sémantiques
  success: { 50: '#F0FDF4', 500: '#30D158', 900: '#16A34A' },
  warning: { 50: '#FEFCE8', 500: '#FFD60A', 900: '#EAB308' },
  error: { 50: '#FEF2F2', 500: '#FF453A', 900: '#DC2626' },
  
  // Échelle neutre
  neutral: {
    0: '#FFFFFF',
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
  
  // Tokens sémantiques pour l'UI
  semantic: {
    overlay: {
      light: 'rgba(255, 255, 255, 0.9)',
      medium: 'rgba(255, 255, 255, 0.7)',
      subtle: 'rgba(255, 255, 255, 0.5)',
    },
    shadow: {
      sm: 'rgba(0, 0, 0, 0.05)',
      md: 'rgba(0, 0, 0, 0.1)',
      lg: 'rgba(0, 0, 0, 0.15)',
      xl: 'rgba(0, 0, 0, 0.2)',
    },
    glass: {
      border: 'rgba(255, 255, 255, 0.3)',
      borderHover: 'rgba(255, 255, 255, 0.5)',
      background: 'rgba(255, 255, 255, 0.1)',
    }
  }
};

/**
 * Convertit une couleur HEX en RGBA avec opacité
 * @param hex - Couleur au format #RRGGBB
 * @param opacity - Opacité entre 0 et 1
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
