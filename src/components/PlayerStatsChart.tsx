
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { Award, Zap, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DESIGN_TOKENS } from '@/design';

interface PlayerStatsChartProps {
  players: Player[];
  className?: string;
}

const PlayerStatsChart: React.FC<PlayerStatsChartProps> = ({ players, className }) => {
  // Préparer les données pour le graphique d'évolution des scores
  const prepareScoreData = () => {
    if (!players.length || !players[0].rounds.length) return [];
    
    const rounds = Array.from({ length: players[0].rounds.length }, (_, i) => i + 1);
    
    return rounds.map(roundIndex => {
      const roundData: any = { 
        name: `R${roundIndex}`,
        round: roundIndex
      };
      
      players.forEach(player => {
        if (player.rounds[roundIndex - 1]) {
          const score = player.rounds[roundIndex - 1].score;
          roundData[player.name] = score;
          
          // Ajouter une propriété pour indiquer si c'est un Dutch
          if (player.rounds[roundIndex - 1].isDutch) {
            roundData[`${player.name}Dutch`] = true;
          }
        }
      });
      
      return roundData;
    });
  };
  
  // Préparer les données pour le graphique de distribution des scores
  const prepareDistributionData = () => {
    return players.map(player => {
      // Calculer la distribution des scores (0-5, 6-10, 11-15, etc.)
      const scores = player.rounds.map(r => r.score);
      const distribution: { [key: string]: number } = {
        '0-5': 0,
        '6-10': 0,
        '11-15': 0,
        '16-20': 0,
        '21+': 0
      };
      
      scores.forEach(score => {
        if (score <= 5) distribution['0-5']++;
        else if (score <= 10) distribution['6-10']++;
        else if (score <= 15) distribution['11-15']++;
        else if (score <= 20) distribution['16-20']++;
        else distribution['21+']++;
      });
      
      return {
        name: player.name,
        ...distribution
      };
    });
  };
  
  const scoreData = prepareScoreData();
  const distributionData = prepareDistributionData();
  
  // Générer une couleur unique pour chaque joueur via le système centralisé
  const playerColorsFromTokens = [
    DESIGN_TOKENS.primitive.dutch.blue[500],
    DESIGN_TOKENS.primitive.dutch.orange[500], 
    DESIGN_TOKENS.primitive.dutch.purple[500],
    DESIGN_TOKENS.primitive.kids.pink[500],
    DESIGN_TOKENS.primitive.dutch.green[500],
    DESIGN_TOKENS.primitive.kids.lime[500],
    DESIGN_TOKENS.primitive.kids.turquoise[500],
    DESIGN_TOKENS.primitive.neutral[600]
  ];
  
  const getPlayerColor = (index: number): string => {
    return playerColorsFromTokens[index % playerColorsFromTokens.length];
  };
  
  const noDataAvailable = !players.length || !players[0].rounds.length;
  
  // Configuration pour les graphiques
  const config = players.reduce((acc, player, index) => {
    acc[player.name] = { 
      label: player.name,
      color: getPlayerColor(index)
    };
    return acc;
  }, {} as any);

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <div className="flex items-center mb-3">
          <Activity className="h-5 w-5 mr-2" style={{ color: DESIGN_TOKENS.primitive.dutch.blue[500] }} />
          <h3 className="text-lg font-bold" style={{ color: DESIGN_TOKENS.primitive.dutch.purple[500] }}>Évolution des points</h3>
        </div>
        
        {noDataAvailable ? (
          <div className="h-64 flex items-center justify-center rounded-xl border overflow-hidden"
            style={{
              background: `${DESIGN_TOKENS.primitive.neutral[0]}60`,
              borderColor: `${DESIGN_TOKENS.primitive.neutral[0]}30`
            }}
          >
            <p style={{ color: DESIGN_TOKENS.primitive.neutral[500] }}>Aucune donnée disponible</p>
          </div>
        ) : (
          <motion.div 
            className="rounded-xl border shadow-sm p-4 h-64"
            style={{
              background: `${DESIGN_TOKENS.primitive.neutral[0]}80`,
              backdropFilter: 'blur(4px)',
              borderColor: `${DESIGN_TOKENS.primitive.neutral[0]}30`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={scoreData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    {players.map((player, index) => (
                      <React.Fragment key={player.id}>
                        <linearGradient id={`gradient-${player.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={getPlayerColor(index)} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={getPlayerColor(index)} stopOpacity={0.1} />
                        </linearGradient>
                      </React.Fragment>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={DESIGN_TOKENS.primitive.neutral[100]} />
                  <XAxis dataKey="name" stroke={DESIGN_TOKENS.primitive.neutral[500]} fontSize={12} />
                  <YAxis stroke={DESIGN_TOKENS.primitive.neutral[500]} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  
                  {players.map((player, index) => (
                    <Area
                      key={player.id}
                      type="monotone"
                      dataKey={player.name}
                      stroke={getPlayerColor(index)}
                      fillOpacity={1}
                      fill={`url(#gradient-${player.id})`}
                      activeDot={{ r: 8, stroke: 'white', strokeWidth: 2, fill: getPlayerColor(index) }}
                      dot={(props: any) => {
                        const isDutch = props.payload[`${player.name}Dutch`];
                        return isDutch ? (
                          <svg x={props.cx - 6} y={props.cy - 6} width={12} height={12} fill={getPlayerColor(index)} viewBox="0 0 16 16">
                            <polygon points="8,0 16,8 8,16 0,8" />
                          </svg>
                        ) : (
                          <circle cx={props.cx} cy={props.cy} r={4} fill={getPlayerColor(index)} stroke="white" strokeWidth={2} />
                        );
                      }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>
        )}
      </div>
      
      <div>
        <div className="flex items-center mb-3">
          <TrendingUp className="h-5 w-5 mr-2" style={{ color: DESIGN_TOKENS.primitive.dutch.orange[500] }} />
          <h3 className="text-lg font-bold" style={{ color: DESIGN_TOKENS.primitive.dutch.purple[500] }}>Répartition des scores</h3>
        </div>
        
        {noDataAvailable ? (
          <div className="h-64 flex items-center justify-center bg-white/60 rounded-xl border border-white/30">
            <p className="text-gray-500">Aucune donnée disponible</p>
          </div>
        ) : (
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm p-4 h-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={distributionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={DESIGN_TOKENS.primitive.neutral[100]} />
                  <XAxis dataKey="name" stroke={DESIGN_TOKENS.primitive.neutral[500]} fontSize={12} />
                  <YAxis stroke={DESIGN_TOKENS.primitive.neutral[500]} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  
                  <Bar dataKey="0-5" stackId="a" name="0-5 pts" fill={DESIGN_TOKENS.primitive.dutch.green[400]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="6-10" stackId="a" name="6-10 pts" fill={DESIGN_TOKENS.primitive.kids.turquoise[400]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="11-15" stackId="a" name="11-15 pts" fill={DESIGN_TOKENS.primitive.dutch.blue[400]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="16-20" stackId="a" name="16-20 pts" fill={DESIGN_TOKENS.primitive.dutch.purple[400]} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="21+" stackId="a" name="21+ pts" fill={DESIGN_TOKENS.primitive.kids.pink[400]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="rounded-xl border shadow-sm p-4"
          style={{
            background: `${DESIGN_TOKENS.primitive.neutral[0]}80`,
            backdropFilter: 'blur(4px)',
            borderColor: `${DESIGN_TOKENS.primitive.neutral[0]}30`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <Zap className="h-4 w-4 mr-2" style={{ color: DESIGN_TOKENS.primitive.dutch.orange[500] }} />
            <h3 className="font-semibold">Dutch League</h3>
          </div>
          
          <div className="space-y-2 mt-3">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: DESIGN_TOKENS.primitive.neutral[700] }}>{player.name}</span>
                <Badge 
                  variant="outline" 
                  className="border-none"
                  style={{
                    backgroundColor: `${DESIGN_TOKENS.primitive.dutch.orange[500]}10`,
                    color: DESIGN_TOKENS.primitive.dutch.orange[500]
                  }}
                >
                  {player.stats?.dutchCount || 0}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="rounded-xl border shadow-sm p-4"
          style={{
            background: `${DESIGN_TOKENS.primitive.neutral[0]}80`,
            backdropFilter: 'blur(4px)',
            borderColor: `${DESIGN_TOKENS.primitive.neutral[0]}30`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center mb-2">
            <Award className="h-4 w-4 mr-2" style={{ color: DESIGN_TOKENS.primitive.dutch.green[500] }} />
            <h3 className="font-semibold">Top Performances</h3>
          </div>
          
          <div className="space-y-2 mt-3">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: DESIGN_TOKENS.primitive.neutral[700] }}>{player.name}</span>
                <Badge 
                  variant="outline" 
                  className="border-none"
                  style={{
                    backgroundColor: `${DESIGN_TOKENS.primitive.dutch.green[500]}10`,
                    color: DESIGN_TOKENS.primitive.dutch.green[500]
                  }}
                >
                  {player.stats?.bestRound !== null ? player.stats?.bestRound : '-'}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerStatsChart;
