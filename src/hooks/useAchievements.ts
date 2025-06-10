
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { useSound } from './use-sound';
import { useHapticFeedback } from './useHapticFeedback';
import { toast } from 'sonner';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'scoring' | 'gameplay' | 'social' | 'mastery';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface AchievementCheck {
  id: string;
  check: (player: Player, gameHistory: any[]) => boolean;
  achievement: Omit<Achievement, 'unlockedAt'>;
}

const achievementDefinitions: AchievementCheck[] = [
  {
    id: 'first_game',
    achievement: {
      id: 'first_game',
      name: 'Premier Pas',
      description: 'Terminer votre première partie',
      icon: '🎯',
      category: 'gameplay',
      rarity: 'common'
    },
    check: (player, gameHistory) => gameHistory.length >= 1
  },
  {
    id: 'perfect_round',
    achievement: {
      id: 'perfect_round',
      name: 'Manche Parfaite',
      description: 'Réaliser une manche avec 0 point',
      icon: '⭐',
      category: 'scoring',
      rarity: 'rare'
    },
    check: (player) => player.rounds.some(round => round.score === 0)
  },
  {
    id: 'dutch_master',
    achievement: {
      id: 'dutch_master',
      name: 'Maître du Dutch',
      description: 'Réussir 5 Dutch dans une partie',
      icon: '👑',
      category: 'mastery',
      rarity: 'epic'
    },
    check: (player) => (player.stats?.dutchCount || 0) >= 5
  },
  {
    id: 'comeback_king',
    achievement: {
      id: 'comeback_king',
      name: 'Roi du Comeback',
      description: 'Gagner après avoir été dernier',
      icon: '🚀',
      category: 'gameplay',
      rarity: 'legendary'
    },
    check: (player, gameHistory) => {
      // Logic to check if player came back from last place
      return false; // Simplified for now
    }
  }
];

export function useAchievements() {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>(() => {
    try {
      const stored = localStorage.getItem('dutch_achievements');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const { playAchievementSound } = useSound();
  const { notification } = useHapticFeedback();

  const unlockAchievement = useCallback((achievement: Achievement) => {
    const newAchievement = { ...achievement, unlockedAt: new Date() };
    
    setUnlockedAchievements(prev => {
      const updated = [...prev, newAchievement];
      localStorage.setItem('dutch_achievements', JSON.stringify(updated));
      return updated;
    });

    // Celebrate the achievement
    playAchievementSound();
    notification('success');
    
    toast.success(`🏆 Achievement débloqué: ${achievement.name}`, {
      description: achievement.description,
      duration: 4000
    });
  }, [playAchievementSound, notification]);

  const checkAchievements = useCallback((player: Player, gameHistory: any[]) => {
    achievementDefinitions.forEach(({ achievement, check }) => {
      const isAlreadyUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
      
      if (!isAlreadyUnlocked && check(player, gameHistory)) {
        unlockAchievement(achievement);
      }
    });
  }, [unlockedAchievements, unlockAchievement]);

  return {
    unlockedAchievements,
    checkAchievements,
    unlockAchievement
  };
}
