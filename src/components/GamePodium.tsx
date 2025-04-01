
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, BarChart3, Home } from 'lucide-react';
import { playConfetti } from '@/utils/animationUtils';
import PageLayout from './PageLayout';

interface GamePodiumProps {
  players: Player[];
  onNewGame: () => void;
  gameDuration?: string;
}

const GamePodium: React.FC<GamePodiumProps> = ({ players, onNewGame, gameDuration }) => {
  const navigate = useNavigate();
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Définir le vainqueur
  const winner = sortedPlayers[0];
  
  // Lancer les confettis dès que le composant est monté
  useEffect(() => {
    playConfetti(5000);
  }, []);
  
  // Animations pour les médailles
  const medalAnimation = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };
  
  // Animations pour les joueurs
  const playerAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5
      }
    })
  };
  
  // Obtenir la position des joueurs sur le podium
  const getPodiumPosition = (index: number) => {
    // Position par défaut en fonction du classement
    switch(index) {
      case 0: return { order: 2, height: 'h-36 md:h-44', color: 'bg-yellow-400' };
      case 1: return { order: 1, height: 'h-28 md:h-36', color: 'bg-gray-300' };
      case 2: return { order: 3, height: 'h-20 md:h-28', color: 'bg-amber-600' };
      default: return { order: index + 1, height: 'h-16', color: 'bg-gray-200' };
    }
  };
  
  return (
    <PageLayout backgroundVariant="default">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Les légendes du Dutch !
          </h1>
          <p className="text-lg mt-2 text-gray-600">
            {winner.name} remporte la partie avec {winner.totalScore} points
          </p>
          {gameDuration && (
            <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Durée de la partie: {gameDuration}
            </div>
          )}
        </motion.div>
        
        {/* Affichage du podium */}
        <div className="relative mb-16 mt-20">
          {/* Positions des joueurs sur le podium */}
          <div className="flex items-end justify-center gap-4 md:gap-6 h-52 md:h-72">
            {sortedPlayers.slice(0, 3).map((player, index) => {
              const { order, height, color } = getPodiumPosition(index);
              
              return (
                <div key={player.id} className="relative" style={{ order }}>
                  {/* Médaille */}
                  <motion.div 
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
                    variants={medalAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className={`rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} p-3 shadow-lg`}>
                      <Trophy className={`h-6 w-6 md:h-8 md:w-8 ${index === 0 ? 'text-yellow-100' : 'text-white'}`} />
                    </div>
                    <div className="text-center mt-1 font-bold">
                      {index === 0 ? '1er' : index === 1 ? '2e' : '3e'}
                    </div>
                  </motion.div>
                  
                  {/* Joueur */}
                  <motion.div 
                    className="relative flex flex-col items-center"
                    custom={index}
                    variants={playerAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col items-center absolute -top-12 left-1/2 transform -translate-x-1/2 w-full">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-1 shadow-md overflow-hidden">
                        <span className="text-lg font-bold text-gray-800">{player.name.charAt(0)}</span>
                      </div>
                      <div className="text-center text-sm font-medium truncate max-w-[80px] md:max-w-[120px]">
                        {player.name}
                      </div>
                      <div className="text-center text-xs font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                        {player.totalScore} pts
                      </div>
                    </div>
                    
                    {/* Podium */}
                    <div className={`${color} ${height} w-20 md:w-28 rounded-t-lg shadow-lg flex items-center justify-center relative z-0`}>
                      <span className="absolute bottom-2 text-xs text-white font-bold opacity-80">
                        {index + 1}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Affichage des autres joueurs */}
        {sortedPlayers.length > 3 && (
          <div className="mt-12 px-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Autres participants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedPlayers.slice(3).map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-gray-500">{index + 4}</span>
                      </div>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        {player.stats && (
                          <div className="text-xs text-gray-500 mt-1">
                            Moyenne: {player.stats.averageScore.toFixed(1)} pts/manche
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-lg font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                      {player.totalScore}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Boutons d'action */}
        <motion.div 
          className="mt-12 flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={onNewGame}
            className="bg-gradient-to-r from-dutch-purple to-dutch-blue text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Nouvelle partie
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            className="bg-white text-dutch-orange border border-dutch-orange/20 hover:bg-dutch-orange/10 rounded-full px-8 py-6"
            variant="outline"
            size="lg"
          >
            <Home className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default GamePodium;
