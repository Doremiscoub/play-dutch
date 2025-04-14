
/**
 * Types centralisés pour l'application Dutch
 */

// Joueur et statistiques
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

// Partie
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

// Tableau des scores
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

// Configuration d'interface utilisateur
export interface UIConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Types pour l'authentification
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

// Types pour les commentaires IA
export interface AICommentData {
  type: 'info' | 'joke' | 'sarcasm' | 'encouragement';
  message: string;
  timestamp: number;
}
