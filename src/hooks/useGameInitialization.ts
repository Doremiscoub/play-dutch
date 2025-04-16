
/**
 * Hook for game initialization logic
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { initializePlayers, cleanupGameState } from '@/utils/gameUtils';

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
      if (newPlayers && newPlayers.length > 0) {
        setPlayers(newPlayers);
        setGameStartTime(new Date());
        
        // Mark initialization as completed
        initializationCompleted.current = true;
        
        toast.success('Nouvelle partie créée !');
        return true;
      } else {
        console.error('Impossible de créer une partie: aucun joueur trouvé dans la configuration');
        navigate('/game/setup');
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      navigate('/game/setup');
      return false;
    }
  }, [navigate]);

  return {
    players,
    setPlayers,
    gameStartTime, 
    setGameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame,
    initializationCompleted
  };
};
