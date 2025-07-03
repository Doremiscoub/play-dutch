/**
 * Factory de Variants Centralisés
 * Génère automatiquement les variants avec validation
 */

import { DESIGN_TOKENS } from '../tokens/centralized';
import type { ComponentTokens } from '../tokens/centralized';

// ========== VALIDATION SYSTÈME ==========
const FORBIDDEN_PATTERNS = [
  /#[0-9A-Fa-f]{6}/g,        // HEX colors
  /rgba?\([^)]+\)/g,         // RGB/RGBA functions
  /bg-\[#[0-9A-Fa-f]+\]/g,   // Tailwind arbitrary values
  /text-\[#[0-9A-Fa-f]+\]/g, // Tailwind arbitrary text colors
  /border-\[#[0-9A-Fa-f]+\]/g, // Tailwind arbitrary borders
] as const;

export const validateTokenUsage = (styles: string): boolean => {
  return FORBIDDEN_PATTERNS.every(pattern => !pattern.test(styles));
};

// ========== FACTORY DE VARIANTS ==========
export function createComponentVariants<T extends Record<string, any>>(
  componentName: keyof ComponentTokens,
  customVariants?: T
) {
  const baseTokens = DESIGN_TOKENS.component[componentName];
  
  if (!baseTokens) {
    throw new Error(`Component tokens not found for: ${String(componentName)}`);
  }

  return {
    ...baseTokens,
    ...customVariants,
  };
}

// ========== VARIANTS BUTTON + LIQUID GLASS APPLE ==========
export const createButtonVariants = () => {
  const tokens = DESIGN_TOKENS.component.button;
  
  return {
    // ===== LIQUID GLASS APPLE VARIANTS =====
    
    // Liquid Header - Ultra-transparent pour headers (4px blur)
    liquidHeader: {
      base: "lg-header lg-ultrathin lg-tint-primary-50 text-white font-semibold backdrop-blur-[4px]",
      hover: "hover:lg-opacity-60 hover:lg-elevation-02 hover:-translate-y-0.5 transition-all duration-[120ms]",
      active: "active:lg-opacity-40 active:backdrop-blur-[2px] active:lg-elevation-01",
      focus: "focus:ring-2 focus:ring-white/30",
      disabled: "disabled:opacity-30 disabled:cursor-not-allowed disabled:saturate-50",
    },
    
    // Liquid Card - Pour cartes interactives (12px blur)
    liquidCard: {
      base: "lg-card lg-regular lg-tint-secondary-70 text-white font-medium backdrop-blur-[12px]",
      hover: "hover:lg-opacity-80 hover:lg-elevation-03 hover:-translate-y-0.5 transition-all duration-[120ms]",
      active: "active:lg-opacity-60 active:backdrop-blur-[10px] active:lg-elevation-02",
      focus: "focus:ring-2 focus:ring-white/30",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Liquid Sheet - Pour modales (16px blur)  
    liquidSheet: {
      base: "lg-sheet lg-thick lg-tint-accent-60 text-white font-semibold backdrop-blur-[16px]",
      hover: "hover:lg-opacity-70 hover:lg-elevation-04 hover:-translate-y-0.5 transition-all duration-[120ms]",
      active: "active:lg-opacity-50 active:backdrop-blur-[14px] active:lg-elevation-03",
      focus: "focus:ring-2 focus:ring-white/30", 
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Liquid Popover - Avec bord lumineux (12px blur + glow)
    liquidPopover: {
      base: "lg-popover lg-popover lg-tint-primary-70 text-white font-medium backdrop-blur-[12px] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_8px_rgba(255,255,255,0.1)]",
      hover: "hover:lg-opacity-80 hover:lg-elevation-03 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_0_12px_rgba(255,255,255,0.15)] transition-all duration-[120ms]",
      active: "active:lg-opacity-60 active:backdrop-blur-[10px] active:lg-elevation-02",
      focus: "focus:ring-2 focus:ring-white/30",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // ===== TRINITY VARIANTS ENRICHIS APPLE =====
    
    // Trinity - Bouton principal Dutch avec interactions Apple
    trinity: {
      base: "btn-kids-primary text-white font-bold shadow-lg backdrop-blur-[12px]",
      hover: "hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-trinity-blue/50",
      disabled: "disabled:opacity-30 disabled:cursor-not-allowed disabled:saturate-50",
    },
    
    // Kids variants avec interactions Apple raffinées
    kidsPrimary: {
      base: "btn-kids-blue text-white font-bold backdrop-blur-[12px]",
      hover: "hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-blue hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-blue-400/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    kidsSecondary: {
      base: "btn-kids-purple text-white font-bold backdrop-blur-[12px]",
      hover: "hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-purple hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-purple-400/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    kidsTertiary: {
      base: "btn-kids-orange text-white font-bold backdrop-blur-[12px]",
      hover: "hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-orange hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-orange-400/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Glass coloré avec interactions Apple
    glassColored: {
      base: "btn-glass-colored text-white font-semibold backdrop-blur-[15px]",
      hover: "hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-glass-lg hover:backdrop-blur-[17px] transition-all duration-[120ms]",
      active: "active:scale-[0.98] active:backdrop-blur-[13px]",
      focus: "focus:ring-2 focus:ring-trinity-blue/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Gaming - Bouton gaming avec Apple motion
    gaming: {
      base: "btn-kids-gaming text-white font-gaming text-xs tracking-wider uppercase backdrop-blur-[12px]",
      hover: "hover:scale-110 hover:shadow-glow-rainbow hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-90 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-purple-500/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Success et Fun avec Apple polish
    success: {
      base: "btn-kids-lime text-white font-bold backdrop-blur-[12px]",
      hover: "hover:scale-105 hover:shadow-glow-lime hover:-translate-y-0.5 hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-lime-400/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    fun: {
      base: "btn-kids-fun text-white font-bold backdrop-blur-[12px]",
      hover: "hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-rainbow hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-pink-400/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Legacy compatibility avec Apple interactions
    glass: {
      base: "btn-glass-colored text-white font-medium backdrop-blur-[15px]",
      hover: "hover:-translate-y-0.5 hover:scale-[1.02] hover:backdrop-blur-[17px] transition-all duration-[120ms]",
      active: "active:scale-[0.98] active:backdrop-blur-[13px]",
      focus: "focus:ring-2 focus:ring-trinity-blue/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
    
    // Error - Bouton destructif avec Apple style
    destructive: {
      base: "bg-gradient-to-r from-red-400 to-red-600 text-white font-bold backdrop-blur-[12px]",
      hover: "hover:from-red-500 hover:to-red-700 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 hover:backdrop-blur-[14px] transition-all duration-[120ms]",
      active: "active:scale-95 active:backdrop-blur-[10px]",
      focus: "focus:ring-4 focus:ring-red-400/50",
      disabled: "disabled:opacity-30 disabled:saturate-50",
    },
  };
};

// ========== VARIANTS CARD ==========
export const createCardVariants = () => {
  return {
    // Kids Cards - Cartes colorées pour enfants
    kidsBlue: {
      base: "card-kids-blue text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-blue hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    kidsPurple: {
      base: "card-kids-purple text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-purple hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    kidsOrange: {
      base: "card-kids-orange text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-orange hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    kidsPink: {
      base: "card-kids-pink text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-pink hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    kidsLime: {
      base: "card-kids-lime text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-lime hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    kidsTurquoise: {
      base: "card-kids-turquoise text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-turquoise hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Glass coloré - Remplace l'ancien glass transparent
    glassColored: {
      base: "card-glass-colored text-foreground backdrop-blur-lg",
      hover: "hover:shadow-glass-lg hover:-translate-y-0.5",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Gaming - Carte gaming améliorée
    gaming: {
      base: "card-kids-gaming text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-rainbow hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Fun - Carte multicolore
    fun: {
      base: "card-kids-fun text-white shadow-lg backdrop-blur-lg",
      hover: "hover:shadow-glow-rainbow hover:-translate-y-1 hover:scale-[1.02]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Legacy compatibility - maintenant colorées
    glass: {
      base: "card-glass-colored text-foreground backdrop-blur-lg",
      hover: "hover:shadow-glass-lg hover:-translate-y-0.5",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Elevated - Carte surélevée
    elevated: {
      base: "bg-background border border-border shadow-lg rounded-3xl p-6",
      hover: "hover:shadow-xl hover:-translate-y-1",
      interactive: "cursor-pointer transition-all duration-300",
    },
  };
};

// ========== VARIANTS BADGE ==========
export const createBadgeVariants = () => {
  const tokens = DESIGN_TOKENS.component.badge;
  
  return {
    default: "badge-default",
    primary: "badge-primary", 
    secondary: "badge-secondary",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
    legendary: "badge-legendary",
    
    // Variants de taille
    sm: "text-xs px-2 py-0.5 rounded-md",
    md: "text-sm px-2.5 py-0.5 rounded-lg",
    lg: "text-base px-3 py-1 rounded-xl",
    
    // Variants d'interaction
    interactive: "cursor-pointer hover:scale-105 transition-transform duration-200",
    static: "cursor-default",
  };
};

// ========== VARIANTS INPUT ==========
export const createInputVariants = () => {
  return {
    // Default - Input standard
    default: {
      base: "rounded-xl border px-4 py-2 transition-all duration-200",
      normal: "border-border bg-background text-foreground",
      focus: "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
      error: "border-error focus:ring-error/50",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    
    // Glass - Input glassmorphisme
    glass: {
      base: "rounded-xl border px-4 py-2 transition-all duration-200",
      normal: "border-glass-border-light bg-glass-light backdrop-blur-lg text-foreground",
      focus: "focus:outline-none focus:border-glass-border-strong focus:shadow-glass",
      error: "border-error focus:ring-error/50",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    
    // Floating - Input avec label flottant
    floating: {
      container: "relative",
      input: "peer rounded-xl border px-4 pt-6 pb-2 transition-all duration-200",
      label: "absolute left-4 top-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2",
    },
  };
};

// ========== EXPORT CENTRALISÉ DES VARIANTS ==========
export const COMPONENT_VARIANTS = {
  button: createButtonVariants(),
  card: createCardVariants(),
  badge: createBadgeVariants(),
  input: createInputVariants(),
} as const;

// ========== UTILITAIRES DE STYLE ==========
export const getComponentStyle = (
  component: keyof typeof COMPONENT_VARIANTS,
  variant: string,
  state?: string
) => {
  const componentVariants = COMPONENT_VARIANTS[component];
  // @ts-ignore - Dynamic access necessaire pour la flexibilité
  const variantStyles = componentVariants[variant];
  
  if (!variantStyles) {
    console.warn(`Variant '${variant}' not found for component '${component}'`);
    return '';
  }
  
  // Si c'est un objet avec des sous-états
  if (typeof variantStyles === 'object' && state) {
    // @ts-ignore
    return variantStyles[state] || variantStyles.base || '';
  }
  
  // Si c'est une string directe
  if (typeof variantStyles === 'string') {
    return variantStyles;
  }
  
  // Si c'est un objet, retourner la base par défaut
  if (typeof variantStyles === 'object' && variantStyles.base) {
    return variantStyles.base;
  }
  
  return '';
};

// ========== HELPERS DE VALIDATION ==========
export const isDutchCompliant = (className: string): boolean => {
  // Vérifie si les classes utilisent le système Dutch
  const dutchPatterns = [
    /btn-glass/,
    /card-glass/,
    /text-trinity/,
    /shadow-trinity/,
    /trinity-\w+-\d+/,
    /glass-\w+/,
  ];
  
  return dutchPatterns.some(pattern => pattern.test(className));
};

export const getMigrationSuggestion = (oldClass: string): string => {
  const migrations: Record<string, string> = {
    'bg-white/80': 'card-glass',
    'bg-white/70': 'btn-glass',
    'border-white/50': 'border-glass-border-light',
    'from-dutch-blue': 'text-trinity or btn-glass-trinity',
    'bg-gradient-to-r': 'btn-glass-trinity or text-trinity',
    'shadow-lg': 'shadow-glass or shadow-trinity',
  };
  
  for (const [old, suggestion] of Object.entries(migrations)) {
    if (oldClass.includes(old)) {
      return suggestion;
    }
  }
  
  return 'Use Dutch design system tokens';
};

export type ComponentVariants = typeof COMPONENT_VARIANTS;