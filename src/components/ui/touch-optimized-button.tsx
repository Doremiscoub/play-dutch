
import React, { useState, useCallback, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useAdaptiveInterface } from './adaptive-layout';
import { cn } from '@/lib/utils';

interface TouchOptimizedButtonProps extends Omit<ButtonProps, 'size'> {
  children: ReactNode;
  hapticFeedback?: boolean;
  touchFeedback?: boolean;
  adaptiveSize?: boolean;
  rippleEffect?: boolean;
  longPressAction?: () => void;
  longPressDuration?: number;
}

export const TouchOptimizedButton: React.FC<TouchOptimizedButtonProps> = ({
  children,
  className,
  disabled,
  hapticFeedback = true,
  touchFeedback = true,
  adaptiveSize = true,
  rippleEffect = true,
  longPressAction,
  longPressDuration = 800,
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const { selectionChanged, impactOccurred } = useHapticFeedback();
  const { isMobile, getAdaptiveButtonSize } = useAdaptiveInterface();
  
  const longPressTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Feedback haptique
    if (hapticFeedback && isMobile) {
      selectionChanged();
    }

    // Effet ripple
    if (rippleEffect && event.touches.length === 1) {
      const rect = event.currentTarget.getBoundingClientRect();
      const touch = event.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      const newRipple = {
        x,
        y,
        id: Date.now()
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Supprimer le ripple après l'animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    // Long press
    if (longPressAction) {
      longPressTimer.current = setTimeout(() => {
        longPressAction();
        if (hapticFeedback && isMobile) {
          impactOccurred();
        }
      }, longPressDuration);
    }
  }, [disabled, hapticFeedback, rippleEffect, longPressAction, longPressDuration, isMobile, selectionChanged, impactOccurred]);

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false);
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Feedback haptique pour le click
    if (hapticFeedback && isMobile) {
      impactOccurred();
    }
    
    onClick?.(event);
  }, [disabled, hapticFeedback, isMobile, impactOccurred, onClick]);

  const buttonClasses = cn(
    'relative overflow-hidden touch-manipulation',
    adaptiveSize ? getAdaptiveButtonSize() : '',
    {
      'min-h-[44px] min-w-[44px]': isMobile, // Taille minimum recommandée pour iOS/Android
      'active:scale-95': touchFeedback && !disabled,
      'select-none': true,
    },
    className
  );

  const motionProps: MotionProps = {
    whileTap: touchFeedback && !disabled ? { scale: 0.95 } : undefined,
    transition: { duration: 0.1 }
  };

  return (
    <motion.div {...motionProps}>
      <Button
        className={buttonClasses}
        disabled={disabled}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        {...props}
      >
        {/* Contenu du bouton */}
        <span className="relative z-10">{children}</span>
        
        {/* Effets ripple */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
        
        {/* Indicateur de pression */}
        {isPressed && touchFeedback && (
          <motion.div
            className="absolute inset-0 bg-black/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </Button>
    </motion.div>
  );
};
