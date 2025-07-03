
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';
import { useGameStatePersistence } from './persistence/useGameStatePersistence';
import { Player } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { STORAGE_KEYS, cleanupLegacyStorage } from '@/utils/storageKeys';

const avatarColors = ['#8B5CF6', '#F97316', '#1EAEDB', '#10B981', '#EC4899', '#6366F1'];

const getRandomEmoji = () => {
  const emojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

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

  const createNewGame = useCallback(async (playerNames: string[]): Promise<boolean> => {
    if (!playerNames || playerNames.length < 2) {
      setInitError('Il faut au moins 2 joueurs pour démarrer');
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return false;
    }

    try {
      console.log('Creating new game with players:', playerNames);
      setInitError(null);
      
      // Validation des noms de joueurs
      const validPlayerNames = playerNames.filter(name => name && name.trim().length > 0);
      if (validPlayerNames.length < 2) {
        throw new Error('Noms de joueurs invalides');
      }
      
      const newPlayers: Player[] = validPlayerNames.map((name, index) => ({
        id: uuidv4(),
        name: name.trim(),
        emoji: getRandomEmoji(),
        totalScore: 0,
        rounds: [],
        avatarColor: avatarColors[index % avatarColors.length]
      }));
      
      const startTime = new Date();
      
      // Clear any existing state first
      setPlayers([]);
      setRoundHistory([]);
      setShowGameOver(false);
      setShowScoreForm(false);
      
      // Set new state
      setPlayers(newPlayers);
      setGameStartTime(startTime);
      setIsInitialized(true);
      
      // Sauvegarde initiale avec retry
      try {
        await saveCurrentGame(newPlayers, [], scoreLimit, startTime);
        localStorage.setItem(STORAGE_KEYS.GAME_ACTIVE, 'true');
        localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
      } catch (saveError) {
        console.warn('Failed to save game state, continuing anyway:', saveError);
      }
      
      console.log('Game created successfully with', newPlayers.length, 'players');
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`);
      return true;
    } catch (error) {
      console.error('Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      toast.error('Erreur lors de l\'initialisation du jeu');
      
      // Reset state on error
      setPlayers([]);
      setGameStartTime(null);
      setIsInitialized(false);
      return false;
    }
  }, [scoreLimit, saveCurrentGame, setRoundHistory]);

  const loadExistingGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
      if (!savedGame) return false;

      const gameData = JSON.parse(savedGame);
      
      if (!gameData.players || !Array.isArray(gameData.players) || gameData.players.length === 0) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
        return false;
      }

      setPlayers(gameData.players);
      setGameStartTime(gameData.gameStartTime ? new Date(gameData.gameStartTime) : null);
      setScoreLimit(gameData.scoreLimit || 100);
      setRoundHistory(gameData.roundHistory || []);
      setIsInitialized(true);
      
      return true;
    } catch (error) {
      console.error('Failed to load existing game:', error);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
      return false;
    }
  }, [setRoundHistory]);

  const handleAddRound = useCallback(async (scores: number[], dutchPlayerId?: string) => {
    try {
      const result = addRound(players, scores, dutchPlayerId);
      
      if (result) {
        const { updatedPlayers, isGameOver } = result;
        setPlayers(updatedPlayers);
        
        await saveCurrentGame(updatedPlayers, [...roundHistory, { scores, dutchPlayerId }], scoreLimit, gameStartTime);
        
        if (isGameOver) {
          setTimeout(() => setShowGameOver(true), 500);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in handleAddRound:', error);
      toast.error('Erreur lors de l\'ajout de la manche');
      return false;
    }
  }, [players, addRound, setPlayers, roundHistory, scoreLimit, gameStartTime, saveCurrentGame]);

  const handleUndoLastRound = useCallback(async () => {
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      await saveCurrentGame(updatedPlayers, roundHistory.slice(0, -1), scoreLimit, gameStartTime);
      return true;
    } catch (error) {
      console.error('Error in handleUndoLastRound:', error);
      toast.error('Erreur lors de l\'annulation');
      return false;
    }
  }, [players, undoLastRound, setPlayers, showGameOver, soundEnabled, roundHistory, scoreLimit, gameStartTime, saveCurrentGame]);

  const handleConfirmEndGame = useCallback(() => {
    try {
      finalizeGame(players, gameStartTime);
      setShowGameOver(true);
      return true;
    } catch (error) {
      console.error('Error in handleConfirmEndGame:', error);
      return false;
    }
  }, [players, gameStartTime, finalizeGame]);

  const handleOpenScoreForm = useCallback(() => {
    setShowScoreForm(true);
  }, []);

  const handleCloseScoreForm = useCallback(() => {
    setShowScoreForm(false);
  }, []);

  const cleanup = useCallback(() => {
    setPlayers([]);
    setGameStartTime(null);
    setIsInitialized(false);
    setInitError(null);
    setShowScoreForm(false);
    
    localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
    localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
    localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
    
    cleanupLegacyStorage();
  }, []);

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
