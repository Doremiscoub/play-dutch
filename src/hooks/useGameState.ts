
import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useSimpleGameInitialization } from './useSimpleGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';

export const useGameState = () => {
  console.log('useGameState: Hook called');
  
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  const {
    players,
    setPlayers,
    gameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame,
    isInitialized,
    initError
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

  // Memoïser les callbacks pour éviter les re-renders
  const handleAddRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    console.log('useGameState: handleAddRound called', { scores, dutchPlayerId });
    
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
      console.error('useGameState: Error in handleAddRound:', error);
      return false;
    }
  }, [players, addRound, setPlayers]);

  const handleUndoLastRound = useCallback(() => {
    console.log('useGameState: handleUndoLastRound called');
    
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleUndoLastRound:', error);
      return false;
    }
  }, [players, undoLastRound, setPlayers, showGameOver, soundEnabled]);

  const handleConfirmEndGame = useCallback(() => {
    console.log('useGameState: handleConfirmEndGame called');
    
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleConfirmEndGame:', error);
      return false;
    }
  }, [players, gameStartTime, saveGameToHistory]);

  // Memoïser l'objet de retour pour éviter les re-renders
  const gameState = useMemo(() => ({
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    isInitialized,
    initError,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart,
    createNewGame
  }), [
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    isInitialized,
    initError,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart,
    createNewGame
  ]);

  console.log('useGameState: Returning state', { 
    playersCount: players?.length || 0, 
    isInitialized,
    showGameOver,
    roundCount: roundHistory?.length || 0
  });

  return gameState;
};

export default useGameState;
