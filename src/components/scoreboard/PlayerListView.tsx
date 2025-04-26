
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
    <div className="space-y-3">
      {sortedPlayers.map((player, index) => (
        <Card 
          key={player.id}
          className="p-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all cursor-pointer"
          onClick={() => onPlayerSelect(player)}
        >
          <div className="flex items-center gap-4">
            <PlayerRankBadge position={index + 1} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{player.rounds.length} manches</span>
                <span>•</span>
                <span>Moyenne: {(player.totalScore / Math.max(1, player.rounds.length)).toFixed(1)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{player.totalScore}</div>
              <div className="text-sm text-gray-500">/{scoreLimit} pts</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PlayerListView;
