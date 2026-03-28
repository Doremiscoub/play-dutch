/**
 * Hook unique d'accès à l'état du jeu
 * Backed by Zustand store (replaces GameStateManager singleton)
 */
import { useCallback } from 'react';
import { useGameStore } from '@/state/gameStore';
import { toast } from 'sonner';

export const useGameState = () => {
  const state = useGameStore();

  const createGame = useCallback((playerNames: string[]) => {
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs');
      return false;
    }

    const success = state.createGame(playerNames);
    if (success) {
      toast.success(`Partie créée avec ${playerNames.length} joueurs!`);
    } else {
      toast.error('Erreur de sauvegarde');
    }
    return success;
  }, [state.createGame]);

  const addRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const players = useGameStore.getState().players;
    const success = state.addRound(scores, dutchPlayerId);
    if (success) {
      const dutchPlayer = players.find(p => p.id === dutchPlayerId);
      toast.success(`Manche ajoutée${dutchPlayer ? ` - ${dutchPlayer.name} a fait Dutch !` : ''}`);
    } else {
      toast.error("Erreur lors de l'ajout de la manche");
    }
    return success;
  }, [state.addRound]);

  const undoLastRound = useCallback(() => {
    if (state.roundHistory.length === 0) {
      toast.error('Aucune manche à annuler');
      return false;
    }

    const success = state.undoLastRound();
    if (success) {
      toast.success('Dernière manche annulée');
    } else {
      toast.error("Erreur lors de l'annulation");
    }
    return success;
  }, [state.undoLastRound, state.roundHistory.length]);

  const resetGame = useCallback(() => {
    state.reset();
    toast.success('Partie réinitialisée');
  }, [state.reset]);

  const loadFromStorage = useCallback(() => {
    return state.loadFromStorage();
  }, [state.loadFromStorage]);

  return {
    // État
    players: state.players,
    roundHistory: state.roundHistory,
    scoreLimit: state.scoreLimit,
    gameStartTime: state.gameStartTime,
    isGameOver: state.isGameOver,
    gameId: state.gameId,
    lastIntegrityCheck: state.lastIntegrityCheck,
    lastSync: state.lastSync,
    hasGame: state.players.length > 0,

    // Actions
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadFromStorage,

    // DEPRECATED: Backward-compatible stubs for removed sync features
    syncStatus: 'local' as 'local' | 'synced' | 'syncing' | 'error',
    isConnected: false,
    canSync: false,
    availableGames: [] as never[],
    loadAvailableGames: () => Promise.resolve(),
    loadGameFromCloud: () => Promise.resolve(false),
    migrateLocalToCloud: () => Promise.resolve(false),
  };
};
