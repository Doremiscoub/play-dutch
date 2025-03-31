
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Tournament, TournamentPlayer, TournamentGame } from '@/types/tournament';
import { Player, Game } from '@/types';

interface TournamentState {
  currentTournament: Tournament | null;
  tournamentHistory: Tournament[];
  createTournament: (name: string, playerNames: string[], totalGames: number) => Tournament;
  updateTournamentWithGameResult: (game: Game) => void;
  endCurrentTournament: () => void;
  resetTournament: () => void;
  getCurrentGame: () => number;
  getRemainingGames: () => number;
  getTournamentStandings: () => TournamentPlayer[];
}

const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      currentTournament: null,
      tournamentHistory: [],

      createTournament: (name, playerNames, totalGames) => {
        const players: TournamentPlayer[] = playerNames.map(playerName => ({
          id: uuidv4(),
          name: playerName,
          totalScore: 0,
          gamesPlayed: 0,
          wins: 0,
          dutchCount: 0,
          avgScorePerGame: 0,
          bestGameScore: null,
          worstGameScore: null
        }));

        const tournament: Tournament = {
          id: uuidv4(),
          name,
          createdAt: new Date(),
          players,
          currentGame: 1,
          totalGames,
          isActive: true
        };

        set({ currentTournament: tournament });
        return tournament;
      },

      updateTournamentWithGameResult: (game: Game) => {
        const { currentTournament } = get();
        if (!currentTournament) return;

        set(state => {
          const tournamentGame: TournamentGame = {
            id: uuidv4(),
            tournamentId: currentTournament.id,
            gameNumber: currentTournament.currentGame,
            players: game.players,
            date: game.date,
            winner: game.winner
          };

          // Mettre à jour les statistiques des joueurs
          const updatedPlayers = currentTournament.players.map(player => {
            const gamePlayer = game.players.find(p => p.name === player.name);
            if (!gamePlayer) return player;

            const isWinner = game.winner === player.name;
            const newTotalScore = player.totalScore + gamePlayer.score;
            const newGamesPlayed = player.gamesPlayed + 1;
            
            // Mettre à jour les meilleures et pires scores
            let bestScore = player.bestGameScore;
            let worstScore = player.worstGameScore;
            
            if (bestScore === null || gamePlayer.score < bestScore) {
              bestScore = gamePlayer.score;
            }
            
            if (worstScore === null || gamePlayer.score > worstScore) {
              worstScore = gamePlayer.score;
            }

            return {
              ...player,
              totalScore: newTotalScore,
              gamesPlayed: newGamesPlayed,
              wins: isWinner ? player.wins + 1 : player.wins,
              dutchCount: gamePlayer.isDutch ? player.dutchCount + 1 : player.dutchCount,
              avgScorePerGame: newTotalScore / newGamesPlayed,
              bestGameScore: bestScore,
              worstGameScore: worstScore
            };
          });

          // Vérifier si le tournoi est terminé
          const isLastGame = currentTournament.currentGame >= currentTournament.totalGames;
          
          // Déterminer le gagnant du tournoi
          let winner;
          if (isLastGame) {
            const sortedPlayers = [...updatedPlayers].sort((a, b) => a.totalScore - b.totalScore);
            winner = sortedPlayers[0].name;
          }

          return {
            currentTournament: {
              ...currentTournament,
              players: updatedPlayers,
              currentGame: currentTournament.currentGame + 1,
              isActive: !isLastGame,
              winner
            }
          };
        });
      },

      endCurrentTournament: () => {
        const { currentTournament } = get();
        if (!currentTournament) return;

        // Trier les joueurs par score (le plus bas gagne)
        const sortedPlayers = [...currentTournament.players].sort((a, b) => a.totalScore - b.totalScore);
        const winner = sortedPlayers[0].name;

        set(state => ({
          tournamentHistory: [
            ...state.tournamentHistory, 
            { 
              ...currentTournament, 
              isActive: false,
              winner
            }
          ],
          currentTournament: null
        }));
      },

      resetTournament: () => {
        set({ currentTournament: null });
      },

      getCurrentGame: () => {
        const { currentTournament } = get();
        return currentTournament ? currentTournament.currentGame : 0;
      },

      getRemainingGames: () => {
        const { currentTournament } = get();
        if (!currentTournament) return 0;
        return Math.max(0, currentTournament.totalGames - (currentTournament.currentGame - 1));
      },

      getTournamentStandings: () => {
        const { currentTournament } = get();
        if (!currentTournament) return [];
        
        return [...currentTournament.players].sort((a, b) => a.totalScore - b.totalScore);
      }
    }),
    {
      name: 'dutch-tournament-storage'
    }
  )
);

export default useTournamentStore;
