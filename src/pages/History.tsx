
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Game } from '@/types';

interface GameHistoryProps {
  games: Game[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ games }) => {
  return (
    <div className="space-y-4">
      {games.length === 0 ? (
        <Card className="vision-card">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Aucune partie enregistrée pour le moment</p>
          </CardContent>
        </Card>
      ) : (
        games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="vision-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Date et infos de la partie */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-dutch-blue" />
                      <span className="text-sm text-gray-600">
                        {format(new Date(game.date), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                      </span>
                    </div>
                    
                    <h3 className="font-medium text-gray-800 mb-1">
                      <Trophy className="h-4 w-4 inline-block mr-1 text-dutch-purple" />
                      {game.winner} a gagné !
                    </h3>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{game.players.length} joueurs</span>
                      <span>•</span>
                      <span>{game.rounds} manches</span>
                    </div>
                  </div>
                  
                  {/* Score des joueurs */}
                  <div className="grid grid-cols-2 gap-2 sm:w-auto">
                    {game.players.map((player, i) => (
                      <div 
                        key={i} 
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          player.name === game.winner 
                            ? 'bg-dutch-purple/10 text-dutch-purple' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{player.name}</span>
                        <span className="ml-1">
                          {player.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
};

const History: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Charger l'historique depuis le localStorage
    try {
      const savedGames = localStorage.getItem('dutch_games');
      if (savedGames) {
        const parsedGames = JSON.parse(savedGames);
        setGames(parsedGames);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique :', error);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <AnimatedBackground variant="subtle" />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
        >
          Historique des parties
        </motion.h1>
        
        <GameHistory games={games} />
      </div>
    </div>
  );
};

export default History;
