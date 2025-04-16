
/**
 * Hook for managing game continuation and ending
 */
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanupGameState } from '@/utils/gameUtils';

export const useGameContinuation = (
  setShowGameOver: (show: boolean) => void,
  setScoreLimit: (setter: (prev: number) => number) => void,
  scoreLimit: number
) => {
  const navigate = useNavigate();
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  
  // Request to end game
  const handleRequestEndGame = useCallback(() => {
    setShowGameEndConfirmation(true);
  }, []);
  
  // Cancel end game
  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continue game with a new score limit
  const handleContinueGame = useCallback((newLimit: number) => {
    setScoreLimit(prevLimit => prevLimit + newLimit);
    setShowGameOver(false);
    toast.success(`La partie continue ! Nouvelle limite: ${scoreLimit + newLimit} points`);
  }, [scoreLimit, setScoreLimit, setShowGameOver]);
  
  // Restart with a new game
  const handleRestart = useCallback(() => {
    try {
      // Complete cleanup
      cleanupGameState();
      
      // Set flag to force a new game
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
    showGameEndConfirmation,
    setShowGameEndConfirmation,
    handleRequestEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  };
};
