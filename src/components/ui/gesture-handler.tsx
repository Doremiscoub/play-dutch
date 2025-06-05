
import React, { useRef, useCallback, ReactNode } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useMediaQuery } from '@/hooks/use-mobile';

interface GestureHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  swipeThreshold?: number;
  enableHaptic?: boolean;
  className?: string;
}

export const GestureHandler: React.FC<GestureHandlerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onDoubleTap,
  onLongPress,
  swipeThreshold = 50,
  enableHaptic = true,
  className = ''
}) => {
  const controls = useAnimation();
  const { selectionChanged, impactOccurred } = useHapticFeedback();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const lastTapTime = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const initialTouchDistance = useRef<number>(0);

  // Gestion du swipe
  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const { offset, velocity } = info;
    const { x, y } = offset;
    
    // Détecter la direction du swipe
    if (Math.abs(x) > Math.abs(y)) {
      // Swipe horizontal
      if (Math.abs(x) > swipeThreshold) {
        if (x > 0 && onSwipeRight) {
          onSwipeRight();
          enableHaptic && selectionChanged();
        } else if (x < 0 && onSwipeLeft) {
          onSwipeLeft();
          enableHaptic && selectionChanged();
        }
      }
    } else {
      // Swipe vertical
      if (Math.abs(y) > swipeThreshold) {
        if (y > 0 && onSwipeDown) {
          onSwipeDown();
          enableHaptic && selectionChanged();
        } else if (y < 0 && onSwipeUp) {
          onSwipeUp();
          enableHaptic && selectionChanged();
        }
      }
    }

    // Retour à la position initiale
    controls.start({ x: 0, y: 0 });
  }, [swipeThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, controls, enableHaptic, selectionChanged]);

  // Gestion du double tap
  const handleTap = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTime.current;
    
    if (timeSinceLastTap < 300 && onDoubleTap) {
      onDoubleTap();
      enableHaptic && impactOccurred();
    }
    
    lastTapTime.current = currentTime;
  }, [onDoubleTap, enableHaptic, impactOccurred]);

  // Gestion du long press
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
        enableHaptic && impactOccurred();
      }, 800);
    }

    // Gestion du pinch
    if (event.touches.length === 2 && onPinch) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      initialTouchDistance.current = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    }
  }, [onLongPress, onPinch, enableHaptic, impactOccurred]);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Gestion du pinch
    if (event.touches.length === 2 && onPinch && initialTouchDistance.current > 0) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = currentDistance / initialTouchDistance.current;
      onPinch(scale);
    }
  }, [onPinch]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    initialTouchDistance.current = 0;
  }, []);

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={controls}
      onPan={handlePanEnd}
      onTap={handleTap}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    >
      {children}
    </motion.div>
  );
};
