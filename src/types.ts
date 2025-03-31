
export interface PlayerRound {
  score: number;
  isDutch: boolean;
}

export interface PlayerStatistics {
  bestRound: number | null;
  dutchCount: number;
  averageScore: number;
  worstRound: number | null;
  improvementRate: number;
  consistencyScore: number;
  winStreak: number;
}

export interface Player {
  id: string;
  name: string;
  totalScore: number;
  rounds: PlayerRound[];
  stats?: PlayerStatistics;
}

export interface GamePlayer {
  name: string;
  score: number;
  isDutch: boolean;
}

export interface Game {
  id: string;
  date: Date;
  rounds: number;
  players: GamePlayer[];
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
