
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { BarChart3, TrendingUp, Trophy, Target, Award } from 'lucide-react';
import GameStatsGrid from './stats/GameStatsGrid';

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
      className="mt-8 bg-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Effets décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-dutch-blue/10 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-dutch-purple/10 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10">
        {/* En-tête avec animation */}
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="p-3 bg-gradient-to-br from-dutch-blue to-dutch-purple rounded-2xl shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
            Statistiques de la partie
          </h3>
        </motion.div>
        
        {/* Grille de statistiques avec animations séquentielles */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Trophy, label: "Manches", value: stats.totalRounds, color: "from-yellow-400 to-yellow-600" },
            { icon: Target, label: "Moy. générale", value: stats.averageScore, color: "from-blue-400 to-blue-600" },
            { icon: TrendingUp, label: "Meilleur score", value: stats.bestScore, color: "from-green-400 to-green-600" },
            { icon: Award, label: "Dutch réussis", value: stats.dutchCount, color: "from-purple-400 to-purple-600" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              className="bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-4 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-xl shadow-sm`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DetailedGameStats;
