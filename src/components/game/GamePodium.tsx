
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import PodiumStanding from './PodiumStanding';

interface GamePodiumProps {
  players: Player[];
}

const GamePodium: React.FC<GamePodiumProps> = ({ players }) => {
  // Sort players by score (lowest is best)
  const podium = [...players]
    .sort((a, b) => a.totalScore - b.totalScore)
    .slice(0, 3);
  
  return (
    <div className="flex justify-center w-full mb-10">
      <div className="relative flex items-end justify-center w-full max-w-xl overflow-visible">
        {/* Position 2 - Argent */}
        {podium[1] && <PodiumStanding player={podium[1]} position={2} />}
        
        {/* Position 1 - Or */}
        {podium[0] && <PodiumStanding player={podium[0]} position={1} />}
        
        {/* Position 3 - Bronze */}
        {podium[2] && <PodiumStanding player={podium[2]} position={3} />}
      </div>
    </div>
  );
};

export default GamePodium;
