
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Star } from 'lucide-react';
import PlayerRankBadge from './PlayerRankBadge';

interface GamePodiumProps {
  players: Player[];
}

const GamePodium: React.FC<GamePodiumProps> = ({ players }) => {
  // Sort players by score (lowest = best)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Get top 3 players or fewer if we don't have 3
  const topPlayers = sortedPlayers.slice(0, Math.min(3, sortedPlayers.length));
  
  // Create a map of positions for the podium
  const positions = [
    { order: 1, player: topPlayers[0], height: 'h-24', delay: 0.3 },
    { order: 2, player: topPlayers[1], height: 'h-16', delay: 0.1 },
    { order: 3, player: topPlayers[2], height: 'h-12', delay: 0.2 },
  ].filter(pos => pos.player); // Filter out undefined players
  
  return (
    <div className="my-8">
      <h3 className="text-lg font-medium text-gray-700 mb-6 text-center">Podium</h3>
      
      <div className="flex items-end justify-center gap-1 h-32">
        {positions.map(({ order, player, height, delay }) => (
          <motion.div
            key={player.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, type: "spring", stiffness: 300, damping: 24 }}
          >
            {/* Joueur */}
            <motion.div
              className="w-20 mb-2 text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="flex justify-center mb-1">
                <PlayerRankBadge position={order} size="md" />
              </div>
              <p className="font-medium truncate text-sm">
                {player.name}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="h-3 w-3 text-amber-500" />
                <p className="text-sm font-bold text-dutch-purple">
                  {player.totalScore}
                </p>
              </div>
            </motion.div>
            
            {/* Podium */}
            <motion.div
              className={`w-16 ${height} bg-gradient-to-t rounded-t-lg shadow-md`}
              style={{
                backgroundImage: order === 1
                  ? 'linear-gradient(to top, #ffd700, #ffc700)'
                  : order === 2
                    ? 'linear-gradient(to top, #c0c0c0, #e0e0e0)'
                    : 'linear-gradient(to top, #cd7f32, #dda15e)'
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: delay + 0.3, duration: 0.5 }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <span className="font-bold text-white drop-shadow-md">
                  {order}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GamePodium;
