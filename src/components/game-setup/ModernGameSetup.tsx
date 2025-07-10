
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import PlayerCountStep from './PlayerCountStep';
import PlayerNamesStep from './PlayerNamesStep';
import GameSummaryStep from './GameSummaryStep';
import ProgressIndicator from './ProgressIndicator';
import { SetupPlayer, DEFAULT_PLAYER_COUNT } from './types';

interface ModernGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const ModernGameSetup: React.FC<ModernGameSetupProps> = ({ onStartGame }) => {
  console.log('🎯 ModernGameSetup: Démarrage du composant - CSS Trinity test');
  const [currentStep, setCurrentStep] = useState(1);
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
  const [players, setPlayers] = useState<SetupPlayer[]>([]);

  console.log('🎯 ModernGameSetup: État actuel', { currentStep, playerCount, players: players.length });

  const handleStartGame = () => {
    const playerNames = players.map(p => p.name).filter(name => name && name.trim().length > 0);
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour commencer');
      return;
    }
    onStartGame(playerNames);
  };

  const renderStep = () => {
    console.log('🎯 ModernGameSetup: Rendu de l\'étape', currentStep);
    switch (currentStep) {
      case 1:
        console.log('🎯 ModernGameSetup: Rendu PlayerCountStep');
        return (
          <PlayerCountStep
            playerCount={playerCount}
            onPlayerCountChange={setPlayerCount}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        console.log('🎯 ModernGameSetup: Rendu PlayerNamesStep');
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
        console.log('🎯 ModernGameSetup: Rendu GameSummaryStep');
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
        console.log('🎯 ModernGameSetup: Étape invalide', currentStep);
        return null;
    }
  };

  return (
    <div className="w-full">
      <ProgressIndicator currentStep={currentStep} totalSteps={3} />

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
