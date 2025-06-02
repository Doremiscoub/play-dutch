
import { Player } from '@/types';
import { updateAllPlayersStats } from './playerStatsCalculator';

/**
 * Safe wrapper for player stats calculation with error handling
 */
export const safeUpdateAllPlayersStats = (players: Player[]): Player[] => {
  try {
    if (!players || !Array.isArray(players) || players.length === 0) {
      console.warn('safeUpdateAllPlayersStats: Invalid players input');
      return [];
    }

    // Validate each player before processing
    const validPlayers = players.filter(player => {
      if (!player || typeof player !== 'object') {
        console.warn('safeUpdateAllPlayersStats: Invalid player object:', player);
        return false;
      }
      
      if (!player.id || typeof player.name !== 'string') {
        console.warn('safeUpdateAllPlayersStats: Player missing required fields:', player);
        return false;
      }
      
      if (!Array.isArray(player.rounds)) {
        console.warn('safeUpdateAllPlayersStats: Player rounds not an array:', player);
        player.rounds = [];
      }
      
      if (typeof player.totalScore !== 'number') {
        console.warn('safeUpdateAllPlayersStats: Player totalScore not a number:', player);
        player.totalScore = 0;
      }
      
      return true;
    });

    if (validPlayers.length === 0) {
      console.error('safeUpdateAllPlayersStats: No valid players after filtering');
      return [];
    }

    const result = updateAllPlayersStats(validPlayers);
    
    if (!result || !Array.isArray(result)) {
      console.error('safeUpdateAllPlayersStats: updateAllPlayersStats returned invalid result');
      return validPlayers; // Return original players if calculation fails
    }
    
    return result;
  } catch (error) {
    console.error('safeUpdateAllPlayersStats: Error calculating stats:', error);
    // Return original players with basic validation
    return players.map(player => ({
      ...player,
      rounds: Array.isArray(player.rounds) ? player.rounds : [],
      totalScore: typeof player.totalScore === 'number' ? player.totalScore : 0
    }));
  }
};
