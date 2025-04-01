
/**
 * Configuration centrale pour l'UI de l'application Dutch
 * Ce fichier centralise tous les paramètres de design, animations et comportements UX
 */

// Couleurs principales de l'application
export const colors = {
  // Couleurs de base
  blue: "#1EAEDB",
  orange: "#F97316",
  purple: "#8B5CF6",
  green: "#10B981",
  red: "#EF4444",
  yellow: "#FBBF24",
  
  // Couleurs spécifiques
  dutchBlue: "#1EAEDB",
  dutchOrange: "#F97316",
  dutchPurple: "#8B5CF6",
  dutchGreen: "#10B981",
  dutchRed: "#EF4444",
  dutchYellow: "#FBBF24",
  
  // Couleurs sémantiques
  primary: "#1EAEDB",
  secondary: "#F97316",
  accent: "#8B5CF6",
  success: "#10B981",
  error: "#EF4444",
  warning: "#FBBF24",
  
  // Couleurs de texte et backgrounds
  textPrimary: "#222222",
  textSecondary: "#666666",
  textLight: "#FFFFFF",
  backgroundLight: "#F9FAFB",
  backgroundDark: "#111827",
  backgroundGlass: "rgba(255, 255, 255, 0.7)",
};

// Durations des animations
export const animations = {
  fast: "0.2s",
  normal: "0.3s",
  slow: "0.5s",
  veryFast: "0.1s",
  verySlow: "0.8s",
  extraSlow: "1.2s",
  
  // Animations keyframes
  fadeIn: "fade-in 0.3s ease-out forwards",
  fadeOut: "fade-out 0.3s ease-out forwards",
  scaleIn: "scale-in 0.2s ease-out forwards",
  scaleOut: "scale-out 0.2s ease-out forwards",
  enterLeft: "enter-left 0.3s ease-out forwards",
  enterRight: "enter-right 0.3s ease-out forwards",
  
  // Courbes d'animations
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  linear: "linear",
};

// Effets graphiques
export const effects = {
  glassBackground: "bg-white/70 backdrop-blur-md",
  cardBackground: "bg-white/80 backdrop-blur-sm",
  softShadow: "shadow-sm",
  mediumShadow: "shadow-md",
  largeShadow: "shadow-lg",
  borderRadius: {
    small: "rounded-md",
    medium: "rounded-xl",
    large: "rounded-2xl",
    full: "rounded-full",
  },
  border: "border border-white/30",
};

// Espacement
export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "3rem",
  
  containerPadding: "px-4 py-3", // Padding standard pour les containers
  sectionGap: "space-y-4", // Espacement standard entre les sections
  itemGap: "gap-3", // Espacement standard entre les items
};

// Typographie
export const typography = {
  fontFamily: {
    sans: "ui-sans-serif, system-ui, sans-serif",
    mono: "ui-monospace, monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    title: "1.75rem",
  },
  fontWeight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  lineHeight: {
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
  },
};

// Z-index
export const zIndex = {
  base: 0,
  above: 10,
  modal: 50,
  toast: 100,
  max: 9999,
};

// Classes composées pour des cas d'utilisation communs
export const composedClasses = {
  // Card styles
  card: "bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-sm hover:shadow-md transition-all",
  modalCard: "bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl",
  
  // Button styles
  primaryButton: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0",
  secondaryButton: "bg-white/70 backdrop-blur-sm border border-white/30 text-gray-700 font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0",
  iconButton: "rounded-full p-2 bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0",
  
  // Text styles
  title: "text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent",
  subtitle: "text-lg font-semibold text-gray-800",
  paragraph: "text-gray-700",
  caption: "text-sm text-gray-500",
  
  // Transition effects
  transition: "transition-all duration-300",
  hoverLift: "hover:-translate-y-0.5 hover:shadow-md",
  activePush: "active:translate-y-0 active:shadow-sm",
  
  // Flex layouts
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexColumn: "flex flex-col",
  
  // Table styles
  table: "w-full overflow-x-auto rounded-xl border border-white/30 bg-white/60 backdrop-blur-sm shadow-sm",
  tableHeader: "bg-white/30",
  tableRow: "hover:bg-white/40 transition-colors",
  tableCell: "p-3 align-middle",
  
  // Input styles
  input: "rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 focus:border-dutch-blue/40 transition-all",
};

// Breakpoints (correspond à ceux de Tailwind)
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Préférences utilisateur et thème
export const userPreferences = {
  defaultTheme: "blue", // blue, green, pink, purple, red
  defaultSoundEnabled: true,
  defaultAnimationEnabled: true,
  defaultLanguage: "fr",
};

// Scores et niveaux
export const scoring = {
  // Échelle de couleurs selon le score
  getScoreColor: (score: number, isDutch: boolean = false): string => {
    if (score === 0) return "bg-transparent";
    if (isDutch) return "bg-dutch-orange/20 text-dutch-orange font-medium";
    
    // Échelle de couleurs selon le score
    if (score <= 5) return "bg-green-50 text-green-700";
    if (score <= 10) return "bg-emerald-100/70 text-emerald-700";
    if (score <= 15) return "bg-yellow-100/70 text-amber-700";
    if (score <= 20) return "bg-orange-100/70 text-orange-700";
    if (score <= 30) return "bg-orange-200/70 text-orange-800";
    if (score <= 40) return "bg-red-200/70 text-red-700";
    return "bg-red-300/70 text-red-800 font-medium";
  },
  
  // Évaluation des niveaux de compétences
  getSkillLevel: (value: number, type: 'consistency' | 'improvement'): string => {
    if (type === 'consistency') {
      if (value <= 3) return "Chirurgical";
      if (value <= 6) return "Stable";
      if (value <= 10) return "Variable";
      return "Chaotique";
    } else {
      if (value < -5) return "En chute libre";
      if (value < 0) return "Décline";
      if (value === 0) return "Stable";
      if (value < 5) return "Progresse";
      return "En feu";
    }
  },
  
  // Couleurs pour les niveaux de compétences
  getSkillColor: (value: number, type: 'consistency' | 'improvement'): string => {
    if (type === 'consistency') {
      if (value <= 3) return "text-green-600";
      if (value <= 6) return "text-blue-600";
      if (value <= 10) return "text-orange-500";
      return "text-red-500";
    } else {
      if (value < -5) return "text-red-600";
      if (value < 0) return "text-orange-500";
      if (value === 0) return "text-gray-600";
      if (value < 5) return "text-blue-500";
      return "text-green-600";
    }
  },
};

// Limites et configurations
export const limits = {
  maxPlayers: 8,
  minPlayers: 2,
  maxRounds: 100,
  defaultGameEndScore: 100,
  maxTournamentGames: 10,
};

// Utilisé pour générer des couleurs aléatoires pour les graphiques et autres
export const getPlayerColor = (index: number): string => {
  const colors = [
    colors.dutchBlue,
    colors.dutchOrange,
    colors.dutchPurple,
    colors.dutchGreen,
    colors.dutchRed,
    colors.dutchYellow,
    "#0EA5E9", // sky-blue
    "#D946EF", // pink
  ];
  
  return colors[index % colors.length];
};

// Configuration des sons de l'application
export const sounds = {
  cardSound: "/sounds/card-sound.mp3",
  winSound: "/sounds/win-sound.mp3",
  undoSound: "/sounds/undo-sound.mp3",
  dutchSound: "/sounds/dutch-sound.mp3",
};

// Export par défaut pour un accès facile
export default {
  colors,
  animations,
  effects,
  spacing,
  typography,
  zIndex,
  composedClasses,
  breakpoints,
  userPreferences,
  scoring,
  limits,
  getPlayerColor,
  sounds,
};
