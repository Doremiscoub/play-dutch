
/**
 * Configuration centrale de l'interface utilisateur pour Dutch
 * Ce fichier contient toutes les constantes visuelles et de design
 * utilisées à travers l'application pour assurer cohérence et maintenabilité
 */

export const UI_CONFIG = {
  // Couleurs principales
  colors: {
    blue: '#1EAEDB',
    blueDark: '#1899C2',
    blueLight: '#70D6F7',
    purple: '#8B5CF6',
    purpleDark: '#7649F1',
    purpleLight: '#C4B5FD',
    orange: '#F97316',
    orangeDark: '#EA580C',
    orangeLight: '#FDBA74',
    green: '#10B981',
    yellow: '#FBBF24',
    white: '#FFFFFF',
    background: '#F9FAFB',
    card: '#FFFFFF',
    grid: '#DADADA',
    text: {
      primary: '#333333',
      secondary: '#6B7280',
      light: '#9CA3AF',
    }
  },
  
  // Typographie
  typography: {
    fontFamily: 'Inter, "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sizes: {
      heading1: '36px',
      heading2: '24px',
      heading3: '20px',
      body: '16px',
      small: '14px',
      tiny: '12px',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  // Espacement
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Rayons de bordure
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  
  // Ombres
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.03), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.02), 0 10px 10px rgba(0, 0, 0, 0.04)',
    card: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
  },
  
  // Animations et transitions
  animations: {
    durations: {
      fast: '100ms',
      default: '200ms',
      medium: '300ms',
      slow: '500ms',
    },
    easings: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  
  // Z-index
  zIndex: {
    base: 1,
    overlay: 10,
    modal: 20,
    toast: 30,
    tooltip: 40,
  },
  
  // Configuration des vagues en bas d'écran
  waves: {
    primaryColor: '#E9D5FF', // Violet pâle
    secondaryColor: '#FDE68A', // Orange pâle
    heightPercentage: 20, // 20% de la hauteur d'écran
  },
  
  // Configuration du fond quadrillé
  grid: {
    size: '24px',
    color: '#DADADA',
    opacity: 0.1,
  },
  
  // Configuration des points flottants
  floatingDots: {
    colors: ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'],
    sizes: ['2px', '4px', '6px', '8px'],
    animationDuration: '10s',
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
  mainButton: 'h-14 px-8 rounded-full font-medium transition-all shadow-md',
  cardBase: 'rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-sm p-4',
  cardWithHover: 'rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-sm p-4 hover:shadow-md hover:bg-white/90 transition-all',
  iconButtonBase: 'h-12 w-12 flex items-center justify-center rounded-full shadow-sm transition-all',
  inputBase: 'bg-white/90 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-dutch-blue/20 focus:border-dutch-blue outline-none transition-all w-full',
  headingGradient: 'text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent',
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
};

export default UI_CONFIG;
