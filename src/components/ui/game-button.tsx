
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ActionText } from './game-typography';

const gameButtonVariants = cva(
  "inline-flex items-center justify-center font-action font-game-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        // UNO-inspired primary button
        uno: "bg-gradient-to-b from-red-500 to-red-600 text-white border-4 border-white shadow-[0_6px_0_#b91c1c,0_8px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_#b91c1c,0_6px_20px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_#b91c1c,0_3px_15px_rgba(0,0,0,0.5)] active:translate-y-1",
        // Pokémon-inspired adventure button
        pokemon: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-black border-3 border-yellow-600 shadow-[0_4px_0_#d97706,inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_2px_0_#d97706,inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-1",
        // Classic card-inspired button
        classic: "bg-white text-gray-800 border-2 border-gray-800 shadow-[4px_4px_0_#374151] hover:shadow-[2px_2px_0_#374151] active:shadow-[1px_1px_0_#374151] active:translate-x-1 active:translate-y-1",
        // Dutch-themed primary
        dutch: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white border-2 border-white shadow-[0_4px_0_rgba(30,64,175,0.8)] hover:shadow-[0_2px_0_rgba(30,64,175,0.8)] active:translate-y-1",
        // Ghost/glass style
        ghost: "bg-white/80 backdrop-blur-xl border-2 border-white/60 text-gray-800 shadow-sm hover:bg-white/90 hover:shadow-md",
        // Destructive style
        destructive: "bg-gradient-to-b from-red-500 to-red-600 text-white border-2 border-red-700 shadow-[0_3px_0_#b91c1c] hover:shadow-[0_1px_0_#b91c1c] active:translate-y-1"
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-xl",
        md: "h-11 px-4 text-base rounded-2xl",
        lg: "h-14 px-6 text-lg rounded-2xl",
        xl: "h-16 px-8 text-xl rounded-3xl",
        icon: "h-11 w-11 rounded-2xl",
        "icon-sm": "h-9 w-9 rounded-xl",
        "icon-lg": "h-14 w-14 rounded-2xl"
      },
      gameStyle: {
        bold: "font-game-black tracking-wider",
        normal: "font-game-bold tracking-wide",
        condensed: "font-action tracking-widest"
      }
    },
    defaultVariants: {
      variant: "dutch",
      size: "md",
      gameStyle: "normal"
    }
  }
);

export interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof gameButtonVariants> {
  asChild?: boolean;
}

export const GameButton: React.FC<GameButtonProps> = ({
  className,
  variant,
  size,
  gameStyle,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(gameButtonVariants({ variant, size, gameStyle, className }))}
      {...props}
    >
      <ActionText className="relative z-10">
        {children}
      </ActionText>
    </button>
  );
};
