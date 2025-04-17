
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  icon?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md"
    >
      <Button 
        onClick={onClick}
        variant="floating"
        size="game-action"
        className="w-full shadow-lg transition-all relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-r from-dutch-blue/90 via-dutch-purple/90 to-dutch-blue/90"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%]"
          animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-lg font-medium">
          {icon || <Play className="h-5 w-5" />} {label}
        </span>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
