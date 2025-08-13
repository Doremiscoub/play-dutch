import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy, TrendingUp, Star, Zap, ChevronDown } from 'lucide-react';

interface MobileFunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
  scoreLimit?: number;
}

const MobileFunPlayerCard: React.FC<MobileFunPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected,
  scoreLimit = 100
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isWinner = rank === 1;
  const avgScore = player.rounds.length > 0 ? Math.round(player.totalScore / player.rounds.length * 10) / 10 : 0;
  const bestRound = player.rounds.length > 0 ? Math.min(...player.rounds.map(r => r.score)) : 0;
  const dutchCount = player.rounds.filter(r => r.isDutch).length;
  const recentRounds = player.rounds.slice(-3);

  // Système de couleurs simplifié pour mobile
  const getRankTheme = () => {
    const themes = {
      1: {
        gradient: "from-amber-400/20 to-yellow-400/10",
        border: "border-amber-400/40",
        text: "text-amber-700",
        accent: "bg-amber-500",
        badge: "bg-amber-100"
      },
      2: {
        gradient: "from-blue-400/20 to-cyan-400/10",
        border: "border-blue-400/40",
        text: "text-blue-700",
        accent: "bg-blue-500",
        badge: "bg-blue-100"
      },
      3: {
        gradient: "from-emerald-400/20 to-green-400/10",
        border: "border-emerald-400/40",
        text: "text-emerald-700",
        accent: "bg-emerald-500",
        badge: "bg-emerald-100"
      },
      default: {
        gradient: "from-slate-400/20 to-gray-400/10",
        border: "border-slate-400/40",
        text: "text-slate-700",
        accent: "bg-slate-500",
        badge: "bg-slate-100"
      }
    };
    return themes[rank as keyof typeof themes] || themes.default;
  };
  
  const theme = getRankTheme();

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    onSelect(player);
  };

  return (
    <motion.div 
      className={cn(
        "relative rounded-xl backdrop-blur-sm border transition-all duration-200 cursor-pointer",
        `bg-gradient-to-r ${theme.gradient}`,
        theme.border,
        isSelected || isExpanded ? "ring-2 ring-purple-400/30 scale-[1.01]" : "hover:scale-[1.005]"
      )}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: rank * 0.02 }}
      layout
    >
      {/* Badge gagnant compact */}
      {isWinner && (
        <motion.div 
          className="absolute -top-1 -right-1 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
            👑
          </div>
        </motion.div>
      )}

      <div className="p-3">
        {/* Header compact - Layout horizontal optimisé */}
        <div className="flex items-center gap-3">
          {/* Rang et Avatar compacts */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.div 
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm",
                `bg-gradient-to-br ${theme.gradient}`,
                theme.border,
                "border"
              )}
              whileHover={{ scale: 1.1 }}
            >
              {rank}
            </motion.div>
            
            <motion.div 
              className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center text-lg"
              whileHover={{ scale: 1.1 }}
            >
              {player.emoji || '🎮'}
            </motion.div>
          </div>

          {/* Nom et infos principales */}
          <div className="flex-1 min-w-0">
            <h3 className={cn("font-bold text-base leading-tight break-words hyphens-auto", theme.text)}>
              {player.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>🎯 {player.rounds.length}</span>
              {dutchCount > 0 && <span className="text-orange-600">🏆 {dutchCount}</span>}
            </div>
          </div>

          {/* Score principal compact */}
          <div className="flex flex-col items-end flex-shrink-0">
            <motion.div 
              className={cn("text-xl font-bold", theme.text)}
              whileHover={{ scale: 1.05 }}
            >
              {player.totalScore}
            </motion.div>
            <div className="text-xs text-gray-500">
              {avgScore} moy
            </div>
          </div>

          {/* Bouton d'expansion */}
          <motion.div
            animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </div>

        {/* Contenu étendu optimisé mobile */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/20 pt-3 mt-3"
            >
              {/* Progression vers la limite */}
              {scoreLimit && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{Math.max(0, scoreLimit - player.totalScore)} restant</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div 
                      className={cn("h-2 rounded-full", theme.accent)}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(player.totalScore / scoreLimit * 100, 100)}%` }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    />
                  </div>
                </div>
              )}

              {/* Dernières manches - Layout horizontal compact */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-600 mb-2">Dernières manches</h4>
                <div className="flex gap-1">
                  {recentRounds.map((round, index) => {
                    const getScoreColor = (score: number) => {
                      if (score === 0) return 'bg-purple-100 text-purple-700';
                      if (score <= 5) return 'bg-green-100 text-green-700';
                      if (score <= 15) return 'bg-yellow-100 text-yellow-700';
                      return 'bg-red-100 text-red-700';
                    };
                    
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn("px-2 py-1 rounded text-xs font-medium flex-1 text-center", getScoreColor(round.score))}
                      >
                        {round.score}
                        {round.isDutch && ' 🏆'}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Stats compactes - Grid 2 colonnes */}
              <div className="grid grid-cols-2 gap-2">
                <div className={cn("p-2 rounded-lg text-center", theme.badge)}>
                  <div className="text-xs text-gray-600">Meilleur</div>
                  <div className={cn("font-bold text-sm", theme.text)}>{bestRound}</div>
                </div>
                <div className={cn("p-2 rounded-lg text-center", theme.badge)}>
                  <div className="text-xs text-gray-600">Tendance</div>
                  <div className="text-sm">
                    {recentRounds.length >= 2 && recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score ? '📈' : '📊'}
                  </div>
                </div>
              </div>

              {/* Badge champion compact */}
              {isWinner && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg text-center"
                >
                  <div className="flex items-center justify-center gap-1 text-yellow-700 font-medium text-xs">
                    <Trophy className="h-3 w-3" />
                    Champion !
                    ⭐
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MobileFunPlayerCard;