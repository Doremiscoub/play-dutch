
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameCardVariants = cva(
  "rounded-3xl transition-all duration-300 border shadow-sm relative overflow-hidden",
  {
    variants: {
      variant: {
        glass: "bg-white/70 backdrop-blur-xl border-white/50 hover:bg-white/80 hover:shadow-md",
        solid: "bg-white border-gray-200 hover:shadow-md",
        gradient: "bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/40 hover:from-white/90 hover:to-white/70",
      },
      interactive: {
        true: "hover:-translate-y-1 cursor-pointer group",
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
      }
    },
    defaultVariants: {
      variant: "glass",
      interactive: false,
      padding: "md",
      size: "full",
    },
  }
);

export interface GameCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof gameCardVariants> {
  withAnimation?: boolean;
  animationDelay?: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  className,
  variant,
  interactive,
  padding,
  size,
  withAnimation = true,
  animationDelay = 0,
  children,
  ...props
}) => {
  const content = (
    <div
      className={cn(gameCardVariants({ variant, interactive, padding, size, className }))}
      {...props}
    >
      {children}
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
        whileHover={interactive ? { y: -4 } : undefined}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
