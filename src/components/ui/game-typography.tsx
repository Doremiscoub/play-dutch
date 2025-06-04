
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameTextVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        hero: "font-adventure text-game-6xl font-game-black leading-none tracking-tight",
        gameHeader: "font-game text-game-4xl font-game-bold leading-tight tracking-tight",
        adventure: "font-adventure text-game-3xl font-game-extrabold leading-tight",
        actionButton: "font-action text-game-lg font-game-bold leading-none tracking-wide uppercase",
        scoreDisplay: "font-score text-score-md font-game-bold leading-none tracking-wider",
        cardTitle: "font-classic text-game-2xl font-game-semibold leading-tight",
        body: "font-body text-game-base font-game-normal leading-relaxed",
        caption: "font-body text-game-sm font-game-medium leading-normal"
      },
      effect: {
        none: "",
        outline: "text-stroke-2 text-stroke-white",
        shadow: "drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]",
        glow: "drop-shadow-[0_0_8px_currentColor]",
        emboss: "text-shadow-[1px_1px_0_rgba(255,255,255,0.5),-1px_-1px_0_rgba(0,0,0,0.3)]"
      },
      color: {
        default: "text-gray-800",
        white: "text-white",
        primary: "text-dutch-blue",
        secondary: "text-dutch-purple",
        accent: "text-dutch-orange",
        gradient: "bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent",
        gameGradient: "bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent"
      }
    },
    defaultVariants: {
      variant: "body",
      effect: "none",
      color: "default"
    }
  }
);

export interface GameTextProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof gameTextVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  children: React.ReactNode;
}

export const GameText: React.FC<GameTextProps> = ({
  className,
  variant,
  effect,
  color,
  as: Component = 'p',
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(gameTextVariants({ variant, effect, color, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};

// Specialized components for common use cases
export const GameHero: React.FC<Omit<GameTextProps, 'variant'>> = (props) => (
  <GameText variant="hero" as="h1" {...props} />
);

export const GameHeader: React.FC<Omit<GameTextProps, 'variant'>> = (props) => (
  <GameText variant="gameHeader" as="h2" {...props} />
);

export const ScoreText: React.FC<Omit<GameTextProps, 'variant'>> = (props) => (
  <GameText variant="scoreDisplay" as="span" {...props} />
);

export const ActionText: React.FC<Omit<GameTextProps, 'variant'>> = (props) => (
  <GameText variant="actionButton" as="span" {...props} />
);
