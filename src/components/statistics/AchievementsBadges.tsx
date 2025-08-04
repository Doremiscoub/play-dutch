import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Crown, Target, Zap, Flame, Star, Award, Medal,
  TrendingUp, TrendingDown, Activity, Crosshair, Timer, 
  Heart, Shield, Sparkles, Gauge, Brain, Focus
} from 'lucide-react';

interface AchievementsBadgesProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: (player: Player, allPlayers: Player[]) => boolean;
}

export const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({
  players,
  roundHistory
}) => {
  // Définir tous les achievements possibles
  const achievements: Achievement[] = [
    // Achievements liés à la performance
    {
      id: 'perfectionist',
      name: 'Perfectionniste',
      description: 'Réussir 3 manches parfaites (0 point)',
      icon: <Target className="h-4 w-4" />,
      color: 'bg-green-500',
      rarity: 'rare',
      condition: (player) => player.rounds.filter(r => r.score === 0).length >= 3
    },
    {
      id: 'dutch_master',
      name: 'Maître Dutch',
      description: 'Réussir 2 Dutch ou plus',
      icon: <Zap className="h-4 w-4" />,
      color: 'bg-purple-500',
      rarity: 'epic',
      condition: (player) => (player.stats?.dutchCount || 0) >= 2
    },
    {
      id: 'consistent_player',
      name: 'Joueur Régulier',
      description: 'Maintenir une consistance élevée (écart-type < 5)',
      icon: <Activity className="h-4 w-4" />,
      color: 'bg-blue-500',
      rarity: 'rare',
      condition: (player) => (player.stats?.consistencyScore || 100) < 5
    },
    {
      id: 'champion',
      name: 'Champion',
      description: 'Être en première position',
      icon: <Crown className="h-4 w-4" />,
      color: 'bg-yellow-500',
      rarity: 'legendary',
      condition: (player, allPlayers) => {
        const sorted = allPlayers.sort((a, b) => a.totalScore - b.totalScore);
        return sorted[0]?.id === player.id;
      }
    },
    {
      id: 'comeback_king',
      name: 'Roi du Comeback',
      description: 'Amélioration constante (tendance négative)',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'bg-orange-500',
      rarity: 'epic',
      condition: (player) => (player.stats?.improvementRate || 0) < -1
    },
    {
      id: 'sniper',
      name: 'Tireur d\'élite',
      description: 'Moyenne générale inférieure à 8 points',
      icon: <Crosshair className="h-4 w-4" />,
      color: 'bg-red-500',
      rarity: 'rare',
      condition: (player) => (player.stats?.averageScore || 100) < 8
    },
    {
      id: 'endurance',
      name: 'Endurance',
      description: 'Jouer plus de 10 manches',
      icon: <Timer className="h-4 w-4" />,
      color: 'bg-teal-500',
      rarity: 'common',
      condition: (player) => player.rounds.length > 10
    },
    {
      id: 'ice_cold',
      name: 'Sang Froid',
      description: 'Pas de score au-dessus de 15',
      icon: <Shield className="h-4 w-4" />,
      color: 'bg-cyan-500',
      rarity: 'epic',
      condition: (player) => player.rounds.every(r => r.score <= 15)
    },
    {
      id: 'lucky_streak',
      name: 'Série Chanceuse',
      description: '5 manches consécutives sous 10 points',
      icon: <Star className="h-4 w-4" />,
      color: 'bg-amber-500',
      rarity: 'rare',
      condition: (player) => {
        let bestStreak = 0;
        let currentStreak = 0;
        for (const round of player.rounds) {
          if (round.score < 10) {
            currentStreak++;
            bestStreak = Math.max(bestStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
        return bestStreak >= 5;
      }
    },
    {
      id: 'rookie',
      name: 'Débutant',
      description: 'Première partie jouée',
      icon: <Heart className="h-4 w-4" />,
      color: 'bg-pink-500',
      rarity: 'common',
      condition: (player) => player.rounds.length >= 1
    },
    {
      id: 'risk_taker',
      name: 'Preneur de Risques',
      description: 'Au moins 3 scores supérieurs à 20',
      icon: <Flame className="h-4 w-4" />,
      color: 'bg-red-600',
      rarity: 'rare',
      condition: (player) => player.rounds.filter(r => r.score > 20).length >= 3
    },
    {
      id: 'unstoppable',
      name: 'Inarrêtable',
      description: 'Plus de 3 points d\'avance sur le 2ème',
      icon: <Trophy className="h-4 w-4" />,
      color: 'bg-gold-500',
      rarity: 'legendary',
      condition: (player, allPlayers) => {
        const sorted = allPlayers.sort((a, b) => a.totalScore - b.totalScore);
        return sorted[0]?.id === player.id && sorted.length > 1 && 
               (sorted[1].totalScore - sorted[0].totalScore) > 3;
      }
    },
    {
      id: 'clutch_player',
      name: 'Clutch Player',
      description: 'Meilleure performance en fin de partie',
      icon: <Brain className="h-4 w-4" />,
      color: 'bg-indigo-500',
      rarity: 'epic',
      condition: (player) => {
        if (player.rounds.length < 6) return false;
        const firstHalf = player.rounds.slice(0, Math.floor(player.rounds.length / 2));
        const secondHalf = player.rounds.slice(Math.floor(player.rounds.length / 2));
        const firstAvg = firstHalf.reduce((a, b) => a + b.score, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b.score, 0) / secondHalf.length;
        return secondAvg < firstAvg - 2;
      }
    },
    {
      id: 'glass_cannon',
      name: 'Canon de Verre',
      description: 'Grande variation entre meilleur et pire score',
      icon: <Sparkles className="h-4 w-4" />,
      color: 'bg-violet-500',
      rarity: 'rare',
      condition: (player) => {
        const scores = player.rounds.map(r => r.score);
        const min = Math.min(...scores);
        const max = Math.max(...scores);
        return (max - min) > 20;
      }
    },
    {
      id: 'marathon_runner',
      name: 'Marathonien',
      description: 'Jouer plus de 15 manches',
      icon: <Gauge className="h-4 w-4" />,
      color: 'bg-emerald-500',
      rarity: 'rare',
      condition: (player) => player.rounds.length > 15
    },
    {
      id: 'zen_master',
      name: 'Maître Zen',
      description: 'Aucun score au-dessus de 12',
      icon: <Focus className="h-4 w-4" />,
      color: 'bg-lime-500',
      rarity: 'epic',
      condition: (player) => player.rounds.every(r => r.score <= 12)
    }
  ];

  // Calculer les achievements pour chaque joueur
  const calculatePlayerAchievements = (player: Player) => {
    return achievements.filter(achievement => 
      achievement.condition(player, players)
    );
  };

  // Obtenir les statistiques globales des achievements
  const getAchievementStats = () => {
    const allAchievements = players.flatMap(player => 
      calculatePlayerAchievements(player).map(achievement => ({
        ...achievement,
        player
      }))
    );

    const rarityCount = {
      common: allAchievements.filter(a => a.rarity === 'common').length,
      rare: allAchievements.filter(a => a.rarity === 'rare').length,
      epic: allAchievements.filter(a => a.rarity === 'epic').length,
      legendary: allAchievements.filter(a => a.rarity === 'legendary').length
    };

    const topAchiever = players.reduce((best, current) => {
      const bestCount = calculatePlayerAchievements(best).length;
      const currentCount = calculatePlayerAchievements(current).length;
      return currentCount > bestCount ? current : best;
    });

    return { allAchievements, rarityCount, topAchiever };
  };

  const { allAchievements, rarityCount, topAchiever } = getAchievementStats();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Commun';
      case 'rare': return 'Rare';
      case 'epic': return 'Épique';
      case 'legendary': return 'Légendaire';
      default: return 'Commun';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistiques globales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="p-4 text-center">
              <Medal className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <div className="text-sm text-gray-700 font-medium">Exploits Communs</div>
              <div className="text-2xl font-bold text-gray-800">{rarityCount.common}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-blue-700 font-medium">Exploits Rares</div>
              <div className="text-2xl font-bold text-blue-800">{rarityCount.rare}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm text-purple-700 font-medium">Exploits Épiques</div>
              <div className="text-2xl font-bold text-purple-800">{rarityCount.epic}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <Crown className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-sm text-orange-700 font-medium">Exploits Légendaires</div>
              <div className="text-2xl font-bold text-orange-800">{rarityCount.legendary}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hall of Fame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary" />
              Hall of Fame
              <Badge variant="secondary" className="ml-auto">
                Champion des Exploits: {topAchiever.name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
              <div className="text-6xl mb-2">{topAchiever.emoji || '🏆'}</div>
              <h3 className="text-xl font-bold text-foreground">{topAchiever.name}</h3>
              <p className="text-muted-foreground">
                Détient {calculatePlayerAchievements(topAchiever).length} exploit{calculatePlayerAchievements(topAchiever).length > 1 ? 's' : ''}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements par joueur */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {players.map((player, playerIndex) => {
          const playerAchievements = calculatePlayerAchievements(player);
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + playerIndex * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{player.emoji || '😊'}</span>
                    <span className="font-bold">{player.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {playerAchievements.length} exploit{playerAchievements.length > 1 ? 's' : ''}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {playerAchievements.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {playerAchievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + playerIndex * 0.1 + achievementIndex * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/20"
                        >
                          <div className={`p-2 ${achievement.color} rounded-lg text-white shadow-md`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">{achievement.name}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getRarityColor(achievement.rarity)} text-white border-none`}
                              >
                                {getRarityLabel(achievement.rarity)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="text-muted-foreground">Aucun exploit débloqué pour le moment</p>
                      <p className="text-sm text-muted-foreground mt-1">Continuez à jouer pour débloquer des récompenses!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Galerie de tous les achievements possibles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-secondary" />
              Galerie des Exploits
              <Badge variant="outline" className="ml-auto">
                {achievements.length} exploits disponibles
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const isUnlocked = allAchievements.some(a => a.id === achievement.id);
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.02 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20' 
                        : 'bg-muted/20 border-muted/30 grayscale opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 ${isUnlocked ? achievement.color : 'bg-gray-400'} rounded-lg text-white shadow-md`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {achievement.name}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${isUnlocked ? getRarityColor(achievement.rarity) : 'bg-gray-400'} text-white border-none`}
                          >
                            {getRarityLabel(achievement.rarity)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                      {achievement.description}
                    </p>
                    {isUnlocked && (
                      <div className="mt-2 text-xs text-primary font-medium">
                        ✓ Débloqué par {allAchievements.filter(a => a.id === achievement.id).map(a => a.player.name).join(', ')}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};