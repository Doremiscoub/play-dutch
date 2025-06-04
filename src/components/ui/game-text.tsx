
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameTextVariants = cva(
  "text-semantic-on-surface transition-colors duration-200",
  {
    variants: {
      variant: {
        // Hiérarchie principale - style Pokémon/Uno
        hero: "text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none",
        title: "text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight",
        h1: "text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight",
        h2: "text-xl md:text-3xl lg:text-4xl font-bold tracking-wide",
        h3: "text-lg md:text-2xl lg:text-3xl font-semibold tracking-wide",
        h4: "text-base md:text-xl lg:text-2xl font-semibold",
        h5: "text-sm md:text-lg lg:text-xl font-medium",
        h6: "text-xs md:text-base lg:text-lg font-medium",
        
        // Corps de texte optimisé mobile
        body: "text-sm md:text-base leading-relaxed",
        large: "text-base md:text-lg leading-relaxed font-medium",
        small: "text-xs md:text-sm leading-relaxed",
        caption: "text-xs leading-snug text-semantic-on-surface-muted",
        
        // Styles spéciaux inspirés des jeux
        card: "text-lg md:text-xl font-bold tracking-wide text-center",
        score: "text-2xl md:text-3xl font-black tracking-wider tabular-nums",
        player: "text-base md:text-lg font-semibold tracking-wide",
        badge: "text-xs md:text-sm font-bold uppercase tracking-widest",
        button: "text-sm md:text-base font-semibold tracking-wide",
        
        // Styles fun inspirés d'Uno/Pokémon
        wild: "text-xl md:text-2xl font-black tracking-wider uppercase transform hover:scale-105 transition-transform",
        action: "text-base md:text-lg font-bold tracking-wide uppercase text-center",
        power: "text-lg md:text-xl font-black tracking-widest uppercase text-center drop-shadow-sm",
        legendary: "text-2xl md:text-3xl font-black tracking-wider uppercase text-center bg-gradient-to-r from-semantic-primary to-semantic-secondary bg-clip-text text-transparent",
      },
      color: {
        primary: "text-semantic-primary",
        secondary: "text-semantic-secondary", 
        accent: "text-semantic-accent",
        success: "text-semantic-success",
        warning: "text-semantic-warning",
        error: "text-semantic-error",
        info: "text-semantic-info",
        muted: "text-semantic-on-surface-muted",
        light: "text-semantic-on-surface-subtle",
        white: "text-white",
        
        // Couleurs fun pour les jeux
        fire: "text-red-500",
        water: "text-blue-500", 
        grass: "text-green-500",
        electric: "text-yellow-500",
        psychic: "text-purple-500",
        ice: "text-cyan-300",
        
        // Gradients fun
        rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent",
        gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent",
        silver: "bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent",
        magic: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent",
      },
      state: {
        default: "",
        success: "text-semantic-success",
        warning: "text-semantic-warning",
        error: "text-semantic-error",
        info: "text-semantic-info",
        active: "text-semantic-primary",
        disabled: "text-semantic-on-surface-disabled opacity-60",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
      transform: {
        none: "",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
      },
      spacing: {
        tight: "tracking-tight",
        normal: "tracking-normal",
        wide: "tracking-wide",
        wider: "tracking-wider",
        widest: "tracking-widest",
      }
    },
    defaultVariants: {
      variant: "body",
      color: "primary",
      state: "default",
      align: "left",
      weight: "normal",
      transform: "none",
      spacing: "normal",
    },
  }
);

export interface GameTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
  VariantProps<typeof gameTextVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  animate?: boolean;
  glow?: boolean;
}

export const GameText: React.FC<GameTextProps> = ({
  className,
  variant,
  color,
  state,
  align,
  weight,
  transform,
  spacing,
  as = 'p',
  animate = false,
  glow = false,
  children,
  ...props
}) => {
  const Component = as;
  
  const glowClass = glow ? 'drop-shadow-glow' : '';
  const animateClass = animate ? 'animate-pulse-soft' : '';
  
  return (
    <Component
      className={cn(
        gameTextVariants({ 
          variant, 
          color, 
          state, 
          align, 
          weight, 
          transform, 
          spacing 
        }),
        glowClass,
        animateClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

// Composants de convenance pour les styles les plus utilisés
export const GameTitle = ({ children, ...props }: Omit<GameTextProps, 'variant'>) => (
  <GameText variant="title" {...props}>{children}</GameText>
);

export const GameHero = ({ children, ...props }: Omit<GameTextProps, 'variant'>) => (
  <GameText variant="hero" {...props}>{children}</GameText>
);

export const GameScore = ({ children, ...props }: Omit<GameTextProps, 'variant'>) => (
  <GameText variant="score" {...props}>{children}</GameText>
);

export const GameCard = ({ children, ...props }: Omit<GameTextProps, 'variant'>) => (
  <GameText variant="card" {...props}>{children}</GameText>
);

export const GameBadge = ({ children, ...props }: Omit<GameTextProps, 'variant'>) => (
  <GameText variant="badge" {...props}>{children}</GameText>
);

export const GameLegendary = ({ children, ...props }: Omit<GameTextProps, 'variant'>) => (
  <GameText variant="legendary" glow {...props}>{children}</GameText>
);
