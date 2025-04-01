
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Tournament, Game, TournamentPlayer } from '@/types';

interface TournamentState {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  createTournament: (name: string, playerNames: string[]) => void;
  getCurrentTournament: () => Tournament | null;
  updateTournamentWithGameResult: (gameResult: Game) => void;
  completeTournament: () => void;
  getTournamentById: (id: string) => Tournament | null;
}

/**
 * Store pour gérer les tournois
 * Permet de créer, mettre à jour et consulter les tournois
 */
export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      tournaments: [],
      currentTournament: null,
      
      /**
       * Crée un nouveau tournoi avec le nom et les joueurs fournis
       * @param name Nom du tournoi
       * @param playerNames Noms des joueurs participant au tournoi
       */
      createTournament: (name: string, playerNames: string[]) => {
        const tournamentPlayers: TournamentPlayer[] = playerNames.map(playerName => ({
          id: uuidv4(),
          name: playerName,
          score: 0,
          wins: 0,
          dutchCount: 0,
          totalScore: 0,
          gamesPlayed: 0,
          avgScorePerGame: 0,
          bestGameScore: 0,
          worstGameScore: 0
        }));
        
        const newTournament: Tournament = {
          id: uuidv4(),
          name,
          date: new Date(),
          players: tournamentPlayers,
          games: [],
          completed: false,
          currentGameIndex: 0
        };
        
        set(state => ({
          tournaments: [...state.tournaments, newTournament],
          currentTournament: newTournament
        }));
        
        return newTournament;
      },
      
      /**
       * Récupère le tournoi en cours, s'il existe
       * @returns Le tournoi en cours ou null
       */
      getCurrentTournament: () => {
        return get().currentTournament;
      },
      
      /**
       * Met à jour le tournoi en cours avec le résultat d'une partie
       * @param gameResult Résultat de la partie à ajouter au tournoi
       */
      updateTournamentWithGameResult: (gameResult: Game) => {
        const currentTournament = get().currentTournament;
        
        if (!currentTournament) {
          console.error("Pas de tournoi en cours");
          return;
        }
        
        // Ajouter la partie au tournoi
        const updatedGames = [...currentTournament.games, gameResult];
        
        // Mettre à jour les statistiques des joueurs du tournoi
        const updatedPlayers = currentTournament.players.map(player => {
          // Trouver le joueur correspondant dans le résultat de la partie
          const playerInGame = gameResult.players.find(p => p.name === player.name);
          
          if (!playerInGame) return player;
          
          const isWinner = gameResult.winner === player.name;
          const newGamesPlayed = player.gamesPlayed + 1;
          const newTotalScore = player.totalScore + playerInGame.score;
          const newAvgScorePerGame = newGamesPlayed > 0 ? Math.round((newTotalScore / newGamesPlayed) * 10) / 10 : 0;
          
          // Mettre à jour les meilleurs/pires scores
          let newBestGameScore = player.bestGameScore;
          let newWorstGameScore = player.worstGameScore;
          
          if (newGamesPlayed === 1) {
            newBestGameScore = playerInGame.score;
            newWorstGameScore = playerInGame.score;
          } else {
            newBestGameScore = Math.min(player.bestGameScore, playerInGame.score);
            newWorstGameScore = Math.max(player.worstGameScore, playerInGame.score);
          }
          
          return {
            ...player,
            score: player.score + (isWinner ? 3 : 0), // 3 points pour une victoire
            wins: player.wins + (isWinner ? 1 : 0),
            dutchCount: player.dutchCount + (playerInGame.isDutch ? 1 : 0),
            totalScore: newTotalScore,
            gamesPlayed: newGamesPlayed,
            avgScorePerGame: newAvgScorePerGame,
            bestGameScore: newBestGameScore,
            worstGameScore: newWorstGameScore
          };
        });
        
        // Mettre à jour le tournoi
        const updatedTournament: Tournament = {
          ...currentTournament,
          games: updatedGames,
          players: updatedPlayers,
          currentGameIndex: currentTournament.currentGameIndex + 1
        };
        
        set(state => ({
          tournaments: state.tournaments.map(t => 
            t.id === updatedTournament.id ? updatedTournament : t
          ),
          currentTournament: updatedTournament
        }));
      },
      
      /**
       * Marque le tournoi en cours comme terminé et détermine le vainqueur
       */
      completeTournament: () => {
        const currentTournament = get().currentTournament;
        
        if (!currentTournament) {
          console.error("Pas de tournoi en cours");
          return;
        }
        
        // Déterminer le vainqueur (joueur avec le plus de points)
        const winner = [...currentTournament.players]
          .sort((a, b) => b.score - a.score)[0]?.name;
        
        // Marquer le tournoi comme terminé
        const completedTournament: Tournament = {
          ...currentTournament,
          completed: true,
          winner
        };
        
        set(state => ({
          tournaments: state.tournaments.map(t => 
            t.id === completedTournament.id ? completedTournament : t
          ),
          currentTournament: null
        }));
      },
      
      /**
       * Récupère un tournoi par son ID
       * @param id ID du tournoi à récupérer
       * @returns Le tournoi correspondant ou null s'il n'existe pas
       */
      getTournamentById: (id: string) => {
        const tournament = get().tournaments.find(t => t.id === id);
        return tournament || null;
      }
    }),
    {
      name: 'dutch-tournament-storage',
      partialize: (state) => ({
        tournaments: state.tournaments,
        currentTournament: state.currentTournament,
      }),
    }
  )
);

export default useTournamentStore;
