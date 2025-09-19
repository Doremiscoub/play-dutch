import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Trophy, Target, TrendingUp, Users, Clock, Star,
  Award, Zap, Crown, Medal, Flame, Activity
} from 'lucide-react';

interface GameRecord {
  id: string;
  players: Array<{
    id: string;
    name: string;
    totalScore: number;
    rounds: Array<{ score: number; isDutch: boolean }>;
  }>;
  date: Date;
  winner: string;
  totalRounds: number;
  duration: number;
}

interface EnrichedStatsV2Props {
  gameHistory: GameRecord[];
  className?: string;
}

interface Player {
  name: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
  avgScore: number;
  bestScore: number;
  worstScore: number;
  totalRounds: number;
  avgRoundsPerGame: number;
  consistency: number;
  dutchCount: number;
  improvements: number;
  badges: string[];
}

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#F97316'];

const ACHIEVEMENT_BADGES = [
  { id: 'perfectionist', name: 'Perfectionniste', icon: '🎯', condition: (p: Player) => p.bestScore <= 20 },
  { id: 'consistent', name: 'Régulier', icon: '📊', condition: (p: Player) => p.consistency > 80 },
  { id: 'champion', name: 'Champion', icon: '👑', condition: (p: Player) => p.winRate > 60 },
  { id: 'veteran', name: 'Vétéran', icon: '🏆', condition: (p: Player) => p.gamesPlayed >= 10 },
  { id: 'improver', name: 'En Progrès', icon: '📈', condition: (p: Player) => p.improvements > 70 },
  { id: 'dutch_master', name: 'Maître Dutch', icon: '🔥', condition: (p: Player) => p.dutchCount >= 5 }
];

export const EnrichedStatsV2: React.FC<EnrichedStatsV2Props> = ({ 
  gameHistory = [], 
  className = '' 
}) => {
  // Calcul des analytics avancées
  const analytics = React.useMemo(() => {
    if (!gameHistory.length) return [];

    const playerMap = new Map<string, Player>();

    gameHistory.forEach(game => {
      game.players.forEach(player => {
        if (!playerMap.has(player.id)) {
          playerMap.set(player.id, {
            name: player.name,
            gamesPlayed: 0,
            wins: 0,
            winRate: 0,
            avgScore: 0,
            bestScore: Infinity,
            worstScore: 0,
            totalRounds: 0,
            avgRoundsPerGame: 0,
            consistency: 0,
            dutchCount: 0,
            improvements: 0,
            badges: []
          });
        }

        const stats = playerMap.get(player.id)!;
        stats.gamesPlayed++;
        
        if (game.winner === player.id) {
          stats.wins++;
        }

        stats.avgScore = (stats.avgScore * (stats.gamesPlayed - 1) + player.totalScore) / stats.gamesPlayed;
        stats.bestScore = Math.min(stats.bestScore, player.totalScore);
        stats.worstScore = Math.max(stats.worstScore, player.totalScore);
        stats.totalRounds += player.rounds.length;
        stats.dutchCount += player.rounds.filter(r => r.isDutch).length;

        // Calcul de consistance (inverse de l'écart-type)
        const scores = gameHistory
          .filter(g => g.players.some(p => p.id === player.id))
          .map(g => g.players.find(p => p.id === player.id)?.totalScore || 0);
        
        if (scores.length > 1) {
          const mean = scores.reduce((a, b) => a + b) / scores.length;
          const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
          stats.consistency = Math.max(0, 100 - Math.sqrt(variance));
        }

        // Calcul d'amélioration (scores récents vs anciens)
        if (scores.length >= 4) {
          const oldAvg = scores.slice(0, Math.floor(scores.length / 2)).reduce((a, b) => a + b) / Math.floor(scores.length / 2);
          const newAvg = scores.slice(Math.floor(scores.length / 2)).reduce((a, b) => a + b) / Math.ceil(scores.length / 2);
          stats.improvements = Math.max(0, ((oldAvg - newAvg) / oldAvg) * 100);
        }
      });
    });

    // Finaliser les calculs
    const players = Array.from(playerMap.values()).map(player => {
      player.winRate = (player.wins / player.gamesPlayed) * 100;
      player.avgRoundsPerGame = player.totalRounds / player.gamesPlayed;
      player.badges = ACHIEVEMENT_BADGES
        .filter(badge => badge.condition(player))
        .map(badge => badge.id);
      return player;
    });

    return players.sort((a, b) => b.winRate - a.winRate);
  }, [gameHistory]);

  // Données pour les graphiques
  const chartData = analytics.map((player, index) => ({
    name: player.name,
    winRate: Math.round(player.winRate),
    avgScore: Math.round(player.avgScore),
    consistency: Math.round(player.consistency),
    games: player.gamesPlayed,
    color: COLORS[index % COLORS.length]
  }));

  const performanceData = analytics.map(player => ({
    name: player.name,
    Performance: Math.round(player.winRate),
    Consistance: Math.round(player.consistency),
    Amélioration: Math.round(player.improvements),
    Experience: Math.min(100, player.gamesPlayed * 10)
  }));

  if (!gameHistory.length) {
    return (
      <Card className={`${className} glass-morphism border-white/20`}>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center space-y-4">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-foreground">Aucune statistique disponible</h3>
              <p className="text-sm text-muted-foreground">
                Jouez quelques parties pour voir des statistiques détaillées !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const topPerformers = analytics.slice(0, 3);
  const totalGames = gameHistory.length;
  const avgRoundsPerGame = Math.round(gameHistory.reduce((acc, game) => acc + game.totalRounds, 0) / totalGames);
  const totalAchievements = analytics.reduce((acc, player) => acc + player.badges.length, 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header avec stats globales */}
      <Card className="glass-morphism border-gradient-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-6 w-6 text-primary" />
            Statistiques Enrichies V2
          </CardTitle>
          <CardDescription>
            Analyse avancée des performances et tendances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 glass-card rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalGames}</div>
              <div className="text-sm text-muted-foreground">Parties jouées</div>
            </div>
            <div className="text-center p-3 glass-card rounded-lg">
              <div className="text-2xl font-bold text-secondary">{analytics.length}</div>
              <div className="text-sm text-muted-foreground">Joueurs uniques</div>
            </div>
            <div className="text-center p-3 glass-card rounded-lg">
              <div className="text-2xl font-bold text-accent">{avgRoundsPerGame}</div>
              <div className="text-sm text-muted-foreground">Manches/partie</div>
            </div>
            <div className="text-center p-3 glass-card rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalAchievements}</div>
              <div className="text-sm text-muted-foreground">Succès débloqués</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Podium des Champions */}
      <Card className="glass-morphism border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Podium des Champions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {topPerformers.map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-4 rounded-lg ${
                  index === 0 ? 'bg-gradient-to-b from-yellow-100 to-yellow-50 border-yellow-300' :
                  index === 1 ? 'bg-gradient-to-b from-gray-100 to-gray-50 border-gray-300' :
                  'bg-gradient-to-b from-orange-100 to-orange-50 border-orange-300'
                } border-2`}
              >
                <div className="text-3xl mb-2">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </div>
                <h3 className="font-bold text-lg">{player.name}</h3>
                <div className="space-y-1 text-sm">
                  <div>Taux de victoire: {Math.round(player.winRate)}%</div>
                  <div>Score moyen: {Math.round(player.avgScore)}</div>
                  <div>Meilleur score: {player.bestScore}</div>
                </div>
                <div className="flex justify-center gap-1 mt-2">
                  {player.badges.slice(0, 3).map(badgeId => {
                    const badge = ACHIEVEMENT_BADGES.find(b => b.id === badgeId);
                    return badge ? (
                      <span key={badgeId} title={badge.name} className="text-lg">
                        {badge.icon}
                      </span>
                    ) : null;
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Graphiques comparatifs */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Taux de Victoire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="winRate" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Scores Moyens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="avgScore" fill="#3B82F6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radar de Performance */}
      <Card className="glass-morphism border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Analyse de Performance Multidimensionnelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              {analytics.slice(0, 3).map((_, index) => (
                <Radar
                  key={index}
                  name={analytics[index]?.name}
                  dataKey={analytics[index]?.name}
                  stroke={COLORS[index]}
                  fill={COLORS[index]}
                  fillOpacity={0.1}
                />
              ))}
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tableau détaillé */}
      <Card className="glass-morphism border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Statistiques Détaillées par Joueur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 glass-card rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <h3 className="font-semibold">{player.name}</h3>
                    <div className="flex gap-1">
                      {player.badges.map(badgeId => {
                        const badge = ACHIEVEMENT_BADGES.find(b => b.id === badgeId);
                        return badge ? (
                          <Badge key={badgeId} variant="secondary" className="text-xs">
                            {badge.icon} {badge.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{Math.round(player.winRate)}%</div>
                    <div className="text-xs text-muted-foreground">Victoires</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Score moyen</div>
                    <div className="font-medium">{Math.round(player.avgScore)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Meilleur score</div>
                    <div className="font-medium text-green-600">{player.bestScore}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Consistance</div>
                    <div className="flex items-center gap-2">
                      <Progress value={player.consistency} className="flex-1 h-2" />
                      <span className="font-medium text-xs">{Math.round(player.consistency)}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Succès</div>
                    <div className="font-medium">{player.badges.length}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};