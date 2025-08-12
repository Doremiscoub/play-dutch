import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Target, TrendingUp, TrendingDown, Activity, 
  Crown, Medal, Flame, Star 
} from 'lucide-react';

interface MobileStatsOptimizerProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer?: Player | null;
}

// Version condensée et optimisée pour mobile
export const MobileStatsOptimizer: React.FC<MobileStatsOptimizerProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory,
  selectedPlayer
}) => {
  // Calculs optimisés avec memoization
  const stats = useMemo(() => {
    if (!players.length) return null;

    const filteredPlayers = selectedPlayer ? [selectedPlayer] : players;
    const allScores = players.flatMap(p => p.rounds.map(round => round.score));
    
    const topPlayer = players.reduce((best, current) => 
      current.totalScore < best.totalScore ? current : best
    );

    const averageScore = allScores.length 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length * 10) / 10
      : 0;

    const bestRound = allScores.length ? Math.min(...allScores) : 0;
    const perfectRounds = allScores.filter(score => score === 0).length;
    const dutchCount = roundHistory ? roundHistory.filter(r => r.dutchPlayerId).length : 0;

    return {
      filteredPlayers,
      topPlayer,
      averageScore,
      bestRound,
      perfectRounds,
      dutchCount
    };
  }, [players, selectedPlayer, roundHistory]);

  // Analyse des tendances simplifiée
  const playerTrends = useMemo(() => {
    if (!stats?.filteredPlayers) return [];

    return stats.filteredPlayers.map(player => {
      const scores = player.rounds.map(r => r.score);
      if (scores.length < 2) return { player, trend: 'stable', recentForm: 0 };

      const recentScores = scores.slice(-3);
      const recentForm = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
      
      // Tendance simple basée sur les 3 dernières manches vs moyennes précédentes
      const earlierScores = scores.slice(0, -3);
      const earlierAvg = earlierScores.length ? 
        earlierScores.reduce((a, b) => a + b, 0) / earlierScores.length : recentForm;
      
      const trend = recentForm < earlierAvg - 1 ? 'improving' : 
                   recentForm > earlierAvg + 1 ? 'declining' : 'stable';

      return { player, trend, recentForm };
    });
  }, [stats?.filteredPlayers]);

  if (!stats) return null;

  return (
    <div className="space-y-4">
      {/* Métriques essentielles - format mobile */}
      <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-primary" />
            Résumé de la Partie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-lg font-bold text-foreground">{roundCount}</div>
              <div className="text-xs text-muted-foreground">Manches</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-lg font-bold text-foreground">{stats.averageScore}</div>
              <div className="text-xs text-muted-foreground">Moy. pts</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-lg font-bold text-foreground">{stats.bestRound}</div>
              <div className="text-xs text-muted-foreground">Meilleure</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-lg font-bold text-foreground">{stats.dutchCount}</div>
              <div className="text-xs text-muted-foreground">Dutch</div>
            </div>
          </div>

          {/* Champion actuel */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
            <Crown className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{stats.topPlayer.emoji || '👑'}</span>
                <span className="font-bold">{stats.topPlayer.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                En tête avec {stats.topPlayer.totalScore} pts
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classement simplifié pour mobile */}
      <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Medal className="h-5 w-5 text-secondary-foreground" />
            Classement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {stats.filteredPlayers
            .sort((a, b) => a.totalScore - b.totalScore)
            .map((player, index) => {
              const percentage = scoreLimit > 0 ? Math.min(100, (player.totalScore / scoreLimit) * 100) : 0;
              const globalRank = players.sort((a, b) => a.totalScore - b.totalScore).findIndex(p => p.id === player.id) + 1;
              
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl"
                >
                  {/* Position */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    globalRank === 1 ? 'bg-gradient-to-r from-primary to-primary/70' :
                    globalRank === 2 ? 'bg-gradient-to-r from-muted-foreground to-foreground/60' :
                    globalRank === 3 ? 'bg-gradient-to-r from-secondary to-secondary/70' :
                    'bg-gradient-to-r from-primary to-secondary'
                  }`}>
                    {globalRank === 1 ? <Crown className="h-4 w-4" /> : globalRank}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{player.emoji || '😊'}</span>
                        <span className="font-semibold truncate">{player.name}</span>
                      </div>
                      <span className="font-bold text-foreground">{player.totalScore} pts</span>
                    </div>
                    
                    {/* Barre de progression compacte */}
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                </motion.div>
              );
            })}
        </CardContent>
      </Card>

      {/* Tendances compactes */}
      <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-accent-foreground" />
            Forme Récente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {playerTrends.map((trend, index) => (
            <motion.div
              key={trend.player.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-muted/20 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{trend.player.emoji || '😊'}</span>
                <span className="font-medium truncate">{trend.player.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {trend.recentForm.toFixed(1)} pts
                </span>
                <Badge 
                  variant="outline"
                  className={`text-xs ${
                    trend.trend === 'improving' ? 'border-primary/40 text-primary bg-primary/10' :
                    trend.trend === 'declining' ? 'border-destructive/40 text-destructive bg-destructive/10' :
                    'border-muted-foreground/40 text-muted-foreground bg-muted/20'
                  }`}
                >
                  {trend.trend === 'improving' && <TrendingDown className="h-3 w-3" />}
                  {trend.trend === 'declining' && <TrendingUp className="h-3 w-3" />}
                  {trend.trend === 'stable' && <Activity className="h-3 w-3" />}
                </Badge>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Fun facts compacts */}
      {(stats.perfectRounds > 0 || stats.dutchCount > 0) && (
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-primary" />
              Exploits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {stats.perfectRounds > 0 && (
                <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                  <Star className="h-6 w-6 text-primary mx-auto mb-1" />
                  <div className="text-lg font-bold text-foreground">{stats.perfectRounds}</div>
                  <div className="text-xs text-muted-foreground">Parfaites</div>
                </div>
              )}
              {stats.dutchCount > 0 && (
                <div className="text-center p-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                  <Flame className="h-6 w-6 text-accent-foreground mx-auto mb-1" />
                  <div className="text-lg font-bold text-foreground">{stats.dutchCount}</div>
                  <div className="text-xs text-muted-foreground">Dutch</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};