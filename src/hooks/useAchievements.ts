
import { useState, useCallback } from 'react';
import { Player, Game } from '@/types';
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
  check: (player: Player, gameHistory: Game[]) => boolean;
  getProgress: (player: Player, gameHistory: Game[]) => { progress: number; maxProgress: number };
  achievement: Omit<Achievement, 'unlockedAt' | 'progress' | 'maxProgress'>;
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
    check: (_player, gameHistory) => gameHistory.length >= 1,
    getProgress: (_player, gameHistory) => ({
      progress: Math.min(gameHistory.length, 1),
      maxProgress: 1
    })
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
    check: (player) => player.rounds.some(round => round.score === 0),
    getProgress: (player) => ({
      progress: player.rounds.some(round => round.score === 0) ? 1 : 0,
      maxProgress: 1
    })
  },
  {
    id: 'dutch_master',
    achievement: {
      id: 'dutch_master',
      name: 'Maître du Dutch',
      description: 'Réussir 5 Dutch en carrière',
      icon: '👑',
      category: 'mastery',
      rarity: 'epic'
    },
    check: (player) => (player.stats?.dutchCount || 0) >= 5,
    getProgress: (player) => ({
      progress: Math.min(player.stats?.dutchCount || 0, 5),
      maxProgress: 5
    })
  },
  {
    id: 'comeback_king',
    achievement: {
      id: 'comeback_king',
      name: 'Roi du Comeback',
      description: 'Gagner après avoir été dernier au premier tour',
      icon: '🚀',
      category: 'gameplay',
      rarity: 'legendary'
    },
    check: (player, gameHistory) => {
      return gameHistory.some(game => {
        // The player must have won this game
        if (game.winner !== player.name) return false;

        // We need at least 2 players to determine last place
        if (!game.players || game.players.length < 2) return false;

        // Check if the player had the highest (worst) score after round 1
        // In the game.players array, each entry has a score representing their
        // round 1 score in context. We look for the player being in last place
        // (highest score) after the first round.
        const playerEntry = game.players.find(p => p.name === player.name);
        if (!playerEntry) return false;

        const maxScoreAfterRound1 = Math.max(...game.players.map(p => p.score));
        const playerWasLast = playerEntry.score === maxScoreAfterRound1 &&
          playerEntry.score > 0;

        return playerWasLast;
      });
    },
    getProgress: (player, gameHistory) => {
      const hasComeback = gameHistory.some(game => {
        if (game.winner !== player.name) return false;
        if (!game.players || game.players.length < 2) return false;
        const playerEntry = game.players.find(p => p.name === player.name);
        if (!playerEntry) return false;
        const maxScore = Math.max(...game.players.map(p => p.score));
        return playerEntry.score === maxScore && playerEntry.score > 0;
      });
      return { progress: hasComeback ? 1 : 0, maxProgress: 1 };
    }
  },
  {
    id: 'veteran',
    achievement: {
      id: 'veteran',
      name: 'Vétéran',
      description: 'Jouer 10 parties',
      icon: '🏅',
      category: 'gameplay',
      rarity: 'rare'
    },
    check: (_player, gameHistory) => gameHistory.length >= 10,
    getProgress: (_player, gameHistory) => ({
      progress: Math.min(gameHistory.length, 10),
      maxProgress: 10
    })
  },
  {
    id: 'high_scorer',
    achievement: {
      id: 'high_scorer',
      name: 'Explosif',
      description: 'Marquer 50+ points en une seule manche',
      icon: '💥',
      category: 'scoring',
      rarity: 'common'
    },
    check: (player) => player.rounds.some(round => round.score >= 50),
    getProgress: (player) => {
      const maxRound = player.rounds.length > 0
        ? Math.max(...player.rounds.map(r => r.score))
        : 0;
      return { progress: Math.min(maxRound, 50), maxProgress: 50 };
    }
  },
  {
    id: 'consistency',
    achievement: {
      id: 'consistency',
      name: 'Régularité',
      description: 'Score moyen < 15 sur les 5 dernières parties',
      icon: '📊',
      category: 'mastery',
      rarity: 'epic'
    },
    check: (_player, gameHistory) => {
      if (gameHistory.length < 5) return false;
      const lastFive = gameHistory.slice(-5);
      const avgScores = lastFive.map(game => {
        const total = game.players.reduce((sum: number, p: { score: number }) => sum + p.score, 0);
        return total / game.players.length;
      });
      const overallAvg = avgScores.reduce((sum, s) => sum + s, 0) / avgScores.length;
      return overallAvg < 15;
    },
    getProgress: (_player, gameHistory) => {
      const gamesNeeded = 5;
      if (gameHistory.length < gamesNeeded) {
        return { progress: gameHistory.length, maxProgress: gamesNeeded };
      }
      const lastFive = gameHistory.slice(-5);
      const avgScores = lastFive.map(game => {
        const total = game.players.reduce((sum: number, p: { score: number }) => sum + p.score, 0);
        return total / game.players.length;
      });
      const overallAvg = avgScores.reduce((sum, s) => sum + s, 0) / avgScores.length;
      // Show how close to target: lower is better, so invert for progress display
      // If avg is 15 or more, progress reflects how close (15 - avg clamped)
      const progressValue = overallAvg < 15 ? 5 : Math.max(0, Math.round(5 - (overallAvg - 15) / 3));
      return { progress: Math.min(progressValue, 5), maxProgress: 5 };
    }
  },
  {
    id: 'winning_streak',
    achievement: {
      id: 'winning_streak',
      name: 'Inarrêtable',
      description: 'Gagner 3 parties consécutives',
      icon: '🔥',
      category: 'mastery',
      rarity: 'rare'
    },
    check: (player, gameHistory) => {
      if (gameHistory.length < 3) return false;
      let streak = 0;
      for (let i = gameHistory.length - 1; i >= 0; i--) {
        if (gameHistory[i].winner === player.name) {
          streak++;
          if (streak >= 3) return true;
        } else {
          streak = 0;
        }
      }
      return false;
    },
    getProgress: (player, gameHistory) => {
      let currentStreak = 0;
      let maxStreak = 0;
      for (let i = 0; i < gameHistory.length; i++) {
        if (gameHistory[i].winner === player.name) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
      return { progress: Math.min(maxStreak, 3), maxProgress: 3 };
    }
  },
  {
    id: 'low_scorer',
    achievement: {
      id: 'low_scorer',
      name: 'Minimaliste',
      description: 'Terminer une partie complète avec moins de 20 points',
      icon: '🎖️',
      category: 'scoring',
      rarity: 'epic'
    },
    check: (player, gameHistory) => {
      return gameHistory.some(game => {
        const entry = game.players.find(p => p.name === player.name);
        return entry !== undefined && entry.score < 20;
      });
    },
    getProgress: (player, gameHistory) => {
      let bestScore = Infinity;
      gameHistory.forEach(game => {
        const entry = game.players.find(p => p.name === player.name);
        if (entry) bestScore = Math.min(bestScore, entry.score);
      });
      if (bestScore === Infinity) return { progress: 0, maxProgress: 1 };
      // Achieved if under 20, otherwise show 0
      return { progress: bestScore < 20 ? 1 : 0, maxProgress: 1 };
    }
  },
  {
    id: 'social_player',
    achievement: {
      id: 'social_player',
      name: 'Joueur Social',
      description: 'Jouer une partie avec 5 joueurs ou plus',
      icon: '🤝',
      category: 'social',
      rarity: 'common'
    },
    check: (_player, gameHistory) => {
      return gameHistory.some(game => game.players.length >= 5);
    },
    getProgress: (_player, gameHistory) => {
      const maxPlayers = gameHistory.length > 0
        ? Math.max(...gameHistory.map(g => g.players.length))
        : 0;
      return { progress: Math.min(maxPlayers, 5), maxProgress: 5 };
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

  const checkAchievements = useCallback((player: Player, gameHistory: Game[]) => {
    achievementDefinitions.forEach(({ achievement, check, getProgress }) => {
      const isAlreadyUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
      const { progress, maxProgress } = getProgress(player, gameHistory);

      if (!isAlreadyUnlocked && check(player, gameHistory)) {
        unlockAchievement({ ...achievement, progress, maxProgress });
      }
    });
  }, [unlockedAchievements, unlockAchievement]);

  return {
    unlockedAchievements,
    checkAchievements,
    unlockAchievement
  };
}
