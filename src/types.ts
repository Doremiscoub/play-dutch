
export interface Player {
  id: string;
  name: string;
  totalScore: number;
  rounds: GameRound[];
  stats?: PlayerStatistics;
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
  improvementRate?: number; // Negative is improvement, positive is getting worse
  consistencyScore?: number; // Lower variance is more consistent
  winStreak?: number;
}
