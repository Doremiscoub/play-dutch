
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const enhancedCardVariants = cva(
  "rounded-3xl transition-all duration-300 border shadow-sm relative overflow-hidden",
  {
    variants: {
      variant: {
        glass: "bg-white/70 backdrop-blur-xl border-white/50 hover:bg-white/80 hover:shadow-md",
        solid: "bg-white border-gray-200 hover:shadow-md",
        gradient: "bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-white/40 hover:from-white/90 hover:to-white/70",
        
        // Gaming variants - NEW
        holographic: "bg-gradient-to-br from-purple-100/80 via-pink-100/60 to-blue-100/80 backdrop-blur-xl border-2 border-white/60 hover:border-white/80",
        legendary: "bg-gradient-to-br from-yellow-100/90 to-yellow-50/70 backdrop-blur-xl border-2 border-yellow-200/80 hover:border-yellow-300/90",
        shiny: "bg-gradient-to-br from-gray-100/90 to-white/80 backdrop-blur-xl border-2 border-gray-200/80 hover:border-gray-300/90",
        power: "bg-gradient-to-br from-purple-100/80 via-pink-100/60 to-red-100/80 backdrop-blur-xl border-2 border-purple-200/80",
        trading: "bg-gradient-to-br from-blue-50/90 to-cyan-50/80 backdrop-blur-xl border-2 border-blue-200/80 hover:border-blue-300/90",
      },
      interactive: {
        true: "hover:-translate-y-2 cursor-pointer group transform-gpu",
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
        rare: "shadow-md",
        epic: "shadow-lg",
        legendary: "shadow-xl",
      },
      glow: {
        none: "",
        subtle: "drop-shadow-sm",
        medium: "drop-shadow-md",
        strong: "drop-shadow-lg",
        rainbow: "drop-shadow-glow",
      }
    },
    defaultVariants: {
      variant: "glass",
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
  withHolographicEffect = false,
  withSparkles = false,
  depth = false,
  children,
  ...props
}) => {
  const isSpecialVariant = ['holographic', 'legendary', 'shiny', 'power'].includes(variant || '');
  
  const cardContent = (
    <div
      className={cn(
        enhancedCardVariants({ variant, interactive, padding, size, rarity, glow, className }),
        depth && "shadow-2xl",
        withHolographicEffect && "perspective-1000"
      )}
      style={{
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Holographic shimmer effect */}
      {(isSpecialVariant || withHolographicEffect) && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-pink-400/5 via-blue-400/5 to-cyan-400/5 animate-pulse-soft"></div>
        </div>
      )}
      
      {/* Rainbow border for legendary */}
      {variant === 'legendary' && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 p-[2px] -z-10">
          <div className="w-full h-full rounded-3xl bg-white/90"></div>
        </div>
      )}
      
      {/* Content container with depth */}
      <div className={cn("relative z-10", depth && "transform-gpu")}>
        {children}
      </div>
      
      {/* Sparkle particles for special cards */}
      {withSparkles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0],
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glow effect for rarity */}
      {rarity === 'legendary' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
      )}
    </div>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: animationDelay,
          type: "spring",
          stiffness: 120
        }}
        whileHover={interactive ? { 
          y: -8, 
          rotateX: 5,
          rotateY: 5,
          transition: { duration: 0.2 }
        } : undefined}
        className="transform-gpu"
        style={{ perspective: '1000px' }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
