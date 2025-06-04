
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Home, ArrowRight, Settings } from 'lucide-react';
import { GameButton } from '@/components/ui/game-button';
import { GameCard } from '@/components/ui/game-card';
import { GameText, ActionText } from '@/components/ui/game-typography';
import { useNavigate } from 'react-router-dom';

interface GameOverActionButtonsProps {
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
}

const GameOverActionButtons: React.FC<GameOverActionButtonsProps> = ({
  onRestart,
  onContinueGame
}) => {
  const navigate = useNavigate();
  const [showContinueOptions, setShowContinueOptions] = useState(false);

  const continueOptions = [
    { label: '+50 points', value: 50, color: 'pokemon' },
    { label: '+100 points', value: 100, color: 'uno' },
    { label: '+200 points', value: 200, color: 'dutch' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GameButton
            variant="uno"
            size="xl"
            onClick={onRestart}
            className="w-full h-16"
          >
            <Plus className="mr-3 h-6 w-6" />
            NOUVELLE PARTIE
          </GameButton>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GameButton
            variant="pokemon"
            size="xl"
            onClick={() => setShowContinueOptions(!showContinueOptions)}
            className="w-full h-16"
          >
            <ArrowRight className="mr-3 h-6 w-6" />
            CONTINUER
          </GameButton>
        </motion.div>
      </div>

      {/* Continue Game Options */}
      {showContinueOptions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GameCard variant="glass" className="p-4">
            <GameText variant="cardTitle" className="text-center mb-4">
              Augmenter la limite de score
            </GameText>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {continueOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GameButton
                    variant={option.color as any}
                    size="lg"
                    onClick={() => onContinueGame(option.value)}
                    className="w-full"
                  >
                    <ActionText>{option.label}</ActionText>
                  </GameButton>
                </motion.div>
              ))}
            </div>
          </GameCard>
        </motion.div>
      )}

      {/* Secondary Actions */}
      <div className="flex justify-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <GameButton
            variant="ghost"
            size="lg"
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-5 w-5" />
            Accueil
          </GameButton>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <GameButton
            variant="ghost"
            size="lg"
            onClick={() => navigate('/history')}
          >
            <Settings className="mr-2 h-5 w-5" />
            Historique
          </GameButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameOverActionButtons;
