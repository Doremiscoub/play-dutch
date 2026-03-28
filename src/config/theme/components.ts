
/**
 * Configuration des composants d'interface utilisateur - V2 Clean
 */

export const GLASS = {
  light: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    border: '1px solid hsl(var(--border))',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(15px)',
    border: '1px solid hsl(var(--border))',
  },
  heavy: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid hsl(var(--border))',
  },
  dark: {
    background: 'rgba(30, 30, 30, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
};

export const COMPONENT_STYLES = {
  button: {
    base: 'transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    accent: 'bg-dutch-orange text-white hover:bg-dutch-orange/90',
    ghost: 'bg-white border border-border shadow-sm hover:bg-accent/10',
  },
  card: {
    base: 'overflow-hidden transition-all',
    glass: 'bg-white border border-border shadow-sm',
    hover: 'hover:shadow-md transform-gpu hover:-translate-y-0.5 transition-all',
  },
  text: {
    heading: {
      base: 'font-medium',
      gradient: 'bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent',
    },
    body: {
      base: 'text-foreground',
    },
  },
  input: {
    base: 'transition-all focus:outline-none focus:ring-2',
    default: 'bg-white border border-border focus:border-primary focus:ring-primary/20',
    glass: 'bg-white border border-border focus:border-primary focus:ring-primary/20',
  },
};

