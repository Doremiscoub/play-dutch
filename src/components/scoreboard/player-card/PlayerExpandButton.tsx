import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface PlayerExpandButtonProps {
  isExpanded: boolean;
  onClick: (e?: React.MouseEvent) => void;
  theme: {
    lightBg: string;
    border: string;
    text: string;
  };
}

const PlayerExpandButton: React.FC<PlayerExpandButtonProps> = ({ 
  isExpanded, 
  onClick, 
  theme 
}) => {
  return (
    <motion.button 
      onClick={onClick}
      className={cn(
        "mt-1.5 px-2 py-1 rounded-lg text-xs font-medium cursor-pointer",
        "bg-glass-surface border border-glass-border backdrop-blur-sm",
        "hover:bg-glass-surface-hover active:scale-95",
        "transition-all duration-200 flex items-center gap-1.5"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-3 h-3 flex items-center justify-center"
      >
        <ChevronDown 
          size={12} 
          className="opacity-70 group-hover:opacity-90" 
          strokeWidth={2.5}
        />
      </motion.div>
      <span className={cn("opacity-80 hover:opacity-100", theme.text)}>
        {isExpanded ? 'Réduire' : 'Détails'}
      </span>
    </motion.button>
  );
};

export default PlayerExpandButton;