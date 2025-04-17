
/**
 * Hook for game initialization logic
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { initializePlayers, clearPlayerSetup, verifyPlayerSetup } from '@/utils/playerInitializer';
import { cleanupGameState } from '@/utils/gameUtils';

export const useGameInitialization = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const initializationCompleted = useRef(false);
  const initializationAttempted = useRef(false);
  
  // Create a new game with player names from configuration
  const createNewGame = useCallback(() => {
    try {
      // Prevent multiple initialization attempts
      if (initializationAttempted.current) {
        return false;
      }
      
      initializationAttempted.current = true;
      console.info('Création d\'une nouvelle partie...');
      
      // Complete cleanup to ensure no residual data
      cleanupGameState();
      
      // Verify setup exists before initializing
      if (!verifyPlayerSetup()) {
        console.error('Impossible de créer une partie: la configuration des joueurs est invalide ou inexistante');
        toast.error('Configuration de la partie invalide');
        navigate('/game/setup');
        return false;
      }
      
      const newPlayers = initializePlayers();
      if (!newPlayers || newPlayers.length < 2) {
        console.error('Impossible de créer une partie: moins de 2 joueurs configurés');
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        navigate('/game/setup');
        return false;
      }
      
      // Ensure we're starting with a clean state
      setPlayers(newPlayers);
      setGameStartTime(new Date());
      
      // Mark initialization as completed
      initializationCompleted.current = true;
      
      // Only clear playerSetup after successful initialization
      toast.success('Nouvelle partie créée !');
      return true;
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      navigate('/game/setup');
      return false;
    } finally {
      // Reset attempt flag after a delay to allow for further attempts if needed
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [navigate]);

  // Clean up function to ensure we don't leave partial state
  const cleanup = useCallback(() => {
    cleanupGameState();
    clearPlayerSetup();
    initializationCompleted.current = false;
    initializationAttempted.current = false;
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
