
import themeConfig, { 
  COLORS, 
  SPACING, 
  TYPOGRAPHY, 
  BORDERS, 
  SHADOWS, 
  ANIMATIONS,
  BACKGROUND_CONFIG,
  COMPONENT_STYLES,
  Z_INDEX,
  GLASS
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
  waves: BACKGROUND_CONFIG.waves,
  
  // Configuration du fond quadrillé
  grid: BACKGROUND_CONFIG.grid,
  
  // Configuration des points flottants
  floatingDots: BACKGROUND_CONFIG.dots,
  
  // Valeurs pour le glassmorphisme
  glassmorphism: GLASS.medium,
  
  // Tailles d'écran pour le responsive
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  
  // Configuration VisionOS
  visionOS: {
    glassPanelLight: GLASS.light,
    glassPanelMedium: GLASS.medium,
    glassPanelHeavy: GLASS.heavy,
    glassPanelDark: GLASS.dark,
    borderRadius: BORDERS.radius,
    animations: {
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      duration: ANIMATIONS.duration,
    }
  }
};

// Styles communs réutilisables - Style VisionOS
export const COMMON_STYLES = {
  mainButton: "rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm hover:bg-white/80 transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none py-3 px-6 font-medium",
  cardBase: "rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm p-5",
  cardWithHover: "rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm p-5 transition-all hover:shadow-md hover:-translate-y-0.5 hover:bg-white/80",
  iconButtonBase: 'rounded-full h-12 w-12 flex items-center justify-center bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm hover:bg-white/80 transition-all hover:-translate-y-0.5 active:translate-y-0.5',
  inputBase: "rounded-xl bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 transition-all",
  headingGradient: "bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent font-medium",
  pageBackground: "min-h-screen w-full bg-gradient-to-b from-gray-50 to-white",
  backgroundGrid: "bg-grid bg-opacity-10 bg-size-24",
};

// Configuration pour le commentateur IA
export const AI_COMMENTATOR_CONFIG = {
  commentFrequency: 20000, // Toutes les 20 secondes
  commentTypes: ['info', 'joke', 'sarcasm', 'encouragement'],
  styles: {
    info: 'rounded-2xl border-dutch-blue/30 bg-dutch-blue/5',
    joke: 'rounded-2xl border-dutch-orange/30 bg-dutch-orange/5',
    sarcasm: 'rounded-2xl border-dutch-purple/30 bg-dutch-purple/5',
    encouragement: 'rounded-2xl border-dutch-green/30 bg-dutch-green/5',
  },
  icons: {
    info: 'MessageSquare',
    joke: 'Sparkles',
    sarcasm: 'Bot',
    encouragement: 'User',
  },
  animation: {
    enter: {
      initial: { opacity: 0, scale: 0.9, y: 10 },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.9, 
        y: 10,
        transition: {
          duration: 0.2
        } 
      }
    }
  }
};

export default UI_CONFIG;
