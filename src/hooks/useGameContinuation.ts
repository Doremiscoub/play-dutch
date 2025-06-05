
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
    setShowGameEndConfirmation(true);
  }, []);
  
  // Annulation de la fin de partie
  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continuer avec une nouvelle limite - SIGNATURE CORRIGÉE
  const handleContinueGame = useCallback(() => {
    const defaultNewLimit = 50; // Valeur par défaut
    setScoreLimit(prevLimit => prevLimit + defaultNewLimit);
    setShowGameOver(false);
    toast.success(`La partie continue ! Nouvelle limite: ${scoreLimit + defaultNewLimit} points`);
  }, [scoreLimit, setScoreLimit, setShowGameOver]);
  
  // Redémarrer avec une nouvelle partie
  const handleRestart = useCallback(() => {
    try {
      // Nettoyage complet
      cleanupGameState();
      
      // Flag pour forcer une nouvelle partie
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
