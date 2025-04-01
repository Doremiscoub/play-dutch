
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
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
  showGameEndConfirmation: boolean;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
}

export interface TournamentPlayer {
  id: string;
  name: string;
  score: number;
  wins: number;
  dutchCount: number;
  totalScore: number;
  gamesPlayed: number;
  avgScorePerGame: number;
  bestGameScore: number;
  worstGameScore: number;
}

export interface Tournament {
  id: string;
  name: string;
  date: Date;
  players: TournamentPlayer[];
  games: Game[];
  completed: boolean;
  currentGameIndex: number;
  winner?: string;
}

export interface TournamentState {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  createTournament: (name: string, playerNames: string[]) => void;
  getCurrentTournament: () => Tournament | null;
  updateTournamentWithGameResult: (gameResult: Game) => void;
  completeTournament: () => void;
  getTournamentById: (id: string) => Tournament | null;
}
