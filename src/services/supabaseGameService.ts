/**
 * Service de synchronisation des jeux avec Supabase
 * Gère la sauvegarde/chargement des parties dans la base de données
 */
import { supabase } from '@/integrations/supabase/client';
import { Player, RoundHistoryEntry } from '@/types';
import { toast } from 'sonner';

export interface SupabaseGameData {
  id: string;
  name: string;
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null; 
  isGameOver: boolean;
  status: 'active' | 'completed' | 'paused';
  lastUpdated: Date;
}

export class SupabaseGameService {
  
  /**
   * Sauvegarde une partie en cours dans Supabase
   */
  static async saveCurrentGame(gameData: SupabaseGameData): Promise<boolean> {
    try {
      console.log('💾 Saving game to Supabase:', gameData.id);
      
      // 1. Sauvegarder/mettre à jour la partie principale
      const { data: { user } } = await supabase.auth.getUser();
      const { data: gameRecord, error: gameError } = await supabase
        .from('games')
        .upsert({
          id: gameData.id,
          user_id: user?.id,
          name: gameData.name,
          score_limit: gameData.scoreLimit,
          players_count: gameData.players.length,
          status: gameData.status,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (gameError) throw gameError;

      // 2. Supprimer les anciens joueurs de cette partie
      const { error: deleteError } = await supabase
        .from('players')
        .delete()
        .eq('game_id', gameData.id);

      if (deleteError) throw deleteError;

      // 3. Sauvegarder les joueurs
      const playersToInsert = gameData.players.map(player => ({
        id: player.id,
        game_id: gameData.id,
        user_id: user?.id,
        name: player.name,
        emoji: player.emoji,
        avatar_color: player.avatarColor,
        total_score: player.totalScore
      }));

      const { error: playersError } = await supabase
        .from('players')
        .insert(playersToInsert);

      if (playersError) throw playersError;

      console.log('✅ Game saved successfully to Supabase');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to save game to Supabase:', error);
      toast.error('Erreur de synchronisation avec le serveur');
      return false;
    }
  }

  /**
   * Charge une partie depuis Supabase
   */
  static async loadGame(gameId: string): Promise<SupabaseGameData | null> {
    try {
      console.log('📂 Loading game from Supabase:', gameId);

      // 1. Charger la partie principale
      const { data: gameRecord, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single();

      if (gameError) throw gameError;
      if (!gameRecord) return null;

      // 2. Charger les joueurs
      const { data: playersData, error: playersError } = await supabase
        .from('players')
        .select('*')
        .eq('game_id', gameId)
        .order('created_at');

      if (playersError) throw playersError;

      // 3. Reconstruire les données de jeu
      const players: Player[] = (playersData || []).map(p => ({
        id: p.id,
        name: p.name,
        emoji: p.emoji || '🎮',
        avatarColor: p.avatar_color || '#8B5CF6',
        totalScore: p.total_score || 0,
        rounds: [] // Les manches sont recalculées côté client
      }));

      const gameData: SupabaseGameData = {
        id: gameRecord.id,
        name: gameRecord.name,
        players,
        roundHistory: [], // À implémenter si nécessaire
        scoreLimit: gameRecord.score_limit || 100,
        gameStartTime: gameRecord.created_at ? new Date(gameRecord.created_at) : null,
        isGameOver: gameRecord.status === 'completed',
        status: gameRecord.status as 'active' | 'completed' | 'paused',
        lastUpdated: gameRecord.updated_at ? new Date(gameRecord.updated_at) : new Date()
      };

      console.log('✅ Game loaded successfully from Supabase');
      return gameData;
      
    } catch (error) {
      console.error('❌ Failed to load game from Supabase:', error);
      return null;
    }
  }

  /**
   * Liste les parties de l'utilisateur connecté
   */
  static async getUserGames(): Promise<SupabaseGameData[]> {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return [];

      const { data: games, error } = await supabase
        .from('games')
        .select(`
          *,
          players!inner(count)
        `)
        .eq('user_id', user.user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return (games || []).map(game => ({
        id: game.id,
        name: game.name,
        players: [], // Chargés à la demande
        roundHistory: [],
        scoreLimit: game.score_limit || 100,
        gameStartTime: game.created_at ? new Date(game.created_at) : null,
        isGameOver: game.status === 'completed',
        status: (game.status as 'active' | 'completed' | 'paused') || 'active',
        lastUpdated: game.updated_at ? new Date(game.updated_at) : new Date()
      }));
      
    } catch (error) {
      console.error('❌ Failed to load user games:', error);
      return [];
    }
  }

  /**
   * Supprime une partie de Supabase
   */
  static async deleteGame(gameId: string): Promise<boolean> {
    try {
      // Les joueurs seront supprimés en cascade si FK configurées
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId);

      if (error) throw error;

      console.log('✅ Game deleted from Supabase:', gameId);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to delete game:', error);
      return false;
    }
  }

  /**
   * Migre une partie locale vers Supabase
   */
  static async migrateLocalGame(localGameData: any): Promise<string | null> {
    try {
      const gameId = crypto.randomUUID();
      
      const migratedGame: SupabaseGameData = {
        id: gameId,
        name: `Partie migrée - ${new Date().toLocaleDateString()}`,
        players: localGameData.players || [],
        roundHistory: localGameData.roundHistory || [],
        scoreLimit: localGameData.scoreLimit || 100,
        gameStartTime: localGameData.gameStartTime ? new Date(localGameData.gameStartTime) : null,
        isGameOver: localGameData.isGameOver || false,
        status: localGameData.isGameOver ? 'completed' : 'active',
        lastUpdated: new Date()
      };

      const success = await this.saveCurrentGame(migratedGame);
      
      if (success) {
        console.log('✅ Local game migrated to Supabase:', gameId);
        toast.success('Partie migrée vers le cloud!');
        return gameId;
      }
      
      return null;
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      toast.error('Échec de la migration');
      return null;
    }
  }
}