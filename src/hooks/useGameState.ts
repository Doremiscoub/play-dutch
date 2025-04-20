
/**
 * Main hook for complete game state management
 * Orchestrates specialized hooks for initialization, persistence, rounds and continuation
 */
import { useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';

export const useGameState = () => {
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
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

  const handleUndoLastRound = () => {
    const updatedPlayers = undoLastRound(players, soundEnabled);
    setPlayers(updatedPlayers);
    
    if (showGameOver) {
      setShowGameOver(false);
    }
    
    return true;
  };

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
