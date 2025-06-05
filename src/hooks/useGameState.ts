
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';
import { Player } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const avatarColors = ['#8B5CF6', '#F97316', '#1EAEDB', '#10B981', '#EC4899', '#6366F1'];

const getRandomEmoji = () => {
  const emojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const useGameState = () => {
  console.log('useGameState: Hook called');
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const lastSaveTimeRef = useRef<number>(0);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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

  // Initialize game from localStorage or create new
  const createNewGame = useCallback(async (playerNames: string[]): Promise<boolean> => {
    if (!playerNames || playerNames.length < 2) {
      setInitError('Il faut au moins 2 joueurs pour démarrer');
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return false;
    }

    console.log('Creating new game with players:', playerNames);
    
    try {
      setInitError(null);
      
      // Create player objects
      const newPlayers: Player[] = playerNames.map((name, index) => ({
        id: uuidv4(),
        name: name.trim() || `Joueur ${index + 1}`,
        emoji: getRandomEmoji(),
        totalScore: 0,
        rounds: [],
        avatarColor: avatarColors[index % avatarColors.length]
      }));
      
      console.log('Players created successfully:', newPlayers);
      
      const startTime = new Date();
      
      setPlayers(newPlayers);
      setGameStartTime(startTime);
      setIsInitialized(true);
      
      // Save to localStorage
      const gameData = {
        players: newPlayers,
        gameStartTime: startTime.toISOString(),
        scoreLimit,
        roundHistory: [],
        isGameOver: false
      };
      
      localStorage.setItem('current_dutch_game', JSON.stringify(gameData));
      localStorage.setItem('dutch_game_active', 'true');
      
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`);
      
      return true;
    } catch (error) {
      console.error('Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      toast.error('Erreur lors de l\'initialisation du jeu');
      return false;
    }
  }, [scoreLimit]);

  // Load existing game
  const loadExistingGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem('current_dutch_game');
      if (!savedGame) {
        return false;
      }

      const gameData = JSON.parse(savedGame);
      
      if (!gameData.players || gameData.players.length === 0) {
        return false;
      }

      setPlayers(gameData.players);
      setGameStartTime(gameData.gameStartTime ? new Date(gameData.gameStartTime) : null);
      setScoreLimit(gameData.scoreLimit || 100);
      setRoundHistory(gameData.roundHistory || []);
      setIsInitialized(true);
      
      console.log('Existing game loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to load existing game:', error);
      localStorage.removeItem('current_dutch_game');
      return false;
    }
  }, [setRoundHistory]);

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
    createNewGame,
    loadExistingGame
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
    createNewGame,
    loadExistingGame
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
