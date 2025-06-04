
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameCardVariants = cva(
  "transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Classic playing card style
        playingCard: "bg-white border-4 border-gray-800 shadow-[8px_8px_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_rgba(0,0,0,0.4)] hover:-translate-x-1 hover:-translate-y-1",
        // UNO card style
        unoCard: "bg-gradient-to-br from-red-500 to-red-600 border-4 border-white shadow-[0_8px_0_rgba(185,28,28,0.8),0_12px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_rgba(185,28,28,0.8),0_10px_20px_rgba(0,0,0,0.4)]",
        // Pokémon card style  
        pokemonCard: "bg-gradient-to-b from-yellow-100 to-yellow-200 border-4 border-yellow-600 shadow-[0_6px_0_#d97706,inset_0_2px_0_rgba(255,255,255,0.3)] hover:shadow-[0_4px_0_#d97706,inset_0_2px_0_rgba(255,255,255,0.4)]",
        // Modern glass style
        glass: "bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm hover:bg-white/80 hover:shadow-md",
        // Score card style
        score: "bg-white border-2 border-gray-300 shadow-[4px_4px_0_rgba(156,163,175,0.5)] hover:shadow-[2px_2px_0_rgba(156,163,175,0.6)]"
      },
      cornerStyle: {
        sharp: "rounded-none",
        soft: "rounded-lg",
        card: "rounded-2xl",
        pill: "rounded-3xl"
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 active:translate-y-0",
        false: ""
      }
    },
    defaultVariants: {
      variant: "glass",
      cornerStyle: "card",
      interactive: false
    }
  }
);

export interface GameCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof gameCardVariants> {
  children: React.ReactNode;
}

export const GameCard: React.FC<GameCardProps> = ({
  className,
  variant,
  cornerStyle,
  interactive,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(gameCardVariants({ variant, cornerStyle, interactive, className }))}
      {...props}
    >
      {children}
    </div>
  );
};

// Specialized card components
export const PlayingCard: React.FC<Omit<GameCardProps, 'variant'>> = (props) => (
  <GameCard variant="playingCard" cornerStyle="soft" {...props} />
);

export const ScoreCard: React.FC<Omit<GameCardProps, 'variant'>> = (props) => (
  <GameCard variant="score" cornerStyle="card" {...props} />
);

export const UnoCard: React.FC<Omit<GameCardProps, 'variant'>> = (props) => (
  <GameCard variant="unoCard" cornerStyle="card" {...props} />
);
