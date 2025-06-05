
import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const unifiedButtonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 shadow-md hover:shadow-lg",
        secondary: "bg-dutch-purple text-white hover:bg-dutch-purple/90 shadow-md hover:shadow-lg",
        accent: "bg-dutch-orange text-white hover:bg-dutch-orange/90 shadow-md hover:shadow-lg",
        ghost: "bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80",
        glass: "bg-white/60 backdrop-blur-xl border border-white/40 text-gray-800 hover:bg-white/75 shadow-sm hover:shadow-md",
        outline: "border-2 border-dutch-blue text-dutch-blue bg-transparent hover:bg-dutch-blue/10",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
        link: "text-dutch-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-2xl",
        md: "h-10 px-4 text-sm rounded-2xl",
        lg: "h-12 px-6 text-base rounded-2xl",
        xl: "h-14 px-8 text-lg rounded-3xl",
        icon: "h-10 w-10 rounded-2xl",
        "icon-sm": "h-8 w-8 rounded-xl",
        "icon-lg": "h-12 w-12 rounded-2xl",
      },
      animated: {
        true: "hover:-translate-y-0.5 active:translate-y-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      animated: true,
    },
  }
);

export interface UnifiedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof unifiedButtonVariants> {
  asChild?: boolean;
}

export const UnifiedButton: React.FC<UnifiedButtonProps> = ({
  className,
  variant,
  size,
  animated,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(unifiedButtonVariants({ variant, size, animated, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
