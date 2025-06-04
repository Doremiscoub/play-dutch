
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { GameButton } from '@/components/ui/game-button';
import { GameText } from '@/components/ui/game-typography';

interface PlayerCountSelectorProps {
  numPlayers: number;
  onNumPlayersChange: (increment: boolean) => void;
}

const PlayerCountSelector: React.FC<PlayerCountSelectorProps> = ({ 
  numPlayers, 
  onNumPlayersChange 
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <GameButton 
          variant="ghost"
          size="icon-lg" 
          onClick={() => onNumPlayersChange(false)}
          disabled={numPlayers <= 2}
        >
          <Minus className="h-6 w-6" />
        </GameButton>
      </motion.div>
      
      <motion.div
        key={numPlayers}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <GameText 
          variant="scoreDisplay" 
          gameColor="gradient" 
          className="text-4xl w-16 text-center"
        >
          {numPlayers}
        </GameText>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <GameButton 
          variant="ghost"
          size="icon-lg"
          onClick={() => onNumPlayersChange(true)}
          disabled={numPlayers >= 10}
        >
          <Plus className="h-6 w-6" />
        </GameButton>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
