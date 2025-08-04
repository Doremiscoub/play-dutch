import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Flame, Snowflake, Zap, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RoundHeatmapProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

export const RoundHeatmap: React.FC<RoundHeatmapProps> = ({
  players,
  roundHistory
}) => {
  // Préparer les données de la heatmap
  const prepareHeatmapData = () => {
    if (!players.length || !players[0].rounds.length) return [];

    const rounds = Array.from({ length: players[0].rounds.length }, (_, i) => i + 1);
    
    return rounds.map(roundIndex => {
      const roundData = {
        round: roundIndex,
        scores: [] as Array<{
          player: Player;
          score: number;
          isDutch: boolean;
          percentile: number;
        }>
      };

      // Collecter tous les scores de cette manche
      const allRoundScores: number[] = [];
      players.forEach(player => {
        if (player.rounds[roundIndex - 1]) {
          allRoundScores.push(player.rounds[roundIndex - 1].score);
        }
      });

      // Calculer les percentiles
      allRoundScores.sort((a, b) => a - b);

      players.forEach(player => {
        if (player.rounds[roundIndex - 1]) {
          const score = player.rounds[roundIndex - 1].score;
          const isDutch = player.rounds[roundIndex - 1].isDutch || false;
          
          // Calculer le percentile (position relative)
          const rank = allRoundScores.filter(s => s <= score).length;
          const percentile = (rank / allRoundScores.length) * 100;

          roundData.scores.push({
            player,
            score,
            isDutch,
            percentile
          });
        }
      });

      return roundData;
    });
  };

  // Obtenir la couleur basée sur le score et le percentile
  const getScoreColor = (score: number, percentile: number, isDutch: boolean) => {
    if (isDutch) return 'bg-purple-500 text-white border-purple-600'; // Dutch special
    if (score === 0) return 'bg-green-500 text-white border-green-600'; // Perfect
    if (percentile <= 25) return 'bg-green-400 text-white border-green-500'; // Excellent
    if (percentile <= 50) return 'bg-yellow-400 text-black border-yellow-500'; // Good
    if (percentile <= 75) return 'bg-orange-400 text-white border-orange-500'; // Average
    return 'bg-red-500 text-white border-red-600'; // Poor
  };

  // Analyser les patterns
  const analyzePatterns = () => {
    const heatmapData = prepareHeatmapData();
    const patterns = {
      bestRound: { round: 0, avgScore: Infinity },
      worstRound: { round: 0, avgScore: -1 },
      mostConsistentRound: { round: 0, variance: Infinity },
      mostVolatileRound: { round: 0, variance: -1 },
      dutchRounds: [] as number[]
    };

    heatmapData.forEach((roundData, index) => {
      const scores = roundData.scores.map(s => s.score);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      // Variance pour mesurer la consistance
      const variance = scores.reduce((acc, score) => acc + Math.pow(score - avgScore, 2), 0) / scores.length;

      if (avgScore < patterns.bestRound.avgScore) {
        patterns.bestRound = { round: index + 1, avgScore };
      }
      
      if (avgScore > patterns.worstRound.avgScore) {
        patterns.worstRound = { round: index + 1, avgScore };
      }

      if (variance < patterns.mostConsistentRound.variance) {
        patterns.mostConsistentRound = { round: index + 1, variance };
      }

      if (variance > patterns.mostVolatileRound.variance) {
        patterns.mostVolatileRound = { round: index + 1, variance };
      }

      // Vérifier s'il y a eu un Dutch
      if (roundData.scores.some(s => s.isDutch)) {
        patterns.dutchRounds.push(index + 1);
      }
    });

    return patterns;
  };

  const heatmapData = prepareHeatmapData();
  const patterns = analyzePatterns();

  if (!heatmapData.length) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Aucune donnée de manche disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analyse des patterns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-sm text-green-700 font-medium">Meilleure Manche</div>
              <div className="text-lg font-bold text-green-800">
                Manche {patterns.bestRound.round}
              </div>
              <div className="text-xs text-green-600">
                {patterns.bestRound.avgScore.toFixed(1)} pts moy.
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <Flame className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-sm text-red-700 font-medium">Manche Difficile</div>
              <div className="text-lg font-bold text-red-800">
                Manche {patterns.worstRound.round}
              </div>
              <div className="text-xs text-red-600">
                {patterns.worstRound.avgScore.toFixed(1)} pts moy.
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Snowflake className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-blue-700 font-medium">Plus Consistante</div>
              <div className="text-lg font-bold text-blue-800">
                Manche {patterns.mostConsistentRound.round}
              </div>
              <div className="text-xs text-blue-600">
                Écart minimal
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm text-purple-700 font-medium">Dutch Réussis</div>
              <div className="text-lg font-bold text-purple-800">
                {patterns.dutchRounds.length}
              </div>
              <div className="text-xs text-purple-600">
                {patterns.dutchRounds.length > 0 ? `Manches ${patterns.dutchRounds.join(', ')}` : 'Aucun'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Heatmap principale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary" />
              Carte de Chaleur des Performances
              <div className="ml-auto flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {heatmapData.length} manches
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {players.length} joueurs
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="space-y-4">
                {/* En-tête avec noms des joueurs */}
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-16 text-xs font-medium text-muted-foreground">Manche</div>
                    {players.map((player, index) => (
                      <div key={player.id} className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-sm">{player.emoji || '😊'}</span>
                          <span className="text-xs font-medium text-muted-foreground truncate">
                            {player.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lignes de la heatmap */}
                  {heatmapData.map((roundData, roundIndex) => (
                    <motion.div
                      key={roundData.round}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + roundIndex * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-16 text-center">
                        <Badge variant="outline" className="text-xs">
                          {roundData.round}
                        </Badge>
                      </div>
                      
                      {roundData.scores.map((scoreData, playerIndex) => (
                        <Tooltip key={scoreData.player.id}>
                          <TooltipTrigger asChild>
                            <div className="flex-1">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + roundIndex * 0.05 + playerIndex * 0.02 }}
                                className={`
                                  w-full h-12 rounded-lg border-2 flex items-center justify-center font-bold text-sm
                                  transition-all duration-200 hover:scale-105 cursor-pointer relative
                                  ${getScoreColor(scoreData.score, scoreData.percentile, scoreData.isDutch)}
                                `}
                              >
                                {scoreData.score}
                                {scoreData.isDutch && (
                                  <Zap className="absolute top-0 right-0 h-3 w-3 text-yellow-300 transform translate-x-1 -translate-y-1" />
                                )}
                              </motion.div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-center">
                              <div className="font-medium">{scoreData.player.name}</div>
                              <div className="text-sm">Manche {roundData.round}</div>
                              <div className="text-sm">Score: {scoreData.score} pts</div>
                              {scoreData.isDutch && (
                                <div className="text-xs text-purple-300">⚡ Dutch réussi!</div>
                              )}
                              <div className="text-xs text-muted-foreground">
                                {scoreData.percentile <= 25 ? 'Excellent' :
                                 scoreData.percentile <= 50 ? 'Bon' :
                                 scoreData.percentile <= 75 ? 'Moyen' : 'À améliorer'}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </motion.div>
                  ))}
                </div>

                {/* Légende */}
                <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                  <div className="text-sm font-medium text-muted-foreground mb-3">Légende</div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded border"></div>
                      <span>Excellent (≤25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-400 rounded border"></div>
                      <span>Bon (≤50%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-400 rounded border"></div>
                      <span>Moyen (≤75%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded border"></div>
                      <span>À améliorer (&gt;75%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded border relative">
                        <Zap className="absolute top-0 right-0 h-2 w-2 text-yellow-300 transform translate-x-1 -translate-y-1" />
                      </div>
                      <span>Dutch réussi</span>
                    </div>
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
