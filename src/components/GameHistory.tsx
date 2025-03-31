
import React from 'react';
import { Game } from '@/types';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Calendar, Users, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface GameHistoryProps {
  games: Game[];
  limit?: number;
}

const GameHistory: React.FC<GameHistoryProps> = ({ games, limit }) => {
  // Apply limit if provided
  const displayedGames = limit ? games.slice(0, limit) : games;
  
  // If no games, show a message
  if (games.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-white/50 hover:shadow-lg transition-all">
        <CardContent className="pt-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-dutch-blue/10 flex items-center justify-center mb-4">
              <Trophy className="h-7 w-7 text-dutch-blue/50" />
            </div>
            <p className="text-gray-500">Aucune partie terminée pour le moment.</p>
            <p className="text-sm text-gray-400 mt-2">
              Commencez une nouvelle partie pour voir votre historique ici.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {displayedGames.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -3 }}
        >
          <Card className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-md transition-all border border-white/50 overflow-hidden">
            <CardHeader className="pb-1">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-dutch-orange" />
                    {game.winner} a gagné!
                  </CardTitle>
                  <CardDescription className="mt-1">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        {format(new Date(game.date), 'dd MMM yyyy', { locale: fr })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-gray-500" />
                        {game.players.length} joueurs
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                        {game.rounds} manches
                      </span>
                    </div>
                  </CardDescription>
                </div>
                {game.isMultiplayer && (
                  <span className="inline-flex items-center rounded-full bg-dutch-purple/10 px-2.5 py-0.5 text-xs font-medium text-dutch-purple">
                    Multijoueur
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {game.players.map((player, playerIndex) => (
                  <div key={playerIndex} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <motion.span 
                        className={`flex items-center justify-center h-6 w-6 rounded-full ${
                          playerIndex === 0 
                            ? 'bg-dutch-orange text-white' 
                            : playerIndex === 1 
                              ? 'bg-dutch-blue text-white'
                              : playerIndex === 2
                                ? 'bg-dutch-purple text-white'
                                : 'bg-gray-200 text-gray-700'
                          } text-xs font-medium transition-transform`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {playerIndex + 1}
                      </motion.span>
                      <span className="font-medium group-hover:text-dutch-blue transition-colors">
                        {player.name}
                        {player.isDutch && (
                          <motion.span 
                            className="ml-2 inline-flex items-center rounded-full bg-dutch-red/10 px-2.5 py-0.5 text-xs font-medium text-dutch-red"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                          >
                            Dutch
                          </motion.span>
                        )}
                      </span>
                    </div>
                    <span className="font-semibold">{player.score} pts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default GameHistory;
