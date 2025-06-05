
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const enhancedButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        // Base variants
        primary: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 shadow-md hover:shadow-lg",
        secondary: "bg-dutch-purple text-white hover:bg-dutch-purple/90 shadow-md hover:shadow-lg",
        accent: "bg-dutch-orange text-white hover:bg-dutch-orange/90 shadow-md hover:shadow-lg",
        ghost: "bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80",
        glass: "bg-white/60 backdrop-blur-xl border border-white/40 text-gray-800 hover:bg-white/75 shadow-sm hover:shadow-md",
        
        // Gaming variants - NEW
        legendary: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 shadow-lg hover:shadow-xl border-2 border-yellow-300 font-bold tracking-wide",
        shiny: "bg-gradient-to-r from-gray-300 via-white to-gray-300 text-gray-800 shadow-lg hover:shadow-xl border-2 border-gray-200 font-semibold",
        power: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl border-2 border-purple-300 font-bold",
        electric: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900 shadow-lg hover:shadow-xl border-2 border-yellow-200 font-bold",
        fire: "bg-gradient-to-r from-red-400 via-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl border-2 border-red-300 font-bold",
        water: "bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl border-2 border-blue-300 font-bold",
        
        // Special effects
        rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl border-2 border-white/30 font-bold",
        holographic: "bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 text-white shadow-lg hover:shadow-xl border-2 border-white/50 font-bold",
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
      effect: {
        none: "",
        glow: "drop-shadow-lg",
        sparkle: "",
        pulse: "animate-pulse-soft",
        bounce: "hover:animate-bounce-uno",
        shake: "",
      },
      rarity: {
        common: "",
        rare: "shadow-md",
        epic: "shadow-lg",
        legendary: "shadow-xl animate-sparkle",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      effect: "none",
      rarity: "common",
    },
  }
);

// Define all conflicting event handlers that need to be excluded
type ConflictingProps = 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration';

export interface EnhancedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps>,
  VariantProps<typeof enhancedButtonVariants> {
  withSparkles?: boolean;
  withIcon?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  className,
  variant,
  size,
  effect,
  rarity,
  withSparkles = false,
  withIcon = false,
  icon,
  loading = false,
  children,
  onClick,
  disabled,
  type,
  ...props
}) => {
  const isSpecialVariant = ['legendary', 'shiny', 'power', 'rainbow', 'holographic'].includes(variant || '');
  
  return (
    <motion.button
      className={cn(enhancedButtonVariants({ variant, size, effect, rarity, className }))}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        y: 0,
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {/* Shimmer effect for special variants */}
      {isSpecialVariant && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Content container */}
      <div className={cn("relative z-10 flex items-center gap-2", loading && "opacity-0")}>
        {withIcon && icon}
        {children}
        {withSparkles && <Sparkles className="w-4 h-4" />}
        {variant === 'electric' && <Zap className="w-4 h-4" />}
      </div>
      
      {/* Particle effects for legendary */}
      {variant === 'legendary' && withSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full"
              animate={{
                x: [0, 20, -20, 0],
                y: [0, -20, 20, 0],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 15}%`,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};
