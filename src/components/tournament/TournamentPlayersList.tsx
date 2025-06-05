
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Trash2, Crown, Medal, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TournamentPlayersListProps {
  players: string[];
  onRemovePlayer: (index: number) => void;
}

const TournamentPlayersList: React.FC<TournamentPlayersListProps> = ({
  players,
  onRemovePlayer
}) => {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-3 w-3 text-yellow-500" />;
      case 1: return <Medal className="h-3 w-3 text-gray-400" />;
      case 2: return <Award className="h-3 w-3 text-amber-600" />;
      default: return null;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0: return 'Favori';
      case 1: return 'Challenger';
      case 2: return 'Outsider';
      default: return `Joueur ${index + 1}`;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-dutch-blue" />
        <h4 className="text-sm font-medium text-gray-700">
          Participants ({players.length})
        </h4>
        {players.length >= 2 && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
            ✅ Prêt
          </Badge>
        )}
      </div>
      
      <div className="max-h-48 overflow-y-auto space-y-2">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div
              key={`${player}-${index}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="group flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/60 hover:bg-white/90 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 text-dutch-blue text-xs font-bold">
                    {player.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-800">{player}</span>
                    {getRankIcon(index)}
                  </div>
                  <span className="text-xs text-gray-500">{getRankBadge(index)}</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onRemovePlayer(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {players.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Ajoutez des joueurs au tournoi</p>
          </motion.div>
        )}
      </div>
      
      {players.length >= 8 && (
        <div className="bg-dutch-orange/10 rounded-xl p-3 text-sm text-dutch-orange flex items-center gap-2">
          <Crown className="h-4 w-4" />
          <span>Tournoi premium avec {players.length} participants !</span>
        </div>
      )}
    </div>
  );
};

export default TournamentPlayersList;
