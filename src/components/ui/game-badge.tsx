import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Crown, Medal, Zap, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const gameBadgeVariants = cva(
  "inline-flex items-center justify-center font-bold transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Rank badges
        rank: "rounded-full shadow-md",
        position: "rounded-full shadow-lg border-2",
        level: "rounded-lg px-2 py-1 shadow-sm",
        
        // Achievement badges  
        achievement: "rounded-xl px-3 py-1.5 shadow-md border",
        trophy: "rounded-full shadow-lg border-2",
        medal: "rounded-full shadow-lg border-2",
        
        // Status badges
        status: "rounded-full px-2 py-1 text-xs shadow-sm",
        special: "rounded-lg px-2 py-1 shadow-md border",
        legendary: "rounded-xl px-3 py-2 shadow-xl border-2",
        
        // Default simple badge
        default: "rounded-lg px-2 py-1 shadow-sm",
      },
      type: {
        // Rank types
        first: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-yellow-300",
        second: "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 border-gray-200",
        third: "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100 border-amber-500",
        top5: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400",
        other: "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-400",
        
        // Achievement types
        winner: "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-400",
        loser: "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400",
        dutch: "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-400",
        streak: "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-400",
        comeback: "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-400",
        
        // Special types
        fire: "bg-gradient-to-r from-red-400 to-red-500 text-white border-red-300",
        water: "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-300",
        electric: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-yellow-300",
        grass: "bg-gradient-to-r from-green-400 to-green-500 text-white border-green-300",
        psychic: "bg-gradient-to-r from-purple-400 to-purple-500 text-white border-purple-300",
        
        // Rarity types
        common: "bg-gray-100 text-gray-800 border-gray-200",
        rare: "bg-blue-100 text-blue-800 border-blue-200",
        epic: "bg-purple-100 text-purple-800 border-purple-200",
        legendary: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900 border-yellow-200",
        mythic: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white border-purple-300",
        
        // Default neutral style
        default: "bg-white/80 text-gray-800 border-gray-200",
      },
      size: {
        xs: "h-5 w-5 text-xs",
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
        xl: "h-12 w-12 text-lg",
        auto: "text-xs",
      },
      effect: {
        none: "",
        glow: "drop-shadow-lg",
        pulse: "animate-pulse-soft",
        bounce: "animate-bounce-uno",
        sparkle: "animate-sparkle",
        shimmer: "shimmer-rainbow",
      }
    },
    defaultVariants: {
      variant: "default",
      type: "default",
      size: "auto",
      effect: "none",
    },
  }
);

const iconMap = {
  trophy: Trophy,
  star: Star,
  crown: Crown,
  medal: Medal,
  zap: Zap,
  target: Target,
  award: Award,
};

export interface GameBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof gameBadgeVariants> {
  icon?: keyof typeof iconMap | React.ReactNode;
  count?: number;
  text?: string;
  animated?: boolean;
  withSparkles?: boolean;
  glowing?: boolean;
}

export const GameBadge: React.FC<GameBadgeProps> = ({
  className,
  variant,
  type,
  size,
  effect,
  icon,
  count,
  text,
  animated = true,
  withSparkles = false,
  glowing = false,
  children,
  ...props
}) => {
  const IconComponent = typeof icon === 'string' ? iconMap[icon] : null;
  const isLegendary = type === 'legendary' || type === 'mythic';
  const shouldAnimate = animated && (effect !== 'none' || isLegendary);
  
  const badgeContent = (
    <div
      className={cn(
        gameBadgeVariants({ variant, type, size, effect, className }),
        glowing && "shadow-lg",
        effect === 'shimmer' && "bg-size-200 animate-shimmer"
      )}
      {...props}
    >
      {/* Shimmer effect for legendary badges */}
      {isLegendary && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-1">
        {IconComponent && <IconComponent className="w-3 h-3" />}
        {typeof icon === 'object' && icon}
        {count !== undefined && <span>{count}</span>}
        {text && <span className="whitespace-nowrap">{text}</span>}
        {children}
      </div>
      
      {/* Sparkle effects */}
      {withSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              animate={{
                x: [0, 10, -10, 0],
                y: [0, -10, 10, 0],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${25 + i * 25}%`,
                top: `${25 + i * 25}%`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glow effect */}
      {glowing && (
        <div className="absolute -inset-1 bg-current rounded-full blur opacity-20"></div>
      )}
    </div>
  );

  if (shouldAnimate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
};

// Convenience components for common badge types
export const RankBadge: React.FC<Omit<GameBadgeProps, 'variant'> & { position: number }> = ({ position, ...props }) => {
  const getBadgeType = (pos: number) => {
    if (pos === 1) return 'first';
    if (pos === 2) return 'second';
    if (pos === 3) return 'third';
    if (pos <= 5) return 'top5';
    return 'other';
  };

  return (
    <GameBadge
      variant="position"
      type={getBadgeType(position)}
      count={position}
      effect={position <= 3 ? 'glow' : 'none'}
      withSparkles={position === 1}
      glowing={position <= 3}
      {...props}
    />
  );
};

export const AchievementBadge: React.FC<Omit<GameBadgeProps, 'variant'> & { achievement: string }> = ({ achievement, ...props }) => (
  <GameBadge
    variant="achievement"
    type="legendary"
    text={achievement}
    icon="trophy"
    effect="sparkle"
    withSparkles
    {...props}
  />
);

export const StatusBadge: React.FC<Omit<GameBadgeProps, 'variant'> & { status: string; color?: string }> = ({ status, color, ...props }) => (
  <GameBadge
    variant="status"
    type={color as any || 'common'}
    text={status}
    size="auto"
    {...props}
  />
);
