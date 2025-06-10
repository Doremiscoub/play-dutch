
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, Award, Zap, Target, Activity, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EnhancedPlayerStatsProps {
  players: Player[];
  className?: string;
}

const EnhancedPlayerStats: React.FC<EnhancedPlayerStatsProps> = ({ players, className }) => {
  // Préparer les données pour l'évolution des scores
  const prepareScoreEvolution = () => {
    if (!players.length || !players[0].rounds.length) return [];
    
    const rounds = Array.from({ length: players[0].rounds.length }, (_, i) => i + 1);
    
    return rounds.map(roundIndex => {
      const roundData: any = { 
        round: roundIndex,
        name: `R${roundIndex}`
      };
      
      players.forEach(player => {
        if (player.rounds[roundIndex - 1]) {
          // Calcul du score cumulé
          const cumulativeScore = player.rounds
            .slice(0, roundIndex)
            .reduce((sum, round) => sum + round.score, 0);
          roundData[player.name] = cumulativeScore;
        }
      });
      
      return roundData;
    });
  };

  // Analyse des performances par joueur
  const analyzePlayerPerformance = (player: Player) => {
    const scores = player.rounds.map(r => r.score);
    const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const bestRound = Math.min(...scores);
    const worstRound = Math.max(...scores);
    const consistency = scores.length > 1 ? 
      Math.sqrt(scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length) : 0;
    
    return {
      average: Math.round(average * 10) / 10,
      bestRound,
      worstRound,
      consistency: Math.round(consistency * 10) / 10,
      dutchCount: player.stats?.dutchCount || 0,
      trend: scores.length > 2 ? calculateTrend(scores) : 'stable'
    };
  };

  const calculateTrend = (scores: number[]): 'improving' | 'declining' | 'stable' => {
    const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
    const secondHalf = scores.slice(Math.floor(scores.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const difference = firstAvg - secondAvg;
    if (difference > 1) return 'improving';
    if (difference < -1) return 'declining';
    return 'stable';
  };

  const scoreEvolutionData = prepareScoreEvolution();
  
  const getPlayerColor = (index: number): string => {
    const colors = ['#1EAEDB', '#F97316', '#8B5CF6', '#D946EF', '#10B981', '#FBBF24', '#EF4444', '#0EA5E9'];
    return colors[index % colors.length];
  };

  const config = players.reduce((acc, player, index) => {
    acc[player.name] = { 
      label: player.name,
      color: getPlayerColor(index)
    };
    return acc;
  }, {} as any);

  const trendIcons = {
    improving: <TrendingUp className="h-4 w-4 text-green-500" />,
    declining: <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />,
    stable: <Activity className="h-4 w-4 text-blue-500" />
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Évolution des scores cumulés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-6"
      >
        <div className="flex items-center mb-4">
          <Activity className="h-5 w-5 text-dutch-blue mr-2" />
          <h3 className="text-xl font-bold text-dutch-purple">Évolution des Scores Cumulés</h3>
        </div>
        
        <div className="h-80">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreEvolutionData}>
                <defs>
                  {players.map((player, index) => (
                    <linearGradient key={player.id} id={`gradient-${player.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={getPlayerColor(index)} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={getPlayerColor(index)} stopOpacity={0.1} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                
                {players.map((player, index) => (
                  <Line
                    key={player.id}
                    type="monotone"
                    dataKey={player.name}
                    stroke={getPlayerColor(index)}
                    strokeWidth={3}
                    dot={{ r: 5, fill: getPlayerColor(index) }}
                    activeDot={{ r: 8, stroke: 'white', strokeWidth: 2, fill: getPlayerColor(index) }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </motion.div>

      {/* Analyses individuelles des joueurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map((player, index) => {
          const stats = analyzePlayerPerformance(player);
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-dutch-purple flex items-center gap-2">
                  {player.name}
                  {trendIcons[stats.trend]}
                </h4>
                <div className="text-2xl">{player.emoji || '🎮'}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Moyenne</div>
                  <div className="text-2xl font-bold text-blue-600">{stats.average}</div>
                </div>
                
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Meilleur</div>
                  <div className="text-2xl font-bold text-green-600">{stats.bestRound}</div>
                </div>
                
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Dutch</div>
                  <div className="text-2xl font-bold text-orange-600">{stats.dutchCount}</div>
                </div>
                
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Régularité</div>
                  <div className="text-2xl font-bold text-purple-600">{stats.consistency}</div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Badge 
                  variant="outline" 
                  className={`${
                    stats.trend === 'improving' ? 'bg-green-100 text-green-700' :
                    stats.trend === 'declining' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}
                >
                  {stats.trend === 'improving' ? 'En progression' :
                   stats.trend === 'declining' ? 'En difficulté' :
                   'Stable'}
                </Badge>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedPlayerStats;
