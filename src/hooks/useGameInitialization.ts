import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { initializePlayers, clearPlayerSetup, verifyPlayerSetup } from '@/utils/playerInitializer';
import { cleanupGameState } from '@/utils/gameUtils';

export type GameState = {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  scoreLimit: number;
  lastUpdated: number;
}

export const useGameInitialization = () => {
  const navigate = useNavigate();
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const initializationCompleted = useRef(false);
  const initializationInProgress = useRef(false);
  
  const createNewGame = useCallback((): GameState | null => {
    try {
      console.info('Création d\'une nouvelle partie...');
      
      if (initializationInProgress.current) {
        console.info('Initialisation déjà en cours, annulation de cette tentative');
        return null;
      }
      
      console.debug('Valeurs localStorage avant initialisation:', {
        dutch_player_setup: localStorage.getItem('dutch_player_setup'),
        current_dutch_game: localStorage.getItem('current_dutch_game'),
        dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
        dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
      });
      
      initializationInProgress.current = true;
      
      localStorage.removeItem('current_dutch_game');
      
      const playerSetup = localStorage.getItem('dutch_player_setup');
      if (!playerSetup) {
        console.error('Configuration des joueurs non trouvée dans localStorage');
        initializationInProgress.current = false;
        toast.error("Configuration des joueurs introuvable");
        navigate('/game/setup');
        return null;
      }
      
      const newPlayers = initializePlayers();
      console.info('Joueurs initialisés:', newPlayers);
      
      if (!newPlayers || newPlayers.length < 2) {
        console.error('Impossible de créer une partie: moins de 2 joueurs configurés ou erreur d\'initialisation');
        
        initializationInProgress.current = false;
        
        toast.error("Impossible d'initialiser les joueurs");
        navigate('/game/setup');
        return null;
      }
      
      console.info('Joueurs initialisés avec succès:', newPlayers.length, 'joueurs');
      
      const newGame: GameState = {
        players: newPlayers,
        roundHistory: [],
        scoreLimit: 100,
        lastUpdated: Date.now()
      };
      
      localStorage.setItem('current_dutch_game', JSON.stringify(newGame));
      initializationCompleted.current = true;
      localStorage.setItem('dutch_initialization_completed', 'true');
      
      localStorage.removeItem('dutch_new_game_requested');
      
      toast.success('Nouvelle partie locale créée !');
      
      console.debug('Valeurs localStorage après initialisation:', {
        dutch_player_setup: localStorage.getItem('dutch_player_setup'),
        current_dutch_game: localStorage.getItem('current_dutch_game'),
        dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
        dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
      });
      
      console.debug('Partie créée avec succès:', newGame);
      return newGame;
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      
      initializationInProgress.current = false;
      
      navigate('/game/setup');
      return null;
    }
  }, [navigate]);

  const cleanup = useCallback(() => {
    cleanupGameState();
    initializationCompleted.current = false;
    initializationInProgress.current = false;
  }, []);

  return {
    gameStartTime,
    setGameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame,
    cleanup,
    initializationCompleted,
    initializationInProgress
  };
};
