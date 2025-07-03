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

// ========== VARIANTS BUTTON ==========
export const createButtonVariants = () => {
  const tokens = DESIGN_TOKENS.component.button;
  
  return {
    // Trinity - Bouton principal Dutch
    trinity: {
      base: "btn-glass-trinity text-white font-semibold",
      hover: "hover:scale-[1.02] hover:-translate-y-1",
      active: "active:scale-[0.98]",
      focus: "focus:ring-2 focus:ring-dutch-blue/50",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    
    // Glass - Bouton glassmorphisme
    glass: {
      base: "btn-glass text-foreground font-medium",
      hover: "hover:-translate-y-1 hover:scale-[1.02]",
      active: "active:scale-[0.98]",
      focus: "focus:ring-2 focus:ring-glass-border-strong",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    },
    
    // Gaming - Bouton gaming avancé
    gaming: {
      base: "bg-gradient-gaming text-white font-gaming text-xs tracking-wider uppercase",
      hover: "hover:scale-105 hover:shadow-glow-purple",
      active: "active:scale-95",
      focus: "focus:ring-2 focus:ring-purple-500/50",
      disabled: "disabled:opacity-30",
    },
    
    // Success - Bouton de succès
    success: {
      base: "bg-gradient-to-r from-success to-success-dark text-white",
      hover: "hover:from-success-dark hover:to-success hover:shadow-lg hover:shadow-success/30",
      active: "active:scale-98",
      focus: "focus:ring-2 focus:ring-success/50",
      disabled: "disabled:opacity-50",
    },
    
    // Warning - Bouton d'avertissement
    warning: {
      base: "bg-gradient-to-r from-warning to-warning-dark text-white",
      hover: "hover:from-warning-dark hover:to-warning hover:shadow-lg hover:shadow-warning/30",
      active: "active:scale-98",
      focus: "focus:ring-2 focus:ring-warning/50",
      disabled: "disabled:opacity-50",
    },
    
    // Error - Bouton destructif
    destructive: {
      base: "bg-gradient-to-r from-error to-error-dark text-white",
      hover: "hover:from-error-dark hover:to-error hover:shadow-lg hover:shadow-error/30",
      active: "active:scale-98",
      focus: "focus:ring-2 focus:ring-error/50",
      disabled: "disabled:opacity-50",
    },
  };
};

// ========== VARIANTS CARD ==========
export const createCardVariants = () => {
  return {
    // Glass - Carte glassmorphisme standard
    glass: {
      base: "card-glass text-card-foreground",
      hover: "hover:shadow-glass-lg hover:-translate-y-0.5",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Gaming - Carte gaming avancée
    gaming: {
      base: "card-game text-card-foreground",
      hover: "hover:shadow-trinity hover:scale-[1.01]",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Elevated - Carte surélevée
    elevated: {
      base: "bg-background border border-border shadow-lg rounded-3xl p-6",
      hover: "hover:shadow-xl hover:-translate-y-1",
      interactive: "cursor-pointer transition-all duration-300",
    },
    
    // Flat - Carte plate
    flat: {
      base: "bg-muted/50 border border-border/50 rounded-2xl p-4",
      hover: "hover:bg-muted/70",
      interactive: "cursor-pointer transition-colors duration-200",
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