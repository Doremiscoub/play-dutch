
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameCardVariants = cva(
  "rounded-xl transition-all duration-200 border shadow-sm relative overflow-hidden",
  {
    variants: {
      variant: {
        glass: "bg-white border-border hover:shadow-md",
        solid: "bg-white border-border hover:shadow-md",
        gradient: "bg-white border-border hover:shadow-md",
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
      }
    },
    defaultVariants: {
      variant: "solid",
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: animationDelay, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
