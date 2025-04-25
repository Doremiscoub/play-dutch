
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { SETUP_UI } from '@/config/setup-ui';

interface PlayerCountSelectorProps {
  numPlayers: number;
  onNumPlayersChange: (increment: boolean) => void;
}

const PlayerCountSelector: React.FC<PlayerCountSelectorProps> = ({ 
  numPlayers, 
  onNumPlayersChange 
}) => {
  return (
    <div className={SETUP_UI.counter.container}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="dutch-glass" 
          size="icon" 
          onClick={() => onNumPlayersChange(false)}
          disabled={numPlayers <= 2}
          className={SETUP_UI.counter.button}
        >
          <Minus className="h-6 w-6" />
        </Button>
      </motion.div>
      
      <motion.span 
        className={SETUP_UI.counter.number}
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
          className={SETUP_UI.counter.button}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
