/**
 * Système d'achievements pour gamifier l'expérience
 */
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Medal, 
  Crown, 
  Flame, 
  Shield,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { Player } from '@/types';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: (stats: PlayerStats) => boolean;
  progress?: (stats: PlayerStats) => { current: number; total: number };
  unlockedAt?: Date;
}

export interface PlayerStats {
  totalGames: number;
  wins: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  winStreak: number;
  perfectGames: number; // Games won with < 50 points
  consistency: number; // Standard deviation of scores
  dutchCount: number; // Times achieved Dutch
}

export interface GameRecord {
  id: string;
  players: Player[];
  winner: Player;
  gameStartTime: Date;
  totalRounds: number;
  scoreLimit: number;
}

const RARITY_COLORS = {
  common: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  rare: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  epic: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  legendary: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' }
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    name: 'Première Victoire',
    description: 'Remporter votre première partie',
    icon: <Trophy className="w-5 h-5" />,
    rarity: 'common',
    condition: (stats) => stats.wins >= 1
  },
  {
    id: 'perfectionist',
    name: 'Perfectionniste',
    description: 'Gagner une partie avec moins de 50 points',
    icon: <Star className="w-5 h-5" />,
    rarity: 'rare',
    condition: (stats) => stats.perfectGames >= 1
  },
  {
    id: 'streak_3',
    name: 'Série de 3',
    description: 'Gagner 3 parties consécutives',
    icon: <Flame className="w-5 h-5" />,
    rarity: 'rare',
    condition: (stats) => stats.winStreak >= 3
  },
  {
    id: 'streak_5',
    name: 'Série de 5',
    description: 'Gagner 5 parties consécutives',
    icon: <Flame className="w-5 h-5" />,
    rarity: 'epic',
    condition: (stats) => stats.winStreak >= 5
  },
  {
    id: 'veteran',
    name: 'Vétéran',
    description: 'Jouer 25 parties',
    icon: <Medal className="w-5 h-5" />,
    rarity: 'epic',
    condition: (stats) => stats.totalGames >= 25,
    progress: (stats) => ({ current: stats.totalGames, total: 25 })
  },
  {
    id: 'master',
    name: 'Maître Dutch',
    description: 'Remporter 10 parties',
    icon: <Crown className="w-5 h-5" />,
    rarity: 'epic',
    condition: (stats) => stats.wins >= 10,
    progress: (stats) => ({ current: stats.wins, total: 10 })
  },
  {
    id: 'legend',
    name: 'Légende',
    description: 'Remporter 50 parties',
    icon: <Crown className="w-5 h-5" />,
    rarity: 'legendary',
    condition: (stats) => stats.wins >= 50,
    progress: (stats) => ({ current: stats.wins, total: 50 })
  },
  {
    id: 'consistent',
    name: 'Régularité',
    description: 'Maintenir une consistance élevée (écart-type < 15)',
    icon: <Shield className="w-5 h-5" />,
    rarity: 'rare',
    condition: (stats) => stats.consistency < 15 && stats.totalGames >= 10
  },
  {
    id: 'sharpshooter',
    name: 'Tireur d\'Elite',
    description: 'Maintenir une moyenne de score inférieure à 60',
    icon: <Target className="w-5 h-5" />,
    rarity: 'epic',
    condition: (stats) => stats.averageScore < 60 && stats.totalGames >= 10
  },
  {
    id: 'lightning',
    name: 'Éclair',
    description: 'Gagner une partie en moins de 5 manches',
    icon: <Zap className="w-5 h-5" />,
    rarity: 'rare',
    condition: (stats) => stats.wins >= 1 // Simplified for now
  }
];

interface AchievementSystemProps {
  gameHistory: GameRecord[];
  playerId?: string;
  className?: string;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({
  gameHistory,
  playerId,
  className = ''
}) => {
  const playerStats = useMemo(() => {
    if (!playerId || gameHistory.length === 0) {
      return {
        totalGames: 0,
        wins: 0,
        averageScore: 0,
        bestScore: Infinity,
        worstScore: 0,
        winStreak: 0,
        perfectGames: 0,
        consistency: 0,
        dutchCount: 0
      };
    }

    let totalGames = 0;
    let wins = 0;
    let totalScore = 0;
    let bestScore = Infinity;
    let worstScore = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let perfectGames = 0;
    let scores: number[] = [];
    let dutchCount = 0;

    // Calculer les statistiques de base
    gameHistory.forEach(game => {
      const player = game.players.find(p => p.id === playerId);
      if (!player) return;

      totalGames++;
      totalScore += player.totalScore;
      scores.push(player.totalScore);
      bestScore = Math.min(bestScore, player.totalScore);
      worstScore = Math.max(worstScore, player.totalScore);

      const isWinner = game.winner.id === playerId;
      if (isWinner) {
        wins++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
        
        if (player.totalScore < 50) {
          perfectGames++;
        }
      } else {
        currentStreak = 0;
      }

      // Compter les Dutch (simplifié - devrait vérifier les manches)
      if (player.rounds) {
        dutchCount += player.rounds.filter(round => 
          typeof round === 'number' ? round === 0 : round.score === 0
        ).length;
      }
    });

    // Calculer la consistance (écart-type)
    const averageScore = totalScore / totalGames;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / totalGames;
    const consistency = Math.sqrt(variance);

    return {
      totalGames,
      wins,
      averageScore,
      bestScore: bestScore === Infinity ? 0 : bestScore,
      worstScore,
      winStreak: maxStreak,
      perfectGames,
      consistency,
      dutchCount
    };
  }, [gameHistory, playerId]);

  const achievementStatus = useMemo(() => {
    return ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: achievement.condition(playerStats),
      progress: achievement.progress ? achievement.progress(playerStats) : null
    }));
  }, [playerStats]);

  const unlockedAchievements = achievementStatus.filter(a => a.unlocked);
  const lockedAchievements = achievementStatus.filter(a => !a.unlocked);

  if (gameHistory.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Jouez quelques parties pour débloquer des achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              Vos achievements apparaîtront ici
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistiques résumées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
            <Badge variant="outline" className="ml-auto">
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            Débloquez des achievements en jouant et en vous améliorant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-dutch-blue">{playerStats.totalGames}</div>
              <div className="text-sm text-gray-600">Parties jouées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dutch-green">{playerStats.wins}</div>
              <div className="text-sm text-gray-600">Victoires</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dutch-purple">{playerStats.winStreak}</div>
              <div className="text-sm text-gray-600">Meilleure série</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dutch-orange">{unlockedAchievements.length}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>

          <Progress 
            value={(unlockedAchievements.length / ACHIEVEMENTS.length) * 100} 
            className="h-3"
          />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Progression des achievements: {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </p>
        </CardContent>
      </Card>

      {/* Achievements débloqués */}
      {unlockedAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Achievements Débloqués</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <AnimatePresence>
                {unlockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${RARITY_COLORS[achievement.rarity].bg} ${RARITY_COLORS[achievement.rarity].border}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${RARITY_COLORS[achievement.rarity].text}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{achievement.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${RARITY_COLORS[achievement.rarity].text}`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements en cours */}
      {lockedAchievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">En Cours de Déblocage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lockedAchievements
                .filter(a => a.progress && a.progress.current > 0)
                .slice(0, 5)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full text-gray-400">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-700">{achievement.name}</h4>
                          <Badge variant="outline" className="text-xs text-gray-500">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    
                    {achievement.progress && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{achievement.progress.current}/{achievement.progress.total}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress.current / achievement.progress.total) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};