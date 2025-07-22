
import React from 'react';
import { Player } from '@/types';
import PlayerRankBadge from '../game/PlayerRankBadge';
import { Card } from '../ui/card';
import { motion } from 'framer-motion';

interface PlayerListViewProps {
  players: Player[];
  isDesktop: boolean;
  scoreLimit: number;
  onPlayerSelect: (player: Player) => void;
}

const PlayerListView: React.FC<PlayerListViewProps> = ({
  players,
  isDesktop,
  scoreLimit,
  onPlayerSelect,
}) => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);

  return (
    <div className="space-y-4">
      {sortedPlayers.map((player, index) => {
        const isWinner = index === 0;
        const isLast = index === sortedPlayers.length - 1;
        
        const playerColors = [
          'from-blue-400/20 to-blue-500/30 border-blue-400/50 hover:border-blue-500/70',
          'from-purple-400/20 to-purple-500/30 border-purple-400/50 hover:border-purple-500/70',
          'from-green-400/20 to-green-500/30 border-green-400/50 hover:border-green-500/70',
          'from-orange-400/20 to-orange-500/30 border-orange-400/50 hover:border-orange-500/70',
          'from-pink-400/20 to-pink-500/30 border-pink-400/50 hover:border-pink-500/70',
          'from-cyan-400/20 to-cyan-500/30 border-cyan-400/50 hover:border-cyan-500/70'
        ];
        
        const colorClass = playerColors[index % playerColors.length];
        
        return (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`
                p-5 cursor-pointer relative overflow-hidden
                bg-gradient-to-br ${colorClass}
                backdrop-blur-xl border-2 rounded-2xl
                transition-all duration-300
                hover:shadow-xl transform-gpu
                ${isWinner ? 'ring-2 ring-yellow-400/50 shadow-yellow-400/20' : ''}
              `}
              onClick={() => onPlayerSelect(player)}
            >
              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Badge du rang avec animations */}
              <div className="absolute -top-2 -left-2 z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <PlayerRankBadge position={index + 1} />
                </motion.div>
              </div>
              
              <div className="flex items-center gap-4 relative z-10 ml-8">
                {/* Avatar avec emoji */}
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-white/80 to-white/60 flex items-center justify-center text-2xl border-2 border-white/50 shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {player.emoji || '🎮'}
                </motion.div>
                
                <div className="flex-1">
                  <motion.h3 
                    className={`text-xl font-bold mb-1 ${isWinner ? 'text-yellow-700' : 'text-neutral-800'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {isWinner && '👑 '}{player.name}
                  </motion.h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <span className="flex items-center gap-1">
                      🎯 {player.rounds.length} manches
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      📊 Moy: {(player.totalScore / Math.max(1, player.rounds.length)).toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <motion.div 
                  className="text-right"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <div className={`text-3xl font-black ${isWinner ? 'text-yellow-600' : 'text-neutral-800'}`}>
                    {player.totalScore}
                  </div>
                  <div className="text-sm text-neutral-500">
                    /{scoreLimit} pts
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
                    <motion.div 
                      className={`h-2 rounded-full ${isWinner ? 'bg-yellow-400' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((player.totalScore / scoreLimit) * 100, 100)}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* Étoiles pour le gagnant */}
              {isWinner && (
                <motion.div
                  className="absolute top-2 right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">⭐</span>
                </motion.div>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlayerListView;
