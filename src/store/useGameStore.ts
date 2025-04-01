import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Player, Game, PlayerStatistics } from '@/types';

interface GameState {
  // État du jeu actuel
  gameState: 'setup' | 'playing' | 'finished';
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer: boolean;
  currentGameId: string | null;
  
  // Historique des parties
  games: Game[];
  
  // États UI et modals
  showGameEndConfirmation: boolean;
  showNewRoundModal: boolean;
  
  // Actions pour manipuler l'état
  startGame: (playerNames: string[]) => void;
  addRound: (scores: number[], dutchPlayerId?: string) => void;
  undoLastRound: () => void;
  endGame: () => void;
  confirmEndGame: () => void;
  cancelEndGame: () => void;
  resetGame: () => void;
  
  // Actions pour les modals
  openNewRoundModal: () => void;
  closeNewRoundModal: () => void;
  
  // Calculateurs de statistiques
  calculatePlayerStats: (player: Player) => PlayerStatistics;
  updatePlayerStats: () => void;
}

/**
 * Store central pour la gestion des parties de Dutch
 * Gère l'état du jeu, les joueurs, les statistiques et l'historique
 */
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // État initial
      gameState: 'setup',
      players: [],
      roundHistory: [],
      isMultiplayer: false,
      currentGameId: null,
      games: [],
      showGameEndConfirmation: false,
      showNewRoundModal: false,
      
      /**
       * Démarre une nouvelle partie avec les noms de joueurs fournis
       * @param playerNames Tableau des noms des joueurs
       */
      startGame: (playerNames: string[]) => {
        const newPlayers = playerNames.map(name => ({
          id: uuidv4(),
          name,
          totalScore: 0,
          rounds: [],
          stats: {
            bestRound: null,
            dutchCount: 0,
            averageScore: 0,
            worstRound: null,
            improvementRate: 0,
            consistencyScore: 0,
            winStreak: 0
          }
        }));
        
        set({
          players: newPlayers,
          gameState: 'playing',
          roundHistory: [],
          isMultiplayer: false,
          currentGameId: null,
          showGameEndConfirmation: false,
          showNewRoundModal: false,
        });
        
        // Effacer toute partie sauvegardée précédemment
        localStorage.removeItem('current_dutch_game');
      },
      
      /**
       * Calcule les statistiques d'un joueur basé sur ses tours de jeu
       * @param player Le joueur dont on calcule les statistiques
       * @returns Les statistiques calculées
       */
      calculatePlayerStats: (player: Player): PlayerStatistics => {
        const rounds = player.rounds;
        const { players } = get();
        
        if (rounds.length === 0) {
          return {
            bestRound: null,
            dutchCount: 0,
            averageScore: 0,
            worstRound: null,
            improvementRate: 0,
            consistencyScore: 0,
            winStreak: 0
          };
        }
  
        const scores = rounds.map(r => r.score);
        const dutchCount = rounds.filter(r => r.isDutch).length;
        const nonZeroScores = scores.filter(s => s > 0);
        
        let improvementRate = 0;
        if (rounds.length >= 6) {
          const firstThree = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
          const lastThree = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
          improvementRate = lastThree - firstThree;
        }
  
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        const variance = scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
        const consistencyScore = Math.sqrt(variance);
  
        let winStreak = 0;
        let currentWinStreak = 0;
        for (let i = 0; i < rounds.length; i++) {
          if (players.every(p => p.id === player.id || (p.rounds[i] && rounds[i].score <= p.rounds[i].score))) {
            currentWinStreak++;
            winStreak = Math.max(winStreak, currentWinStreak);
          } else {
            currentWinStreak = 0;
          }
        }
  
        return {
          bestRound: nonZeroScores.length > 0 ? Math.min(...nonZeroScores) : null,
          dutchCount,
          averageScore: Math.round(avg * 10) / 10,
          worstRound: scores.length > 0 ? Math.max(...scores) : null,
          improvementRate: Math.round(improvementRate * 10) / 10,
          consistencyScore: Math.round(consistencyScore * 10) / 10,
          winStreak
        };
      },
      
      /**
       * Met à jour les statistiques de tous les joueurs
       * FIX: Modified to avoid unnecessary updates when stats are already current
       */
      updatePlayerStats: () => {
        const { players, calculatePlayerStats } = get();
        
        if (players.length > 0 && players[0].rounds.length > 0) {
          // Compute new stats for all players
          const updatedPlayers = players.map(player => {
            const newStats = calculatePlayerStats(player);
            
            // Check if we need to update the stats at all
            if (!player.stats || 
                player.stats.averageScore !== newStats.averageScore ||
                player.stats.dutchCount !== newStats.dutchCount ||
                player.stats.bestRound !== newStats.bestRound ||
                player.stats.worstRound !== newStats.worstRound ||
                player.stats.winStreak !== newStats.winStreak) {
              return { ...player, stats: newStats };
            }
            
            // Return original player if stats haven't changed
            return player;
          });
          
          // Only update state if something has actually changed
          const statsChanged = updatedPlayers.some((player, index) => 
            JSON.stringify(player.stats) !== JSON.stringify(players[index].stats)
          );
          
          if (statsChanged) {
            set({ players: updatedPlayers });
          }
        }
      },
      
      /**
       * Ajoute un nouveau tour à la partie
       * @param scores Tableau des scores pour chaque joueur
       * @param dutchPlayerId ID du joueur qui a dit "Dutch" (optionnel)
       */
      addRound: (scores: number[], dutchPlayerId?: string) => {
        const { players, roundHistory, updatePlayerStats } = get();
        
        if (!players || players.length === 0 || scores.length !== players.length) {
          console.error("Erreur: impossible d'ajouter la manche.");
          return;
        }
        
        const newRoundHistory = [...roundHistory, { scores, dutchPlayerId }];
        
        const updatedPlayers = players.map((player, index) => {
          const isDutch = player.id === dutchPlayerId;
          const newRound = { 
            score: scores[index],
            isDutch 
          };
          const newTotalScore = player.totalScore + scores[index];
          
          return {
            ...player,
            rounds: [...player.rounds, newRound],
            totalScore: newTotalScore
          };
        });
        
        set({
          players: updatedPlayers,
          roundHistory: newRoundHistory,
          showNewRoundModal: false
        });
        
        // Jouer le son
        if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
          try {
            new Audio('/sounds/card-sound.mp3').play().catch(err => console.error("Sound error:", err));
          } catch (err) {
            console.error("Sound error:", err);
          }
        }
        
        // Mettre à jour les stats après avoir ajouté le tour - mais pas dans un setState
        updatePlayerStats();
        
        // Vérifier si la partie est terminée
        const playersTotalWithNewScores = updatedPlayers.map(player => ({
          ...player,
          newTotal: player.totalScore
        }));
        
        const gameOver = playersTotalWithNewScores.some(p => p.newTotal >= 100);
        
        if (gameOver) {
          set({ showGameEndConfirmation: true });
        }
      },
      
      /**
       * Annule le dernier tour joué
       */
      undoLastRound: () => {
        const { players, roundHistory, updatePlayerStats } = get();
        
        if (players.length === 0 || players[0].rounds.length === 0) {
          console.error('Pas de manche à annuler !');
          return;
        }
        
        const updatedPlayers = players.map(player => {
          if (player.rounds.length === 0) return player;
          
          const lastRound = player.rounds[player.rounds.length - 1];
          const newTotalScore = player.totalScore - lastRound.score;
          
          return {
            ...player,
            rounds: player.rounds.slice(0, -1),
            totalScore: newTotalScore
          };
        });
        
        set({
          players: updatedPlayers,
          roundHistory: roundHistory.slice(0, -1)
        });
        
        // Jouer le son
        if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
          try {
            new Audio('/sounds/undo-sound.mp3').play().catch(err => console.error("Sound error:", err));
          } catch (err) {
            console.error("Sound error:", err);
          }
        }
        
        // Mettre à jour les stats après avoir annulé le tour - mais pas dans un setState
        updatePlayerStats();
      },
      
      /**
       * Demande confirmation pour terminer la partie
       */
      endGame: () => {
        const { players } = get();
        
        if (players.length > 0 && players[0].rounds.length > 0) {
          set({ showGameEndConfirmation: true });
        } else {
          get().resetGame();
        }
      },
      
      /**
       * Confirme la fin de la partie et l'ajoute à l'historique
       */
      confirmEndGame: () => {
        const { players, games } = get();
        
        const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
        const winner = sortedPlayers[0].name;
        
        const newGame: Game = {
          id: uuidv4(),
          date: new Date(),
          rounds: players[0].rounds.length,
          players: sortedPlayers.map(player => ({
            name: player.name,
            score: player.totalScore,
            isDutch: player.rounds.some(r => r.isDutch)
          })),
          winner
        };
        
        set({
          games: [...games, newGame],
          showGameEndConfirmation: false
        });
        
        // Jouer le son de victoire
        if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
          try {
            new Audio('/sounds/win-sound.mp3').play().catch(err => console.error("Sound error:", err));
          } catch (err) {
            console.error("Sound error:", err);
          }
        }
        
        // Réinitialiser la partie après un délai
        setTimeout(() => get().resetGame(), 1500);
      },
      
      /**
       * Annule la confirmation de fin de partie
       */
      cancelEndGame: () => {
        set({ showGameEndConfirmation: false });
      },
      
      /**
       * Réinitialise la partie à l'état initial
       */
      resetGame: () => {
        set({
          gameState: 'setup',
          players: [],
          roundHistory: [],
          isMultiplayer: false,
          currentGameId: null,
          showGameEndConfirmation: false,
          showNewRoundModal: false
        });
      },
      
      /**
       * Ouvre la modal pour ajouter un nouveau tour
       */
      openNewRoundModal: () => {
        set({ showNewRoundModal: true });
      },
      
      /**
       * Ferme la modal pour ajouter un nouveau tour
       */
      closeNewRoundModal: () => {
        set({ showNewRoundModal: false });
      },
    }),
    {
      name: 'dutch-game-storage',
      partialize: (state) => ({
        games: state.games,
      }),
    }
  )
);

// Hook spécifique pour les données de jeu persistantes
export const useSavedGameData = () => {
  // Récupérer les données sauvegardées
  const getSavedGameData = () => {
    const savedGame = localStorage.getItem('current_dutch_game');
    if (savedGame) {
      try {
        return JSON.parse(savedGame);
      } catch (e) {
        console.error("Erreur lors de la lecture des données sauvegardées:", e);
        return null;
      }
    }
    return null;
  };
  
  // Sauvegarder les données du jeu
  const saveGameData = (
    players: Player[], 
    roundHistory: { scores: number[], dutchPlayerId?: string }[]
  ) => {
    if (players.length > 0) {
      const currentGame = {
        players,
        roundHistory,
        lastUpdated: new Date()
      };
      localStorage.setItem('current_dutch_game', JSON.stringify(currentGame));
    }
  };
  
  // Supprimer les données sauvegardées
  const clearSavedGameData = () => {
    localStorage.removeItem('current_dutch_game');
  };
  
  return { getSavedGameData, saveGameData, clearSavedGameData };
};

export default useGameStore;
