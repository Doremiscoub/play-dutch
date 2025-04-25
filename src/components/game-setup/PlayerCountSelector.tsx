
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
    <div className="flex items-center justify-center gap-4 py-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onNumPlayersChange(false)}
          disabled={numPlayers <= 2}
          className="vision-button w-10 h-10 rounded-xl"
        >
          <Minus className="h-5 w-5" />
        </Button>
      </motion.div>
      
      <motion.span 
        className="text-3xl font-medium bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent w-10 text-center"
        key={numPlayers}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {numPlayers}
      </motion.span>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onNumPlayersChange(true)}
          disabled={numPlayers >= 10}
          className="vision-button w-10 h-10 rounded-xl"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
