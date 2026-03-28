/**
 * Zustand store for game state
 * Replaces the GameStateManager singleton with a proper reactive store
 */
import { create } from 'zustand';
import { Player, RoundHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { StorageAdapter, StoredGameData } from '@/hooks/game/unified/StorageAdapter';
import {
  addRoundToPlayers,
  removeLastRoundFromPlayers,
  validateAndFixPlayers,
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
  lastSync: Date | null;
}

interface GameActions {
  createGame: (playerNames: string[]) => boolean;
  addRound: (scores: number[], dutchPlayerId?: string) => boolean;
  undoLastRound: () => boolean;
  reset: () => void;
  loadFromStorage: () => boolean;
}

type GameStore = GameState & GameActions;

const INITIAL_STATE: GameState = {
  players: [],
  roundHistory: [],
  scoreLimit: 100,
  gameStartTime: null,
  isGameOver: false,
  gameId: null,
  lastIntegrityCheck: null,
  lastSync: null,
};

const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const EMOJIS = ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'];

function toStoredData(state: GameState): StoredGameData {
  return {
    players: state.players,
    roundHistory: state.roundHistory,
    scoreLimit: state.scoreLimit,
    gameStartTime: state.gameStartTime?.toISOString() ?? null,
    isGameOver: state.isGameOver,
    gameId: state.gameId,
    lastIntegrityCheck: state.lastIntegrityCheck?.toISOString() ?? null,
  };
}

function fromStoredData(stored: StoredGameData): GameState {
  return {
    players: stored.players,
    roundHistory: stored.roundHistory,
    scoreLimit: stored.scoreLimit,
    gameStartTime: stored.gameStartTime ? new Date(stored.gameStartTime) : null,
    isGameOver: stored.isGameOver,
    gameId: stored.gameId,
    lastIntegrityCheck: stored.lastIntegrityCheck ? new Date(stored.lastIntegrityCheck) : null,
    lastSync: null,
  };
}

function saveState(state: GameState): boolean {
  return StorageAdapter.save(toStoredData(state));
}

export const useGameStore = create<GameStore>()((set, get) => ({
  ...INITIAL_STATE,

  createGame: (playerNames: string[]) => {
    if (playerNames.length < 2) return false;

    const players: Player[] = playerNames.map((name, index) => ({
      id: uuidv4(),
      name: name.trim(),
      emoji: EMOJIS[index % EMOJIS.length],
      totalScore: 0,
      rounds: [],
      avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
    }));

    const newState: GameState = {
      players,
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: new Date(),
      isGameOver: false,
      gameId: uuidv4(),
      lastIntegrityCheck: new Date(),
      lastSync: null,
    };

    set(newState);
    return saveState(newState);
  },

  addRound: (scores: number[], dutchPlayerId?: string) => {
    const state = get();
    const result = addRoundToPlayers(state.players, scores, dutchPlayerId);
    if (!result.success) return false;

    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);
    const isGameOver = playersWithStats.some(p => p.totalScore >= state.scoreLimit);

    const newState: GameState = {
      ...state,
      players: playersWithStats,
      roundHistory: [...state.roundHistory, { scores, dutchPlayerId }],
      isGameOver,
      lastIntegrityCheck: new Date(),
    };

    set(newState);
    return saveState(newState);
  },

  undoLastRound: () => {
    const state = get();
    if (state.roundHistory.length === 0) return false;

    const result = removeLastRoundFromPlayers(state.players);
    if (!result.success) return false;

    const playersWithStats = updateAllPlayersStats(result.updatedPlayers);

    const newState: GameState = {
      ...state,
      players: playersWithStats,
      roundHistory: state.roundHistory.slice(0, -1),
      isGameOver: false,
      lastIntegrityCheck: new Date(),
    };

    set(newState);
    return saveState(newState);
  },

  reset: () => {
    StorageAdapter.clear();
    set(INITIAL_STATE);
  },

  loadFromStorage: () => {
    const stored = StorageAdapter.load();
    if (!stored) return false;

    let restored = fromStoredData(stored);

    const { fixedPlayers, hasErrors } = validateAndFixPlayers(restored.players);
    if (hasErrors) {
      logger.debug('Auto-fixed integrity issues on load');
      restored = { ...restored, players: updateAllPlayersStats(fixedPlayers) };
    }

    set(restored);
    return true;
  },
}));

// Load persisted game state on module initialization
try {
  useGameStore.getState().loadFromStorage();
} catch (error) {
  logger.debug('Failed to load game state from storage:', error);
}
