
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
  
  // Use notre nouveau hook de persistance
  const { loadGameState, saveGameState, saveGameToHistory } = useGamePersistence();
  
  // Use our specialized hooks
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
  
  const { roundHistory, setRoundHistory, addRound, undoLastRound } = useRoundManagement(scoreLimit, soundEnabled);

  // Initialize game from localStorage or URL parameters
  useEffect(() => {
    try {
      if (initializationCompleted.current || initializationAttempted.current || initializationInProgress.current) {
        return; // Avoid double initialization
      }
      
      initializationAttempted.current = true;
      resetNotificationFlags(); // Reset notification flags
      
      const initializeGame = () => {
        // Create new game (updated method to handle URL parameters)
        const success = createNewGame();
        
        // If creation fails, load an existing save
        if (!success) {
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
            
            // Mark initialization as completed
            initializationCompleted.current = true;
          } else {
            navigate('/game/setup');
          }
        }
      };
      
      initializeGame();
    } catch (error) {
      console.error("Error initializing game:", error);
      toast.error("Une erreur est survenue lors du chargement de la partie");
      navigate('/game/setup');
    } finally {
      // Reset flag after delay
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
      console.error("Error saving game state:", error);
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
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error adding round:", error);
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
      
      return true;
    } catch (error) {
      console.error("Error undoing last round:", error);
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
      console.error("Error confirming end game:", error);
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
