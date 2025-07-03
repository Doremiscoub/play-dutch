import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Target, Award, TrendingUp, Users, Zap, BarChart3, Star } from 'lucide-react';

interface StatisticsViewProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const StatisticsView: React.FC<StatisticsViewProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory
}) => {
  // Calculs des statistiques globales
  const calculateStats = () => {
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
    
    // Top performer
    const topPlayer = players.reduce((best, current) => 
      current.totalScore < best.totalScore ? current : best
    );

    // Most consistent player (lowest score variance)
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
      mostConsistent
    };
  };

  const stats = calculateStats();
  if (!stats) return null;

  const statCards = [
    {
      title: "Performances générales",
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      bgGradient: "from-dutch-blue to-dutch-purple",
      items: [
        { label: "Manches jouées", value: roundCount, suffix: roundCount === 1 ? "manche" : "manches" },
        { label: "Score moyen", value: stats.averageScore, suffix: "pts" },
        { label: "Meilleur total", value: stats.bestScore, suffix: "pts" },
        { label: "Pire total", value: stats.worstScore, suffix: "pts" }
      ]
    },
    {
      title: "Records de manche",
      icon: <Target className="h-6 w-6 text-white" />,
      bgGradient: "from-dutch-purple to-dutch-orange",
      items: [
        { label: "Meilleure manche", value: stats.bestRound, suffix: "pts" },
        { label: "Pire manche", value: stats.worstRound, suffix: "pts" },
        { label: "Dutch réussis", value: stats.dutchCount, suffix: stats.dutchCount === 1 ? "fois" : "fois" },
        { label: "Joueurs actifs", value: players.length, suffix: players.length === 1 ? "joueur" : "joueurs" }
      ]
    },
    {
      title: "Champions de la partie",
      icon: <Trophy className="h-6 w-6 text-white" />,
      bgGradient: "from-dutch-orange to-dutch-green",
      items: [
        { label: "Meilleur joueur", value: stats.topPlayer.name, suffix: `(${stats.topPlayer.totalScore} pts)` },
        { label: "Plus régulier", value: stats.mostConsistent.name, suffix: "" },
        { label: "Progression", value: "À venir", suffix: "" },
        { label: "Participation", value: "100%", suffix: "" }
      ]
    }
  ];

  return (
    <motion.div
      key="stats-view"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* En-tête de la section statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-2xl shadow-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
            Statistiques de la partie
          </h2>
        </div>
        <p className="text-gray-600 font-medium">
          Analyse complète des performances et records
        </p>
      </motion.div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className="bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* En-tête de carte */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 bg-gradient-to-r ${card.bgGradient} rounded-xl shadow-lg`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
            </div>

            {/* Statistiques */}
            <div className="space-y-4">
              {card.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 + itemIndex * 0.05 }}
                  className="flex justify-between items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50"
                >
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-gray-900">
                      {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                    </span>
                    {item.suffix && (
                      <span className="text-xs text-gray-500 ml-1">{item.suffix}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphique des joueurs */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-dutch-green to-dutch-blue rounded-xl shadow-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Classement des joueurs</h3>
        </div>
        
        <div className="space-y-3">
          {players.sort((a, b) => a.totalScore - b.totalScore).map((player, index) => {
            const percentage = scoreLimit > 0 ? (player.totalScore / scoreLimit) * 100 : 0;
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-gradient-to-r from-dutch-orange to-yellow-500' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                  index === 2 ? 'bg-gradient-to-r from-amber-600 to-yellow-700' :
                  'bg-gradient-to-r from-dutch-blue to-dutch-purple'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{player.emoji || '😊'}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-800">{player.name}</span>
                      <span className="font-black text-lg text-gray-900">{player.totalScore} pts</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, percentage)}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsView;