
import themeConfig, { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  BORDERS, 
  SHADOWS, 
  ANIMATIONS,
  BACKGROUND_CONFIG,
  COMPONENT_STYLES,
  Z_INDEX
} from './theme';

/**
 * Configuration centrale de l'interface utilisateur pour Dutch
 * Ce fichier contient toutes les constantes visuelles et de design
 * utilisées à travers l'application pour assurer cohérence et maintenabilité
 */

export const UI_CONFIG = {
  // Couleurs principales
  colors: COLORS,
  
  // Typographie
  typography: TYPOGRAPHY,
  
  // Espacement
  spacing: SPACING,
  
  // Rayons de bordure
  borderRadius: BORDERS.radius,
  
  // Ombres
  shadows: SHADOWS,
  
  // Animations et transitions
  animations: ANIMATIONS,
  
  // Z-index
  zIndex: Z_INDEX,
  
  // Configuration des vagues en bas d'écran
  waves: {
    ...BACKGROUND_CONFIG.waves,
    height: "20%", // Hauteur des vagues (pourcentage de l'écran)
    colors: {
      primary: "#E9D5FF", // Violet pâle
      secondary: "#FDE68A" // Orange pâle
    },
    opacity: 0.3,
  },
  
  // Configuration du fond quadrillé
  grid: {
    size: '24px',
    color: '#DADADA',
    opacity: 0.1
  },
  
  // Configuration des points flottants
  floatingDots: {
    colors: ["#A78BFA", "#FDBA74", "#6EE7B7", "#60A5FA"],
    size: {
      min: 2,
      max: 8
    },
    count: 30,
    speed: 0.2
  },
  
  // Valeurs pour le glassmorphisme
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
  
  // Tailles d'écran pour le responsive
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
};

// Styles communs réutilisables
export const COMMON_STYLES = {
  mainButton: COMPONENT_STYLES.button.base,
  cardBase: COMPONENT_STYLES.card.base + ' ' + COMPONENT_STYLES.card.glass,
  cardWithHover: COMPONENT_STYLES.card.base + ' ' + COMPONENT_STYLES.card.glass + ' ' + COMPONENT_STYLES.card.hover,
  iconButtonBase: 'h-12 w-12 flex items-center justify-center rounded-full shadow-sm transition-all',
  inputBase: COMPONENT_STYLES.input.base + ' ' + COMPONENT_STYLES.input.default,
  headingGradient: COMPONENT_STYLES.text.heading.base + ' ' + COMPONENT_STYLES.text.heading.gradient,
  pageBackground: 'min-h-screen w-full bg-gradient-to-b from-gray-50 to-white',
  backgroundGrid: 'bg-grid bg-opacity-10 bg-size-24',
};

// Configuration pour le commentateur IA
export const AI_COMMENTATOR_CONFIG = {
  commentFrequency: 20000, // Toutes les 20 secondes
  commentTypes: ['info', 'joke', 'sarcasm', 'encouragement'],
  styles: {
    info: 'border-dutch-blue/30 bg-dutch-blue/5',
    joke: 'border-dutch-orange/30 bg-dutch-orange/5',
    sarcasm: 'border-dutch-purple/30 bg-dutch-purple/5',
    encouragement: 'border-dutch-green/30 bg-dutch-green/5',
  },
  icons: {
    info: 'MessageSquare',
    joke: 'Sparkles',
    sarcasm: 'Bot',
    encouragement: 'User',
  },
  name: 'Professeur Cartouche'
};

export default UI_CONFIG;
