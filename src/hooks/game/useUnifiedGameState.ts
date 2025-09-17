/**
 * Hook unifié pour la gestion d'état du jeu
 * Bascule automatiquement entre localStorage et Supabase selon l'authentification
 */
import { useState, useCallback, useEffect } from 'react';
import { Player, RoundHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { SupabaseGameService, SupabaseGameData } from '@/services/supabaseGameService';
import { useSecureGameState } from './useSecureGameState';

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const emojis = ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'];

interface UnifiedGameState {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null;
  isGameOver: boolean;
  currentGameId: string | null;
  syncStatus: 'local' | 'synced' | 'syncing' | 'error';
  lastSync: Date | null;
}

export const useUnifiedGameState = () => {
  const { isSignedIn, user, isLoaded } = useSupabaseAuth();
  const localGameState = useSecureGameState();
  
  const [unifiedState, setUnifiedState] = useState<UnifiedGameState>({
    players: [],
    roundHistory: [],
    scoreLimit: 100,
    gameStartTime: null,
    isGameOver: false,
    currentGameId: null,
    syncStatus: 'local',
    lastSync: null
  });

  const [availableGames, setAvailableGames] = useState<SupabaseGameData[]>([]);

  // Synchronise l'état local avec l'état unifié
  useEffect(() => {
    if (!isSignedIn) {
      // Mode hors ligne - utilise l'état local
      setUnifiedState(prev => ({
        ...prev,
        players: localGameState.players,
        roundHistory: localGameState.roundHistory,
        scoreLimit: localGameState.scoreLimit,
        gameStartTime: localGameState.gameStartTime,
        isGameOver: localGameState.isGameOver,
        syncStatus: 'local'
      }));
    }
  }, [isSignedIn, localGameState]);

  // Charge les parties disponibles quand l'utilisateur se connecte
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      loadAvailableGames();
    }
  }, [isSignedIn, isLoaded]);

  const loadAvailableGames = useCallback(async () => {
    if (!isSignedIn) return;
    
    try {
      const games = await SupabaseGameService.getUserGames();
      setAvailableGames(games);
    } catch (error) {
      console.error('Failed to load available games:', error);
    }
  }, [isSignedIn]);

  const createGame = useCallback(async (playerNames: string[]) => {
    console.log('🎮 Creating unified game with players:', playerNames);
    
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs');
      return false;
    }

    const players: Player[] = playerNames.map((name, index) => ({
      id: uuidv4(),
      name: name.trim(),
      emoji: emojis[index % emojis.length],
      totalScore: 0,
      rounds: [],
      avatarColor: avatarColors[index % avatarColors.length]
    }));

    const gameId = uuidv4();
    const newGameData: SupabaseGameData = {
      id: gameId,
      name: `Partie ${new Date().toLocaleDateString()}`,
      players,
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: new Date(),
      isGameOver: false,
      status: 'active',
      lastUpdated: new Date()
    };

    // Toujours créer localement en premier
    const localSuccess = localGameState.createGame(playerNames);
    if (!localSuccess) return false;

    // Si connecté, synchroniser avec Supabase
    if (isSignedIn) {
      setUnifiedState(prev => ({ ...prev, syncStatus: 'syncing' }));
      
      const syncSuccess = await SupabaseGameService.saveCurrentGame(newGameData);
      
      setUnifiedState(prev => ({
        ...prev,
        currentGameId: gameId,
        syncStatus: syncSuccess ? 'synced' : 'error',
        lastSync: syncSuccess ? new Date() : prev.lastSync,
        players,
        roundHistory: [],
        scoreLimit: 100,
        gameStartTime: new Date(),
        isGameOver: false
      }));

      if (syncSuccess) {
        toast.success(`Partie créée et synchronisée avec ${players.length} joueurs!`);
        await loadAvailableGames();
      } else {
        toast.warning('Partie créée localement, synchronisation échouée');
      }
    } else {
      setUnifiedState(prev => ({
        ...prev,
        players,
        roundHistory: [],
        scoreLimit: 100,
        gameStartTime: new Date(),
        isGameOver: false,
        syncStatus: 'local'
      }));
    }

    return true;
  }, [isSignedIn, localGameState, loadAvailableGames]);

  const addRound = useCallback(async (scores: number[], dutchPlayerId?: string) => {
    console.log('➕ Adding unified round:', { scores, dutchPlayerId });
    
    // Toujours ajouter localement en premier
    const localSuccess = localGameState.addRound(scores, dutchPlayerId);
    if (!localSuccess) return false;

    // Si connecté et partie synchronisée, mettre à jour Supabase
    if (isSignedIn && unifiedState.currentGameId) {
      setUnifiedState(prev => ({ ...prev, syncStatus: 'syncing' }));
      
      const updatedGameData: SupabaseGameData = {
        id: unifiedState.currentGameId,
        name: `Partie ${new Date().toLocaleDateString()}`,
        players: localGameState.players,
        roundHistory: [...localGameState.roundHistory, { scores, dutchPlayerId }],
        scoreLimit: localGameState.scoreLimit,
        gameStartTime: localGameState.gameStartTime,
        isGameOver: localGameState.isGameOver,
        status: localGameState.isGameOver ? 'completed' : 'active',
        lastUpdated: new Date()
      };

      const syncSuccess = await SupabaseGameService.saveCurrentGame(updatedGameData);
      
      setUnifiedState(prev => ({
        ...prev,
        roundHistory: [...prev.roundHistory, { scores, dutchPlayerId }],
        players: localGameState.players,
        isGameOver: localGameState.isGameOver,
        syncStatus: syncSuccess ? 'synced' : 'error',
        lastSync: syncSuccess ? new Date() : prev.lastSync
      }));
    }

    return true;
  }, [isSignedIn, localGameState, unifiedState.currentGameId]);

  const undoLastRound = useCallback(async () => {
    console.log('↩️ Undoing unified last round');
    
    const localSuccess = localGameState.undoLastRound();
    if (!localSuccess) return false;

    // Synchroniser avec Supabase si connecté
    if (isSignedIn && unifiedState.currentGameId) {
      setUnifiedState(prev => ({ ...prev, syncStatus: 'syncing' }));
      
      const updatedGameData: SupabaseGameData = {
        id: unifiedState.currentGameId,
        name: `Partie ${new Date().toLocaleDateString()}`,
        players: localGameState.players,
        roundHistory: localGameState.roundHistory,
        scoreLimit: localGameState.scoreLimit,
        gameStartTime: localGameState.gameStartTime,
        isGameOver: false,
        status: 'active',
        lastUpdated: new Date()
      };

      const syncSuccess = await SupabaseGameService.saveCurrentGame(updatedGameData);
      
      setUnifiedState(prev => ({
        ...prev,
        roundHistory: localGameState.roundHistory,
        players: localGameState.players,
        isGameOver: false,
        syncStatus: syncSuccess ? 'synced' : 'error',
        lastSync: syncSuccess ? new Date() : prev.lastSync
      }));
    }

    return true;
  }, [isSignedIn, localGameState, unifiedState.currentGameId]);

  const loadGameFromCloud = useCallback(async (gameId: string) => {
    if (!isSignedIn) {
      toast.error('Connexion requise pour charger une partie du cloud');
      return false;
    }

    setUnifiedState(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    const gameData = await SupabaseGameService.loadGame(gameId);
    if (!gameData) {
      toast.error('Impossible de charger la partie');
      setUnifiedState(prev => ({ ...prev, syncStatus: 'error' }));
      return false;
    }

    // Créer la partie localement avec les données du cloud
    const playerNames = gameData.players.map(p => p.name);
    const localSuccess = localGameState.createGame(playerNames);
    
    if (localSuccess) {
      setUnifiedState({
        players: gameData.players,
        roundHistory: gameData.roundHistory,
        scoreLimit: gameData.scoreLimit,
        gameStartTime: gameData.gameStartTime,
        isGameOver: gameData.isGameOver,
        currentGameId: gameId,
        syncStatus: 'synced',
        lastSync: new Date()
      });
      
      toast.success('Partie chargée depuis le cloud!');
      return true;
    }

    return false;
  }, [isSignedIn, localGameState]);

  const migrateLocalToCloud = useCallback(async () => {
    if (!isSignedIn) {
      toast.error('Connexion requise');
      return false;
    }

    if (!localGameState.hasGame) {
      toast.warning('Aucune partie locale à migrer');
      return false;
    }

    setUnifiedState(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    const gameId = await SupabaseGameService.migrateLocalGame({
      players: localGameState.players,
      roundHistory: localGameState.roundHistory,
      scoreLimit: localGameState.scoreLimit,
      gameStartTime: localGameState.gameStartTime,
      isGameOver: localGameState.isGameOver
    });

    if (gameId) {
      setUnifiedState(prev => ({
        ...prev,
        currentGameId: gameId,
        syncStatus: 'synced',
        lastSync: new Date()
      }));
      
      await loadAvailableGames();
      return true;
    } else {
      setUnifiedState(prev => ({ ...prev, syncStatus: 'error' }));
      return false;
    }
  }, [isSignedIn, localGameState, loadAvailableGames]);

  const resetGame = useCallback(() => {
    localGameState.resetGame();
    setUnifiedState({
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false,
      currentGameId: null,
      syncStatus: isSignedIn ? 'synced' : 'local',
      lastSync: null
    });
  }, [localGameState, isSignedIn]);

  return {
    // État du jeu
    ...unifiedState,
    hasGame: unifiedState.players.length > 0,
    
    // Actions
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadGameFromCloud,
    migrateLocalToCloud,
    
    // Gestion cloud
    availableGames,
    loadAvailableGames,
    
    // État de synchronisation
    isConnected: isSignedIn,
    canSync: isSignedIn && isLoaded
  };
};