
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Crown, Zap, Star, Trophy, Target, Flame } from 'lucide-react';

interface FunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect?: (player: Player) => void;
  isSelected?: boolean;
}

const FunPlayerCard: React.FC<FunPlayerCardProps> = ({ 
  player, 
  rank, 
  totalPlayers,
  onSelect,
  isSelected = false
}) => {
  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  const bestRound = player.rounds.length > 0 ? Math.min(...player.rounds.map(r => r.score)) : 0;
  const worstRound = player.rounds.length > 0 ? Math.max(...player.rounds.map(r => r.score)) : 0;
  const averageScore = player.rounds.length > 0 ? Math.round(player.totalScore / player.rounds.length) : 0;
  
  const getRankIcon = () => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Star className="h-5 w-5 text-amber-600" />;
      default: return <Target className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getRankBadgeColor = () => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-yellow-200/50';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500 shadow-gray-200/50';
      case 3: return 'bg-gradient-to-r from-amber-400 to-orange-600 shadow-amber-200/50';
      default: return 'bg-gradient-to-r from-dutch-blue to-dutch-purple shadow-dutch-blue/30';
    }
  };
  
  const getCardStyle = () => {
    if (rank === 1) {
      return 'bg-gradient-to-br from-yellow-50/90 via-white/90 to-orange-50/90 border-yellow-300/60 shadow-yellow-200/30';
    }
    if (rank === 2) {
      return 'bg-gradient-to-br from-gray-50/90 via-white/90 to-slate-50/90 border-gray-300/60 shadow-gray-200/30';
    }
    if (rank === 3) {
      return 'bg-gradient-to-br from-amber-50/90 via-white/90 to-orange-50/90 border-amber-300/60 shadow-amber-200/30';
    }
    return 'bg-white/70 border-white/50 shadow-lg';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`
        backdrop-blur-xl border rounded-3xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden
        ${getCardStyle()}
        ${isSelected ? 'ring-2 ring-dutch-blue/50 shadow-xl' : 'shadow-lg hover:shadow-xl'}
      `}
      onClick={() => onSelect?.(player)}
    >
      {/* Effet de brillance pour les Dutch */}
      {dutchCount > 0 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      )}

      <div className="relative z-10">
        {/* Header avec rang et informations principales */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Badge de rang */}
            <motion.div 
              className={`w-10 h-10 rounded-full ${getRankBadgeColor()} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
              whileHover={{ scale: 1.1 }}
            >
              {rank}
            </motion.div>
            
            {/* Avatar emoji */}
            <motion.div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg relative overflow-hidden"
              style={{ backgroundColor: player.avatarColor }}
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
              <span className="relative z-10 drop-shadow-lg">
                {player.emoji || '🎮'}
              </span>
              {dutchCount > 0 && (
                <motion.div
                  className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
          
          {/* Score principal */}
          <div className="text-right">
            <motion.div 
              className="text-3xl font-black text-gray-800 leading-none"
              animate={rank === 1 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {player.totalScore}
            </motion.div>
            <div className="text-sm text-gray-600 font-medium">points</div>
          </div>
        </div>

        {/* Nom du joueur et icône de rang */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-800 truncate max-w-32">
              {player.name}
            </h3>
            {getRankIcon()}
          </div>
          
          {/* Statistiques rapides */}
          <div className="flex items-center gap-3 text-xs">
            {dutchCount > 0 && (
              <span className="flex items-center gap-1 bg-green-100/80 text-green-800 px-2 py-1 rounded-full font-medium shadow-sm">
                <Zap className="h-3 w-3" />
                {dutchCount}
              </span>
            )}
            {player.rounds.length > 0 && (
              <span className="text-gray-600 font-medium">
                Moy: {averageScore}
              </span>
            )}
          </div>
        </div>
        
        {/* Badges de performance */}
        {player.rounds.length > 0 && (
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="bg-blue-100/80 text-blue-800 px-2 py-1 rounded-full font-medium">
              Meilleur: {bestRound}
            </span>
            {worstRound !== bestRound && (
              <span className="bg-red-100/80 text-red-800 px-2 py-1 rounded-full font-medium">
                Pire: {worstRound}
              </span>
            )}
          </div>
        )}
        
        {/* Indicateurs de manches */}
        {player.rounds.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center">
            {player.rounds.slice(-8).map((round, index) => (
              <motion.div
                key={player.rounds.length - 8 + index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shadow-md transition-all hover:scale-110 ${
                  round.isDutch 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-green-200' 
                    : round.score === 0 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-blue-200'
                      : round.score <= 10
                        ? 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 shadow-gray-200'
                        : round.score <= 30
                          ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-orange-800 shadow-orange-200'
                          : 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-red-200'
                }`}
                title={`Manche ${player.rounds.length - 8 + index + 1}: ${round.score} points${round.isDutch ? ' (Dutch!)' : ''}`}
              >
                {round.isDutch ? <Flame className="h-3 w-3" /> : round.score}
              </motion.div>
            ))}
            {player.rounds.length > 8 && (
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-medium bg-gray-100 text-gray-500">
                +{player.rounds.length - 8}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FunPlayerCard;
