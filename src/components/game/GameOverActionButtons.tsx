
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowRight } from 'lucide-react';

interface GameOverActionButtonsProps {
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
}

const GameOverActionButtons: React.FC<GameOverActionButtonsProps> = ({
  onRestart,
  onContinueGame
}) => {
  const [selectedLimit, setSelectedLimit] = useState<number>(100);
  
  const limits = [50, 100, 200];
  
  return (
    <div className="mt-8 space-y-4">
      <div>
        <h3 className="text-sm text-gray-500 mb-2">Continuer la partie ?</h3>
        <div className="flex gap-2 mb-4">
          {limits.map(limit => (
            <Button
              key={limit}
              variant={selectedLimit === limit ? "gradient-animated" : "outline"}
              size="sm"
              className={selectedLimit === limit ? "" : "bg-white"}
              onClick={() => setSelectedLimit(limit)}
            >
              +{limit} pts
            </Button>
          ))}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            variant="gradient-animated"
            className="w-full"
            onClick={() => onContinueGame(selectedLimit)}
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Continuer à jouer
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          variant="flat-light"
          className="w-full"
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
