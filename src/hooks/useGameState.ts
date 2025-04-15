
/**
 * Hook de gestion d'état de jeu avec optimisation des performances
 */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useRoundManagement } from './useRoundManagement';
import { initializePlayers } from '@/utils/gameUtils';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';

/**
 * Hook de gestion complète de l'état du jeu
 */
export const useGameState = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  const { loadGameState, saveGameState, saveGameToHistory } = useGamePersistence();
  const { roundHistory, setRoundHistory, addRound, undoLastRound } = useRoundManagement(scoreLimit, soundEnabled);
  
  // Initialisation du jeu depuis localStorage
  useEffect(() => {
    try {
      const initializeGame = () => {
        // Vérifier s'il s'agit d'une nouvelle partie
        const isNewGame = localStorage.getItem('dutch_new_game_requested') === 'true';
        
        if (isNewGame) {
          console.log('Création d\'une nouvelle partie demandée');
          // Supprimer le drapeau de nouvelle partie
          localStorage.removeItem('dutch_new_game_requested');
          // Supprimer l'ancienne partie en cours
          localStorage.removeItem('current_dutch_game');
          // Créer une nouvelle partie
          createNewGame();
          return;
        }
        
        // Sinon, charger la partie existante si elle existe
        const savedGame = loadGameState();
        
        if (savedGame) {
          setPlayers(savedGame.players);
          setRoundHistory(savedGame.roundHistory || []);
          setScoreLimit(savedGame.scoreLimit || 100);
          
          if (savedGame.gameStartTime) {
            setGameStartTime(new Date(savedGame.gameStartTime));
          }
          
          if (savedGame.isGameOver) {
            setShowGameOver(true);
          }
        } else {
          createNewGame();
        }
      };
      
      initializeGame();
    } catch (error) {
      console.error("Erreur lors de l'initialisation du jeu:", error);
      toast.error("Une erreur est survenue lors du chargement de la partie");
      createNewGame();
    }
  }, [loadGameState]);
  
  // Sauvegarder l'état du jeu dans localStorage quand il change
  useEffect(() => {
    try {
      if (players.length > 0) {
        const gameState = {
          players,
          roundHistory,
          isGameOver: showGameOver,
          scoreLimit,
          gameStartTime,
          lastUpdated: new Date()
        };
        
        saveGameState(gameState);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'état du jeu:", error);
    }
  }, [players, roundHistory, showGameOver, scoreLimit, gameStartTime, saveGameState]);
  
  // Créer un nouveau jeu avec les noms des joueurs de la configuration
  const createNewGame = useCallback(() => {
    try {
      const newPlayers = initializePlayers();
      if (newPlayers) {
        setPlayers(newPlayers);
        setRoundHistory([]);
        setShowGameOver(false);
        setGameStartTime(new Date());
      } else {
        navigate('/game/setup');
      }
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      navigate('/game/setup');
    }
  }, [navigate, setRoundHistory]);
  
  // Ajouter un nouveau round
  const handleAddRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    try {
      const result = addRound(players, scores, dutchPlayerId);
      
      if (result) {
        const { updatedPlayers, isGameOver: gameOver } = result;
        setPlayers(updatedPlayers);
        
        if (gameOver) {
          setTimeout(() => {
            setShowGameOver(true);
          }, 500);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
    }
  }, [players, addRound]);
  
  // Annuler le dernier round
  const handleUndoLastRound = useCallback(() => {
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      // Si l'écran de fin de partie était affiché, le masquer
      if (showGameOver) {
        setShowGameOver(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation de la dernière manche:", error);
      toast.error("Une erreur est survenue lors de l'annulation de la manche");
    }
  }, [players, undoLastRound, soundEnabled, showGameOver]);
  
  // Demande pour terminer le jeu
  const handleRequestEndGame = useCallback(() => {
    setShowGameEndConfirmation(true);
  }, []);
  
  // Confirmer la fin du jeu
  const handleConfirmEndGame = useCallback(() => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      setShowGameEndConfirmation(false);
    } catch (error) {
      console.error("Erreur lors de la confirmation de fin de partie:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde de la partie");
    }
  }, [saveGameToHistory, players, gameStartTime]);
  
  // Annuler la fin du jeu
  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continuer le jeu avec une nouvelle limite de score
  const handleContinueGame = useCallback((newLimit: number) => {
    setScoreLimit(prevLimit => prevLimit + newLimit);
    setShowGameOver(false);
    toast.success(`La partie continue ! Nouvelle limite: ${scoreLimit + newLimit} points`);
  }, [scoreLimit]);
  
  // Redémarrer avec un nouveau jeu
  const handleRestart = useCallback(() => {
    try {
      localStorage.removeItem('current_dutch_game');
      navigate('/game/setup');
    } catch (error) {
      console.error("Erreur lors du redémarrage de la partie:", error);
      toast.error("Une erreur est survenue lors du redémarrage");
    }
  }, [navigate]);
  
  return {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  };
};

export default useGameState;
