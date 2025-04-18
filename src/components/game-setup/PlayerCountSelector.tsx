
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayerCountSelectorProps {
  count: number;
  onChange: (increment: boolean) => void;
  // Add compatibility props for old code
  numPlayers?: number;
  onNumPlayersChange?: (increment: boolean) => void;
}

const PlayerCountSelector: React.FC<PlayerCountSelectorProps> = ({ 
  count, 
  onChange,
  numPlayers,
  onNumPlayersChange
}) => {
  // For backwards compatibility
  const effectiveCount = numPlayers !== undefined ? numPlayers : count;
  const effectiveOnChange = onNumPlayersChange || onChange;
  
  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="dutch-glass" 
          size="icon" 
          onClick={() => effectiveOnChange(false)}
          disabled={effectiveCount <= 2}
          className="border border-white/40 shadow-md"
        >
          <Minus className="h-6 w-6" />
        </Button>
      </motion.div>
      <motion.span 
        className="text-3xl font-bold text-dutch-blue w-10 text-center"
        key={effectiveCount}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {effectiveCount}
      </motion.span>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="dutch-glass" 
          size="icon"
          onClick={() => effectiveOnChange(true)}
          disabled={effectiveCount >= 10}
          className="border border-white/40 shadow-md"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountSelector;
