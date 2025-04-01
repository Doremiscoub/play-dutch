
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUp, Clock } from 'lucide-react';

interface CustomScoreBoardButtonsProps {
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
}

const CustomScoreBoardButtons: React.FC<CustomScoreBoardButtonsProps> = ({
  onAddRound,
  onUndoLastRound,
  onEndGame
}) => {
  // Fonction pour gérer le clic sur le bouton d'ajout de manche
  const handleAddRound = () => {
    onAddRound([], undefined);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
      >
        <Button
          onClick={onEndGame}
          size="icon"
          variant="outline"
          className="bg-white text-dutch-blue shadow-lg border border-dutch-blue/20 rounded-full h-12 w-12"
        >
          <Clock className="h-5 w-5" />
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.3 }}
      >
        <Button
          onClick={onUndoLastRound}
          size="icon"
          variant="outline"
          className="bg-white text-dutch-orange shadow-lg border border-dutch-orange/20 rounded-full h-12 w-12"
        >
          <ArrowUp className="h-5 w-5 transform -rotate-45" />
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleAddRound}
          className="px-8 bg-gradient-to-r from-dutch-purple to-dutch-blue shadow-xl rounded-full h-14"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle manche
        </Button>
      </motion.div>
    </div>
  );
};

export default CustomScoreBoardButtons;
