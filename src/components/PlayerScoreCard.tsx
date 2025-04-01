
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Target, Trophy, Award } from 'lucide-react';
import { composedClasses } from '@/config/uiConfig';

interface PlayerScoreCardProps {
  player: Player;
  position: number;
  isWinner: boolean;
  // Suppression de la prop totalPlayers qui n'est plus utilisée
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({ 
  player, 
  position, 
  isWinner
}) => {
  // Récupérer le badge en fonction du classement
  const getBadge = () => {
    switch (position) {
      case 1:
        return { icon: <Trophy className="h-4 w-4" />, text: "En tête", color: "text-dutch-yellow" };
      case 2:
        return { icon: <Award className="h-4 w-4" />, text: "2ème", color: "text-dutch-blue" };
      case 3:
        return { icon: <Award className="h-4 w-4" />, text: "3ème", color: "text-dutch-purple" };
      default:
        return { icon: <Target className="h-4 w-4" />, text: `${position}ème`, color: "text-gray-500" };
    }
  };
  
  const badge = getBadge();
  
  return (
    <motion.div 
      className={`${composedClasses.card} ${isWinner ? 'border-l-4 border-l-dutch-yellow' : ''}`}
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex items-center">
        <div className="relative">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl 
            ${position === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-300 text-amber-900' : 
              position === 2 ? 'bg-gradient-to-br from-slate-300 to-gray-200 text-gray-800' : 
              position === 3 ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-amber-900' : 
              'bg-gradient-to-br from-gray-200 to-gray-100 text-gray-600'}
            font-bold text-lg shadow-sm`}>
            {position}
          </div>
          
          {player.stats && player.stats.dutchCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-dutch-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              D
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">{player.name}</h3>
            <div className="font-bold text-xl text-dutch-blue">
              {player.totalScore}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center text-xs">
              <div className={`flex items-center ${badge.color}`}>
                {badge.icon}
                <span className="ml-1">{badge.text}</span>
              </div>
              
              {player.stats && (
                <div className="flex items-center ml-3 text-gray-500">
                  <span className="mr-2">Moy: {player.stats.averageScore}</span>
                  {player.stats.bestRound !== null && (
                    <span>Min: {player.stats.bestRound}</span>
                  )}
                </div>
              )}
            </div>
            
            {player.stats && player.stats.winStreak > 1 && (
              <div className="bg-dutch-blue/10 text-dutch-blue text-xs px-2 py-0.5 rounded-full">
                {player.stats.winStreak}× Victoires
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerScoreCard;
