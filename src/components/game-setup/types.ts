export interface Player {
  name: string;
  emoji: string;
}

export interface GameSetupStep {
  id: number;
  title: string;
  isCompleted?: boolean;
}

export const GAME_SETUP_STEPS: GameSetupStep[] = [
  { id: 1, title: 'Nombre de joueurs' },
  { id: 2, title: 'Noms des joueurs' },
  { id: 3, title: 'Résumé' }
];

export const MODERN_EMOJIS = ['🎮', '🎯', '🚀', '⭐', '🔥', '⚡', '🎲', '🎪', '🌟', '💎', '🎨', '🦄'];

export const QUICK_NAMES = ['Rémi', 'Arthur', 'Luca', 'Ben', 'Jules', 'Val', 'Chachou', 'Pierrix', 'Jo', 'Helena'];

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 12;
export const DEFAULT_PLAYER_COUNT = 4;
export const ESTIMATED_MINUTES_PER_PLAYER = 5;