
// This should include any existing types, with additions for game invitation
export type Round = {
  score: number;
  isDutch: boolean;
};

export type Player = {
  id: string;
  name: string;
  totalScore: number;
  rounds: Round[];
  stats?: PlayerStatistics;
};

export type PlayerStatistics = {
  bestRound: number | null;
  worstRound: number | null;
  averageScore: number;
  dutchCount: number;
  improvementRate: number;
  consistencyScore: number;
  winStreak: number;
};

export type GamePlayer = {
  name: string;
  score: number;
  isDutch: boolean;
};

export type Game = {
  id: string;
  date: Date;
  rounds: number;
  players: GamePlayer[];
  winner: string;
  isMultiplayer?: boolean;
  gameCode?: string;
};

export interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
  onUndoLastRound: () => void;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
}
