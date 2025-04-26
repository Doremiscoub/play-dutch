
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full max-w-md"
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="gradient"
        size="2xl"
        elevated
        animated
        className="w-full relative overflow-hidden group bg-gradient-to-r from-dutch-blue to-dutch-purple text-white font-bold uppercase"
      >
        <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        <div className="flex items-center justify-center gap-2 z-10">
          <Play className="h-6 w-6 text-white" />
          <span>{label}</span>
        </div>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
