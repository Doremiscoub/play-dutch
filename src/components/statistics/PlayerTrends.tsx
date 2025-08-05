import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlayerTrendsProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer?: Player | null;
}

export const PlayerTrends: React.FC<PlayerTrendsProps> = ({
  players,
  roundHistory,
  selectedPlayer
}) => {
  const filteredPlayers = selectedPlayer ? [selectedPlayer] : players;

  // Préparer les données d'évolution cumulative
  const prepareCumulativeData = () => {
    if (!players.length || !players[0].rounds.length) return [];
    
    const rounds = Array.from({ length: players[0].rounds.length }, (_, i) => i + 1);
    
    return rounds.map(roundIndex => {
      const roundData: any = { 
        round: roundIndex,
        name: `Manche ${roundIndex}`
      };
      
      filteredPlayers.forEach(player => {
        if (player.rounds[roundIndex - 1]) {
          // Score cumulé jusqu'à cette manche
          const cumulativeScore = player.rounds.slice(0, roundIndex).reduce((sum, round) => sum + round.score, 0);
          roundData[player.name] = cumulativeScore;
          roundData[`${player.name}_current`] = player.rounds[roundIndex - 1].score;
        }
      });
      
      return roundData;
    });
  };

  // Préparer les données d'évolution des moyennes mobiles
  const prepareMovingAverageData = () => {
    if (!players.length || !players[0].rounds.length) return [];
    
    const rounds = Array.from({ length: players[0].rounds.length }, (_, i) => i + 1);
    
    return rounds.map(roundIndex => {
      const roundData: any = { 
        round: roundIndex,
        name: `Manche ${roundIndex}`
      };
      
      filteredPlayers.forEach(player => {
        if (player.rounds[roundIndex - 1]) {
          // Moyenne mobile sur les 3 dernières manches
          const windowSize = Math.min(3, roundIndex);
          const recentScores = player.rounds.slice(Math.max(0, roundIndex - windowSize), roundIndex).map(r => r.score);
          const movingAverage = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length;
          roundData[`${player.name}_avg`] = Math.round(movingAverage * 10) / 10;
        }
      });
      
      return roundData;
    });
  };

  // Analyser les tendances
  const analyzeTrends = () => {
    return filteredPlayers.map(player => {
      const scores = player.rounds.map(r => r.score);
      if (scores.length < 2) return { player, trend: 'stable', momentum: 0, consistency: 0, recentForm: 0 };

      // Calculer la tendance (régression linéaire simple)
      const n = scores.length;
      const x = Array.from({length: n}, (_, i) => i + 1);
      const sumX = x.reduce((a, b) => a + b, 0);
      const sumY = scores.reduce((a, b) => a + b, 0);
      const sumXY = x.reduce((sum, xi, i) => sum + xi * scores[i], 0);
      const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      
      // Calculer la consistance (écart-type)
      const mean = sumY / n;
      const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / n;
      const consistency = Math.sqrt(variance);

      return {
        player,
        trend: slope < -0.5 ? 'improving' : slope > 0.5 ? 'declining' : 'stable',
        momentum: slope,
        consistency,
        recentForm: scores.length > 0 ? scores.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, scores.length) : 0
      };
    });
  };

  const cumulativeData = prepareCumulativeData();
  const movingAverageData = prepareMovingAverageData();
  const trends = analyzeTrends();

  // Configuration des couleurs
  const playerColors = [
    'rgb(59, 130, 246)',   // blue-500 
    'rgb(139, 92, 246)',   // purple-500 
    'rgb(16, 185, 129)',   // emerald-500 
    'rgb(249, 115, 22)',   // orange-500 
    'rgb(236, 72, 153)',   // pink-500 
    'rgb(6, 182, 212)',    // cyan-500
    'rgb(251, 191, 36)',   // yellow-500
    'rgb(239, 68, 68)'     // red-500
  ];

  const getPlayerColor = (index: number): string => {
    return playerColors[index % playerColors.length];
  };

  const config = filteredPlayers.reduce((acc, player, index) => {
    acc[player.name] = { 
      label: player.name,
      color: getPlayerColor(index)
    };
    acc[`${player.name}_avg`] = { 
      label: `${player.name} (Moyenne)`,
      color: getPlayerColor(index)
    };
    return acc;
  }, {} as any);

  if (!cumulativeData.length) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Aucune donnée de tendance disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analyse des tendances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-2xl">{trend.player.emoji || '😊'}</span>
                  <span className="font-bold">{trend.player.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tendance</span>
                  <Badge 
                    variant="outline"
                    className={`${
                      trend.trend === 'improving' ? 'border-green-500 text-green-700 bg-green-50' :
                      trend.trend === 'declining' ? 'border-red-500 text-red-700 bg-red-50' :
                      'border-blue-500 text-blue-700 bg-blue-50'
                    }`}
                  >
                    {trend.trend === 'improving' && <TrendingDown className="h-3 w-3 mr-1" />}
                    {trend.trend === 'declining' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {trend.trend === 'stable' && <Activity className="h-3 w-3 mr-1" />}
                    {trend.trend === 'improving' ? 'S\'améliore' : 
                     trend.trend === 'declining' ? 'En difficulté' : 'Stable'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Forme récente</span>
                  <span className="font-semibold">{(trend.recentForm || 0).toFixed(1)} pts/manche</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Régularité</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          trend.consistency < 5 ? 'bg-green-500' :
                          trend.consistency < 10 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (15 - trend.consistency) / 15 * 100)}%` }}
                      />
                    </div>
                    <Target className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphique d'évolution cumulative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-trinity-blue-500" style={{ color: 'rgb(10,132,255)' }} />
              <span className="text-trinity-blue-500" style={{ color: 'rgb(10,132,255)' }}>Évolution des Scores Cumulés</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-84">
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                  <AreaChart data={cumulativeData} margin={{ top: 40, right: 50, left: 40, bottom: 40 }}>
                    <defs>
                      {filteredPlayers.map((player, index) => (
                        <linearGradient key={player.id} id={`gradient-${player.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={getPlayerColor(index)} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={getPlayerColor(index)} stopOpacity={0.05} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="round" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    
                    {filteredPlayers.map((player, index) => (
                      <Area
                        key={player.id}
                        type="monotoneX"
                        dataKey={player.name}
                        stroke={getPlayerColor(index)}
                        strokeWidth={2}
                        fill={`url(#gradient-${player.id})`}
                        activeDot={{ r: 4, stroke: 'white', strokeWidth: 1 }}
                        dot={{ r: 2, fill: getPlayerColor(index), stroke: 'white', strokeWidth: 1 }}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Graphique des moyennes mobiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-trinity-purple-500" style={{ color: 'rgb(139,92,246)' }} />
              <span className="text-trinity-purple-500" style={{ color: 'rgb(139,92,246)' }}>Moyennes Mobiles (3 manches)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%" minHeight={240}>
                  <LineChart data={movingAverageData} margin={{ top: 35, right: 45, left: 35, bottom: 35 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="round" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    
                    {filteredPlayers.map((player, index) => (
                      <Line
                        key={`${player.id}-avg`}
                        type="monotoneX"
                        dataKey={`${player.name}_avg`}
                        stroke={getPlayerColor(index)}
                        strokeWidth={2}
                        dot={{ r: 2, fill: getPlayerColor(index), stroke: 'white', strokeWidth: 1 }}
                        activeDot={{ r: 4, stroke: 'white', strokeWidth: 1 }}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};