
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
        variant="default"
        size="2xl"
        className="w-full relative overflow-hidden group bg-dutch-blue hover:bg-dutch-blue/90 text-white font-bold uppercase"
      >
        <div className="flex items-center justify-center gap-2">
          <Play className="h-6 w-6 text-white" />
          <span>{label}</span>
        </div>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
