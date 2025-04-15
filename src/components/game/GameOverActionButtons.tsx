
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameOverActionButtonsProps {
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
}

const GameOverActionButtons: React.FC<GameOverActionButtonsProps> = ({ onRestart, onContinueGame }) => {
  const navigate = useNavigate();
  
  // Continue the game with a new limit
  const handleContinueGame = () => {
    const newLimit = 100; // Default value
    onContinueGame(newLimit);
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full"
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          className="w-full h-12 rounded-xl bg-gradient-to-r from-dutch-purple to-dutch-blue text-white hover:opacity-90 shadow-lg border border-white/20"
          onClick={handleContinueGame}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%] opacity-80"
              style={{ animation: "gradient-x 8s linear infinite" }} />
          <div className="relative flex items-center">
            <Play className="mr-2 h-4 w-4" />
            Continuer la partie (+100 pts)
          </div>
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full"
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-xl border border-dutch-blue/30 bg-white/70 backdrop-blur-sm hover:bg-white shadow-md"
          onClick={onRestart}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Nouvelle partie
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="w-full"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          variant="ghost" 
          className="w-full h-12 rounded-xl text-gray-500 hover:bg-white/50"
          onClick={() => navigate('/')}
        >
          Retour à l'accueil
        </Button>
      </motion.div>
    </div>
  );
};

export default GameOverActionButtons;
