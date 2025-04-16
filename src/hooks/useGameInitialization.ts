
/**
 * Hook for game initialization logic
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { initializePlayers, clearPlayerSetup } from '@/utils/playerInitializer';
import { cleanupGameState } from '@/utils/gameUtils';

export const useGameInitialization = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const initializationCompleted = useRef(false);
  
  // Create a new game with player names from configuration
  const createNewGame = useCallback(() => {
    try {
      console.info('Création d\'une nouvelle partie...');
      
      // Complete cleanup to ensure no residual data
      cleanupGameState();
      
      const newPlayers = initializePlayers();
      if (!newPlayers || newPlayers.length === 0) {
        console.error('Impossible de créer une partie: aucun joueur trouvé dans la configuration');
        toast.error('Configuration de la partie invalide');
        navigate('/game/setup');
        return false;
      }
      
      // Ensure we're starting with a clean state
      setPlayers(newPlayers);
      setGameStartTime(new Date());
      
      // Mark initialization as completed
      initializationCompleted.current = true;
      
      // Clean up the setup data
      clearPlayerSetup();
      
      toast.success('Nouvelle partie créée !');
      return true;
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      navigate('/game/setup');
      return false;
    }
  }, [navigate]);

  // Clean up function to ensure we don't leave partial state
  const cleanup = useCallback(() => {
    cleanupGameState();
    clearPlayerSetup();
  }, []);

  return {
    players,
    setPlayers,
    gameStartTime, 
    setGameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame,
    cleanup,
    initializationCompleted
  };
};
