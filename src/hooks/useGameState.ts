import { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';
import { useGameStatePersistence } from './persistence/useGameStatePersistence';
import { useGameCreation } from './game/useGameCreation';
import { useGameLoading } from './game/useGameLoading';
import { useGameActions } from './game/useGameActions';
import { useGameCleanup } from './game/useGameCleanup';
import { Player } from '@/types';
import { STORAGE_KEYS, cleanupLegacyStorage } from '@/utils/storageKeys';

export const useGameState = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showScoreForm, setShowScoreForm] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [soundEnabled] = useLocalStorage(STORAGE_KEYS.SOUND_ENABLED, true);
  
  const { saveCurrentGame, finalizeGame } = useGameStatePersistence();
  
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

  // Nettoyage initial
  useEffect(() => {
    cleanupLegacyStorage();
  }, []);

  // Game Creation Hook
  const { createNewGame } = useGameCreation({
    scoreLimit,
    saveCurrentGame,
    setPlayers,
    setGameStartTime,
    setIsInitialized,
    setInitError,
    setRoundHistory,
    setShowGameOver,
    setShowScoreForm
  });

  // Game Loading Hook
  const { loadExistingGame } = useGameLoading({
    setPlayers,
    setGameStartTime,
    setScoreLimit,
    setRoundHistory,
    setIsInitialized
  });

  // Game Actions Hook
  const {
    handleAddRound,
    handleUndoLastRound,
    handleConfirmEndGame,
    handleOpenScoreForm,
    handleCloseScoreForm
  } = useGameActions({
    players,
    roundHistory,
    scoreLimit,
    gameStartTime,
    showGameOver,
    soundEnabled,
    addRound,
    undoLastRound,
    finalizeGame,
    saveCurrentGame,
    setPlayers,
    setShowGameOver,
    setShowScoreForm
  });

  // Game Cleanup Hook
  const { cleanup } = useGameCleanup({
    setPlayers,
    setGameStartTime,
    setIsInitialized,
    setInitError,
    setShowScoreForm
  });

  const gameState = useMemo(() => ({
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    showScoreForm,
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
    handleOpenScoreForm,
    handleCloseScoreForm,
    createNewGame,
    loadExistingGame,
    cleanup
  }), [
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    showScoreForm,
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
    handleOpenScoreForm,
    handleCloseScoreForm,
    createNewGame,
    loadExistingGame,
    cleanup
  ]);

  return gameState;
};

export default useGameState;