
/**
 * Hook pour la gestion de la fin et continuation de partie
 */
import { useState, useCallback } from 'react';
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
  
  // Demande de fin de partie
  const handleRequestEndGame = useCallback(() => {
    console.log('useGameContinuation: handleRequestEndGame called');
    setShowGameEndConfirmation(true);
  }, []);
  
  // Annulation de la fin de partie
  const handleCancelEndGame = useCallback(() => {
    console.log('useGameContinuation: handleCancelEndGame called');
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continuer avec une nouvelle limite
  const handleContinueGame = useCallback((newLimit: number) => {
    console.log('useGameContinuation: handleContinueGame called with new limit:', newLimit);
    setScoreLimit(prevLimit => {
      const updatedLimit = prevLimit + newLimit;
      console.log('useGameContinuation: Score limit updated from', prevLimit, 'to', updatedLimit);
      return updatedLimit;
    });
    setShowGameOver(false);
    toast.success(`La partie continue ! Nouvelle limite: ${scoreLimit + newLimit} points`);
  }, [scoreLimit, setScoreLimit, setShowGameOver]);
  
  // Redémarrer avec une nouvelle partie
  const handleRestart = useCallback(() => {
    console.log('useGameContinuation: handleRestart called');
    try {
      // Nettoyage complet avec logs
      console.log('useGameContinuation: Cleaning up game state');
      cleanupGameState();
      
      // Flag pour forcer une nouvelle partie
      console.log('useGameContinuation: Setting new game flag');
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      console.log('useGameContinuation: Navigating to game setup');
      navigate('/setup');
      
      return true;
    } catch (error) {
      console.error("useGameContinuation: Erreur lors du redémarrage de la partie:", error);
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
