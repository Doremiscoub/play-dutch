
export interface Player {
  id: string;
  name: string;
  totalScore: number;
  avatarColor: string;
  rounds: { score: number; isDutch: boolean }[];
  stats?: PlayerStatistics;
}

export interface PlayerStatistics {
  playerId: string;
  roundsPlayed: number;
  meanScore: number;
  // Ajout des propriétés manquantes utilisées par les composants
  averageScore: number;
  bestRound: number | null;
  worstRound: number | null;
  dutchCount: number;
  improvementRate: number;
  consistencyScore: number;
  winStreak: number;
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
  duration?: string;
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
  scoreLimit?: number;
}

export interface AuthUser {
  id: string;
  fullName: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  imageUrl: string | null;
}

export interface AuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: AuthUser | null;
  signOut: () => Promise<void>;
  isOfflineMode: boolean;
}
