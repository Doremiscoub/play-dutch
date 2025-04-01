import React, { useEffect } from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import confetti from 'canvas-confetti';

interface GamePodiumProps {
  players: Player[];
  onNewGame: () => void;
  gameDuration: string;
}

const GamePodium: React.FC<GamePodiumProps> = ({ players, onNewGame, gameDuration }) => {
  const navigate = useNavigate();

  useEffect(() => {
    launchConfetti();
  }, []);

  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#FFFFFF] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="vibrant" />
      </div>
      
      {/* Confetti Canvas */}
      <canvas id="confetti-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"></canvas>

      {/* Podium Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Fin de partie !
        </motion.h1>

        {/* Podium */}
        <div className="w-full max-w-2xl flex justify-center items-end gap-6 mb-12">
          {players.map((player, index) => (
            <motion.div
              key={player.name}
              className={`flex flex-col items-center ${index === 0 ? 'order-first' : index === 1 ? 'order-last' : 'order-2'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`text-center mb-3 ${index === 0 ? 'text-2xl font-bold text-dutch-blue' : 'text-xl font-semibold text-dutch-purple'}`}>
                {player.name}
              </div>
              <div className={`w-24 rounded-t-xl flex items-center justify-center text-white font-bold py-4 ${index === 0 ? 'h-48 bg-dutch-blue shadow-lg' : 'h-32 bg-dutch-purple shadow-md'}`}>
                {player.score}
              </div>
              <div className="text-center mt-2 text-gray-600">
                {index === 0 && <span className="text-dutch-blue">Vainqueur !</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game Duration */}
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Durée de la partie: {gameDuration}
        </motion.p>

        {/* New Game Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onNewGame}
            className="bg-gradient-to-r from-dutch-purple to-dutch-blue shadow-xl rounded-full h-14 px-8"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Nouvelle partie
          </Button>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GamePodium;
