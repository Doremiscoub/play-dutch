
import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedButton } from '@/components/ui/unified-button';
import { Plus, Undo, Trophy } from 'lucide-react';

interface FloatingActionButtonsProps {
  onAddRound: () => void;
  onUndo: () => void;
  onEndGame: () => void;
  canUndo: boolean;
  canEndGame: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onAddRound,
  onUndo,
  onEndGame,
  canUndo,
  canEndGame
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 items-end">
      {/* End Game Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <UnifiedButton
          variant="destructive"
          size="icon-lg"
          onClick={onEndGame}
          disabled={!canEndGame}
          className="shadow-2xl hover:shadow-red-500/25 transition-all duration-300 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          animated={true}
        >
          <Trophy className="h-5 w-5" />
        </UnifiedButton>
      </motion.div>

      {/* Undo Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <UnifiedButton
          variant="secondary"
          size="icon-lg"
          onClick={onUndo}
          disabled={!canUndo}
          className="shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white"
          animated={true}
        >
          <Undo className="h-5 w-5" />
        </UnifiedButton>
      </motion.div>

      {/* Add Round Button - Main Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <UnifiedButton
          variant="primary"
          size="xl"
          onClick={onAddRound}
          className="shadow-2xl hover:shadow-dutch-blue/25 transition-all duration-300 px-6 font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple hover:from-dutch-blue/90 hover:to-dutch-purple/90"
          animated={true}
        >
          <Plus className="mr-2 h-6 w-6" />
          Nouvelle manche
        </UnifiedButton>
      </motion.div>
    </div>
  );
};

export default FloatingActionButtons;
