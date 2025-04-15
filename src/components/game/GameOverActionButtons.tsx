
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRightCircle, 
  RefreshCw, 
  Plus, 
  Home 
} from 'lucide-react';

interface GameOverActionButtonsProps {
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
}

const GameOverActionButtons: React.FC<GameOverActionButtonsProps> = ({
  onRestart,
  onContinueGame,
}) => {
  const buttonVariants = {
    hover: { scale: 1.05, y: -3 },
    tap: { scale: 0.98 }
  };
  
  return (
    <motion.div 
      className="w-full max-w-md mt-8 space-y-4 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Pulse effect for primary button */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-dutch-blue/30 to-dutch-purple/30 rounded-2xl blur-md"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative"
        >
          <Button
            onClick={() => onContinueGame(50)}
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white h-14 rounded-2xl shadow-lg relative overflow-hidden border border-white/20 font-medium text-lg"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center">
              <ArrowRightCircle className="mr-2 h-6 w-6" />
              Continuer (+50 points)
            </span>
          </Button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={() => onContinueGame(100)}
            className="w-full bg-white text-dutch-orange border border-dutch-orange/20 h-12 rounded-xl shadow-md font-medium"
            variant="outline"
          >
            <Plus className="mr-2 h-5 w-5" />
            +100 points
          </Button>
        </motion.div>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={onRestart}
            className="w-full bg-white text-dutch-purple border border-dutch-purple/20 h-12 rounded-xl shadow-md font-medium"
            variant="outline"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Nouvelle partie
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="pt-2"
      >
        <Button
          onClick={() => window.location.href = '/'}
          className="w-full bg-white/70 text-dutch-blue backdrop-blur-sm h-10 rounded-xl border border-dutch-blue/10 shadow-sm"
          variant="ghost"
        >
          <Home className="mr-2 h-4 w-4" />
          Retourner à l'accueil
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverActionButtons;
