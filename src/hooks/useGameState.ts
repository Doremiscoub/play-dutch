
/**
 * Main hook for game state management
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useRoundManagement } from './useRoundManagement';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { resetNotificationFlags } from '@/utils/playerInitializer';

/**
 * Main hook for complete game state management
 */
export const useGameState = () => {
  const navigate = useNavigate();
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const initializationAttempted = useRef(false);
  
  // Use our new modular hooks
  const {
    players, 
    setPlayers, 
    gameStartTime, 
    setGameStartTime,
    scoreLimit,
    setScoreLimit, 
    createNewGame, 
    initializationCompleted,
    initializationInProgress
  } = useGameInitialization();
  
  const { 
    showGameEndConfirmation, 
    setShowGameEndConfirmation, 
    handleRequestEndGame, 
    handleCancelEndGame, 
    handleContinueGame,
    handleRestart
  } = useGameContinuation(setShowGameOver, setScoreLimit, scoreLimit);
  
  const { loadGameState, saveGameState, saveGameToHistory } = useGamePersistence();
  const { roundHistory, setRoundHistory, addRound, undoLastRound } = useRoundManagement(scoreLimit, soundEnabled);
  
  // Initialize game from localStorage
  useEffect(() => {
    try {
      if (initializationCompleted.current || initializationAttempted.current || initializationInProgress.current) {
        console.info("Initialisation déjà tentée ou en cours, ignorer");
        return; // Avoid double initialization
      }
      
      initializationAttempted.current = true;
      console.info("Tentative d'initialisation du jeu...");
      resetNotificationFlags(); // Réinitialiser les flags de notification
      
      const initializeGame = () => {
        console.info('Initialisation du jeu...');
        
        // Check if this is a new game
        const isNewGame = localStorage.getItem('dutch_new_game_requested') === 'true';
        
        if (isNewGame) {
          console.info('Création d\'une nouvelle partie demandée');
          // Remove new game flag
          localStorage.removeItem('dutch_new_game_requested');
          // Remove old game in progress
          localStorage.removeItem('current_dutch_game');
          // Create a new game
          createNewGame();
          return;
        }
        
        // Otherwise, load existing game if it exists
        const savedGame = loadGameState();
        
        if (savedGame) {
          console.info("Chargement d'une partie existante");
          setPlayers(savedGame.players);
          setRoundHistory(savedGame.roundHistory || []);
          setScoreLimit(savedGame.scoreLimit || 100);
          
          if (savedGame.gameStartTime) {
            setGameStartTime(new Date(savedGame.gameStartTime));
          }
          
          if (savedGame.isGameOver) {
            setShowGameOver(true);
          }
          
          // Mark initialization as completed
          initializationCompleted.current = true;
          console.info("Initialisation depuis une sauvegarde réussie");
        } else {
          console.info("Aucune partie sauvegardée trouvée, création d'une nouvelle partie");
          createNewGame();
        }
      };
      
      initializeGame();
    } catch (error) {
      console.error("Erreur lors de l'initialisation du jeu:", error);
      toast.error("Une erreur est survenue lors du chargement de la partie");
      navigate('/game/setup');
    } finally {
      // Réinitialiser le flag après un délai
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [loadGameState, navigate, setRoundHistory, createNewGame, setPlayers, setGameStartTime, setScoreLimit]);
  
  // Save game state to localStorage when it changes
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
  
  // Add a new round
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
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
        
        return true; // Indicate that the addition succeeded
      }
      
      return false; // Indicate that the addition failed
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
      return false;
    }
  };
  
  // Undo last round
  const handleUndoLastRound = () => {
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      // If game over screen was displayed, hide it
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      return true; // Indicate that the undo succeeded
    } catch (error) {
      console.error("Erreur lors de l'annulation de la dernière manche:", error);
      toast.error("Une erreur est survenue lors de l'annulation de la manche");
      return false;
    }
  };
  
  // Confirm end of game
  const handleConfirmEndGame = () => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      setShowGameEndConfirmation(false);
      return true;
    } catch (error) {
      console.error("Erreur lors de la confirmation de fin de partie:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde de la partie");
      return false;
    }
  };

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
