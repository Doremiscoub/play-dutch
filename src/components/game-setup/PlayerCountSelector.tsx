
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
          variant="outline" 
          size="icon" 
          onClick={() => onNumPlayersChange(false)}
          disabled={numPlayers <= 2}
          className="rounded-full h-10 w-10 border border-white/60 shadow-sm bg-white/80 backdrop-blur-md"
        >
          <Minus className="h-5 w-5" />
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
          variant="outline" 
          size="icon"
          onClick={() => onNumPlayersChange(true)}
          disabled={numPlayers >= 10}
          className="rounded-full h-10 w-10 border border-white/60 shadow-sm bg-white/80 backdrop-blur-md"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
