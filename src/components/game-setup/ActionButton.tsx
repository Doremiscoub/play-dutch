
import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Play, Sparkles } from 'lucide-react';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="w-full max-w-md relative"
    >
      {/* Effet de lueur en arrière-plan */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 rounded-3xl blur-lg opacity-0"
        animate={disabled ? {} : { opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <EnhancedButton
        onClick={onClick}
        disabled={disabled}
        variant="legendary"
        size="xl"
        effect="glow"
        rarity="legendary"
        withSparkles={!disabled}
        withIcon
        icon={
          <motion.div
            animate={disabled ? {} : { rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Play className="h-6 w-6" />
          </motion.div>
        }
        className="w-full font-bold uppercase tracking-wide relative z-10 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <motion.span
          className="flex items-center justify-center gap-2"
        >
          {label}
          {!disabled && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          )}
        </motion.span>
      </EnhancedButton>
    </motion.div>
  );
};

export default ActionButton;
