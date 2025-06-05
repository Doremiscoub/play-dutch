
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedLocalGameSetup from '@/components/game-setup/EnhancedLocalGameSetup';
import { useGameInitialization } from '@/hooks/useGameInitialization';
import { toast } from 'sonner';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createNewGame } = useGameInitialization();

  const handleStartGame = async (playerNames: string[]) => {
    try {
      const success = await createNewGame(playerNames);
      if (success) {
        navigate('/game');
      }
    } catch (error) {
      console.error('Failed to start game:', error);
      toast.error('Erreur lors de la création de la partie');
    }
  };

  return <EnhancedLocalGameSetup onStartGame={handleStartGame} />;
};

export default GameSetup;
