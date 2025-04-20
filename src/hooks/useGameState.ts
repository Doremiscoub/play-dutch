
/**
 * Main hook for game state management
 */
import { useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';

/**
 * Main hook for complete game state management
 */
export const useGameState = () => {
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  // Initialize specialized hooks
  const {
    players,
    setPlayers,
    gameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame
  } = useGameInitialization();
  
  const { 
    loadGameState,
    saveGameState,
    saveGameToHistory 
  } = useGamePersistence();
  
  const {
    roundHistory,
    setRoundHistory,
    addRound,
    undoLastRound
  } = useRoundManagement(scoreLimit, soundEnabled);
  
  const {
    showGameEndConfirmation,
    handleRequestEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  } = useGameContinuation(setShowGameOver, setScoreLimit, scoreLimit);

  // Add/handle rounds
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    const result = addRound(players, scores, dutchPlayerId);
    
    if (result) {
      const { updatedPlayers, isGameOver } = result;
      setPlayers(updatedPlayers);
      
      if (isGameOver) {
        setTimeout(() => setShowGameOver(true), 500);
      }
      
      return true;
    }
    
    return false;
  };

  // Handle undo last round
  const handleUndoLastRound = () => {
    const updatedPlayers = undoLastRound(players, soundEnabled);
    setPlayers(updatedPlayers);
    
    if (showGameOver) {
      setShowGameOver(false);
    }
    
    return true;
  };

  // Handle game end confirmation
  const handleConfirmEndGame = () => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      return true;
    } catch {
      return false;
    }
  };

  return {
    // Game state
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    
    // Round management
    handleAddRound,
    handleUndoLastRound,
    
    // Game flow
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  };
};

export default useGameState;
