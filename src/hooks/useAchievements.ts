import { useState, useEffect, useCallback } from 'react';
import { Achievement, PlayerAchievements, ACHIEVEMENT_DEFINITIONS } from '@/types/achievements';
import { Player } from '@/types';
import { toast } from 'sonner';

export const useAchievements = () => {
  const [playerAchievements, setPlayerAchievements] = useState<Map<string, PlayerAchievements>>(new Map());

  // Load achievements from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem('dutch_achievements');
    if (savedAchievements) {
      try {
        const parsed = JSON.parse(savedAchievements) as Record<string, PlayerAchievements>;
        const achievementsMap = new Map<string, PlayerAchievements>(Object.entries(parsed));
        setPlayerAchievements(achievementsMap);
      } catch (error) {
        console.error('Error loading achievements:', error);
      }
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = useCallback((achievements: Map<string, PlayerAchievements>) => {
    const achievementsObj = Object.fromEntries(achievements);
    localStorage.setItem('dutch_achievements', JSON.stringify(achievementsObj));
  }, []);

  // Initialize achievements for a new player
  const initializePlayerAchievements = useCallback((playerId: string): PlayerAchievements => {
    const achievements: Achievement[] = ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlocked: false,
      progress: 0
    }));

    return {
      playerId,
      achievements,
      totalXP: 0,
      level: 1,
    };
  }, []);

  // Calculate player statistics for achievement checking
  const calculatePlayerStats = useCallback((player: Player, allGames: any[] = []) => {
    const dutchCount = player.rounds.filter(r => r.isDutch).length;
    const totalScore = player.totalScore;
    const averageScore = player.rounds.length > 0 
      ? player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length 
      : 0;
    const gamesPlayed = allGames.length;
    
    // Calculate comebacks (simplified - if player won from a losing position)
    const comebacks = allGames.filter(game => {
      const playerInGame = game.players.find((p: any) => p.name === player.name);
      return playerInGame && game.winner === player.name && playerInGame.wasLosing;
    }).length;

    return {
      dutchCount,
      totalScore,
      averageScore,
      gamesPlayed,
      comebacks
    };
  }, []);

  // Check and unlock achievements
  const checkAchievements = useCallback((player: Player, allGames: any[] = []) => {
    const stats = calculatePlayerStats(player, allGames);
    const currentAchievements = playerAchievements.get(player.id) || initializePlayerAchievements(player.id);
    
    let newlyUnlocked: Achievement[] = [];
    let totalXP = currentAchievements.totalXP;

    const updatedAchievements = currentAchievements.achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      const statValue = stats[achievement.condition.stat as keyof typeof stats] || 0;
      let progress = 0;
      let unlocked = false;

      // Calculate progress
      switch (achievement.condition.operator) {
        case 'gte':
          progress = Math.min((statValue / achievement.condition.target) * 100, 100);
          unlocked = statValue >= achievement.condition.target;
          break;
        case 'lte':
          progress = statValue <= achievement.condition.target ? 100 : 0;
          unlocked = statValue <= achievement.condition.target;
          break;
        case 'eq':
          progress = statValue === achievement.condition.target ? 100 : 0;
          unlocked = statValue === achievement.condition.target;
          break;
      }

      if (unlocked && !achievement.unlocked) {
        newlyUnlocked.push(achievement);
        if (achievement.reward) {
          totalXP += achievement.reward.xp;
        }
      }

      return {
        ...achievement,
        progress,
        unlocked,
        unlockedAt: unlocked && !achievement.unlocked ? new Date() : achievement.unlockedAt
      };
    });

    const level = Math.floor(totalXP / 1000) + 1;
    const updatedPlayerAchievements: PlayerAchievements = {
      ...currentAchievements,
      achievements: updatedAchievements,
      totalXP,
      level
    };

    // Update state
    const newAchievementsMap = new Map(playerAchievements);
    newAchievementsMap.set(player.id, updatedPlayerAchievements);
    setPlayerAchievements(newAchievementsMap);
    saveAchievements(newAchievementsMap);

    // Show notifications for newly unlocked achievements
    newlyUnlocked.forEach(achievement => {
      const getIconEmoji = (rarity: string) => {
        switch (rarity) {
          case 'legendary': return '👑';
          case 'epic': return '⭐';
          case 'rare': return '🏆';
          default: return '🎯';
        }
      };

      toast.success(`🎉 Succès débloqué !`, {
        description: `${getIconEmoji(achievement.rarity)} ${achievement.name}: ${achievement.description}`,
        duration: 5000
      });
    });

    return updatedPlayerAchievements;
  }, [playerAchievements, initializePlayerAchievements, calculatePlayerStats, saveAchievements]);

  // Get achievements for a player
  const getPlayerAchievements = useCallback((playerId: string): PlayerAchievements => {
    return playerAchievements.get(playerId) || initializePlayerAchievements(playerId);
  }, [playerAchievements, initializePlayerAchievements]);

  // Get all players achievements
  const getAllPlayerAchievements = useCallback(() => {
    return playerAchievements;
  }, [playerAchievements]);

  return {
    checkAchievements,
    getPlayerAchievements,
    getAllPlayerAchievements,
    initializePlayerAchievements
  };
};
