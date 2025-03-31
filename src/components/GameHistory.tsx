
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Trophy, Calendar, Search, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/types';
import { Input } from '@/components/ui/input';

interface GameHistoryProps {
  games: Game[];
  onBack: () => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({ games, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [filterWinner, setFilterWinner] = useState<string | null>(null);
  
  // Get all unique winners for filtering
  const uniqueWinners = Array.from(new Set(games.map(game => game.winner)));
  
  // Sort and filter games
  const filteredGames = [...games]
    .filter(game => {
      // Apply search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesPlayer = game.players.some(player => 
          player.name.toLowerCase().includes(searchLower)
        );
        const matchesDate = format(new Date(game.date), 'dd MMMM yyyy', { locale: fr })
          .toLowerCase()
          .includes(searchLower);
        
        if (!matchesPlayer && !matchesDate) return false;
      }
      
      // Apply winner filter
      if (filterWinner && game.winner !== filterWinner) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-dutch-blue">Historique des parties</h1>
      </div>
      
      <div className="dutch-card mb-4 p-3">
        <div className="relative mb-3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un joueur ou une date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortOrder === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortOrder('newest')}
            className="text-xs"
          >
            <CalendarIcon className="h-3 w-3 mr-1" />
            Plus récentes
          </Button>
          <Button
            variant={sortOrder === 'oldest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortOrder('oldest')}
            className="text-xs"
          >
            <CalendarIcon className="h-3 w-3 mr-1" />
            Plus anciennes
          </Button>
          
          {uniqueWinners.map(winner => (
            <Button
              key={winner}
              variant={filterWinner === winner ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterWinner(filterWinner === winner ? null : winner)}
              className="text-xs"
            >
              <Trophy className="h-3 w-3 mr-1" />
              {winner}
            </Button>
          ))}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="dutch-card flex flex-col items-center justify-center py-8 text-center">
          <p className="text-lg text-gray-500">Aucune partie trouvée</p>
          <p className="text-sm text-gray-400">
            {games.length === 0 
              ? "Les parties terminées apparaîtront ici" 
              : "Aucune partie ne correspond à votre recherche"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {filteredGames.map((game, index) => (
              <motion.div 
                key={game.id}
                className="dutch-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">
                    {format(new Date(game.date), 'dd MMMM yyyy', { locale: fr })}
                  </h3>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                    {game.rounds} manches
                  </span>
                </div>
                
                {game.winner && (
                  <div className="flex items-center gap-2 mb-3 bg-dutch-blue/10 p-2 rounded-lg">
                    <Trophy className="h-4 w-4 text-dutch-blue" />
                    <span className="text-sm font-medium text-dutch-blue">
                      {game.winner} gagne !
                    </span>
                  </div>
                )}
                
                <div className="space-y-2 mt-3">
                  {game.players.map((player, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-dutch-blue text-white' : 'bg-gray-100'}`}>
                          {index + 1}
                        </div>
                        <div className="flex items-center">
                          <span className={index === 0 ? 'font-semibold' : ''}>{player.name}</span>
                          {player.isDutch && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-dutch-orange/20 text-dutch-orange rounded-full">
                              D
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-semibold">{player.score}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default GameHistory;
