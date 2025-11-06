/**
 * Gestionnaire d'état unifié pour le jeu
 * Singleton simple et robuste remplaçant tous les anciens systèmes
 */
import { Player, RoundHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { StorageAdapter, StoredGameData } from './StorageAdapter';
import { 
  addRoundToPlayers, 
  removeLastRoundFromPlayers, 
  validateAndFixPlayers 
} from '@/utils/scoreEngine';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { logger } from '@/utils/logger';

export interface GameState {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null;
  isGameOver: boolean;
  gameId: string | null;
  lastIntegrityCheck: Date | null;
  lastSync?: Date | null;
}

type StateListener = () => void;

export class GameStateManager {
  private static instance: GameStateManager;
  private state: GameState;
  private listeners = new Set<StateListener>();

  private constructor() {
    this.state = this.getInitialState();
    this.loadFromStorage();
  }

  static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  private getInitialState(): GameState {
    return {
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false,
      gameId: null,
      lastIntegrityCheck: null,
      lastSync: null
    };
  }

  getState(): GameState {
    return { ...this.state };
  }

  setState(updates: Partial<GameState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        logger.error('Listener error:', error);
      }
    });
  }

  private toStoredData(state: GameState): StoredGameData {
    return {
      players: state.players,
      roundHistory: state.roundHistory,
      scoreLimit: state.scoreLimit,
      gameStartTime: state.gameStartTime?.toISOString() || null,
      isGameOver: state.isGameOver,
      gameId: state.gameId,
      lastIntegrityCheck: state.lastIntegrityCheck?.toISOString() || null
    };
  }

  private fromStoredData(stored: StoredGameData): GameState {
    return {
      players: stored.players,
      roundHistory: stored.roundHistory,
      scoreLimit: stored.scoreLimit,
      gameStartTime: stored.gameStartTime ? new Date(stored.gameStartTime) : null,
      isGameOver: stored.isGameOver,
      gameId: stored.gameId,
      lastIntegrityCheck: stored.lastIntegrityCheck ? new Date(stored.lastIntegrityCheck) : null
    };
  }

  save(): boolean {
    const stored = this.toStoredData(this.state);
    return StorageAdapter.save(stored);
  }

  loadFromStorage(): boolean {
    const stored = StorageAdapter.load();
    if (!stored) return false;

    let restored = this.fromStoredData(stored);

    // Auto-fix sur le chargement
    const { fixedPlayers, hasErrors } = validateAndFixPlayers(restored.players);
    if (hasErrors) {
      logger.debug('🔧 Auto-fixed integrity issues on load');
      restored.players = updateAllPlayersStats(fixedPlayers);
    }

    this.state = restored;
    this.notifyListeners();
    return true;
  }

  reset(): void {
    this.state = this.getInitialState();
    StorageAdapter.clear();
    this.notifyListeners();
  }

  // Actions métier

  createGame(playerNames: string[]): boolean {
    if (playerNames.length < 2) return false;

    const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const emojis = ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'];

    const players: Player[] = playerNames.map((name, index) => ({
      id: uuidv4(),
      name: name.trim(),
      emoji: emojis[index % emojis.length],
      totalScore: 0,
      rounds: [],
      avatarColor: avatarColors[index % avatarColors.length]
    }));

    this.setState({
      players,
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: new Date(),
      isGameOver: false,
      gameId: uuidv4(),
      lastIntegrityCheck: new Date()
    });

    return this.save();
  }

  addRound(scores: number[], dutchPlayerId?: string): boolean {
    const result = addRoundToPlayers(this.state.players, scores, dutchPlayerId);
    if (!result.success) return false;

    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);
    const isGameOver = playersWithStats.some(p => p.totalScore >= this.state.scoreLimit);

    this.setState({
      players: playersWithStats,
      roundHistory: [...this.state.roundHistory, { scores, dutchPlayerId }],
      isGameOver,
      lastIntegrityCheck: new Date()
    });

    return this.save();
  }

  undoLastRound(): boolean {
    if (this.state.roundHistory.length === 0) return false;

    const result = removeLastRoundFromPlayers(this.state.players);
    if (!result.success) return false;

    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);

    this.setState({
      players: playersWithStats,
      roundHistory: this.state.roundHistory.slice(0, -1),
      isGameOver: false,
      lastIntegrityCheck: new Date()
    });

    return this.save();
  }
}
