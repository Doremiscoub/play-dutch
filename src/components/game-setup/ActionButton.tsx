
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { SETUP_UI } from '@/config/setup-ui';

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
        className={SETUP_UI.action.button}
      >
        <Play className="h-5 w-5 text-white" />
        <span className="text-white">{label}</span>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
