
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanupGameState } from '@/utils/gameUtils';

export const useGameFlow = () => {
  const navigate = useNavigate();
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  
  const handleRequestEndGame = useCallback(() => {
    setShowGameEndConfirmation(true);
  }, []);
  
  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);
  
  const handleContinueGame = useCallback((newLimit: number, setScoreLimit: (fn: (prev: number) => number) => void) => {
    setScoreLimit(prevLimit => prevLimit + newLimit);
    setShowGameOver(false);
    toast.success(`La partie continue ! Nouvelle limite: ${newLimit} points`);
  }, []);
  
  const handleRestart = useCallback(() => {
    try {
      cleanupGameState();
      localStorage.removeItem('dutch_play_offline');
      localStorage.setItem('dutch_new_game_requested', 'true');
      navigate('/game/setup');
      return true;
    } catch (error) {
      console.error("Erreur lors du redémarrage de la partie:", error);
      toast.error("Une erreur est survenue lors du redémarrage");
      return false;
    }
  }, [navigate]);

  return {
    showGameOver,
    setShowGameOver,
    showGameEndConfirmation,
    setShowGameEndConfirmation,
    handleRequestEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  };
};
