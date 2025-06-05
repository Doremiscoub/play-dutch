
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
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      <motion.div 
        className="flex flex-col gap-4 items-end pointer-events-auto"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* End Game Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.1,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <UnifiedButton
            variant="destructive"
            size="icon-lg"
            onClick={onEndGame}
            disabled={!canEndGame}
            className="shadow-2xl hover:shadow-red-500/50 transition-all duration-300 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border border-red-400/50 h-14 w-14 rounded-full"
            animated={true}
          >
            <Trophy className="h-6 w-6" />
          </UnifiedButton>
        </motion.div>

        {/* Undo Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.2,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <UnifiedButton
            variant="secondary"
            size="icon-lg"
            onClick={onUndo}
            disabled={!canUndo}
            className="shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white border border-orange-300/50 h-14 w-14 rounded-full"
            animated={true}
          >
            <Undo className="h-6 w-6" />
          </UnifiedButton>
        </motion.div>

        {/* Add Round Button - Main Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Effet de glow permanent */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-full blur-xl opacity-40"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          <UnifiedButton
            variant="primary"
            size="lg"
            onClick={onAddRound}
            className="relative shadow-2xl hover:shadow-dutch-blue/60 transition-all duration-300 px-8 py-4 font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple hover:from-dutch-blue/90 hover:to-dutch-purple/90 border border-dutch-blue/30 text-lg h-16 rounded-full min-w-[200px]"
            animated={true}
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 3
                }}
              >
                <Plus className="h-6 w-6" />
              </motion.div>
              <span>Nouvelle manche</span>
            </motion.div>
          </UnifiedButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingActionButtons;
