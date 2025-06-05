
import React from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayerControlsProps {
  onShuffle: () => void;
  onAddPlayer: () => void;
  onRemovePlayer: () => void;
  disableAdd: boolean;
  disableRemove: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  onShuffle,
  onAddPlayer,
  onRemovePlayer,
  disableAdd,
  disableRemove
}) => {
  return (
    <motion.div
      className="flex justify-center items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="dutch-glass"
        size="icon"
        onClick={onShuffle}
        className="h-12 w-12"
      >
        <Shuffle className="h-5 w-5" />
      </Button>
      
      <Button
        variant="dutch-glass"
        size="icon"
        onClick={onAddPlayer}
        disabled={disableAdd}
        className="h-12 w-12"
      >
        <Plus className="h-5 w-5" />
      </Button>
      
      <Button
        variant="dutch-glass"
        size="icon"
        onClick={onRemovePlayer}
        disabled={disableRemove}
        className="h-12 w-12"
      >
        <Minus className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default PlayerControls;
