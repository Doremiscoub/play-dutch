
import { Player } from '@/types';

export interface TournamentPlayer {
  id: string;
  name: string;
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  dutchCount: number;
  avgScorePerGame: number;
  bestGameScore: number | null;
  worstGameScore: number | null;
  currentPlayer?: Player;
}

export interface Tournament {
  id: string;
  name: string;
  createdAt: Date;
  players: TournamentPlayer[];
  currentGame: number;
  totalGames: number;
  isActive: boolean;
  winner?: string;
}

export interface TournamentGame {
  id: string;
  tournamentId: string;
  gameNumber: number;
  players: {
    id: string;
    name: string;
    score: number;
    isDutch: boolean;
  }[];
  date: Date;
  winner?: string;
}
