import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Radar as RadarIcon, Target, Zap, TrendingUp, Activity, Crown, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PlayerRadarProps {
  players: Player[];
  selectedPlayer?: Player | null;
}

export const PlayerRadar: React.FC<PlayerRadarProps> = ({
  players,
  selectedPlayer
}) => {
  const filteredPlayers = selectedPlayer ? [selectedPlayer] : players;

  // Calculer les métriques radar pour chaque joueur
  const calculateRadarMetrics = (player: Player) => {
    const stats = player.stats;
    if (!stats || !player.rounds.length) {
      return {
        consistency: 0,
        efficiency: 0,
        risk_management: 0,
        adaptability: 0,
        pressure_handling: 0,
        technical_skill: 0
      };
    }

    const scores = player.rounds.map(r => r.score);
    const roundCount = scores.length;
    
    // Consistance (100 - variance normalisée)
    const mean = scores.reduce((a, b) => a + b, 0) / roundCount;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / roundCount;
    const consistency = Math.max(0, Math.min(100, 100 - (Math.sqrt(variance) * 4)));

    // Efficacité (basée sur la moyenne par rapport à la limite idéale)
    const efficiency = Math.max(0, Math.min(100, 100 - (stats.averageScore * 3.33)));

    // Gestion du risque (capacité à éviter les gros scores)
    const highScores = scores.filter(s => s >= 15).length;
    const risk_management = Math.max(0, Math.min(100, 100 - (highScores / roundCount * 100)));

    // Adaptabilité (variation de performance selon les manches)
    const improvements = scores.slice(1).filter((score, i) => score < scores[i]).length;
    const adaptability = roundCount > 1 ? Math.min(100, (improvements / (roundCount - 1)) * 100) : 50;

    // Gestion de la pression (performance en fin de partie)
    const lastThird = scores.slice(-Math.ceil(roundCount / 3));
    const lastThirdAvg = lastThird.reduce((a, b) => a + b, 0) / lastThird.length;
    const pressure_handling = Math.max(0, Math.min(100, 100 - (lastThirdAvg * 4)));

    // Compétence technique (Dutch et meilleurs coups)
    const perfectShots = scores.filter(s => s === 0).length;
    const dutchBonus = (stats.dutchCount || 0) * 10;
    const technical_skill = Math.min(100, (perfectShots / roundCount * 50) + dutchBonus);

    return {
      consistency: Math.round(consistency),
      efficiency: Math.round(efficiency),
      risk_management: Math.round(risk_management),
      adaptability: Math.round(adaptability),
      pressure_handling: Math.round(pressure_handling),
      technical_skill: Math.round(technical_skill)
    };
  };

  // Préparer les données radar
  const radarData = [
    { subject: 'Régularité', fullMark: 100 },
    { subject: 'Efficacité', fullMark: 100 },
    { subject: 'Gestion du Risque', fullMark: 100 },
    { subject: 'Adaptabilité', fullMark: 100 },
    { subject: 'Pression', fullMark: 100 },
    { subject: 'Technique', fullMark: 100 }
  ];

  // Ajouter les données de chaque joueur
  const playersData = filteredPlayers.map((player, index) => {
    const metrics = calculateRadarMetrics(player);
    return {
      player,
      metrics,
      color: [
        'hsl(var(--primary))',
        'hsl(var(--secondary))', 
        'hsl(var(--accent))',
        '#F97316', 
        '#8B5CF6', 
        '#10B981'
      ][index % 6],
      data: radarData.map((item, i) => ({
        ...item,
        [player.name]: Object.values(metrics)[i]
      }))
    };
  });

  // Combiner toutes les données
  const combinedData = radarData.map((item, i) => {
    const combined = { ...item };
    playersData.forEach(({ player, metrics }) => {
      combined[player.name] = Object.values(metrics)[i];
    });
    return combined;
  });

  // Trouver le joueur le plus équilibré
  const getMostBalanced = () => {
    if (!playersData.length) return null;
    
    return playersData.reduce((best, current) => {
      const currentVariance = Object.values(current.metrics).reduce((acc, val, i, arr) => {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        return acc + Math.pow(val - mean, 2);
      }, 0) / 6;
      
      const bestVariance = Object.values(best.metrics).reduce((acc, val, i, arr) => {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        return acc + Math.pow(val - mean, 2);
      }, 0) / 6;
      
      return currentVariance < bestVariance ? current : best;
    });
  };

  const mostBalanced = getMostBalanced();

  const config = playersData.reduce((acc, { player, color }) => {
    acc[player.name] = { 
      label: player.name,
      color
    };
    return acc;
  }, {} as any);

  if (!playersData.length) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Aucune donnée de comparaison disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Radar principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <RadarIcon className="h-5 w-5 text-primary" />
              Profils de Performance
              <Badge variant="secondary" className="ml-auto">
                {filteredPlayers.length} joueur{filteredPlayers.length > 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ChartContainer config={config}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={combinedData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    
                    {playersData.map(({ player, color }, index) => (
                      <Radar
                        key={player.id}
                        name={player.name}
                        dataKey={player.name}
                        stroke={color}
                        fill={color}
                        fillOpacity={0.1}
                        strokeWidth={2}
                        dot={{ r: 4, fill: color }}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cartes des métriques individuelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playersData.map((playerData, index) => (
          <motion.div
            key={playerData.player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-2xl">{playerData.player.emoji || '😊'}</span>
                  <span className="font-bold">{playerData.player.name}</span>
                  {mostBalanced?.player.id === playerData.player.id && (
                    <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary/20">
                      <Crown className="h-3 w-3 mr-1" />
                      Équilibré
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(playerData.metrics).map(([key, value], metricIndex) => {
                  const icons = {
                    consistency: <Target className="h-4 w-4" />,
                    efficiency: <Zap className="h-4 w-4" />,
                    risk_management: <Activity className="h-4 w-4" />,
                    adaptability: <TrendingUp className="h-4 w-4" />,
                    pressure_handling: <Crown className="h-4 w-4" />,
                    technical_skill: <Users className="h-4 w-4" />
                  };
                  
                  const labels = {
                    consistency: 'Régularité',
                    efficiency: 'Efficacité',
                    risk_management: 'Gestion du Risque',
                    adaptability: 'Adaptabilité',
                    pressure_handling: 'Pression',
                    technical_skill: 'Technique'
                  };

                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {icons[key as keyof typeof icons]}
                        <span className="text-sm text-muted-foreground">
                          {labels[key as keyof typeof labels]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 + metricIndex * 0.05 }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{value}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};