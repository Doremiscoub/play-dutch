import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { SparkleIcon } from './sparkle-icon';

const modernTitleVariants = cva(
  "font-bold tracking-tight relative z-10",
  {
    variants: {
      variant: {
        h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
        h2: "text-3xl sm:text-4xl md:text-5xl",
        h3: "text-2xl sm:text-3xl font-extrabold",
        h4: "text-xl sm:text-2xl",
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
        <div className="absolute -top-8 -right-8 z-20 animate-float">
          <SparkleIcon />
        </div>
      )}
    </Component>
  );
};
