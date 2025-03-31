
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Game } from '@/types';

interface GameHistoryProps {
  games: Game[];
  onBack: () => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({ games, onBack }) => {
  const sortedGames = [...games].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-dutch-blue">Historique des parties</h1>
      </div>

      {sortedGames.length === 0 ? (
        <div className="dutch-card flex flex-col items-center justify-center py-8 text-center">
          <p className="text-lg text-gray-500">Aucune partie terminée</p>
          <p className="text-sm text-gray-400">Les parties terminées apparaîtront ici</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedGames.map((game) => (
            <motion.div 
              key={game.id}
              className="dutch-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
        </div>
      )}
    </motion.div>
  );
};

export default GameHistory;
