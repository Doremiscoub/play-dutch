export interface Player {
  id: string;
  name: string;
  totalScore: number;
  rounds: { score: number; isDutch: boolean }[];
  stats?: PlayerStatistics;
}

export interface PlayerStatistics {
  bestRound: number | null;
  dutchCount: number;
  averageScore: number;
  worstRound: number | null;
  improvementRate: number;
  consistencyScore: number;
  winStreak: number;
  playStyle?: string;
  dutchSuccessRate?: number;
  roundsWon?: number;
  wins?: number;
}

export interface Game {
  id: string;
  date: Date;
  rounds: number;
  players: { name: string; score: number; isDutch: boolean }[];
  winner: string;
  isMultiplayer?: boolean;
  gameCode?: string;
}

export interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
  onUndoLastRound: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
  showGameEndConfirmation?: boolean;
  onConfirmEndGame?: () => void;
  onCancelEndGame?: () => void;
}
