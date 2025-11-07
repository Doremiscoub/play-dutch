/**
 * Hook unique d'accès à l'état du jeu
 * Remplace useUnifiedGameState, useOptimizedGameState et useSecureGameState
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { GameStateManager, GameState } from './GameStateManager';
import { toast } from 'sonner';

export const useGameState = () => {
  const managerRef = useRef<GameStateManager>();
  const [state, setState] = useState<GameState>(() => {
    if (!managerRef.current) {
      managerRef.current = GameStateManager.getInstance();
    }
    return managerRef.current.getState();
  });

  useEffect(() => {
    const manager = managerRef.current!;
    const unsubscribe = manager.subscribe(() => {
      setState(manager.getState());
    });
    return unsubscribe;
  }, []);

  const createGame = useCallback((playerNames: string[]) => {
    const manager = managerRef.current!;
    
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs');
      return false;
    }

    const success = manager.createGame(playerNames);
    if (success) {
      toast.success(`Partie créée avec ${playerNames.length} joueurs!`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, []);

  const addRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const manager = managerRef.current!;
    const currentState = manager.getState();
    
    const success = manager.addRound(scores, dutchPlayerId);
    if (success) {
      const dutchPlayer = currentState.players.find(p => p.id === dutchPlayerId);
      toast.success(`Manche ajoutée${dutchPlayer ? ` - ${dutchPlayer.name} a fait Dutch !` : ''}`);
      return true;
    } else {
      toast.error("Erreur lors de l'ajout de la manche");
      return false;
    }
  }, []);

  const undoLastRound = useCallback(() => {
    const manager = managerRef.current!;
    
    if (state.roundHistory.length === 0) {
      toast.error('Aucune manche à annuler');
      return false;
    }

    const success = manager.undoLastRound();
    if (success) {
      toast.success('Dernière manche annulée');
      return true;
    } else {
      toast.error("Erreur lors de l'annulation");
      return false;
    }
  }, [state.roundHistory.length]);

  const resetGame = useCallback(() => {
    const manager = managerRef.current!;
    manager.reset();
    toast.success('Partie réinitialisée');
  }, []);

  const loadFromStorage = useCallback(() => {
    const manager = managerRef.current!;
    return manager.loadFromStorage();
  }, []);

  return {
    // État
    ...state,
    hasGame: state.players.length > 0,

    // Actions
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadFromStorage,

    // ⚠️ DEPRECATED: Compatibilité avec l'ancien système de sync (non implémenté)
    // Ces propriétés retournent des valeurs par défaut et seront supprimées dans v2.0
    /** @deprecated Sync not implemented - always returns 'local' */
    syncStatus: 'local' as 'local' | 'synced' | 'syncing' | 'error',
    /** @deprecated Sync not implemented - always returns false */
    isConnected: false,
    /** @deprecated Sync not implemented - always returns false */
    canSync: false,
    /** @deprecated Sync not implemented - always returns empty array */
    availableGames: [],
    /** @deprecated Sync not implemented - no-op function */
    loadAvailableGames: () => Promise.resolve(),
    /** @deprecated Sync not implemented - always returns false */
    loadGameFromCloud: (_gameId?: string) => Promise.resolve(false),
    /** @deprecated Sync not implemented - always returns false */
    migrateLocalToCloud: () => Promise.resolve(false)
  };
};
