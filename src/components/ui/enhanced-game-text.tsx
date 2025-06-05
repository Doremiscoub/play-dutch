
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GameText, GameTextProps } from './game-text';

export interface EnhancedGameTextProps extends GameTextProps {
  withTypewriter?: boolean;
  withGlow?: boolean;
  withFloat?: boolean;
  sparkleColor?: string;
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal';
}

export const EnhancedGameText: React.FC<EnhancedGameTextProps> = ({
  withTypewriter = false,
  withGlow = false,
  withFloat = false,
  sparkleColor = '#FFD700',
  gradientDirection = 'horizontal',
  className,
  children,
  ...props
}) => {
  const textContent = (
    <GameText
      className={cn(
        withGlow && 'text-shadow-glow',
        withFloat && 'animate-float',
        className
      )}
      {...props}
    >
      {children}
    </GameText>
  );

  if (withTypewriter && typeof children === 'string') {
    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        transition={{ 
          duration: children.length * 0.05,
          ease: 'linear'
        }}
        className="overflow-hidden whitespace-nowrap"
      >
        {textContent}
      </motion.div>
    );
  }

  if (withFloat) {
    return (
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {textContent}
      </motion.div>
    );
  }

  return textContent;
};

// Convenience components for special text effects
export const TypewriterText: React.FC<GameTextProps> = ({ children, ...props }) => (
  <EnhancedGameText withTypewriter {...props}>
    {children}
  </EnhancedGameText>
);

export const GlowText: React.FC<GameTextProps> = ({ children, ...props }) => (
  <EnhancedGameText withGlow {...props}>
    {children}
  </EnhancedGameText>
);

export const FloatingText: React.FC<GameTextProps> = ({ children, ...props }) => (
  <EnhancedGameText withFloat {...props}>
    {children}
  </EnhancedGameText>
);

export const MagicText: React.FC<GameTextProps> = ({ children, ...props }) => (
  <EnhancedGameText withGlow withFloat color="magic" {...props}>
    {children}
  </EnhancedGameText>
);
