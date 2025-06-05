
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerListProps {
  players: string[];
  onRemovePlayer: (index: number) => void;
  onShufflePlayers: () => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onRemovePlayer,
  onShufflePlayers
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-dutch-blue" />
          <span className="text-sm font-medium text-gray-700">Joueurs ({players.length})</span>
        </div>
        {players.length > 2 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShufflePlayers}
            className="bg-white/50 hover:bg-white/80"
          >
            <Shuffle className="h-3 w-3 mr-1" />
            Mélanger
          </Button>
        )}
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div
              key={`${player}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center justify-between bg-white/60 rounded-xl p-3 border border-white/40"
            >
              <span className="font-medium text-gray-800">{player}</span>
              {players.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemovePlayer(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  ×
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayerList;
