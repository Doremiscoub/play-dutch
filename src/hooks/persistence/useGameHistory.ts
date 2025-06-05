
import { useCallback } from 'react';
import { Player, Game } from '@/types';
import { db } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';
import { calculateGameDuration } from '@/utils/gameUtils';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { getStorageProvider, cleanupCurrentGame } from '@/utils/persistence/storageHelpers';
import { toast } from 'sonner';

export const useGameHistory = () => {
  const saveGameToHistory = useCallback(async (players: Player[], gameStartTime: Date | null) => {
    console.log('useGameHistory: saveGameToHistory called');
    
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

      const { hasIndexedDB } = await getStorageProvider();
      
      if (hasIndexedDB) {
        await db.gameHistory.add(game);
        console.log('useGameHistory: Game saved to IndexedDB history');
      } else {
        // Fallback vers localStorage
        const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAME_HISTORY) || '[]');
        games.push(game);
        localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(games));
        console.log('useGameHistory: Game saved to localStorage history');
      }

      toast.success('Partie sauvegardée dans l\'historique');
      
      // Nettoyer la partie en cours après sauvegarde
      await cleanupCurrentGame();
      
      return true;
    } catch (error) {
      console.error('useGameHistory: Erreur lors de la sauvegarde de la partie :', error);
      toast.error('Erreur lors de la sauvegarde de la partie');
      return false;
    }
  }, []);

  const deleteGameFromHistory = useCallback(async (gameId: string) => {
    try {
      const { hasIndexedDB } = await getStorageProvider();
      
      if (hasIndexedDB) {
        await db.gameHistory.delete(gameId);
      } else {
        // Fallback vers localStorage
        const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAME_HISTORY) || '[]');
        const filteredGames = games.filter((game: Game) => game.id !== gameId);
        localStorage.setItem(STORAGE_KEYS.GAME_HISTORY, JSON.stringify(filteredGames));
      }

      toast.success('Partie supprimée de l\'historique');
      return true;
    } catch (error) {
      console.error('useGameHistory: Erreur lors de la suppression de la partie :', error);
      toast.error('Erreur lors de la suppression de la partie');
      return false;
    }
  }, []);

  return {
    saveGameToHistory,
    deleteGameFromHistory
  };
};
