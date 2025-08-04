import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Trophy, Target, Award, TrendingUp, Users, Zap, BarChart3, Star,
  Timer, Flame, Activity, Crown, Medal
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatsOverviewProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer?: Player | null;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory,
  selectedPlayer
}) => {
  // Calculs des statistiques globales
  const calculateGlobalStats = () => {
    if (!players.length) return null;

    const allScores = players.flatMap(p => p.rounds.map(round => round.score));
    const averageScore = allScores.length 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length * 10) / 10
      : 0;
    
    const bestScore = Math.min(...players.map(p => p.totalScore));
    const worstScore = Math.max(...players.map(p => p.totalScore));
    const dutchCount = roundHistory ? roundHistory.filter(r => r.dutchPlayerId).length : 0;
    
    const bestRound = allScores.length ? Math.min(...allScores) : 0;
    const worstRound = allScores.length ? Math.max(...allScores) : 0;
    
    // Calculs avancés
    const totalGames = players.reduce((sum, p) => sum + p.rounds.length, 0);
    const perfectRounds = allScores.filter(score => score === 0).length;
    const highRiskRounds = allScores.filter(score => score >= 20).length;
    
    // Top performer
    const topPlayer = players.reduce((best, current) => 
      current.totalScore < best.totalScore ? current : best
    );

    // Most consistent player
    const playerConsistency = players.map(player => {
      if (player.rounds.length < 2) return { player, consistency: 0 };
      const scores = player.rounds.map(r => r.score);
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
      return { player, consistency: Math.sqrt(variance) };
    });

    const mostConsistent = playerConsistency.reduce((best, current) => 
      current.consistency < best.consistency ? current : best
    ).player;

    return { 
      averageScore, 
      bestScore, 
      worstScore,
      dutchCount,
      bestRound,
      worstRound,
      topPlayer,
      mostConsistent,
      totalGames,
      perfectRounds,
      highRiskRounds
    };
  };

  const stats = calculateGlobalStats();
  if (!stats) return null;

  const filteredPlayers = selectedPlayer ? [selectedPlayer] : players;

  const keyMetrics = [
    {
      title: "Performance de la Partie",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "from-primary to-secondary",
      metrics: [
        { label: "Manches jouées", value: roundCount, suffix: roundCount === 1 ? "manche" : "manches", icon: <Timer className="h-4 w-4" /> },
        { label: "Score moyen", value: stats.averageScore, suffix: "pts", icon: <Target className="h-4 w-4" /> },
        { label: "Meilleur total", value: stats.bestScore, suffix: "pts", icon: <Crown className="h-4 w-4" /> },
        { label: "Écart de score", value: stats.worstScore - stats.bestScore, suffix: "pts", icon: <Activity className="h-4 w-4" /> }
      ]
    },
    {
      title: "Records et Exploits",
      icon: <Trophy className="h-5 w-5" />,
      color: "from-secondary to-accent",
      metrics: [
        { label: "Meilleure manche", value: stats.bestRound, suffix: "pts", icon: <Medal className="h-4 w-4" /> },
        { label: "Pire manche", value: stats.worstRound, suffix: "pts", icon: <Flame className="h-4 w-4" /> },
        { label: "Dutch réussis", value: stats.dutchCount, suffix: "fois", icon: <Zap className="h-4 w-4" /> },
        { label: "Manches parfaites", value: stats.perfectRounds, suffix: "fois", icon: <Star className="h-4 w-4" /> }
      ]
    },
    {
      title: "Analyse Comportementale",
      icon: <Users className="h-5 w-5" />,
      color: "from-accent to-primary",
      metrics: [
        { label: "Champion actuel", value: stats.topPlayer.name, suffix: `(${stats.topPlayer.totalScore} pts)`, icon: <Trophy className="h-4 w-4" /> },
        { label: "Plus régulier", value: stats.mostConsistent.name, suffix: "", icon: <Target className="h-4 w-4" /> },
        { label: "Prises de risque", value: stats.highRiskRounds, suffix: "manches", icon: <Flame className="h-4 w-4" /> },
        { label: "Participation", value: "100%", suffix: "", icon: <Activity className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Métriques clés */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {keyMetrics.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: sectionIndex * 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            <Card className="h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 bg-gradient-to-r ${section.color} rounded-xl shadow-md`}>
                    {React.cloneElement(section.icon, { className: "h-5 w-5 text-white" })}
                  </div>
                  <span className="text-lg font-bold">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metricIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + sectionIndex * 0.1 + metricIndex * 0.05 }}
                    className="flex items-center justify-between p-3 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {React.cloneElement(metric.icon, { className: "h-4 w-4 text-muted-foreground" })}
                      <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-foreground">
                        {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                      </span>
                      {metric.suffix && (
                        <span className="text-xs text-muted-foreground ml-1">{metric.suffix}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Classement des joueurs avec style amélioré */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Classement Live</span>
              <Badge variant="secondary" className="ml-auto">
                {filteredPlayers.length} joueur{filteredPlayers.length > 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPlayers.sort((a, b) => a.totalScore - b.totalScore).map((player, index) => {
                const percentage = scoreLimit > 0 ? Math.min(100, (player.totalScore / scoreLimit) * 100) : 0;
                const globalRank = players.sort((a, b) => a.totalScore - b.totalScore).findIndex(p => p.id === player.id) + 1;
                
                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/30 to-muted/10 backdrop-blur-sm rounded-xl border border-border/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      {/* Position badge */}
                      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                        globalRank === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        globalRank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                        globalRank === 3 ? 'bg-gradient-to-r from-amber-600 to-yellow-700' :
                        'bg-gradient-to-r from-primary to-secondary'
                      }`}>
                        {globalRank === 1 && <Crown className="h-5 w-5" />}
                        {globalRank !== 1 && globalRank}
                      </div>
                      
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-3xl">{player.emoji || '😊'}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-foreground truncate">{player.name}</span>
                            <div className="text-right">
                              <span className="text-xl font-black text-foreground">{player.totalScore}</span>
                              <span className="text-sm text-muted-foreground ml-1">pts</span>
                            </div>
                          </div>
                          
                          {/* Barre de progression */}
                          <div className="relative">
                            <div className="w-full bg-muted/50 h-3 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary via-secondary to-accent shadow-inner"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1.2, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                              />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-medium text-foreground/80">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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