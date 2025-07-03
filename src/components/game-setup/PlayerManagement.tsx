
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Player {
  name: string;
  emoji: string;
}

interface PlayerManagementProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const PlayerManagement: React.FC<PlayerManagementProps> = ({ players, setPlayers }) => {
  const handleRemovePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }
    
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer.name} retiré`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-trinity">
          Joueurs ({players.length})
        </h3>
        {players.length > 2 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleShufflePlayers}
            className="btn-glass hover:border-trinity-purple-400"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Mélanger
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div 
              key={`${player.name}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-4 card-glass hover:shadow-glass-lg rounded-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-trinity-blue-100 to-trinity-purple-100 flex items-center justify-center text-sm font-bold text-trinity-blue-600 border border-trinity-blue-300">
                  {index + 1}
                </div>
                <span className="text-2xl">{player.emoji}</span>
                <span className="font-semibold text-lg text-gray-800">{player.name}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemovePlayer(index)}
                disabled={players.length <= 2}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-30"
              >
                ✕
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayerManagement;
