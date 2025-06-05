
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameContinuation } from './useGameContinuation';
import { useRoundManagement } from './useRoundManagement';
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
  console.log('useGameState: Hook called');
  
  // États principaux - tous les hooks doivent être appelés inconditionnellement
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [soundEnabled] = useLocalStorage(STORAGE_KEYS.SOUND_ENABLED, true);
  
  // Refs
  const lastSaveTimeRef = useRef<number>(0);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializationLock = useRef(false);
  
  // Hooks personnalisés - doivent être appelés inconditionnellement
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

  // Effets - nettoyage initial
  useEffect(() => {
    cleanupLegacyStorage();
  }, []);

  // Création d'une nouvelle partie
  const createNewGame = useCallback(async (playerNames: string[]): Promise<boolean> => {
    if (initializationLock.current) {
      console.log('useGameState: Game initialization already in progress');
      return false;
    }

    if (!playerNames || playerNames.length < 2) {
      setInitError('Il faut au moins 2 joueurs pour démarrer');
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return false;
    }

    console.log('useGameState: Creating new game with players:', playerNames);
    initializationLock.current = true;
    
    try {
      setInitError(null);
      
      const newPlayers: Player[] = playerNames.map((name, index) => ({
        id: uuidv4(),
        name: name.trim() || `Joueur ${index + 1}`,
        emoji: getRandomEmoji(),
        totalScore: 0,
        rounds: [],
        avatarColor: avatarColors[index % avatarColors.length]
      }));
      
      console.log('useGameState: Players created successfully:', newPlayers);
      
      const startTime = new Date();
      
      setPlayers(newPlayers);
      setGameStartTime(startTime);
      setIsInitialized(true);
      
      const gameData = {
        players: newPlayers,
        gameStartTime: startTime.toISOString(),
        scoreLimit,
        roundHistory: [],
        isGameOver: false
      };
      
      localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameData));
      localStorage.setItem(STORAGE_KEYS.GAME_ACTIVE, 'true');
      localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
      
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`);
      
      return true;
    } catch (error) {
      console.error('useGameState: Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      toast.error('Erreur lors de l\'initialisation du jeu');
      return false;
    } finally {
      initializationLock.current = false;
    }
  }, [scoreLimit]);

  // Chargement d'une partie existante
  const loadExistingGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
      if (!savedGame) {
        console.log('useGameState: No saved game found');
        return false;
      }

      const gameData = JSON.parse(savedGame);
      
      if (!gameData.players || !Array.isArray(gameData.players) || gameData.players.length === 0) {
        console.warn('useGameState: Invalid game data - no valid players');
        localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
        return false;
      }

      const validPlayers = gameData.players.every((player: any) => 
        player && typeof player.name === 'string' && typeof player.totalScore === 'number'
      );

      if (!validPlayers) {
        console.warn('useGameState: Invalid player data structure');
        localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
        return false;
      }

      setPlayers(gameData.players);
      setGameStartTime(gameData.gameStartTime ? new Date(gameData.gameStartTime) : null);
      setScoreLimit(gameData.scoreLimit || 100);
      setRoundHistory(gameData.roundHistory || []);
      setIsInitialized(true);
      
      console.log('useGameState: Existing game loaded successfully');
      return true;
    } catch (error) {
      console.error('useGameState: Failed to load existing game:', error);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
      
      try {
        const emergencyData = localStorage.getItem(STORAGE_KEYS.EMERGENCY_SAVE);
        if (emergencyData) {
          const parsed = JSON.parse(emergencyData);
          console.log('useGameState: Attempting emergency recovery');
          toast.info('Récupération de la sauvegarde d\'urgence');
          
          setPlayers(parsed.players || []);
          setGameStartTime(parsed.gameStartTime ? new Date(parsed.gameStartTime) : null);
          setScoreLimit(parsed.scoreLimit || 100);
          setRoundHistory(parsed.roundHistory || []);
          setIsInitialized(true);
          
          localStorage.removeItem(STORAGE_KEYS.EMERGENCY_SAVE);
          return true;
        }
      } catch (emergencyError) {
        console.error('useGameState: Emergency recovery failed:', emergencyError);
      }
      
      return false;
    }
  }, [setRoundHistory]);

  // Sauvegarde automatique
  useEffect(() => {
    if (!isInitialized || !players || players.length === 0) {
      return;
    }

    const saveInterval = setInterval(async () => {
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
        
        try {
          const success = await saveGameState(gameStateToSave);
          if (success) {
            lastSaveTimeRef.current = now;
            console.log('useGameState: Auto-save successful');
          } else {
            console.warn('useGameState: Auto-save failed');
            
            localStorage.setItem(STORAGE_KEYS.EMERGENCY_SAVE, JSON.stringify({
              ...gameStateToSave,
              gameStartTime: gameStateToSave.gameStartTime?.toISOString(),
              emergency: true,
              timestamp: new Date().toISOString()
            }));
          }
        } catch (error) {
          console.error('useGameState: Auto-save error:', error);
        }
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
      localStorage.setItem(STORAGE_KEYS.GAME_ACTIVE, 'true');
      
      return () => {
        localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
      };
    }
  }, [isInitialized, players]);

  // Gestion des rounds
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
        
        const saveSuccess = await saveGameState(gameStateToSave);
        if (!saveSuccess) {
          localStorage.setItem(STORAGE_KEYS.EMERGENCY_SAVE, JSON.stringify({
            ...gameStateToSave,
            gameStartTime: gameStateToSave.gameStartTime?.toISOString(),
            emergency: true,
            timestamp: new Date().toISOString()
          }));
          toast.warning('Sauvegarde d\'urgence effectuée');
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
      toast.error('Erreur lors de l\'ajout de la manche');
      return false;
    }
  }, [players, addRound, setPlayers, roundHistory, scoreLimit, gameStartTime, saveGameState]);

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
      
      await saveGameState(gameStateToSave);
      
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleUndoLastRound:', error);
      toast.error('Erreur lors de l\'annulation');
      return false;
    }
  }, [players, undoLastRound, setPlayers, showGameOver, soundEnabled, roundHistory, scoreLimit, gameStartTime, saveGameState]);

  const handleConfirmEndGame = useCallback(() => {
    console.log('useGameState: handleConfirmEndGame called');
    
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
      return true;
    } catch (error) {
      console.error('useGameState: Error in handleConfirmEndGame:', error);
      toast.error('Erreur lors de la fin de partie');
      return false;
    }
  }, [players, gameStartTime, saveGameToHistory]);

  // Nettoyage complet
  const cleanup = useCallback(() => {
    console.log('useGameState: Cleaning up game state');
    setPlayers([]);
    setGameStartTime(null);
    setIsInitialized(false);
    setInitError(null);
    initializationLock.current = false;
    
    localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
    localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
    localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
    
    cleanupLegacyStorage();
  }, []);

  // État memoïsé - toujours retourné à la fin
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
    loadExistingGame,
    cleanup
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
    loadExistingGame,
    cleanup
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
