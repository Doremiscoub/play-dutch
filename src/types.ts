
export interface Player {
  id: string;
  name: string;
  totalScore: number;
  rounds: GameRound[];
}

export interface GameRound {
  score: number;
  isDutch?: boolean;
}

export interface Game {
  id: string;
  date: Date;
  rounds: number;
  players: {
    name: string;
    score: number;
    isDutch?: boolean;
  }[];
  winner?: string;
}

export interface PlayerStatistics {
  bestRound: number | null;
  dutchCount: number;
  averageScore: number;
  worstRound: number | null;
}
