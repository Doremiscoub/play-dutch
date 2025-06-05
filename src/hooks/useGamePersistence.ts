
import { useCallback } from 'react';
import { Player, Game } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { calculateGameDuration } from '@/utils/gameUtils';
import { db, isIndexedDBAvailable, OngoingGame } from '@/lib/database';
import { useAuth } from '@/context/AuthContext';

export const useGamePersistence = () => {
  const { user, isSignedIn } = useAuth();

  const loadGameState = useCallback(async () => {
    console.log('useGamePersistence: loadGameState called');
    
    try {
      const hasIndexedDB = await isIndexedDBAvailable();
      console.log('useGamePersistence: IndexedDB available:', hasIndexedDB);
      
      if (hasIndexedDB) {
        let query = db.ongoingGames.orderBy('lastUpdated');
        
        // Si l'utilisateur est connecté, filtrer par user_id
        if (isSignedIn && user?.id) {
          query = query.filter(game => game.userId === user.id);
        }
        
        const currentGame = await query.last();
        console.log('useGamePersistence: Loaded game from IndexedDB:', !!currentGame);
        
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
        console.log('useGamePersistence: Using localStorage fallback');
        const savedGame = localStorage.getItem('current_dutch_game');
        if (savedGame) {
          const parsed = JSON.parse(savedGame);
          console.log('useGamePersistence: Loaded game from localStorage:', !!parsed);
          return parsed;
        }
      }
      
      console.log('useGamePersistence: No saved game found');
      return null;
    } catch (error) {
      console.error('useGamePersistence: Erreur lors du chargement de la partie :', error);
      toast.error('Erreur lors du chargement de la partie');
      return null;
    }
  }, [isSignedIn, user?.id]);

  const saveGameState = useCallback(async (gameState: {
    players: Player[];
    roundHistory: { scores: number[], dutchPlayerId?: string }[];
    isGameOver: boolean;
    scoreLimit: number;
    gameStartTime: Date | null;
  }) => {
    console.log('useGamePersistence: saveGameState called with', {
      playersCount: gameState.players?.length,
      roundsCount: gameState.roundHistory?.length,
      isGameOver: gameState.isGameOver
    });
    
    try {
      // Validation des données avant sauvegarde
      if (!gameState.players || gameState.players.length === 0) {
        console.warn('useGamePersistence: No players to save');
        return false;
      }

      const hasIndexedDB = await isIndexedDBAvailable();
      
      const gameData: OngoingGame = {
        id: 'current_game',
        userId: isSignedIn && user?.id ? user.id : undefined,
        ...gameState,
        gameStartTime: gameState.gameStartTime?.toISOString() ?? null,
        lastUpdated: new Date().toISOString()
      };

      if (hasIndexedDB) {
        console.log('useGamePersistence: Saving to IndexedDB');
        // Sauvegarde dans IndexedDB avec transaction et retry
        try {
          await db.transaction('rw', db.ongoingGames, async () => {
            // Efface l'ancienne partie si elle existe
            if (isSignedIn && user?.id) {
              await db.ongoingGames.where({
                id: 'current_game',
                userId: user.id
              }).delete();
            } else {
              await db.ongoingGames.where('id').equals('current_game').delete();
            }
            // Sauvegarde la nouvelle
            await db.ongoingGames.add(gameData);
          });
          console.log('useGamePersistence: IndexedDB save successful');
        } catch (dbError) {
          console.error('useGamePersistence: IndexedDB save failed, falling back to localStorage:', dbError);
          // Fallback vers localStorage en cas d'erreur IndexedDB
          localStorage.setItem('current_dutch_game', JSON.stringify(gameData));
        }
      } else {
        console.log('useGamePersistence: Saving to localStorage');
        // Fallback vers localStorage
        localStorage.setItem('current_dutch_game', JSON.stringify(gameData));
      }
      
      return true;
    } catch (error) {
      console.error('useGamePersistence: Erreur lors de la sauvegarde de l\'état du jeu :', error);
      
      // Tentative de sauvegarde d'urgence en localStorage
      try {
        const emergencyData = {
          players: gameState.players,
          roundHistory: gameState.roundHistory,
          scoreLimit: gameState.scoreLimit,
          gameStartTime: gameState.gameStartTime?.toISOString(),
          emergency: true,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('dutch_emergency_save', JSON.stringify(emergencyData));
        console.log('useGamePersistence: Emergency save completed');
        toast.error('Sauvegarde d\'urgence effectuée');
      } catch (emergencyError) {
        console.error('useGamePersistence: Emergency save failed:', emergencyError);
      }
      
      return false;
    }
  }, [isSignedIn, user?.id]);

  const saveGameToHistory = useCallback(async (players: Player[], gameStartTime: Date | null) => {
    console.log('useGamePersistence: saveGameToHistory called');
    
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
        console.log('useGamePersistence: Game saved to IndexedDB history');
      } else {
        // Fallback vers localStorage
        const games = JSON.parse(localStorage.getItem('dutch_games') || '[]');
        games.push(game);
        localStorage.setItem('dutch_games', JSON.stringify(games));
        console.log('useGamePersistence: Game saved to localStorage history');
      }

      toast.success('Partie sauvegardée dans l\'historique');
      
      // Nettoyer la partie en cours après sauvegarde
      if (hasIndexedDB) {
        await db.ongoingGames.where('id').equals('current_game').delete();
      } else {
        localStorage.removeItem('current_dutch_game');
      }
      
      return true;
    } catch (error) {
      console.error('useGamePersistence: Erreur lors de la sauvegarde de la partie :', error);
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
      console.error('useGamePersistence: Erreur lors de la suppression de la partie :', error);
      toast.error('Erreur lors de la suppression de la partie');
      return false;
    }
  }, []);

  // Fonction de récupération d'urgence
  const recoverEmergencySave = useCallback(() => {
    try {
      const emergencyData = localStorage.getItem('dutch_emergency_save');
      if (emergencyData) {
        const parsed = JSON.parse(emergencyData);
        console.log('useGamePersistence: Emergency save recovered');
        localStorage.removeItem('dutch_emergency_save');
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('useGamePersistence: Error recovering emergency save:', error);
      return null;
    }
  }, []);

  return {
    loadGameState,
    saveGameState,
    saveGameToHistory,
    deleteGameFromHistory,
    recoverEmergencySave
  };
};
