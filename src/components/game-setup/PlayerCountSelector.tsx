
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
    <div className="flex items-center justify-center space-x-4">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="glass"
          size="icon" 
          elevated
          animated
          onClick={() => onNumPlayersChange(false)}
          disabled={numPlayers <= 2}
          className="bg-white/70 backdrop-blur-xl border border-dutch-blue/30 text-dutch-blue h-14 w-14 rounded-2xl shadow-blue/10"
        >
          <Minus className="h-6 w-6" />
        </Button>
      </motion.div>
      
      <motion.span 
        className="text-4xl font-bold w-16 text-center bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent"
        key={numPlayers}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {numPlayers}
      </motion.span>
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="glass"
          size="icon"
          elevated
          animated
          onClick={() => onNumPlayersChange(true)}
          disabled={numPlayers >= 10}
          className="bg-white/70 backdrop-blur-xl border border-dutch-orange/30 text-dutch-orange h-14 w-14 rounded-2xl shadow-orange/10"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
