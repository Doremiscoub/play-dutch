import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, Share2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamePodiumProps {
  players: Player[];
  onNewGame: () => void;
  gameDuration?: string;
}

const GamePodium: React.FC<GamePodiumProps> = ({
  players,
  onNewGame,
  gameDuration
}) => {
  const navigate = useNavigate();
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);
  const winner = sortedPlayers[0];
  
  // Lancez des confettis quand le podium est affiché
  useEffect(() => {
    const launchConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
    
    // Lance les confettis à l'affichage et toutes les 2 secondes (3 fois au total)
    launchConfetti();
    const interval = setInterval(launchConfetti, 2000);
    
    setTimeout(() => {
      clearInterval(interval);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen relative">
      {/* Fond avec quadrillage */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
    
      <div className="flex flex-col items-center justify-center pt-10 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink">
            Fin de partie !
          </h1>
          {gameDuration && (
            <p className="text-gray-600 mt-1">Durée: {gameDuration}</p>
          )}
        </motion.div>
        
        <div className="relative w-full max-w-sm h-60 mb-10">
          {/* Second place */}
          {sortedPlayers.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute left-0 bottom-0 w-1/3"
            >
              <div className="h-28 mx-auto w-24 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg shadow-md flex flex-col items-center justify-end pb-2">
                <div className="absolute -top-14">
                  <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md shadow-md border-2 border-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    2
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-700 mt-4 truncate max-w-full px-2">
                  {sortedPlayers[1]?.name}
                </p>
                <p className="text-gray-800 font-bold">
                  {sortedPlayers[1]?.totalScore}
                </p>
              </div>
            </motion.div>
          )}
          
          {/* First place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-1/3 z-10"
          >
            <div className="h-40 mx-auto w-28 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg shadow-lg flex flex-col items-center justify-end pb-2">
              <div className="absolute -top-16">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg border-2 border-yellow-200 flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-yellow-800 mt-6 truncate max-w-full px-2">
                {winner?.name}
              </p>
              <p className="text-yellow-900 text-lg font-bold">
                {winner?.totalScore}
              </p>
            </div>
          </motion.div>
          
          {/* Third place */}
          {sortedPlayers.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute right-0 bottom-0 w-1/3"
            >
              <div className="h-20 mx-auto w-24 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg shadow-md flex flex-col items-center justify-end pb-2">
                <div className="absolute -top-12">
                  <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-md border-2 border-amber-600 flex items-center justify-center text-amber-700 font-bold">
                    3
                  </div>
                </div>
                <p className="text-xs font-medium text-amber-100 mt-3 truncate max-w-full px-2">
                  {sortedPlayers[2]?.name}
                </p>
                <p className="text-amber-100 font-bold">
                  {sortedPlayers[2]?.totalScore}
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Other players */}
        {sortedPlayers.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 mb-8 border border-white/40"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">Autres joueurs</h3>
            <div className="space-y-2">
              {sortedPlayers.slice(3).map((player, index) => (
                <div key={player.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                      {index + 4}
                    </div>
                    <span className="ml-2 text-gray-700">{player.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{player.totalScore}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Actions */}
        <div className="w-full max-w-sm space-y-3 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              onClick={onNewGame}
              className="w-full rounded-xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md hover:shadow-lg py-6"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Nouvelle partie
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full rounded-xl bg-white text-dutch-blue border-dutch-blue/20 shadow-sm py-6"
            >
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GamePodium;
