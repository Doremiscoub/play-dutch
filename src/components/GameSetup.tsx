
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameSetupGlassmorphic from './GameSetupGlassmorphic';
import { motion } from 'framer-motion';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    navigate('/game');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header with Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          onClick={() => navigate('/')}
          variant="glass"
          size="icon"
          className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full shadow-sm"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange mb-4"
            style={{ fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Créer une partie
          </h1>
          
          {/* Feature badges */}
          <div className="flex justify-center gap-3 flex-wrap mb-8">
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100/80 text-green-800 border border-green-200 backdrop-blur-xl">
              ✅ 100% Gratuit
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200 backdrop-blur-xl">
              📱 Fonctionne hors-ligne
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/80 text-purple-800 border border-purple-200 backdrop-blur-xl">
              🤖 IA Commentateur
            </div>
          </div>
        </motion.div>

        <GameSetupGlassmorphic onStartGame={handleStartGame} />
      </div>
    </div>
  );
};

export default GameSetup;
