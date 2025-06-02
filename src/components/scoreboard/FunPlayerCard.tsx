
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Crown, Zap, Star, Trophy, Target } from 'lucide-react';

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
  const bestRound = Math.min(...player.rounds.map(r => r.score));
  const worstRound = Math.max(...player.rounds.map(r => r.score));
  
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
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-orange-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };
  
  const getCardStyle = () => {
    if (rank === 1) {
      return 'bg-gradient-to-br from-yellow-50/90 to-orange-50/90 border-yellow-300/50 shadow-yellow-200/50';
    }
    if (rank === 2) {
      return 'bg-gradient-to-br from-gray-50/90 to-slate-50/90 border-gray-300/50 shadow-gray-200/50';
    }
    if (rank === 3) {
      return 'bg-gradient-to-br from-amber-50/90 to-orange-50/90 border-amber-300/50 shadow-amber-200/50';
    }
    return 'bg-white/80 border-white/50';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`
        backdrop-blur-xl border shadow-lg rounded-2xl p-4 transition-all duration-300 cursor-pointer
        ${getCardStyle()}
        ${isSelected ? 'ring-2 ring-dutch-blue/50' : ''}
      `}
      onClick={() => onSelect?.(player)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Rank Badge */}
          <div className={`w-8 h-8 rounded-full ${getRankBadgeColor()} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {rank}
          </div>
          
          {/* Player Avatar */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg relative overflow-hidden"
            style={{ backgroundColor: player.avatarColor }}
          >
            {player.name.charAt(0).toUpperCase()}
            {dutchCount > 0 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          
          {/* Player Info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-800">{player.name}</h3>
              {getRankIcon()}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {dutchCount > 0 && (
                <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <Zap className="h-3 w-3" />
                  {dutchCount} Dutch
                </span>
              )}
              {player.rounds.length > 0 && (
                <span className="text-gray-500">
                  Meilleur: {bestRound}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Score */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {player.totalScore}
          </div>
          <div className="text-xs text-gray-600">points</div>
        </div>
      </div>
      
      {/* Round Indicators */}
      {player.rounds.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {player.rounds.map((round, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shadow-sm ${
                round.isDutch 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                  : round.score === 0 
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                    : round.score <= 10
                      ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700'
                      : 'bg-gradient-to-r from-red-300 to-red-400 text-red-800'
              }`}
              title={`Manche ${index + 1}: ${round.score} points${round.isDutch ? ' (Dutch!)' : ''}`}
            >
              {round.isDutch ? '★' : round.score}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FunPlayerCard;
