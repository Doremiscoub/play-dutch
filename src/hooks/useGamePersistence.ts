
import { useCallback } from 'react';
import { Player, Game } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { calculateGameDuration } from '@/utils/gameUtils';
import { db, isIndexedDBAvailable, OngoingGame } from '@/lib/database';

export const useGamePersistence = () => {
  const loadGameState = useCallback(async () => {
    try {
      const hasIndexedDB = await isIndexedDBAvailable();
      
      if (hasIndexedDB) {
        // Charge depuis IndexedDB
        const currentGame = await db.ongoingGames
          .orderBy('lastUpdated')
          .last();
        
        if (currentGame) {
          return {
            players: currentGame.players,
            roundHistory: currentGame.roundHistory,
            isGameOver: currentGame.isGameOver,
            scoreLimit: currentGame.scoreLimit,
            gameStartTime: currentGame.gameStartTime ? new Date(currentGame.gameStartTime) : null
          };
        }
      } else {
        // Fallback vers localStorage
        const savedGame = localStorage.getItem('current_dutch_game');
        if (savedGame) {
          return JSON.parse(savedGame);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors du chargement de la partie :', error);
      toast.error('Erreur lors du chargement de la partie');
      return null;
    }
  }, []);

  const saveGameState = useCallback(async (gameState: {
    players: Player[];
    roundHistory: { scores: number[], dutchPlayerId?: string }[];
    isGameOver: boolean;
    scoreLimit: number;
    gameStartTime: Date | null;
  }) => {
    try {
      const hasIndexedDB = await isIndexedDBAvailable();
      
      const gameData: OngoingGame = {
        id: 'current_game',
        ...gameState,
        gameStartTime: gameState.gameStartTime?.toISOString() ?? null,
        lastUpdated: new Date().toISOString()
      };

      if (hasIndexedDB) {
        // Sauvegarde dans IndexedDB avec transaction
        await db.transaction('rw', db.ongoingGames, async () => {
          // Efface l'ancienne partie si elle existe
          await db.ongoingGames.where('id').equals('current_game').delete();
          // Sauvegarde la nouvelle
          await db.ongoingGames.add(gameData);
        });
      } else {
        // Fallback vers localStorage
        localStorage.setItem('current_dutch_game', JSON.stringify(gameData));
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état du jeu :', error);
      return false;
    }
  }, []);

  const saveGameToHistory = useCallback(async (players: Player[], gameStartTime: Date | null) => {
    try {
      if (!players || players.length === 0) {
        throw new Error("Impossible de sauvegarder une partie sans joueurs");
      }

      const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
      const winner = sortedPlayers[0].name;
      const gameDuration = gameStartTime ? calculateGameDuration(gameStartTime) : '';

      const game: Game = {
        id: uuidv4(),
        date: new Date(),
        rounds: players[0]?.rounds.length || 0,
        players: players.map(p => ({
          name: p.name,
          score: p.totalScore,
          isDutch: p.rounds.some(r => r.isDutch)
        })),
        winner,
        duration: gameDuration
      };

      const hasIndexedDB = await isIndexedDBAvailable();
      
      if (hasIndexedDB) {
        await db.gameHistory.add(game);
      } else {
        // Fallback vers localStorage
        const games = JSON.parse(localStorage.getItem('dutch_games') || '[]');
        games.push(game);
        localStorage.setItem('dutch_games', JSON.stringify(games));
      }

      toast.success('Partie sauvegardée dans l\'historique');
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la partie :', error);
      toast.error('Erreur lors de la sauvegarde de la partie');
      return false;
    }
  }, []);

  const deleteGameFromHistory = useCallback(async (gameId: string) => {
    try {
      const hasIndexedDB = await isIndexedDBAvailable();
      
      if (hasIndexedDB) {
        await db.gameHistory.delete(gameId);
      } else {
        // Fallback vers localStorage
        const games = JSON.parse(localStorage.getItem('dutch_games') || '[]');
        const filteredGames = games.filter((game: Game) => game.id !== gameId);
        localStorage.setItem('dutch_games', JSON.stringify(filteredGames));
      }

      toast.success('Partie supprimée de l\'historique');
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la partie :', error);
      toast.error('Erreur lors de la suppression de la partie');
      return false;
    }
  }, []);

  return {
    loadGameState,
    saveGameState,
    saveGameToHistory,
    deleteGameFromHistory
  };
};

