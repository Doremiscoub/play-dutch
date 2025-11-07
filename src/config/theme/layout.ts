/**
 * Configuration du layout - Espacement, bordures et ombres
 */
export const SPACING = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
};

/**
 * Système d'espacement unifié pour le jeu
 */
export const GAME_LAYOUT = {
  // Spacing système unifié
  spacing: {
    mobile: {
      container: 'px-4 py-4',    // Mobile container
      section: 'mb-4',            // Entre sections
      card: 'p-3',                // Cards
      inline: 'gap-2'             // Inline elements
    },
    desktop: {
      container: 'px-6 py-8',
      section: 'mb-6',
      card: 'p-6',
      inline: 'gap-4'
    }
  },
  
  // Glassmorphism unifié
  glass: {
    light: 'bg-white/80 backdrop-blur-md border border-white/50',
    medium: 'bg-white/60 backdrop-blur-lg border border-white/40',
    strong: 'bg-white/90 backdrop-blur-xl border border-white/60'
  },
  
  // Shadows unifiés
  shadows: {
    card: 'shadow-lg shadow-gray-200/50',
    float: 'shadow-xl shadow-gray-300/60',
    glow: 'shadow-2xl shadow-purple-500/20'
  }
};

export const BORDERS = {
  radius: {
    none: '0',
    sm: '0.5rem',
    DEFAULT: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
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

