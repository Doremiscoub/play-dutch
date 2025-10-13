/**
 * Hook de jeu unifié et optimisé
 * Remplace tous les autres hooks de jeu pour éliminer la duplication
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { Player, RoundHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  addRoundToPlayers, 
  removeLastRoundFromPlayers, 
  validateAndFixPlayers,
  auditScoreIntegrity 
} from '@/utils/scoreEngine';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { logger } from '@/utils/logger';

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const emojis = ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'];
const GAME_KEY = 'dutch_optimized_game_v2';

interface OptimizedGameState {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null;
  isGameOver: boolean;
  lastIntegrityCheck: Date | null;
  gameId: string | null;
}

/**
 * Gestionnaire d'état unifié et optimisé
 */
class OptimizedGameStateManager {
  private static instance: OptimizedGameStateManager;
  private state: OptimizedGameState = {
    players: [],
    roundHistory: [],
    scoreLimit: 100,
    gameStartTime: null,
    isGameOver: false,
    lastIntegrityCheck: null,
    gameId: null
  };
  private listeners = new Set<() => void>();
  private integrityCheckInterval: NodeJS.Timeout | null = null;
  private isInitialized = false;

  static getInstance(): OptimizedGameStateManager {
    if (!OptimizedGameStateManager.instance) {
      OptimizedGameStateManager.instance = new OptimizedGameStateManager();
    }
    return OptimizedGameStateManager.instance;
  }

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.isInitialized) return;
    
    // Auto-load on initialization
    this.loadFromStorage();
    this.startIntegrityChecking();
    this.isInitialized = true;
  }

  private startIntegrityChecking(): void {
    if (this.integrityCheckInterval) {
      clearInterval(this.integrityCheckInterval);
    }

    this.integrityCheckInterval = setInterval(() => {
      if (this.state.players.length > 0 && !this.state.isGameOver) {
        this.performIntegrityCheck();
      }
    }, 60000); // Check every minute
  }

  private performIntegrityCheck(): void {
    const audit = auditScoreIntegrity(this.state.players);
    
    if (!audit.isValid && audit.corrections.length > 0) {
      logger.warn('🔧 Auto-correcting integrity issues:', audit.errors);
      const { fixedPlayers } = validateAndFixPlayers(this.state.players);
      this.setState({ 
        players: updateAllPlayersStats(fixedPlayers),
        lastIntegrityCheck: new Date()
      });
      this.saveToStorage();
    } else {
      this.setState({ lastIntegrityCheck: new Date() });
    }
  }

  getState(): OptimizedGameState {
    return { ...this.state };
  }

  setState(newState: Partial<OptimizedGameState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        logger.error('Error in game state listener:', error);
      }
    });
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  saveToStorage(): boolean {
    try {
      const dataToSave = {
        ...this.state,
        gameStartTime: this.state.gameStartTime?.toISOString(),
        lastIntegrityCheck: this.state.lastIntegrityCheck?.toISOString()
      };

      localStorage.setItem(GAME_KEY, JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      logger.error('❌ Save failed:', error);
      return false;
    }
  }

  loadFromStorage(): boolean {
    try {
      // Migration from legacy systems
      this.migrateFromLegacySystems();
      
      const saved = localStorage.getItem(GAME_KEY);
      if (!saved) return false;
      
      const parsed = JSON.parse(saved);
      if (!parsed.players || parsed.players.length === 0) {
        localStorage.removeItem(GAME_KEY);
        return false;
      }
      
      // Restore state safely
      const restoredState: OptimizedGameState = {
        ...parsed,
        gameStartTime: parsed.gameStartTime ? new Date(parsed.gameStartTime) : null,
        lastIntegrityCheck: parsed.lastIntegrityCheck ? new Date(parsed.lastIntegrityCheck) : null
      };

      // Auto-fix on load
      const { fixedPlayers, hasErrors } = validateAndFixPlayers(restoredState.players);
      if (hasErrors) {
        logger.debug('🔧 Fixed integrity issues during load');
        restoredState.players = updateAllPlayersStats(fixedPlayers);
      }

      this.state = restoredState;
      this.notifyListeners();
      return true;
    } catch (error) {
      logger.error('❌ Load failed:', error);
      localStorage.removeItem(GAME_KEY);
      return false;
    }
  }

  private migrateFromLegacySystems(): void {
    const legacyKeys = ['dutch_simple_game', 'dutch_secure_game'];
    
    for (const legacyKey of legacyKeys) {
      const legacyData = localStorage.getItem(legacyKey);
      
      if (legacyData && !localStorage.getItem(GAME_KEY)) {
        try {
          const parsed = JSON.parse(legacyData);
          if (parsed.players && parsed.players.length > 0) {
            logger.debug(`🔄 Migrating from ${legacyKey}`);
            
            const migratedState = {
              ...parsed,
              gameId: parsed.id || uuidv4(),
              lastIntegrityCheck: new Date().toISOString()
            };
            
            localStorage.setItem(GAME_KEY, JSON.stringify(migratedState));
            localStorage.removeItem(legacyKey);
            
            toast.info('Partie migrée vers le nouveau système optimisé');
            return;
          }
        } catch (error) {
          logger.error(`Migration from ${legacyKey} failed:`, error);
          localStorage.removeItem(legacyKey);
        }
      }
    }
  }

  reset(): void {
    this.state = {
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false,
      lastIntegrityCheck: null,
      gameId: null
    };
    localStorage.removeItem(GAME_KEY);
    this.notifyListeners();
  }

  cleanup(): void {
    if (this.integrityCheckInterval) {
      clearInterval(this.integrityCheckInterval);
      this.integrityCheckInterval = null;
    }
  }
}

export const useOptimizedGameState = () => {
  const manager = OptimizedGameStateManager.getInstance();
  const [gameState, setGameState] = useState<OptimizedGameState>(manager.getState());
  const isSubscribed = useRef(false);
  
  useEffect(() => {
    if (isSubscribed.current) return;
    
    const unsubscribe = manager.subscribe(() => {
      setGameState(manager.getState());
    });
    
    isSubscribed.current = true;
    
    return () => {
      unsubscribe();
      isSubscribed.current = false;
    };
  }, [manager]);

  const createGame = useCallback((playerNames: string[]) => {
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
    const newState: OptimizedGameState = {
      players,
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: new Date(),
      isGameOver: false,
      lastIntegrityCheck: new Date(),
      gameId
    };

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      toast.success(`Partie créée avec ${players.length} joueurs!`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const addRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const currentState = manager.getState();
    
    const result = addRoundToPlayers(currentState.players, scores, dutchPlayerId);
    
    if (!result.success) {
      toast.error(result.error || 'Erreur lors de l\'ajout de la manche');
      return false;
    }

    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);
    const newRound: RoundHistoryEntry = { scores, dutchPlayerId };
    const isGameOver = playersWithStats.some(p => p.totalScore >= currentState.scoreLimit);

    const newState = {
      ...currentState,
      players: playersWithStats,
      roundHistory: [...currentState.roundHistory, newRound],
      isGameOver,
      lastIntegrityCheck: new Date()
    };

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      const dutchPlayer = playersWithStats.find(p => p.id === dutchPlayerId);
      toast.success(`Manche ajoutée${dutchPlayer ? ` - ${dutchPlayer.name} a fait Dutch !` : ''}`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const undoLastRound = useCallback(() => {
    const currentState = manager.getState();
    
    if (currentState.roundHistory.length === 0) {
      toast.warning('Aucune manche à annuler');
      return false;
    }

    const result = removeLastRoundFromPlayers(currentState.players);
    
    if (!result.success) {
      toast.error(result.error || 'Erreur lors de l\'annulation');
      return false;
    }

    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);

    const newState = {
      ...currentState,
      players: playersWithStats,
      roundHistory: currentState.roundHistory.slice(0, -1),
      isGameOver: false,
      lastIntegrityCheck: new Date()
    };

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      toast.success('Dernière manche annulée');
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const resetGame = useCallback(() => {
    manager.reset();
    toast.success('Partie réinitialisée');
  }, [manager]);

  const loadFromStorage = useCallback(() => {
    return manager.loadFromStorage();
  }, [manager]);

  const performManualIntegrityCheck = useCallback(() => {
    const audit = auditScoreIntegrity(gameState.players);
    
    if (audit.isValid) {
      toast.success('Intégrité des scores validée ✅');
    } else {
      const { fixedPlayers } = validateAndFixPlayers(gameState.players);
      manager.setState({ 
        players: updateAllPlayersStats(fixedPlayers),
        lastIntegrityCheck: new Date()
      });
      manager.saveToStorage();
      toast.success('Scores corrigés automatiquement');
    }
    
    return audit;
  }, [gameState.players, manager]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      manager.cleanup();
    };
  }, [manager]);

  return {
    ...gameState,
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadFromStorage,
    performManualIntegrityCheck,
    hasGame: gameState.players.length > 0,
    // Compatibility for cloud features
    syncStatus: 'local' as const,
    isConnected: false,
    canSync: false,
    availableGames: [],
    loadAvailableGames: () => Promise.resolve(),
    loadGameFromCloud: () => Promise.resolve(false),
    migrateLocalToCloud: () => Promise.resolve(false)
  };
};