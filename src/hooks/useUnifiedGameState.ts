
import { useState } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useSimpleGameInitialization } from './useSimpleGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';

export interface UnifiedGameStateReturn {
  // Game state
  players: any[];
  roundHistory: any[];
  showGameOver: boolean;
  showGameEndConfirmation: boolean;
  scoreLimit: number;
  gameStartTime: Date;
  
  // Actions
  handleAddRound: (scores: number[], dutchPlayerId?: string) => boolean;
  handleUndoLastRound: () => boolean;
  handleRequestEndGame: () => void;
  handleConfirmEndGame: () => boolean;
  handleCancelEndGame: () => void;
  handleContinueGame: () => void;
  handleRestart: () => void;
  createNewGame: (playerNames: string[], scoreLimit?: number) => void;
}

export const useUnifiedGameState = (): UnifiedGameStateReturn => {
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  const {
    players,
    setPlayers,
    gameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame
  } = useSimpleGameInitialization();
  
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

  const handleAddRound = (scores: number[], dutchPlayerId?: string): boolean => {
    try {
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
    } catch (error) {
      console.error('Error in handleAddRound:', error);
      return false;
    }
  };

  const handleUndoLastRound = (): boolean => {
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      return true;
    } catch (error) {
      console.error('Error in handleUndoLastRound:', error);
      return false;
    }
  };

  const handleConfirmEndGame = (): boolean => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      return true;
    } catch (error) {
      console.error('Error in handleConfirmEndGame:', error);
      return false;
    }
  };

  return {
    // State
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    
    // Actions
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart,
    createNewGame
  };
};

export default useUnifiedGameState;
