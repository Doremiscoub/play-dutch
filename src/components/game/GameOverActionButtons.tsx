
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowRight, Plus } from 'lucide-react';

interface GameOverActionButtonsProps {
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
}

const GameOverActionButtons: React.FC<GameOverActionButtonsProps> = ({
  onRestart,
  onContinueGame
}) => {
  const [selectedLimit, setSelectedLimit] = useState<number>(50);
  
  const limits = [25, 50, 100];
  
  return (
    <div className="mt-8 space-y-4">
      <div>
        <h3 className="text-sm text-gray-500 mb-3 text-center">Continuer la partie ?</h3>
        <div className="flex justify-center gap-2 mb-4">
          {limits.map(limit => (
            <Button
              key={limit}
              variant={selectedLimit === limit ? "default" : "outline"}
              size="sm"
              className={`rounded-full transition-all ${
                selectedLimit === limit 
                  ? "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md" 
                  : "bg-white/70 backdrop-blur-sm border border-white/50"
              }`}
              onClick={() => setSelectedLimit(limit)}
            >
              +{limit} pts
            </Button>
          ))}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg hover:shadow-xl transition-all rounded-2xl py-3"
            onClick={() => onContinueGame(selectedLimit)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Continuer (+{selectedLimit} points)
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          className="w-full bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl py-3"
          onClick={onRestart}
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Nouvelle partie
        </Button>
      </motion.div>
    </div>
  );
};

export default GameOverActionButtons;
