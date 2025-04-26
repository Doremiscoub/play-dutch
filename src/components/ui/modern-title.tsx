
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const modernTitleVariants = cva(
  "font-bold tracking-tight relative z-10 text-transparent bg-clip-text animate-shimmer",
  {
    variants: {
      variant: {
        h1: "text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange",
        h2: "text-3xl sm:text-4xl bg-gradient-to-r from-dutch-blue to-dutch-purple",
        h3: "text-2xl sm:text-3xl bg-gradient-to-r from-dutch-purple to-dutch-orange",
        h4: "text-xl bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange",
      },
      withSparkles: {
        true: "after:content-[''] after:absolute after:-inset-1 after:-z-10 after:bg-gradient-to-r after:from-dutch-blue/20 after:via-dutch-purple/20 after:to-dutch-orange/20 after:blur-lg after:rounded-lg",
      }
    },
    defaultVariants: {
      variant: "h1",
      withSparkles: false
    }
  }
);

export interface ModernTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof modernTitleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const ModernTitle: React.FC<ModernTitleProps> = ({
  className,
  variant,
  withSparkles,
  as: Component = 'h1',
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        modernTitleVariants({ variant, withSparkles, className }),
        // Add shimmer effect background
        "bg-[length:200%_auto]"
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
