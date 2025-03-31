
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Tournament, TournamentPlayer, TournamentGame } from '@/types/tournament';

interface TournamentState {
  tournaments: Tournament[];
  activeTournament: Tournament | null;
  
  // Tournament Actions
  createTournament: (name: string, playerNames: string[], totalGames: number) => string;
  updateTournament: (id: string, updates: Partial<Tournament>) => void;
  finishTournament: (id: string, updates: { players: TournamentPlayer[], winner: string }) => void;
  setActiveTournament: (id: string) => void;
  
  // Tournament Game Actions
  createTournamentGame: (tournamentId: string, gameNumber: number, data: { 
    players: { id: string, name: string, score: number, isDutch: boolean }[],
    winner: string,
    winnerId: string
  }) => string;
  updateTournamentGame: (tournamentId: string, gameNumber: number, data: {
    players: { id: string, name: string, score: number, isDutch: boolean }[],
    winner: string,
    winnerId: string
  }) => void;
}

const useTournamentStore = create<TournamentState>((set, get) => ({
  tournaments: [],
  activeTournament: null,
  
  createTournament: (name, playerNames, totalGames) => {
    const id = uuidv4();
    const now = new Date();
    
    const players: TournamentPlayer[] = playerNames.map(name => ({
      id: uuidv4(),
      name,
      totalScore: 0,
      gamesPlayed: 0,
      wins: 0,
      dutchCount: 0,
      avgScorePerGame: 0,
      bestGameScore: null,
      worstGameScore: null
    }));
    
    const tournament: Tournament = {
      id,
      name,
      createdAt: now,
      players,
      currentGame: 1,
      totalGames,
      isActive: true
    };
    
    set(state => ({
      tournaments: [...state.tournaments, tournament],
      activeTournament: tournament
    }));
    
    return id;
  },
  
  updateTournament: (id, updates) => {
    set(state => ({
      tournaments: state.tournaments.map(t => 
        t.id === id ? { ...t, ...updates } : t
      ),
      activeTournament: state.activeTournament?.id === id 
        ? { ...state.activeTournament, ...updates }
        : state.activeTournament
    }));
  },
  
  finishTournament: (id, { players, winner }) => {
    set(state => ({
      tournaments: state.tournaments.map(t => 
        t.id === id ? { 
          ...t, 
          players, 
          isActive: false,
          winner
        } : t
      ),
      activeTournament: state.activeTournament?.id === id 
        ? { 
            ...state.activeTournament, 
            players, 
            isActive: false,
            winner
          }
        : state.activeTournament
    }));
  },
  
  setActiveTournament: (id) => {
    const tournament = get().tournaments.find(t => t.id === id);
    if (tournament) {
      set({ activeTournament: tournament });
    }
  },
  
  createTournamentGame: (tournamentId, gameNumber, data) => {
    const gameId = uuidv4();
    const now = new Date();
    
    const game: TournamentGame = {
      id: gameId,
      tournamentId,
      gameNumber,
      players: data.players.map(p => ({
        id: p.id,
        name: p.name,
        score: p.score,
        isDutch: p.isDutch
      })),
      date: now,
      winner: data.winner
    };
    
    set(state => {
      // Find the tournament
      const tournament = state.tournaments.find(t => t.id === tournamentId);
      
      if (tournament) {
        // Update player stats based on game results
        const updatedPlayers = tournament.players.map(player => {
          const gamePlayer = data.players.find(p => p.id === player.id);
          
          if (!gamePlayer) return player;
          
          const isWinner = data.winnerId === player.id;
          
          return {
            ...player,
            gamesPlayed: player.gamesPlayed + 1,
            wins: player.wins + (isWinner ? 1 : 0),
            dutchCount: player.dutchCount + (gamePlayer.isDutch ? 1 : 0),
            totalScore: player.totalScore + gamePlayer.score,
            avgScorePerGame: (player.totalScore + gamePlayer.score) / (player.gamesPlayed + 1),
            bestGameScore: player.bestGameScore !== null 
              ? Math.max(player.bestGameScore, gamePlayer.score)
              : gamePlayer.score,
            worstGameScore: player.worstGameScore !== null 
              ? Math.min(player.worstGameScore, gamePlayer.score)
              : gamePlayer.score
          };
        });
        
        // Update tournament with new player stats
        return {
          tournaments: state.tournaments.map(t => 
            t.id === tournamentId ? { ...t, players: updatedPlayers } : t
          ),
          activeTournament: state.activeTournament?.id === tournamentId 
            ? { ...state.activeTournament, players: updatedPlayers }
            : state.activeTournament
        };
      }
      
      return state;
    });
    
    return gameId;
  },
  
  updateTournamentGame: (tournamentId, gameNumber, data) => {
    // Similar logic to createTournamentGame but updates existing game
    // For this simple implementation, we'll reuse the createTournamentGame function
    get().createTournamentGame(tournamentId, gameNumber, data);
  }
}));

export default useTournamentStore;
