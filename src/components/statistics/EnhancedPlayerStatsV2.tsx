/**
 * Statistiques avancées des joueurs avec analyses et tendances
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Trophy, TrendingUp, TrendingDown, Target, Zap, 
  Award, Star, Medal, Crown, Flame, Shield,
  BarChart3, Activity, Timer, Users
} from 'lucide-react';
import { Player } from '@/types';

interface GameRecord {
  id: string;
  players: Player[];
  gameStartTime: Date;
  totalRounds: number;
  winner: Player;
  scoreLimit: number;
}

interface EnhancedStatsProps {
  gameHistory: GameRecord[];
  className?: string;
}

interface PlayerAnalytics {
  playerId: string;
  playerName: string;
  totalGames: number;
  wins: number;
  winRate: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  totalRounds: number;
  averageRoundsPerGame: number;
  consistency: number; // Écart-type des scores
  improvement: number; // Tendance des 5 derniers jeux
  achievements: Achievement[];
  streakData: StreakData;
  performanceByRound: RoundPerformance[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

interface StreakData {
  currentWinStreak: number;
  bestWinStreak: number;
  currentLoseStreak: number;
  worstLoseStreak: number;
}

interface RoundPerformance {
  round: number;
  averageScore: number;
  gamesPlayed: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'perfectionist',
    name: 'Perfectionniste',
    description: 'Gagner une partie avec moins de 50 points',
    icon: <Star className="w-4 h-4" />,
    rarity: 'rare'
  },
  {
    id: 'master',
    name: 'Maître Dutch',
    description: 'Gagner 10 parties',
    icon: <Crown className="w-4 h-4" />,
    rarity: 'epic'
  },
  {
    id: 'streak_5',
    name: 'Série de 5',
    description: 'Gagner 5 parties consécutives',
    icon: <Flame className="w-4 h-4" />,
    rarity: 'epic'
  },
  {
    id: 'consistent',
    name: 'Régularité',
    description: 'Avoir un écart-type de score < 15',
    icon: <Shield className="w-4 h-4" />,
    rarity: 'rare'
  },
  {
    id: 'veteran',
    name: 'Vétéran',
    description: 'Jouer 50 parties',
    icon: <Medal className="w-4 h-4" />,
    rarity: 'legendary'
  }
];

const COLORS = {
  common: '#6B7280',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B'
};

export const EnhancedPlayerStatsV2: React.FC<EnhancedStatsProps> = ({ 
  gameHistory, 
  className = '' 
}) => {
  const analytics = useMemo(() => {
    const playerMap = new Map<string, PlayerAnalytics>();

    // Initialiser les données pour chaque joueur
    gameHistory.forEach(game => {
      game.players.forEach(player => {
        if (!playerMap.has(player.id)) {
          playerMap.set(player.id, {
            playerId: player.id,
            playerName: player.name,
            totalGames: 0,
            wins: 0,
            winRate: 0,
            averageScore: 0,
            bestScore: Infinity,
            worstScore: 0,
            totalRounds: 0,
            averageRoundsPerGame: 0,
            consistency: 0,
            improvement: 0,
            achievements: [],
            streakData: {
              currentWinStreak: 0,
              bestWinStreak: 0,
              currentLoseStreak: 0,
              worstLoseStreak: 0
            },
            performanceByRound: []
          });
        }
      });
    });

    // Calculer les statistiques
    gameHistory.forEach(game => {
      game.players.forEach(player => {
        const stats = playerMap.get(player.id)!;
        stats.totalGames++;
        
        if (game.winner.id === player.id) {
          stats.wins++;
        }
        
        stats.bestScore = Math.min(stats.bestScore, player.totalScore);
        stats.worstScore = Math.max(stats.worstScore, player.totalScore);
        stats.totalRounds += player.rounds?.length || 0;
      });
    });

    // Finaliser les calculs
    playerMap.forEach(stats => {
      stats.winRate = (stats.wins / stats.totalGames) * 100;
      stats.averageRoundsPerGame = stats.totalRounds / stats.totalGames;
      
      // Calculer la moyenne des scores
      let totalScore = 0;
      let gameCount = 0;
      gameHistory.forEach(game => {
        const player = game.players.find(p => p.id === stats.playerId);
        if (player) {
          totalScore += player.totalScore;
          gameCount++;
        }
      });
      stats.averageScore = totalScore / gameCount;

      // Calculer la consistance (écart-type)
      let variance = 0;
      gameHistory.forEach(game => {
        const player = game.players.find(p => p.id === stats.playerId);
        if (player) {
          variance += Math.pow(player.totalScore - stats.averageScore, 2);
        }
      });
      stats.consistency = Math.sqrt(variance / stats.totalGames);

      // Calculer l'amélioration (tendance)
      const recentGames = gameHistory.slice(-5);
      let recentTotal = 0;
      let recentCount = 0;
      recentGames.forEach(game => {
        const player = game.players.find(p => p.id === stats.playerId);
        if (player) {
          recentTotal += player.totalScore;
          recentCount++;
        }
      });
      const recentAverage = recentTotal / recentCount;
      stats.improvement = ((stats.averageScore - recentAverage) / stats.averageScore) * 100;

      // Calculer les achievements
      stats.achievements = ACHIEVEMENTS.filter(achievement => {
        switch (achievement.id) {
          case 'perfectionist':
            return stats.bestScore < 50;
          case 'master':
            return stats.wins >= 10;
          case 'streak_5':
            return stats.streakData.bestWinStreak >= 5;
          case 'consistent':
            return stats.consistency < 15;
          case 'veteran':
            return stats.totalGames >= 50;
          default:
            return false;
        }
      });
    });

    return Array.from(playerMap.values()).sort((a, b) => b.winRate - a.winRate);
  }, [gameHistory]);

  const topPerformers = analytics.slice(0, 3);
  const chartData = analytics.map(player => ({
    name: player.playerName,
    winRate: player.winRate,
    averageScore: player.averageScore,
    games: player.totalGames,
    consistency: player.consistency
  }));

  if (gameHistory.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Statistiques Avancées
          </CardTitle>
          <CardDescription>
            Aucune partie terminée pour afficher les statistiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              Jouez quelques parties pour voir vos statistiques détaillées
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header avec statistiques globales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Statistiques Avancées
          </CardTitle>
          <CardDescription>
            Analyses détaillées des performances de tous les joueurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {gameHistory.length}
              </div>
              <div className="text-sm text-gray-600">Parties jouées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {analytics.length}
              </div>
              <div className="text-sm text-gray-600">Joueurs uniques</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(gameHistory.reduce((sum, game) => sum + game.totalRounds, 0) / gameHistory.length)}
              </div>
              <div className="text-sm text-gray-600">Manches/partie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {analytics.reduce((sum, p) => sum + p.achievements.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Podium des meilleurs joueurs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Podium des Champions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {topPerformers.map((player, index) => (
              <motion.div
                key={player.playerId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border-2 ${
                  index === 0 ? 'border-yellow-300 bg-yellow-50' :
                  index === 1 ? 'border-gray-300 bg-gray-50' :
                  'border-orange-300 bg-orange-50'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-2 ${
                    index === 0 ? 'text-yellow-600' :
                    index === 1 ? 'text-gray-600' :
                    'text-orange-600'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{player.playerName}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Taux de victoire:</span>
                      <span className="font-medium">{player.winRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Score moyen:</span>
                      <span className="font-medium">{player.averageScore.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Meilleur score:</span>
                      <span className="font-medium">{player.bestScore}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  {player.achievements.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {player.achievements.slice(0, 3).map(achievement => (
                          <div
                            key={achievement.id}
                            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                            style={{ 
                              backgroundColor: `${COLORS[achievement.rarity]}20`,
                              color: COLORS[achievement.rarity]
                            }}
                          >
                            {achievement.icon}
                            <span>{achievement.name}</span>
                          </div>
                        ))}
                      </div>
                      {player.achievements.length > 3 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{player.achievements.length - 3} autres
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tendance */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {player.improvement > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${
                      player.improvement > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(player.improvement).toFixed(1)}% d'amélioration
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Graphiques comparatifs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Graphique des taux de victoire */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Taux de Victoire par Joueur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Bar dataKey="winRate" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graphique des scores moyens */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Score Moyen par Joueur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toFixed(1)} />
                <Area 
                  type="monotone" 
                  dataKey="averageScore" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tableau détaillé des statistiques */}
      <Card>
        <CardHeader>
          <CardTitle>Statistiques Détaillées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Joueur</th>
                  <th className="text-center p-2">Parties</th>
                  <th className="text-center p-2">Victoires</th>
                  <th className="text-center p-2">Taux</th>
                  <th className="text-center p-2">Moy.</th>
                  <th className="text-center p-2">Meilleur</th>
                  <th className="text-center p-2">Régularité</th>
                  <th className="text-center p-2">Achievements</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((player, index) => (
                  <tr key={player.playerId} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="font-medium">{player.playerName}</div>
                    </td>
                    <td className="text-center p-2">{player.totalGames}</td>
                    <td className="text-center p-2">{player.wins}</td>
                    <td className="text-center p-2">
                      <Badge variant={player.winRate > 50 ? "default" : "secondary"}>
                        {player.winRate.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="text-center p-2">{player.averageScore.toFixed(1)}</td>
                    <td className="text-center p-2">
                      <Badge variant="outline">{player.bestScore}</Badge>
                    </td>
                    <td className="text-center p-2">
                      <Progress 
                        value={Math.max(0, 100 - player.consistency * 2)} 
                        className="w-16 h-2"
                      />
                    </td>
                    <td className="text-center p-2">{player.achievements.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};