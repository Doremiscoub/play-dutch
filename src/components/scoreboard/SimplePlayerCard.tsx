
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { cn } from '@/lib/utils';

interface SimplePlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
}

const SimplePlayerCard: React.FC<SimplePlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected
}) => {
  const isWinner = rank === 1;
  const isLastPlace = rank === totalPlayers;
  
  // Calculs basiques
  const average = player.rounds.length > 0 
    ? Math.round((player.totalScore / player.rounds.length) * 10) / 10 
    : 0;
  
  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  const bestRound = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score)) 
    : 0;

  const getCardStyle = () => {
    if (isWinner) {
      return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300 shadow-yellow-100";
    }
    if (isLastPlace) {
      return "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-red-100";
    }
    return "bg-white border-gray-200 shadow-gray-100";
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-lg border-2 p-6 shadow-lg cursor-pointer transition-all duration-300",
        getCardStyle(),
        isSelected && "ring-2 ring-blue-400 ring-offset-2"
      )}
      onClick={() => onSelect(player)}
      whileHover={{ 
        y: -2, 
        scale: 1.01,
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: rank * 0.05
      }}
    >
      {/* Badge de rang */}
      <div className="absolute -top-3 -left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        {rank}
      </div>

      {/* Badge gagnant */}
      {isWinner && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          👑 Champion
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Informations joueur */}
        <div className="flex-1">
          <h3 className={cn(
            "text-xl font-bold mb-2",
            isWinner && "text-yellow-700",
            isLastPlace && "text-red-700",
            !isWinner && !isLastPlace && "text-gray-800"
          )}>
            {player.name}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{player.rounds.length} manches</span>
            <span>Moyenne: {average}</span>
            <span>Meilleur: {bestRound}</span>
            {dutchCount > 0 && (
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                {dutchCount} Dutch
              </span>
            )}
          </div>
        </div>

        {/* Score principal */}
        <div className="text-right">
          <div className={cn(
            "text-4xl font-black mb-1",
            isWinner && "text-yellow-600",
            isLastPlace && "text-red-600",
            !isWinner && !isLastPlace && "text-gray-800"
          )}>
            {player.totalScore}
          </div>
          <div className="text-sm text-gray-500">points</div>
        </div>
      </div>

      {/* Dernières manches */}
      {player.rounds.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">Dernières manches :</div>
          <div className="flex gap-2">
            {player.rounds.slice(-5).reverse().map((round, index) => (
              <div
                key={index}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  round.score <= 10 && "bg-green-100 text-green-700",
                  round.score > 10 && round.score <= 20 && "bg-yellow-100 text-yellow-700",
                  round.score > 20 && "bg-red-100 text-red-700"
                )}
              >
                {round.score}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SimplePlayerCard;
