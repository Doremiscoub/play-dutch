
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { BarChart3, Trophy, Award } from 'lucide-react';

interface DetailedGameStatsProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
}

const DetailedGameStats: React.FC<DetailedGameStatsProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory = []
}) => {
  const calculateDetailedStats = () => {
    if (!players.length) return null;

    const totalRounds = roundCount;
    const totalPlayers = players.length;

    const allScores = players.flatMap(p => p.rounds.map(round => round.score));
    const averageScore = allScores.length
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length * 10) / 10
      : 0;

    const bestScore = Math.min(...players.map(p => p.totalScore));
    const worstScore = Math.max(...players.map(p => p.totalScore));
    const dutchCount = roundHistory ? roundHistory.filter(r => r.dutchPlayerId).length : 0;

    const bestRound = allScores.length ? Math.min(...allScores) : 0;
    const worstRound = allScores.length ? Math.max(...allScores) : 0;

    const improvementRates = players.map(player => {
      if (player.rounds.length < 2) return 0;
      const scores = player.rounds.map(r => r.score);
      const best = Math.min(...scores);
      const worst = Math.max(...scores);
      return worst - best;
    });
    const avgImprovement = improvementRates.length
      ? Math.round(improvementRates.reduce((a, b) => a + b, 0) / improvementRates.length)
      : 0;

    const playerConsistency = players.map(player => {
      if (player.rounds.length < 2) return 0;
      const scores = player.rounds.map(r => r.score);
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
      return Math.sqrt(variance);
    });
    const avgConsistency = playerConsistency.length
      ? Math.round(playerConsistency.reduce((a, b) => a + b, 0) / playerConsistency.length * 10) / 10
      : 0;

    return {
      totalRounds,
      totalPlayers,
      averageScore,
      bestScore,
      worstScore,
      dutchCount,
      bestRound,
      worstRound,
      avgImprovement,
      avgConsistency
    };
  };

  const stats = calculateDetailedStats();
  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
      className="mt-8 glass-elevated shadow-lg rounded-3xl p-8 relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* En-tête */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="p-3 bg-dutch-purple rounded-2xl shadow-sm">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Statistiques de la partie
          </h3>
        </motion.div>

        {/* Statistiques en cartes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Carte Performance Générale */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            className="bg-muted/50 border border-border rounded-2xl p-6 hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-dutch-blue rounded-xl shadow-sm">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-foreground">Performance</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Manches jouées</span>
                <span className="text-xl font-bold text-foreground">{stats.totalRounds}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Meilleur score</span>
                <span className="text-xl font-bold text-green-600">{stats.bestScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Score moyen</span>
                <span className="text-xl font-bold text-blue-600">{stats.averageScore}</span>
              </div>
            </div>
          </motion.div>

          {/* Carte Événements Spéciaux */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            className="bg-muted/50 border border-border rounded-2xl p-6 hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-dutch-orange rounded-xl shadow-sm">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-foreground">Événements</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Dutch réussis</span>
                <span className="text-xl font-bold text-purple-600">{stats.dutchCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Joueurs actifs</span>
                <span className="text-xl font-bold text-orange-600">{stats.totalPlayers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pire score</span>
                <span className="text-xl font-bold text-red-500">{stats.worstScore}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DetailedGameStats;
