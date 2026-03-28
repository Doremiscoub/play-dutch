/**
 * Hook sécurisé pour la gestion des rounds
 * Remplace useRoundManagement avec le moteur de scores sécurisé
 */
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { isGameOver } from '@/utils/gameUtils';
import {
  addRoundToPlayers,
  removeLastRoundFromPlayers,
  validateRoundData
} from '@/utils/scoreEngine';
import { logger } from '@/utils/logger';
// Removed validateFormData import - using scoreEngine validation instead

/**
 * Hook sécurisé pour gérer les rounds du jeu
 */
export const useSecureRoundManagement = (scoreLimit: number, soundEnabled: boolean) => {
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>([]);
  
  /**
   * Ajoute un nouveau round de façon sécurisée
   */
  const addRound = useCallback((
    players: Player[], 
    scores: number[], 
    dutchPlayerId?: string
  ): {
    updatedPlayers: Player[];
    isGameOver: boolean;
  } | null => {
    logger.debug('🔒 Secure addRound called:', { 
      playersCount: players?.length, 
      scores, 
      dutchPlayerId 
    });

    try {
      // Validation préliminaire avec le moteur de scores
      const result = addRoundToPlayers(players, scores, dutchPlayerId);
      
      if (!result.success) {
        toast.error(result.error || 'Erreur lors de l\'ajout de la manche');
        return null;
      }

      // Validation croisée des données de round
      const playerIds = players.map(p => p.id);
      if (!validateRoundData(scores, dutchPlayerId || '', playerIds)) {
        toast.error('Données de round invalides');
        return null;
      }

      // Mise à jour des statistiques avec le moteur existant
      const playersWithStats = updateAllPlayersStats(result.updatedPlayers);
      
      // Vérification game over
      const gameIsOver = isGameOver(playersWithStats, scoreLimit);
      
      // Mise à jour de l'historique APRÈS validation complète
      setRoundHistory(prev => [...prev, { scores, dutchPlayerId }]);
      
      // Son si activé
      if (soundEnabled) {
        try {
          new Audio('/sounds/card-sound.mp3').play().catch(err => 
            console.warn('🔇 Sound playback failed:', err)
          );
        } catch (err) {
          console.warn('🔇 Sound error:', err);
        }
      }
      
      logger.debug('✅ Secure round added successfully');
      toast.success('Manche ajoutée !');
      
      return {
        updatedPlayers: playersWithStats,
        isGameOver: gameIsOver
      };
      
    } catch (error) {
      console.error('❌ Secure addRound error:', error);
      toast.error('Une erreur est survenue lors de l\'ajout de la manche');
      return null;
    }
  }, [scoreLimit, soundEnabled]);

  /**
   * Annule le dernier round de façon sécurisée
   */
  const undoLastRound = useCallback((players: Player[], soundEnabled: boolean): Player[] => {
    logger.debug('🔒 Secure undoLastRound called:', { 
      playersCount: players?.length,
      roundHistoryLength: roundHistory.length 
    });

    try {
      // Validation préliminaire
      if (roundHistory.length === 0) {
        toast.warning('Pas de manche à annuler !');
        return players;
      }

      // Utilisation du moteur de scores sécurisé
      const result = removeLastRoundFromPlayers(players);
      
      if (!result.success) {
        toast.error(result.error || 'Erreur lors de l\'annulation');
        return players;
      }

      // Mise à jour de l'historique
      setRoundHistory(prev => prev.slice(0, -1));
      
      // Mise à jour des statistiques
      const playersWithStats = updateAllPlayersStats(result.updatedPlayers);
      
      // Son si activé
      if (soundEnabled) {
        try {
          new Audio('/sounds/undo-sound.mp3').play().catch(err => 
            console.warn('🔇 Undo sound playback failed:', err)
          );
        } catch (err) {
          console.warn('🔇 Undo sound error:', err);
        }
      }
      
      logger.debug('✅ Secure undo completed successfully');
      toast.success('Dernière manche annulée !');
      
      return playersWithStats;
      
    } catch (error) {
      console.error('❌ Secure undoLastRound error:', error);
      toast.error('Une erreur est survenue lors de l\'annulation');
      return players;
    }
  }, [roundHistory]);

  /**
   * Synchronise l'historique avec un état externe (pour compatibilité)
   */
  const syncRoundHistory = useCallback((externalHistory: { scores: number[], dutchPlayerId?: string }[]) => {
    logger.debug('🔄 Syncing round history:', { 
      currentLength: roundHistory.length, 
      newLength: externalHistory.length 
    });
    setRoundHistory(externalHistory);
  }, [roundHistory]);

  /**
   * Validation complète de l'état des rounds
   */
  const validateRoundHistoryIntegrity = useCallback(() => {
    logger.debug('🔍 Validating round history integrity...');
    
    let isValid = true;
    const errors: string[] = [];

    roundHistory.forEach((round, index) => {
      if (!Array.isArray(round.scores)) {
        errors.push(`Round ${index + 1}: scores is not an array`);
        isValid = false;
      }
      
      if (round.scores && round.scores.some(score => typeof score !== 'number' || isNaN(score))) {
        errors.push(`Round ${index + 1}: invalid scores detected`);
        isValid = false;
      }
      
      if (round.dutchPlayerId && typeof round.dutchPlayerId !== 'string') {
        errors.push(`Round ${index + 1}: invalid Dutch player ID`);
        isValid = false;
      }
    });

    if (!isValid) {
      console.warn('⚠️ Round history integrity issues:', errors);
    } else {
      logger.debug('✅ Round history integrity validated');
    }

    return { isValid, errors };
  }, [roundHistory]);

  return {
    roundHistory,
    setRoundHistory,
    addRound,
    undoLastRound,
    syncRoundHistory,
    validateRoundHistoryIntegrity
  };
};