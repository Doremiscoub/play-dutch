/**
 * Adaptateur de stockage unifié avec migration automatique
 * Gère localStorage et les migrations depuis les anciens systèmes
 */
import { Player, RoundHistoryEntry } from '@/types';
import { logger } from '@/utils/logger';

export const UNIFIED_GAME_KEY = 'dutch_unified_game';
const LEGACY_KEYS = ['dutch_simple_game', 'dutch_secure_game', 'dutch_optimized_game_v2'];

export interface StoredGameData {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: string | null;
  isGameOver: boolean;
  gameId: string | null;
  lastIntegrityCheck: string | null;
}

export class StorageAdapter {
  /**
   * Sauvegarde l'état du jeu dans localStorage
   */
  static save(data: StoredGameData): boolean {
    try {
      localStorage.setItem(UNIFIED_GAME_KEY, JSON.stringify(data));
      logger.debug('💾 Game saved successfully');
      return true;
    } catch (error) {
      logger.error('❌ Save failed:', error);
      return false;
    }
  }

  /**
   * Charge l'état du jeu depuis localStorage avec migration automatique
   */
  static load(): StoredGameData | null {
    try {
      // Tentative de migration depuis les anciens systèmes
      const migrated = this.tryMigration();
      if (migrated) {
        logger.debug('✅ Migrated from legacy system');
        return migrated;
      }

      // Chargement normal
      const saved = localStorage.getItem(UNIFIED_GAME_KEY);
      if (!saved) return null;

      const parsed = JSON.parse(saved);
      
      // Validation basique
      if (!parsed.players || parsed.players.length === 0) {
        logger.debug('📂 Invalid saved game, clearing');
        this.clear();
        return null;
      }

      logger.debug('📂 Game loaded successfully');
      return parsed;
    } catch (error) {
      logger.error('❌ Load failed:', error);
      this.clear();
      return null;
    }
  }

  /**
   * Supprime les données sauvegardées
   */
  static clear(): void {
    localStorage.removeItem(UNIFIED_GAME_KEY);
    logger.debug('🗑️ Storage cleared');
  }

  /**
   * Tente de migrer depuis un ancien système
   */
  private static tryMigration(): StoredGameData | null {
    // Si on a déjà des données dans le nouveau système, pas de migration
    if (localStorage.getItem(UNIFIED_GAME_KEY)) {
      return null;
    }

    // Cherche dans les anciens systèmes
    for (const legacyKey of LEGACY_KEYS) {
      const legacyData = localStorage.getItem(legacyKey);
      if (!legacyData) continue;

      try {
        const parsed = JSON.parse(legacyData);
        if (!parsed.players || parsed.players.length === 0) continue;

        logger.debug(`🔄 Migrating from ${legacyKey}`);

        // Normalisation des données
        const migrated: StoredGameData = {
          players: parsed.players || [],
          roundHistory: parsed.roundHistory || [],
          scoreLimit: parsed.scoreLimit || 100,
          gameStartTime: parsed.gameStartTime || null,
          isGameOver: parsed.isGameOver || false,
          gameId: parsed.gameId || parsed.id || null,
          lastIntegrityCheck: parsed.lastIntegrityCheck || null
        };

        // Sauvegarde dans le nouveau système
        this.save(migrated);

        // Nettoyage de l'ancien système
        localStorage.removeItem(legacyKey);

        return migrated;
      } catch (error) {
        logger.error(`Migration from ${legacyKey} failed:`, error);
        localStorage.removeItem(legacyKey);
      }
    }

    return null;
  }

  /**
   * Nettoie tous les anciens systèmes de stockage
   */
  static cleanupLegacySystems(): void {
    LEGACY_KEYS.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        logger.debug(`🧹 Cleaned up ${key}`);
      }
    });
  }
}
