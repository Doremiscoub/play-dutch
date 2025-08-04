import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import { 
  Brain, TrendingUp, Target, Zap, Clock, Award, 
  BarChart3, Activity, Crosshair, Gauge, Star, Crown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AdvancedStatsProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer?: Player | null;
}

export const AdvancedStats: React.FC<AdvancedStatsProps> = ({
  players,
  roundHistory,
  selectedPlayer
}) => {
  const filteredPlayers = selectedPlayer ? [selectedPlayer] : players;

  // Calculer les statistiques avancées
  const calculateAdvancedStats = () => {
    return filteredPlayers.map(player => {
      const scores = player.rounds.map(r => r.score);
      if (!scores.length) return null;

      const stats = player.stats;
      const totalScore = player.totalScore;
      const roundCount = scores.length;

      // Métriques de performance
      const mean = scores.reduce((a, b) => a + b, 0) / roundCount;
      const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / roundCount;
      const standardDeviation = Math.sqrt(variance);
      
      // Coefficient de variation (consistance relative)
      const coefficientOfVariation = mean > 0 ? (standardDeviation / mean) * 100 : 0;

      // Analyse des séquences
      const streaks = [];
      let currentStreak = { type: scores[0] === 0 ? 'good' : 'normal', length: 1, start: 0 };
      
      for (let i = 1; i < scores.length; i++) {
        const isGoodRound = scores[i] <= 5;
        const prevGoodRound = scores[i-1] <= 5;
        
        if (isGoodRound === prevGoodRound) {
          currentStreak.length++;
        } else {
          streaks.push(currentStreak);
          currentStreak = { 
            type: isGoodRound ? 'good' : 'normal', 
            length: 1, 
            start: i 
          };
        }
      }
      streaks.push(currentStreak);

      const bestStreak = streaks.filter(s => s.type === 'good').reduce((best, current) => 
        current.length > best.length ? current : best, { length: 0 });

      // Prédictions et tendances
      const recentPerformance = scores.slice(-3);
      const recentAvg = recentPerformance.reduce((a, b) => a + b, 0) / recentPerformance.length;
      const trend = stats?.improvementRate || 0;
      
      // Prédiction simple pour la prochaine manche
      const predictedNext = Math.max(0, Math.round(recentAvg + trend));

      // Score de momentum
      const momentum = calculateMomentum(scores);

      // Efficacité par tranche de score
      const scoreDistribution = {
        perfect: scores.filter(s => s === 0).length,
        excellent: scores.filter(s => s > 0 && s <= 5).length,
        good: scores.filter(s => s > 5 && s <= 10).length,
        average: scores.filter(s => s > 10 && s <= 15).length,
        poor: scores.filter(s => s > 15).length
      };

      return {
        player,
        totalScore,
        roundCount,
        mean: Math.round(mean * 10) / 10,
        standardDeviation: Math.round(standardDeviation * 10) / 10,
        coefficientOfVariation: Math.round(coefficientOfVariation * 10) / 10,
        bestStreak: bestStreak.length,
        recentForm: Math.round(recentAvg * 10) / 10,
        trend,
        predictedNext,
        momentum,
        scoreDistribution,
        dutchCount: stats?.dutchCount || 0,
        winProbability: calculateWinProbability(player, players)
      };
    }).filter(Boolean);
  };

  // Calculer le momentum
  const calculateMomentum = (scores: number[]): number => {
    if (scores.length < 3) return 0;
    
    const recent = scores.slice(-3);
    const previous = scores.slice(-6, -3);
    
    if (previous.length === 0) return 0;
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const previousAvg = previous.reduce((a, b) => a + b, 0) / previous.length;
    
    return Math.round((previousAvg - recentAvg) * 10) / 10; // Positif = amélioration
  };

  // Calculer la probabilité de victoire
  const calculateWinProbability = (player: Player, allPlayers: Player[]): number => {
    if (allPlayers.length < 2) return 100;
    
    const sorted = allPlayers.sort((a, b) => a.totalScore - b.totalScore);
    const playerRank = sorted.findIndex(p => p.id === player.id) + 1;
    const totalPlayers = allPlayers.length;
    
    // Formule simple basée sur la position et l'écart
    const rankFactor = (totalPlayers - playerRank + 1) / totalPlayers;
    const scoreFactor = player.stats?.improvementRate || 0;
    
    return Math.min(100, Math.max(0, Math.round((rankFactor * 80 + scoreFactor * 20))));
  };

  // Préparer les données pour les graphiques
  const prepareDistributionData = () => {
    const advancedStats = calculateAdvancedStats();
    
    return advancedStats.map(stat => ({
      name: stat.player.name,
      perfect: stat.scoreDistribution.perfect,
      excellent: stat.scoreDistribution.excellent,
      good: stat.scoreDistribution.good,
      average: stat.scoreDistribution.average,
      poor: stat.scoreDistribution.poor
    }));
  };

  const preparePerformanceData = () => {
    const advancedStats = calculateAdvancedStats();
    
    return advancedStats.map(stat => ({
      name: stat.player.name,
      consistency: 100 - stat.coefficientOfVariation,
      performance: Math.max(0, 100 - stat.mean * 3),
      momentum: Math.max(0, 50 + stat.momentum * 10),
      prediction: Math.max(0, 100 - stat.predictedNext * 3)
    }));
  };

  const advancedStats = calculateAdvancedStats();
  const distributionData = prepareDistributionData();
  const performanceData = preparePerformanceData();

  const config = {
    perfect: { label: 'Parfait (0)', color: '#22c55e' },
    excellent: { label: 'Excellent (1-5)', color: '#84cc16' },
    good: { label: 'Bon (6-10)', color: '#eab308' },
    average: { label: 'Moyen (11-15)', color: '#f97316' },
    poor: { label: 'Difficile (16+)', color: '#ef4444' }
  };

  if (!advancedStats.length) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Aucune donnée avancée disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cartes de métriques avancées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advancedStats.map((stat, index) => (
          <motion.div
            key={stat.player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-2xl">{stat.player.emoji || '😊'}</span>
                  <span className="font-bold">{stat.player.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    #{players.sort((a, b) => a.totalScore - b.totalScore).findIndex(p => p.id === stat.player.id) + 1}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Probabilité de victoire */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Chances de victoire</span>
                    </div>
                    <span className="text-sm font-bold">{stat.winProbability}%</span>
                  </div>
                  <Progress value={stat.winProbability} className="h-2" />
                </div>

                {/* Forme récente */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Forme récente</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    stat.recentForm <= 5 ? 'text-green-600' :
                    stat.recentForm <= 10 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {stat.recentForm} pts/manche
                  </span>
                </div>

                {/* Momentum */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Momentum</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.momentum > 1 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : stat.momentum < -1 ? (
                      <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                    ) : (
                      <Activity className="h-3 w-3 text-gray-500" />
                    )}
                    <span className={`text-sm font-semibold ${
                      stat.momentum > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.momentum > 0 ? '+' : ''}{stat.momentum}
                    </span>
                  </div>
                </div>

                {/* Prédiction */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm text-muted-foreground">Prédiction</span>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">
                    ~{stat.predictedNext} pts
                  </span>
                </div>

                {/* Meilleure série */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Meilleure série</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">
                    {stat.bestStreak} manches
                  </span>
                </div>

                {/* Coefficient de variation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-teal-500" />
                    <span className="text-sm text-muted-foreground">Régularité</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    stat.coefficientOfVariation < 30 ? 'text-green-600' :
                    stat.coefficientOfVariation < 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {(100 - stat.coefficientOfVariation).toFixed(0)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Graphique de distribution des scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              Distribution des Performances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    
                    <Bar dataKey="perfect" stackId="a" name="Parfait (0)" fill={config.perfect.color} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="excellent" stackId="a" name="Excellent (1-5)" fill={config.excellent.color} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="good" stackId="a" name="Bon (6-10)" fill={config.good.color} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="average" stackId="a" name="Moyen (11-15)" fill={config.average.color} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="poor" stackId="a" name="Difficile (16+)" fill={config.poor.color} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Matrice de performance multidimensionnelle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Crosshair className="h-5 w-5 text-secondary" />
              Matrice de Performance Multidimensionnelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique scatter consistance vs performance */}
              <div className="h-64">
                <h4 className="text-sm font-medium mb-3 text-center">Consistance vs Performance</h4>
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="consistency" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10}
                        domain={[0, 100]}
                        label={{ value: 'Consistance', position: 'insideBottom', offset: -5, fontSize: 10 }}
                      />
                      <YAxis 
                        dataKey="performance" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10}
                        domain={[0, 100]}
                        label={{ value: 'Performance', angle: -90, position: 'insideLeft', fontSize: 10 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Scatter data={performanceData} fill="hsl(var(--primary))">
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Graphique radar des métriques */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-center">Profils Comparatifs</h4>
                {performanceData.map((data, index) => (
                  <div key={data.name} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                      />
                      <span className="text-sm font-medium">{data.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="flex justify-between">
                          <span>Consistance</span>
                          <span>{data.consistency.toFixed(0)}%</span>
                        </div>
                        <Progress value={data.consistency} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Performance</span>
                          <span>{data.performance.toFixed(0)}%</span>
                        </div>
                        <Progress value={data.performance} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Momentum</span>
                          <span>{data.momentum.toFixed(0)}%</span>
                        </div>
                        <Progress value={data.momentum} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Prédiction</span>
                          <span>{data.prediction.toFixed(0)}%</span>
                        </div>
                        <Progress value={data.prediction} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};