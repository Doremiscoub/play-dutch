
import { cva } from "class-variance-authority";

// Configuration UI globale pour maintenir la cohérence visuelle
export const UI_CONFIG = {
  colors: {
    blue: "#1EAEDB",
    purple: "#8B5CF6",
    orange: "#F97316",
    white: "#FFFFFF",
    lightGray: "#F8F9FA",
  },
  
  fonts: {
    sans: "Inter, system-ui, sans-serif",
  },
  
  borderRadius: {
    small: "0.25rem",
    medium: "0.5rem",
    large: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
  },
  
  transitions: {
    default: "all 0.3s ease",
  },
};

// Styles communs réutilisables dans toute l'application
export const COMMON_STYLES = {
  card: "bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all p-4",
  
  glassmorphism: "backdrop-blur-md bg-white/60 border border-white/40 shadow-sm",
  
  gradientText: "bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent",
  
  focusRing: "focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 focus:ring-offset-2",
  
  interactiveHover: "transition-transform hover:scale-105 active:scale-95",
};

// Variants pour les boutons
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dutch-blue/20 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-dutch-blue text-white hover:bg-dutch-blue/90",
        
        outline: "border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
        
        "dutch-glass": "bg-white/70 backdrop-blur-sm border border-white/40 text-dutch-blue hover:bg-white/90 transition-all",
        
        ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
        
        link: "bg-transparent text-dutch-blue underline-offset-4 hover:underline",
        
        floating: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg hover:shadow-xl border border-white/10 backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
        icon: "h-10 w-10",
        "game-action": "h-14 px-6 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export default {
  UI_CONFIG,
  COMMON_STYLES,
  buttonVariants,
};
