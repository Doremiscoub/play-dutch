
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Home, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import PodiumView from './PodiumView';
import FunStats from './FunStats';

interface GamePodiumProps {
  players: Player[];
  onNewGame?: () => void;
  gameDuration?: string;
}

const GamePodium: React.FC<GamePodiumProps> = ({ 
  players, 
  onNewGame,
  gameDuration = ''
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Lancer le confetti à l'affichage du podium
    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sort players by total score (lowest = best)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Gestion des boutons d'action
  const handleNewGame = () => {
    if (onNewGame) {
      onNewGame();
    } else {
      navigate('/game/setup');
    }
  };
  
  const handleHome = () => {
    navigate('/');
  };
  
  const handleShowDetails = () => {
    // Implémenter ici la logique pour afficher plus de détails
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent mb-2">
            Les légendes du Dutch ! 🏆
          </h1>
          <p className="text-gray-600">
            {sortedPlayers[0]?.name} remporte la partie avec {sortedPlayers[0]?.totalScore} points !
            {gameDuration && <span className="ml-2">Durée : {gameDuration}</span>}
          </p>
        </motion.div>
        
        {/* Podium des joueurs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <PodiumView 
            players={players} 
            onClose={() => {}} 
            isMultiplayer={false} 
          />
        </motion.div>
        
        {/* Statistiques fun */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Statistiques de la partie</h2>
          <FunStats players={players} />
        </motion.div>
        
        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleNewGame}
              className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue rounded-full px-6 py-6 text-white shadow-lg h-12"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nouvelle partie
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleHome}
              variant="outline"
              className="bg-white text-dutch-blue border-dutch-blue/20 rounded-full px-6 py-6 shadow-md h-12"
            >
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamePodium;
