
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameTextVariants = cva(
  "text-gray-800",
  {
    variants: {
      variant: {
        h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
        h2: "text-3xl md:text-4xl font-bold",
        h3: "text-2xl md:text-3xl font-semibold",
        h4: "text-xl md:text-2xl font-semibold",
        h5: "text-lg md:text-xl font-medium",
        h6: "text-base md:text-lg font-medium",
        body: "text-base leading-relaxed",
        small: "text-sm leading-relaxed",
        caption: "text-xs leading-relaxed text-gray-600",
      },
      color: {
        primary: "text-game-blue",
        secondary: "text-game-purple", 
        accent: "text-game-orange",
        muted: "text-gray-600",
        light: "text-gray-500",
        gradient: "bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent",
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
      }
    },
    defaultVariants: {
      variant: "body",
      color: "primary",
      align: "left",
      weight: "normal",
    },
  }
);

export interface GameTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
  VariantProps<typeof gameTextVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const GameText: React.FC<GameTextProps> = ({
  className,
  variant,
  color,
  align,
  weight,
  as = 'p',
  children,
  ...props
}) => {
  const Component = as;
  
  return (
    <Component
      className={cn(gameTextVariants({ variant, color, align, weight, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};
