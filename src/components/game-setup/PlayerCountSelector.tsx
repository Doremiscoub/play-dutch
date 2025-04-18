
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayerCountSelectorProps {
  numPlayers: number;
  onNumPlayersChange: (increment: boolean) => void;
}

const PlayerCountSelector: React.FC<PlayerCountSelectorProps> = ({ 
  numPlayers, 
  onNumPlayersChange 
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="dutch-glass" 
          size="icon" 
          onClick={() => onNumPlayersChange(false)}
          disabled={numPlayers <= 2}
          className="border border-white/40 shadow-md"
        >
          <Minus className="h-6 w-6" />
        </Button>
      </motion.div>
      <motion.span 
        className="text-3xl font-bold text-dutch-blue w-10 text-center"
        key={numPlayers}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {numPlayers}
      </motion.span>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="dutch-glass" 
          size="icon"
          onClick={() => onNumPlayersChange(true)}
          disabled={numPlayers >= 10}
          className="border border-white/40 shadow-md"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
