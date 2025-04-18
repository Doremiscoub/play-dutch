
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
        className="w-full h-14 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple shadow-lg flex items-center justify-center gap-2 text-white font-medium"
      >
        <Play className="h-5 w-5" />
        <span className="text-white">{label}</span>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
