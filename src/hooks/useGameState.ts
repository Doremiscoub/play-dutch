
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';

export const useGameState = () => {
  console.log('useGameState: Hook called');
  
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const lastSaveTimeRef = useRef<number>(0);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const {
    players,
    setPlayers,
    gameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame,
    isInitialized,
    initError
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

  // Sauvegarde automatique périodique
  useEffect(() => {
    if (!isInitialized || !players || players.length === 0) {
      return;
    }

    const saveInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastSaveTimeRef.current > 30000) {
        console.log('useGameState: Auto-saving game state');
        
        const gameStateToSave = {
          players,
          roundHistory,
          isGameOver: showGameOver,
          scoreLimit,
          gameStartTime
        };
        
        saveGameState(gameStateToSave).then((success) => {
          if (success) {
            lastSaveTimeRef.current = now;
            console.log('useGameState: Auto-save successful');
          } else {
            console.warn('useGameState: Auto-save failed');
          }
        });
      }
    }, 10000);

    saveIntervalRef.current = saveInterval;

    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [isInitialized, players, roundHistory, showGameOver, scoreLimit, gameStartTime, saveGameState]);

  // Protection de l'état du jeu
  useEffect(() => {
    if (isInitialized && players && players.length > 0) {
      console.log('useGameState: Game is properly initialized with players:', players.length);
      
      localStorage.setItem('dutch_game_active', 'true');
      
      return () => {
        localStorage.removeItem('dutch_game_active');
      };
    }
  }, [isInitialized, players]);

  // Fonction de sauvegarde sécurisée avec retry
  const secureSaveGameState = useCallback(async (gameData: any, retryCount = 0): Promise<boolean> => {
    try {
      const success = await saveGameState(gameData);
      if (success) {
        lastSaveTimeRef.current = Date.now();
        return true;
      } else if (retryCount < 2) {
        console.log('useGameState: Save failed, retrying...', retryCount + 1);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return secureSaveGameState(gameData, retryCount + 1);
      }
      return false;
    } catch (error) {
      console.error('useGameState: Error saving game state:', error);
      if (retryCount < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return secureSaveGameState(gameData, retryCount + 1);
      }
      return false;
    }
  }, [saveGameState]);

  // Handlers optimisés
  const handleAddRound = useCallback(async (scores: number[], dutchPlayerId?: string) => {
    console.log('useGameState: handleAddRound called', { scores, dutchPlayerId });
    
    try {
      const result = addRound(players, scores, dutchPlayerId);
      
      if (result) {
        const { updatedPlayers, isGameOver } = result;
        console.log('useGameState: Round added successfully', { 
          playersCount: updatedPlayers.length, 
          isGameOver 
        });
        
        setPlayers(updatedPlayers);
        
        const gameStateToSave = {
          players: updatedPlayers,
          roundHistory: [...roundHistory, { scores, dutchPlayerId }],
          isGameOver: false,
          scoreLimit,
          gameStartTime
        };
        
        const saveSuccess = await secureSaveGameState(gameStateToSave);
        if (saveSuccess) {
          console.log('useGameState: Game state saved successfully after round');
        }
        
        if (isGameOver) {
          console.log('useGameState: Game over detected');
          setTimeout(() => setShowGameOver(true), 500);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('useGameState: Error in handleAddRound:', error);
      return false;
    }
  }, [players, addRound, setPlayers, roundHistory, scoreLimit, gameStartTime, secureSaveGameState]);

  const handleUndoLastRound = useCallback(async () => {
    console.log('useGameState: handleUndoLastRound called');
    
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      console.log('useGameState: Undo completed');
      setPlayers(updatedPlayers);
      
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      const gameStateToSave = {
        players: updatedPlayers,
        roundHistory: roundHistory.slice(0, -1),
        isGameOver: false,
        scoreLimit,
        gameStartTime
      };
      
      await secureSaveGameState(gameStateToSave);
      
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleUndoLastRound:', error);
      return false;
    }
  }, [players, undoLastRound, setPlayers, showGameOver, soundEnabled, roundHistory, scoreLimit, gameStartTime, secureSaveGameState]);

  const handleConfirmEndGame = useCallback(() => {
    console.log('useGameState: handleConfirmEndGame called');
    
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      localStorage.removeItem('dutch_game_active');
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleConfirmEndGame:', error);
      return false;
    }
  }, [players, gameStartTime, saveGameToHistory]);

  // État memoïsé
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
