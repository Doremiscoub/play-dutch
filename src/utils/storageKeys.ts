
import { logger } from '@/utils/logger';

/**
 * Constantes pour les clés localStorage
 * Centralise toutes les clés utilisées dans l'application
 */
export const STORAGE_KEYS = {
  // Système unifié (nouveau)
  UNIFIED_GAME: 'dutch_unified_game',
  
  // Anciens systèmes unifiés (migration automatique)
  LEGACY_UNIFIED_KEYS: [
    'dutch_simple_game',
    'dutch_secure_game',
    'dutch_optimized_game_v2'
  ],
  
  // Jeu en cours (legacy)
  CURRENT_GAME: 'current_dutch_game',
  GAME_ACTIVE: 'dutch_game_active',
  
  // Configuration temporaire (à supprimer après usage)
  PLAYER_SETUP: 'dutch_player_setup',
  
  // Historique et sauvegarde d'urgence
  GAME_HISTORY: 'dutch_games',
  EMERGENCY_SAVE: 'dutch_emergency_save',
  
  // Paramètres utilisateur
  SOUND_ENABLED: 'dutch_sound_enabled',
  ADS_ENABLED: 'dutch_ads_enabled',
  
  // Données temporaires (obsolètes - à nettoyer)
  LEGACY_KEYS: [
    'dutch_new_game_requested',
    'dutch_round_history',
    'dutch_players',
    'dutch_score_limit',
    'dutch_game_start_time'
  ]
} as const;

/**
 * Nettoie les anciennes clés localStorage obsolètes
 */
export const cleanupLegacyStorage = () => {
  STORAGE_KEYS.LEGACY_KEYS.forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Nettoyer également toutes les clés qui commencent par des préfixes obsolètes
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(key => {
    if (key.startsWith('dutch_game_') && key !== STORAGE_KEYS.CURRENT_GAME && key !== STORAGE_KEYS.GAME_ACTIVE) {
      localStorage.removeItem(key);
    }
  });
  
  logger.debug('🧹 Legacy storage keys cleaned up');
};
