
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
        console.log('useGameState: Round added successfully, updating players', { 
          playersCount: updatedPlayers.length, 
          isGameOver 
        });
        
        setPlayers(updatedPlayers);
        
        // Sauvegarder immédiatement l'état du jeu pour éviter la perte de données
        const gameStateToSave = {
          players: updatedPlayers,
          roundHistory: [...roundHistory, { scores, dutchPlayerId }],
          isGameOver: false,
          scoreLimit,
          gameStartTime
        };
        
        saveGameState(gameStateToSave).then((success) => {
          if (success) {
            console.log('useGameState: Game state saved successfully');
          } else {
            console.error('useGameState: Failed to save game state');
          }
        });
        
        if (isGameOver) {
          console.log('useGameState: Game over detected, showing game over screen');
          setTimeout(() => setShowGameOver(true), 500);
        }
        
        return true;
      }
      console.warn('useGameState: addRound returned null/false');
      return false;
    } catch (error) {
      console.error('useGameState: Error in handleAddRound:', error);
      return false;
    }
  }, [players, addRound, setPlayers, roundHistory, scoreLimit, gameStartTime, saveGameState]);

  const handleUndoLastRound = useCallback(() => {
    console.log('useGameState: handleUndoLastRound called');
    
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      console.log('useGameState: Undo completed, updating players');
      setPlayers(updatedPlayers);
      
      if (showGameOver) {
        console.log('useGameState: Hiding game over screen after undo');
        setShowGameOver(false);
      }
      
      // Sauvegarder l'état après l'annulation
      const gameStateToSave = {
        players: updatedPlayers,
        roundHistory: roundHistory.slice(0, -1),
        isGameOver: false,
        scoreLimit,
        gameStartTime
      };
      
      saveGameState(gameStateToSave);
      
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleUndoLastRound:', error);
      return false;
    }
  }, [players, undoLastRound, setPlayers, showGameOver, soundEnabled, roundHistory, scoreLimit, gameStartTime, saveGameState]);

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
    roundCount: roundHistory?.length || 0,
    hasGameStartTime: !!gameStartTime
  });

  return gameState;
};

export default useGameState;
