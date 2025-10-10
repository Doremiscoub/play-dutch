/**
 * Composant d'analytics et métriques avancées pour Dutch
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon,
  Target, Award, Users, Clock, Zap, Activity
} from 'lucide-react';
import { Player } from '@/types';

interface GameRecord {
  id: string;
  players: Player[];
  winner: Player;
  gameStartTime: Date;
  totalRounds: number;
  scoreLimit: number;
  duration?: number; // en minutes
}

interface GameAnalyticsProps {
  gameHistory: GameRecord[];
  className?: string;
}

interface AnalyticsData {
  totalGames: number;
  totalPlayers: number;
  averageGameDuration: number;
  averageRoundsPerGame: number;
  mostActivePlayer: string;
  bestPerformer: string;
  gamesByDay: { day: string; games: number }[];
  scoreDistribution: { range: string; count: number }[];
  playerPerformance: { name: string; winRate: number; avgScore: number; games: number }[];
  roundsByGame: { game: number; rounds: number }[];
  timeOfDayStats: { hour: number; games: number }[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff'];

export const GameAnalytics: React.FC<GameAnalyticsProps> = ({ 
  gameHistory, 
  className = '' 
}) => {
  const analytics = useMemo((): AnalyticsData => {
    if (gameHistory.length === 0) {
      return {
        totalGames: 0,
        totalPlayers: 0,
        averageGameDuration: 0,
        averageRoundsPerGame: 0,
        mostActivePlayer: '',
        bestPerformer: '',
        gamesByDay: [],
        scoreDistribution: [],
        playerPerformance: [],
        roundsByGame: [],
        timeOfDayStats: []
      };
    }

    // Calculs de base
    const totalGames = gameHistory.length;
    const allPlayers = new Set<string>();
    const playerStats = new Map<string, { games: number; wins: number; totalScore: number }>();
    
    let totalRounds = 0;
    let totalDuration = 0;
    const gamesByDayMap = new Map<string, number>();
    const scoreDistributionMap = new Map<string, number>();
    const timeOfDayMap = new Map<number, number>();

    gameHistory.forEach((game, index) => {
      totalRounds += game.totalRounds;
      if (game.duration) totalDuration += game.duration;

      // Jour de la semaine
      const dayKey = game.gameStartTime.toLocaleDateString('fr-FR', { weekday: 'long' });
      gamesByDayMap.set(dayKey, (gamesByDayMap.get(dayKey) || 0) + 1);

      // Heure de la journée
      const hour = game.gameStartTime.getHours();
      timeOfDayMap.set(hour, (timeOfDayMap.get(hour) || 0) + 1);

      game.players.forEach(player => {
        allPlayers.add(player.name);
        
        if (!playerStats.has(player.name)) {
          playerStats.set(player.name, { games: 0, wins: 0, totalScore: 0 });
        }
        
        const stats = playerStats.get(player.name)!;
        stats.games++;
        stats.totalScore += player.totalScore;
        
        if (game.winner.name === player.name) {
          stats.wins++;
        }

        // Distribution des scores
        const scoreRange = Math.floor(player.totalScore / 20) * 20;
        const rangeKey = `${scoreRange}-${scoreRange + 19}`;
        scoreDistributionMap.set(rangeKey, (scoreDistributionMap.get(rangeKey) || 0) + 1);
      });
    });

    // Joueur le plus actif
    let mostActivePlayer = '';
    let maxGames = 0;
    playerStats.forEach((stats, name) => {
      if (stats.games > maxGames) {
        maxGames = stats.games;
        mostActivePlayer = name;
      }
    });

    // Meilleur performeur (taux de victoire)
    let bestPerformer = '';
    let bestWinRate = 0;
    playerStats.forEach((stats, name) => {
      const winRate = stats.wins / stats.games;
      if (winRate > bestWinRate && stats.games >= 3) { // Au moins 3 parties
        bestWinRate = winRate;
        bestPerformer = name;
      }
    });

    // Performances des joueurs
    const playerPerformance = Array.from(playerStats.entries())
      .map(([name, stats]) => ({
        name,
        winRate: (stats.wins / stats.games) * 100,
        avgScore: stats.totalScore / stats.games,
        games: stats.games
      }))
      .filter(p => p.games >= 2)
      .sort((a, b) => b.winRate - a.winRate);

    // Jeux par jour
    const gamesByDay = Array.from(gamesByDayMap.entries())
      .map(([day, games]) => ({ day, games }));

    // Distribution des scores
    const scoreDistribution = Array.from(scoreDistributionMap.entries())
      .map(([range, count]) => ({ range, count }))
      .sort((a, b) => parseInt(a.range) - parseInt(b.range));

    // Manches par partie
    const roundsByGame = gameHistory.map((game, index) => ({
      game: index + 1,
      rounds: game.totalRounds
    }));

    // Statistiques par heure
    const timeOfDayStats = Array.from(timeOfDayMap.entries())
      .map(([hour, games]) => ({ hour, games }))
      .sort((a, b) => a.hour - b.hour);

    return {
      totalGames,
      totalPlayers: allPlayers.size,
      averageGameDuration: totalDuration / totalGames || 0,
      averageRoundsPerGame: totalRounds / totalGames,
      mostActivePlayer,
      bestPerformer,
      gamesByDay,
      scoreDistribution,
      playerPerformance,
      roundsByGame,
      timeOfDayStats
    };
  }, [gameHistory]);

  if (gameHistory.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics Avancées
          </CardTitle>
          <CardDescription>
            Vos métriques de jeu apparaîtront ici
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              Jouez quelques parties pour voir vos analytics
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const topPerformance = analytics.playerPerformance.slice(0, 3);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Métriques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {analytics.totalGames}
            </div>
            <div className="text-sm text-gray-600">Parties totales</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {analytics.totalPlayers}
            </div>
            <div className="text-sm text-gray-600">Joueurs uniques</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {analytics.averageRoundsPerGame.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Manches/partie</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {analytics.averageGameDuration.toFixed(0)}m
            </div>
            <div className="text-sm text-gray-600">Durée moyenne</div>
          </CardContent>
        </Card>
      </div>

      {/* MVP et stats principales */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Joueurs Vedettes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Plus actif:</span>
              <Badge variant="outline">{analytics.mostActivePlayer}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Meilleur taux:</span>
              <Badge variant="default">{analytics.bestPerformer}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Top Performeurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformance.map((player, index) => (
                <div key={player.name} className="flex items-center gap-3">
                  <div className="text-lg">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{player.name}</div>
                    <div className="text-sm text-gray-600">
                      {player.winRate.toFixed(1)}% • {player.games} parties
                    </div>
                  </div>
                  <Progress value={player.winRate} className="w-20 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Évolution des manches */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Évolution des Parties</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analytics.roundsByGame}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rounds" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution des scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribution des Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Analyse temporelle */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Parties par jour */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activité par Jour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={analytics.gamesByDay}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="games"
                  nameKey="day"
                >
                  {analytics.gamesByDay.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activité par heure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activité par Heure</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={analytics.timeOfDayStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="games" 
                  stroke="#ffc658" 
                  fill="#ffc658"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radar des performances */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Radar des Performances</CardTitle>
          <CardDescription>
            Comparaison multi-dimensionnelle des meilleurs joueurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={topPerformance.slice(0, 3).map(p => ({
              name: p.name,
              'Taux de victoire': p.winRate,
              'Consistance': Math.max(0, 100 - p.avgScore), // Inversé pour que plus bas = mieux
              'Expérience': Math.min(100, p.games * 2), // Normalisé
              'Performance': p.winRate
            }))}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar 
                dataKey="Taux de victoire" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};