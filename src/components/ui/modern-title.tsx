
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { SparkleIcon } from './sparkle-icon';

const modernTitleVariants = cva(
  "font-bold tracking-tight relative z-10 text-transparent bg-clip-text bg-[length:300%_auto] animate-shimmer",
  {
    variants: {
      variant: {
        h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange",
        h2: "text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-dutch-blue to-dutch-purple",
        h3: "text-2xl sm:text-3xl bg-gradient-to-r from-dutch-purple to-dutch-orange",
        h4: "text-xl sm:text-2xl bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange",
      },
      withSparkles: {
        true: "after:content-[''] after:absolute after:-inset-1 after:-z-10 after:bg-gradient-to-r after:from-dutch-blue/10 after:via-dutch-purple/10 after:to-dutch-orange/10 after:blur-lg after:rounded-lg",
      },
      showIcon: {
        true: "inline-flex items-center justify-center",
      }
    },
    defaultVariants: {
      variant: "h1",
      withSparkles: false,
      showIcon: false
    }
  }
);

export interface ModernTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof modernTitleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  withIcon?: boolean;
}

export const ModernTitle: React.FC<ModernTitleProps> = ({
  className,
  variant,
  withSparkles,
  showIcon,
  as: Component = 'h1',
  withIcon = false,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        modernTitleVariants({ variant, withSparkles, showIcon, className }),
        "relative"
      )}
      {...props}
    >
      {children}
      {withIcon && (
        <div className="absolute -top-4 -right-4 z-10">
          <SparkleIcon />
        </div>
      )}
    </Component>
  );
};
