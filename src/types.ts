
export interface Player {
  id: string;
  name: string;
  totalScore: number;
  rounds: { score: number; isDutch: boolean }[];
  stats?: PlayerStatistics;
}

export interface PlayerStatistics {
  averageScore: number;
  bestRound: number | null;
  dutchCount: number;
  worstRound: number | null;
  improvementRate: number;
  consistencyScore: number;
  winStreak: number;
  highestRound?: number;
  lowestRound?: number;
  streakInfo?: {
    current: number;
    best: number;
    type: 'positive' | 'negative' | 'none';
  };
}

export interface Game {
  id: string;
  date: Date;
  rounds: number;
  players: { name: string; score: number; isDutch: boolean }[];
  winner: string;
  isMultiplayer?: boolean;
  gameCode?: string;
  duration?: string;  // Added duration property
}

// Add these new props to the ScoreBoardProps interface
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
  scoreLimit?: number;
}
