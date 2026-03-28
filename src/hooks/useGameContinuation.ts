
/**
 * Hook pour la gestion de la fin et continuation de partie
 */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanupGameState } from '@/utils/gameUtils';
import { logger } from '@/utils/logger';

export const useGameContinuation = (
  setShowGameOver: (show: boolean) => void,
  setScoreLimit: (setter: (prev: number) => number) => void,
  scoreLimit: number
) => {
  const navigate = useNavigate();
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  
  // Demande de fin de partie
  const handleRequestEndGame = useCallback(() => {
    logger.debug('useGameContinuation: handleRequestEndGame called');
    setShowGameEndConfirmation(true);
  }, []);
  
  // Annulation de la fin de partie
  const handleCancelEndGame = useCallback(() => {
    logger.debug('useGameContinuation: handleCancelEndGame called');
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continuer avec une nouvelle limite
  const handleContinueGame = useCallback((newLimit: number) => {
    logger.debug('useGameContinuation: handleContinueGame called with new limit:', newLimit);
    let updatedLimit = scoreLimit;
    setScoreLimit(prevLimit => {
      updatedLimit = prevLimit + newLimit;
      logger.debug('useGameContinuation: Score limit updated from', prevLimit, 'to', updatedLimit);
      return updatedLimit;
    });
    setShowGameOver(false);
    toast.success(`La partie continue ! Nouvelle limite: ${updatedLimit} points`);
  }, [scoreLimit, setScoreLimit, setShowGameOver]);
  
  // Redémarrer avec une nouvelle partie
  const handleRestart = useCallback(() => {
    logger.debug('useGameContinuation: handleRestart called');
    try {
      // Nettoyage complet avec logs
      logger.debug('useGameContinuation: Cleaning up game state');
      cleanupGameState();
      
      // Flag pour forcer une nouvelle partie
      logger.debug('useGameContinuation: Setting new game flag');
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      logger.debug('useGameContinuation: Navigating to game setup');
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
