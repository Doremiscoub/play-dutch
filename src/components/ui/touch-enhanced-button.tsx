
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useSound } from '@/hooks/use-sound';

interface TouchEnhancedButtonProps extends ButtonProps {
  hapticStyle?: 'light' | 'medium' | 'heavy';
  enableSound?: boolean;
  soundType?: string;
}

const TouchEnhancedButton: React.FC<TouchEnhancedButtonProps> = ({
  children,
  hapticStyle = 'light',
  enableSound = true,
  soundType = 'buttonClick',
  onClick,
  ...props
}) => {
  const { impact } = useHapticFeedback();
  const { playSound } = useSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Haptic feedback
    impact(hapticStyle);
    
    // Sound feedback
    if (enableSound) {
      playSound(soundType);
    }
    
    // Call original onClick
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        {...props}
        onClick={handleClick}
        className={`touch-manipulation select-none ${props.className || ''}`}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default TouchEnhancedButton;
