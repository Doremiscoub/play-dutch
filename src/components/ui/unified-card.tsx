
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const unifiedCardVariants = cva(
  "rounded-3xl transition-all duration-300 border shadow-sm backdrop-blur-xl",
  {
    variants: {
      variant: {
        light: "bg-white/70 border-white/50 hover:bg-white/80 hover:shadow-md",
        medium: "bg-white/60 border-white/40 hover:bg-white/75 hover:shadow-md",
        heavy: "bg-white/50 border-white/30 hover:bg-white/65 hover:shadow-lg",
        solid: "bg-white border-gray-200 hover:shadow-md",
      },
      interactive: {
        true: "hover:-translate-y-0.5 cursor-pointer",
        false: "",
      },
      padding: {
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        none: "p-0",
      }
    },
    defaultVariants: {
      variant: "light",
      interactive: false,
      padding: "md",
    },
  }
);

export interface UnifiedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof unifiedCardVariants> {}

export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  className,
  variant,
  interactive,
  padding,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(unifiedCardVariants({ variant, interactive, padding, className }))}
      {...props}
    >
      {children}
    </div>
  );
};
