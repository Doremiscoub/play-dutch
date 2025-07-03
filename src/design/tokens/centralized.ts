/**
 * Design Tokens Centralisés - Dutch Trinity System
 * Architecture hiérarchique pour gouvernance simplifiée
 */

// ========== NIVEAU 1: COULEURS PRIMITIVES ==========
export const PRIMITIVE_COLORS = {
  // Dutch Trinity Core
  dutch: {
    blue: {
      50: 'hsl(221, 100%, 97%)',
      100: 'hsl(221, 95%, 92%)',
      200: 'hsl(221, 90%, 84%)',
      300: 'hsl(221, 85%, 72%)',
      400: 'hsl(221, 80%, 60%)',
      500: 'hsl(221, 83%, 53%)', // PRIMARY
      600: 'hsl(221, 83%, 45%)',
      700: 'hsl(221, 85%, 35%)',
      800: 'hsl(221, 88%, 25%)',
      900: 'hsl(221, 90%, 15%)',
    },
    purple: {
      50: 'hsl(258, 100%, 97%)',
      100: 'hsl(258, 95%, 92%)',
      200: 'hsl(258, 90%, 84%)',
      300: 'hsl(258, 85%, 75%)',
      400: 'hsl(258, 90%, 66%)', // PRIMARY
      500: 'hsl(258, 85%, 58%)',
      600: 'hsl(258, 88%, 48%)',
      700: 'hsl(258, 90%, 38%)',
      800: 'hsl(258, 92%, 28%)',
      900: 'hsl(258, 95%, 18%)',
    },
    orange: {
      50: 'hsl(25, 100%, 97%)',
      100: 'hsl(25, 95%, 92%)',
      200: 'hsl(25, 90%, 84%)',
      300: 'hsl(25, 85%, 72%)',
      400: 'hsl(25, 80%, 60%)',
      500: 'hsl(25, 95%, 53%)', // PRIMARY
      600: 'hsl(25, 95%, 45%)',
      700: 'hsl(25, 98%, 35%)',
      800: 'hsl(25, 100%, 25%)',
      900: 'hsl(25, 100%, 15%)',
    },
    green: {
      50: 'hsl(142, 71%, 95%)',
      100: 'hsl(142, 71%, 85%)',
      200: 'hsl(142, 71%, 75%)',
      300: 'hsl(142, 71%, 65%)',
      400: 'hsl(142, 71%, 55%)',
      500: 'hsl(142, 71%, 45%)', // PRIMARY
      600: 'hsl(142, 71%, 35%)',
      700: 'hsl(142, 71%, 25%)',
      800: 'hsl(142, 71%, 20%)',
      900: 'hsl(142, 71%, 15%)',
    },
  },

  // Neutral Scale
  neutral: {
    0: 'hsl(0, 0%, 100%)', // Pure white
    50: 'hsl(210, 40%, 98%)',
    100: 'hsl(210, 40%, 96%)',
    200: 'hsl(214, 32%, 91%)',
    300: 'hsl(213, 27%, 84%)',
    400: 'hsl(215, 20%, 65%)',
    500: 'hsl(215, 16%, 47%)',
    600: 'hsl(215, 19%, 35%)',
    700: 'hsl(215, 25%, 27%)',
    800: 'hsl(217, 33%, 17%)',
    900: 'hsl(222, 84%, 5%)', // Near black
  },

  // Fun Colors for Kids Interface
  kids: {
    pink: {
      50: 'hsl(326, 85%, 96%)',
      100: 'hsl(326, 80%, 88%)',
      200: 'hsl(326, 75%, 80%)',
      300: 'hsl(326, 70%, 70%)',
      400: 'hsl(326, 75%, 60%)',
      500: 'hsl(326, 80%, 50%)', // PRIMARY
      600: 'hsl(326, 85%, 40%)',
      700: 'hsl(326, 90%, 30%)',
      800: 'hsl(326, 95%, 20%)',
      900: 'hsl(326, 100%, 15%)',
    },
    lime: {
      50: 'hsl(84, 90%, 95%)',
      100: 'hsl(84, 85%, 85%)',
      200: 'hsl(84, 80%, 75%)',
      300: 'hsl(84, 75%, 65%)',
      400: 'hsl(84, 70%, 55%)',
      500: 'hsl(84, 75%, 45%)', // PRIMARY
      600: 'hsl(84, 80%, 35%)',
      700: 'hsl(84, 85%, 25%)',
      800: 'hsl(84, 90%, 20%)',
      900: 'hsl(84, 95%, 15%)',
    },
    turquoise: {
      50: 'hsl(174, 85%, 95%)',
      100: 'hsl(174, 80%, 85%)',
      200: 'hsl(174, 75%, 75%)',
      300: 'hsl(174, 70%, 65%)',
      400: 'hsl(174, 65%, 55%)',
      500: 'hsl(174, 70%, 45%)', // PRIMARY
      600: 'hsl(174, 75%, 35%)',
      700: 'hsl(174, 80%, 25%)',
      800: 'hsl(174, 85%, 20%)',
      900: 'hsl(174, 90%, 15%)',
    },
  },

  // Glassmorphisme avec Teintes Colorées - Enrichi avec Liquid Glass Apple
  glass: {
    ultraLight: 'rgba(255, 255, 255, 0.9)',
    light: 'rgba(255, 255, 255, 0.8)',
    medium: 'rgba(255, 255, 255, 0.7)',
    heavy: 'rgba(255, 255, 255, 0.6)',
    dark: 'rgba(255, 255, 255, 0.5)',
    
    // Échelles Liquid Glass Apple (4px, 8px, 12px, 16px blur)
    ultraThin: 'rgba(255, 255, 255, 0.9)',    // 4px blur, headers
    thin: 'rgba(255, 255, 255, 0.8)',         // 8px blur, toolbars
    regular: 'rgba(255, 255, 255, 0.7)',      // 12px blur, cartes
    thick: 'rgba(255, 255, 255, 0.6)',        // 16px blur, modales
    popover: 'rgba(255, 255, 255, 0.7)',      // 12px blur + bord lumineux
    
    // Glassmorphisme coloré Trinity avec variants Apple (100%, 75%, 50%)
    blueLight: 'rgba(59, 130, 246, 0.2)',
    blueMedium: 'rgba(59, 130, 246, 0.3)',
    blueHeavy: 'rgba(59, 130, 246, 0.5)',     // 100% saturation
    blue75: 'rgba(59, 130, 246, 0.375)',      // 75% saturation  
    blue50: 'rgba(59, 130, 246, 0.25)',       // 50% saturation
    
    purpleLight: 'rgba(147, 51, 234, 0.2)',
    purpleMedium: 'rgba(147, 51, 234, 0.3)',
    purpleHeavy: 'rgba(147, 51, 234, 0.5)',   // 100% saturation
    purple75: 'rgba(147, 51, 234, 0.375)',    // 75% saturation
    purple50: 'rgba(147, 51, 234, 0.25)',     // 50% saturation
    
    orangeLight: 'rgba(249, 115, 22, 0.2)',
    orangeMedium: 'rgba(249, 115, 22, 0.3)',
    orangeHeavy: 'rgba(249, 115, 22, 0.5)',   // 100% saturation
    orange75: 'rgba(249, 115, 22, 0.375)',    // 75% saturation
    orange50: 'rgba(249, 115, 22, 0.25)',     // 50% saturation
    
    // Kids variants enrichis
    pinkLight: 'rgba(236, 72, 153, 0.2)',
    pinkMedium: 'rgba(236, 72, 153, 0.3)',
    pinkHeavy: 'rgba(236, 72, 153, 0.5)',
    limeLight: 'rgba(132, 204, 22, 0.2)',
    limeMedium: 'rgba(132, 204, 22, 0.3)',
    limeHeavy: 'rgba(132, 204, 22, 0.5)',
    turquoiseLight: 'rgba(20, 184, 166, 0.2)',
    turquoiseMedium: 'rgba(20, 184, 166, 0.3)',
    turquoiseHeavy: 'rgba(20, 184, 166, 0.5)',
    
    // Dark mode variants enrichis
    darkUltraLight: 'rgba(30, 30, 30, 0.9)',
    darkLight: 'rgba(30, 30, 30, 0.8)',
    darkMedium: 'rgba(30, 30, 30, 0.7)',
    darkHeavy: 'rgba(30, 30, 30, 0.6)',
    darkDark: 'rgba(30, 30, 30, 0.5)',
  },
} as const;

// ========== NIVEAU 2: TOKENS SÉMANTIQUES ==========
export const SEMANTIC_TOKENS = {
  // Actions principales
  action: {
    primary: PRIMITIVE_COLORS.dutch.blue[500],
    primaryHover: PRIMITIVE_COLORS.dutch.blue[600],
    primaryActive: PRIMITIVE_COLORS.dutch.blue[700],
    secondary: PRIMITIVE_COLORS.dutch.purple[400],
    secondaryHover: PRIMITIVE_COLORS.dutch.purple[500],
    accent: PRIMITIVE_COLORS.dutch.orange[500],
    accentHover: PRIMITIVE_COLORS.dutch.orange[600],
  },

  // États système
  state: {
    success: PRIMITIVE_COLORS.dutch.green[500],
    successLight: PRIMITIVE_COLORS.dutch.green[100],
    warning: 'hsl(45, 95%, 53%)',
    warningLight: 'hsl(45, 95%, 90%)',
    error: 'hsl(0, 85%, 60%)',
    errorLight: 'hsl(0, 85%, 95%)',
    info: PRIMITIVE_COLORS.dutch.blue[500],
    infoLight: PRIMITIVE_COLORS.dutch.blue[50],
  },

  // Surfaces et backgrounds
  surface: {
    primary: PRIMITIVE_COLORS.neutral[0],
    secondary: PRIMITIVE_COLORS.neutral[50],
    tertiary: PRIMITIVE_COLORS.neutral[100],
    elevated: PRIMITIVE_COLORS.glass.light,
    modal: PRIMITIVE_COLORS.glass.ultraLight,
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Bordures
  border: {
    subtle: PRIMITIVE_COLORS.neutral[200],
    default: PRIMITIVE_COLORS.neutral[300],
    strong: PRIMITIVE_COLORS.neutral[400],
    glass: 'rgba(255, 255, 255, 0.3)',
    glassStrong: 'rgba(255, 255, 255, 0.5)',
  },

  // Textes
  text: {
    primary: PRIMITIVE_COLORS.neutral[900],
    secondary: PRIMITIVE_COLORS.neutral[700],
    tertiary: PRIMITIVE_COLORS.neutral[500],
    disabled: PRIMITIVE_COLORS.neutral[400],
    inverse: PRIMITIVE_COLORS.neutral[0],
    trinity: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.blue[500]}, ${PRIMITIVE_COLORS.dutch.purple[400]}, ${PRIMITIVE_COLORS.dutch.orange[500]})`,
  },

  // Ombres enrichies avec Élévations Apple
  shadow: {
    glass: '0 8px 32px rgba(31, 38, 135, 0.15)',
    glassLg: '0 16px 50px rgba(31, 38, 135, 0.2)',
    trinity: `0 10px 30px ${PRIMITIVE_COLORS.dutch.blue[500]}1A, 0 20px 50px ${PRIMITIVE_COLORS.dutch.purple[400]}1A`,
    
    // Élévations Liquid Glass Apple (LG-Elevation-01 à 04)
    elevation01: '0 1px 2px rgba(0, 0, 0, 0.06)',
    elevation02: '0 3px 8px rgba(0, 0, 0, 0.10)',
    elevation03: '0 6px 16px rgba(0, 0, 0, 0.14)',
    elevation04: '0 12px 28px rgba(0, 0, 0, 0.18)',
    
    glow: {
      blue: `0 0 20px ${PRIMITIVE_COLORS.dutch.blue[500]}66, 0 0 40px ${PRIMITIVE_COLORS.dutch.blue[500]}33`,
      purple: `0 0 20px ${PRIMITIVE_COLORS.dutch.purple[400]}66, 0 0 40px ${PRIMITIVE_COLORS.dutch.purple[400]}33`,
      orange: `0 0 20px ${PRIMITIVE_COLORS.dutch.orange[500]}66, 0 0 40px ${PRIMITIVE_COLORS.dutch.orange[500]}33`,
      
      // Bords lumineux pour popovers Apple
      popover: '0 0 0 1px rgba(255, 255, 255, 0.15), 0 0 8px rgba(255, 255, 255, 0.1)',
    },
  },
} as const;

// ========== NIVEAU 3: TOKENS COMPOSANTS ==========
export const COMPONENT_TOKENS = {
  button: {
    primary: {
      background: SEMANTIC_TOKENS.action.primary,
      backgroundHover: SEMANTIC_TOKENS.action.primaryHover,
      text: SEMANTIC_TOKENS.text.inverse,
      border: 'transparent',
      shadow: SEMANTIC_TOKENS.shadow.glass,
    },
    secondary: {
      background: SEMANTIC_TOKENS.surface.elevated,
      backgroundHover: PRIMITIVE_COLORS.glass.medium,
      text: SEMANTIC_TOKENS.text.primary,
      border: SEMANTIC_TOKENS.border.glass,
      shadow: SEMANTIC_TOKENS.shadow.glass,
    },
    trinity: {
      background: SEMANTIC_TOKENS.text.trinity,
      backgroundHover: SEMANTIC_TOKENS.text.trinity,
      text: SEMANTIC_TOKENS.text.inverse,
      border: 'transparent',
      shadow: SEMANTIC_TOKENS.shadow.trinity,
    },
    ghost: {
      background: 'transparent',
      backgroundHover: SEMANTIC_TOKENS.surface.elevated,
      text: SEMANTIC_TOKENS.text.secondary,
      border: 'transparent',
      shadow: 'none',
    },
  },

  card: {
    default: {
      background: SEMANTIC_TOKENS.surface.primary,
      border: SEMANTIC_TOKENS.border.default,
      shadow: SEMANTIC_TOKENS.shadow.glass,
    },
    glass: {
      background: SEMANTIC_TOKENS.surface.elevated,
      border: SEMANTIC_TOKENS.border.glass,
      shadow: SEMANTIC_TOKENS.shadow.glass,
    },
    gaming: {
      background: PRIMITIVE_COLORS.glass.medium,
      border: SEMANTIC_TOKENS.border.glassStrong,
      shadow: SEMANTIC_TOKENS.shadow.trinity,
    },
  },

  badge: {
    default: {
      background: PRIMITIVE_COLORS.neutral[100],
      text: PRIMITIVE_COLORS.neutral[800],
      border: PRIMITIVE_COLORS.neutral[200],
    },
    primary: {
      background: PRIMITIVE_COLORS.dutch.blue[100],
      text: PRIMITIVE_COLORS.dutch.blue[800],
      border: PRIMITIVE_COLORS.dutch.blue[300],
    },
    secondary: {
      background: PRIMITIVE_COLORS.dutch.purple[100],
      text: PRIMITIVE_COLORS.dutch.purple[800],
      border: PRIMITIVE_COLORS.dutch.purple[300],
    },
    success: {
      background: PRIMITIVE_COLORS.dutch.green[100],
      text: PRIMITIVE_COLORS.dutch.green[800],
      border: PRIMITIVE_COLORS.dutch.green[300],
    },
    warning: {
      background: 'hsl(45, 95%, 90%)',
      text: 'hsl(45, 95%, 25%)',
      border: 'hsl(45, 95%, 70%)',
    },
    error: {
      background: 'hsl(0, 85%, 95%)',
      text: 'hsl(0, 85%, 25%)',
      border: 'hsl(0, 85%, 70%)',
    },
    legendary: {
      background: PRIMITIVE_COLORS.dutch.orange[100],
      text: PRIMITIVE_COLORS.dutch.orange[800],
      border: PRIMITIVE_COLORS.dutch.orange[300],
    },
  },

  input: {
    default: {
      background: SEMANTIC_TOKENS.surface.primary,
      border: SEMANTIC_TOKENS.border.default,
      text: SEMANTIC_TOKENS.text.primary,
      placeholder: SEMANTIC_TOKENS.text.tertiary,
      focus: {
        border: SEMANTIC_TOKENS.action.primary,
        shadow: `0 0 0 2px ${PRIMITIVE_COLORS.dutch.blue[500]}33`,
      },
    },
    glass: {
      background: SEMANTIC_TOKENS.surface.elevated,
      border: SEMANTIC_TOKENS.border.glass,
      text: SEMANTIC_TOKENS.text.primary,
      placeholder: SEMANTIC_TOKENS.text.tertiary,
      focus: {
        border: SEMANTIC_TOKENS.border.glassStrong,
        shadow: SEMANTIC_TOKENS.shadow.glass,
      },
    },
  },
} as const;

// ========== GRADIENTS CENTRALISÉS + LIQUID GLASS ==========
export const GRADIENTS = {
  trinity: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.blue[500]}, ${PRIMITIVE_COLORS.dutch.purple[400]}, ${PRIMITIVE_COLORS.dutch.orange[500]})`,
  trinitySubtle: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.blue[100]}, ${PRIMITIVE_COLORS.dutch.purple[100]}, ${PRIMITIVE_COLORS.dutch.orange[100]})`,
  trinityBright: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.blue[400]}, ${PRIMITIVE_COLORS.dutch.purple[300]}, ${PRIMITIVE_COLORS.dutch.orange[400]})`,
  
  // Gradients colorés pour enfants
  kidsFun: `linear-gradient(135deg, ${PRIMITIVE_COLORS.kids.pink[400]}, ${PRIMITIVE_COLORS.kids.lime[400]}, ${PRIMITIVE_COLORS.kids.turquoise[400]})`,
  kidsBlue: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.blue[300]}, ${PRIMITIVE_COLORS.dutch.blue[500]})`,
  kidsPurple: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.purple[300]}, ${PRIMITIVE_COLORS.dutch.purple[500]})`,
  kidsOrange: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.orange[300]}, ${PRIMITIVE_COLORS.dutch.orange[500]})`,
  kidsPink: `linear-gradient(135deg, ${PRIMITIVE_COLORS.kids.pink[300]}, ${PRIMITIVE_COLORS.kids.pink[500]})`,
  kidsLime: `linear-gradient(135deg, ${PRIMITIVE_COLORS.kids.lime[300]}, ${PRIMITIVE_COLORS.kids.lime[500]})`,
  kidsTurquoise: `linear-gradient(135deg, ${PRIMITIVE_COLORS.kids.turquoise[300]}, ${PRIMITIVE_COLORS.kids.turquoise[500]})`,
  
  // Glassmorphisme coloré enrichi avec variants Apple
  glassBlue: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.blueLight}, ${PRIMITIVE_COLORS.glass.blueMedium})`,
  glassBlue75: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.blue50}, ${PRIMITIVE_COLORS.glass.blue75})`,
  glassPurple: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.purpleLight}, ${PRIMITIVE_COLORS.glass.purpleMedium})`,
  glassPurple75: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.purple50}, ${PRIMITIVE_COLORS.glass.purple75})`,
  glassOrange: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.orangeLight}, ${PRIMITIVE_COLORS.glass.orangeMedium})`,
  glassOrange75: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.orange50}, ${PRIMITIVE_COLORS.glass.orange75})`,
  
  // Gradients Liquid Glass Apple pour rôles contextuels
  liquidHeader: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.ultraThin}, rgba(255, 255, 255, 0.95))`,
  liquidCard: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.regular}, rgba(255, 255, 255, 0.75))`,
  liquidSheet: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.thick}, rgba(255, 255, 255, 0.65))`,
  liquidPopover: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.popover}, rgba(255, 255, 255, 0.8))`,
  
  // Gradients existants
  glass: `linear-gradient(135deg, ${PRIMITIVE_COLORS.glass.light}, ${PRIMITIVE_COLORS.glass.medium})`,
  gaming: `linear-gradient(135deg, ${PRIMITIVE_COLORS.dutch.purple[400]}, ${PRIMITIVE_COLORS.dutch.blue[500]})`,
  surface: `linear-gradient(to bottom, ${SEMANTIC_TOKENS.surface.primary}, ${SEMANTIC_TOKENS.surface.secondary})`,
} as const;

// ========== MOTION TOKENS APPLE ==========
export const MOTION_TOKENS = {
  // Animations Liquid Glass Apple
  reveal: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    keyframes: {
      from: { opacity: '0', transform: 'scale(0.95)' },
      to: { opacity: '1', transform: 'scale(1)' }
    }
  },
  dismiss: {
    duration: '150ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    keyframes: {
      from: { opacity: '1', transform: 'scale(1)' },
      to: { opacity: '0', transform: 'scale(0.97)' }
    }
  },
  parallax: {
    low: '4%',
    high: '8%'
  },
  // États d'interaction Apple
  interaction: {
    hover: {
      duration: '120ms',
      opacityIncrease: '10%',
      elevationIncrease: 1,
      transform: 'translateY(-2px)'
    },
    pressed: {
      duration: '80ms',
      opacityDecrease: '10%',
      blurDecrease: '2px',
      elevationDecrease: 1
    },
    disabled: {
      opacity: '30%',
      desaturation: '40%'
    }
  }
} as const;

// ========== EXPORT CENTRALISÉ ==========
export const DESIGN_TOKENS = {
  primitive: PRIMITIVE_COLORS,
  semantic: SEMANTIC_TOKENS,
  component: COMPONENT_TOKENS,
  gradients: GRADIENTS,
} as const;

// Types pour l'intellisense
export type PrimitiveColors = typeof PRIMITIVE_COLORS;
export type SemanticTokens = typeof SEMANTIC_TOKENS;
export type ComponentTokens = typeof COMPONENT_TOKENS;
export type DesignTokens = typeof DESIGN_TOKENS;