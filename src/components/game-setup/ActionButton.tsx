
import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Play } from 'lucide-react';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="w-full max-w-md"
    >
      <EnhancedButton
        onClick={onClick}
        disabled={disabled}
        variant="legendary"
        size="xl"
        effect="glow"
        rarity="legendary"
        withSparkles={!disabled}
        withIcon
        icon={<Play className="h-6 w-6" />}
        className="w-full font-bold uppercase tracking-wide"
      >
        {label}
      </EnhancedButton>
    </motion.div>
  );
};

export default ActionButton;
