
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const enhancedCardVariants = cva(
  "rounded-xl transition-all duration-200 border shadow-sm relative overflow-hidden",
  {
    variants: {
      variant: {
        glass: "bg-white border-border hover:shadow-md",
        solid: "bg-white border-border hover:shadow-md",
        gradient: "bg-white border-border hover:shadow-md",
        holographic: "bg-white border-border hover:shadow-md",
        legendary: "bg-amber-50/50 border-amber-200/60 hover:shadow-md",
        shiny: "bg-white border-border hover:shadow-md",
        power: "bg-white border-border hover:shadow-md",
        trading: "bg-white border-border hover:shadow-md",
      },
      interactive: {
        true: "hover:-translate-y-0.5 cursor-pointer group",
        false: "",
      },
      padding: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        none: "p-0",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        full: "w-full",
      },
      rarity: {
        common: "",
        rare: "",
        epic: "shadow-md",
        legendary: "shadow-md",
      },
      glow: {
        none: "",
        subtle: "",
        medium: "",
        strong: "",
        rainbow: "",
      }
    },
    defaultVariants: {
      variant: "solid",
      interactive: false,
      padding: "md",
      size: "full",
      rarity: "common",
      glow: "none",
    },
  }
);

export interface EnhancedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof enhancedCardVariants> {
  withAnimation?: boolean;
  animationDelay?: number;
  withHolographicEffect?: boolean;
  withSparkles?: boolean;
  depth?: boolean;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  className,
  variant,
  interactive,
  padding,
  size,
  rarity,
  glow,
  withAnimation = true,
  animationDelay = 0,
  withHolographicEffect: _withHolographicEffect = false,
  withSparkles: _withSparkles = false,
  depth: _depth = false,
  children,
  ...props
}) => {
  const cardContent = (
    <div
      className={cn(
        enhancedCardVariants({ variant, interactive, padding, size, rarity, glow, className }),
      )}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: animationDelay,
          ease: "easeOut"
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
