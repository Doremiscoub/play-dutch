import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlayerCountStep from './PlayerCountStep';
import PlayerNamesStep from './PlayerNamesStep';
import GameSummaryStep from './GameSummaryStep';

interface Player {
  name: string;
  emoji: string;
}

interface ModernGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const modernEmojis = ['🎮', '🎯', '🚀', '⭐', '🔥', '⚡', '🎲', '🎪', '🌟', '💎', '🎨', '🦄'];

const ModernGameSetup: React.FC<ModernGameSetupProps> = ({ onStartGame }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [playerCount, setPlayerCount] = useState(4);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleStartGame = () => {
    onStartGame(players.map(p => p.name));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlayerCountStep
            playerCount={playerCount}
            onPlayerCountChange={setPlayerCount}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <PlayerNamesStep
            playerCount={playerCount}
            players={players}
            onPlayersChange={setPlayers}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <GameSummaryStep
            playerCount={playerCount}
            players={players}
            onStartGame={handleStartGame}
            onBack={() => setCurrentStep(2)}
            onEditPlayers={() => setCurrentStep(2)}
            onEditCount={() => setCurrentStep(1)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Indicateur de progression */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === currentStep
                    ? 'bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white shadow-lg scale-110'
                    : step < currentStep
                    ? 'bg-trinity-blue-500 text-white'
                    : 'bg-white/60 text-gray-400 border border-white/60'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-1 mx-2 rounded-full transition-all ${
                    step < currentStep ? 'bg-trinity-blue-500' : 'bg-white/30'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600 font-medium">
            Étape {currentStep} sur 3
          </span>
        </div>
      </motion.div>

      {/* Contenu de l'étape */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </div>
  );
};

export default ModernGameSetup;