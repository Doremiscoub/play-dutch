
/**
 * Overlay de fin de partie avec résultats et options pour continuer
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Trophy, Home, RotateCcw, Play, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { DESIGN_TOKENS } from '@/design';

interface GameResultOverlayProps {
  players: Player[];
  onContinue: (newScoreLimit: number) => void;
  onRestart: () => void;
  scoreLimit: number;
}

const GameResultOverlay: React.FC<GameResultOverlayProps> = ({
  players,
  onContinue,
  onRestart,
  scoreLimit
}) => {
  const navigate = useNavigate();
  const [continueLimit, setContinueLimit] = useState<number>(100);
  
  // Trier les joueurs du meilleur (plus petit score) au pire
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Sélectionner le gagnant (premier joueur après tri)
  const winner = sortedPlayers.length > 0 ? sortedPlayers[0] : null;
  
  // Lancer les confettis lors du montage du composant
  React.useEffect(() => {
    if (winner) {
      const duration = 3000;
      const end = Date.now() + duration;
      
      const colors = [
        DESIGN_TOKENS.primitive.dutch.blue[500], 
        DESIGN_TOKENS.primitive.dutch.purple[500], 
        DESIGN_TOKENS.primitive.dutch.orange[500]
      ];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [winner]);
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="glass-overlay max-w-md w-full p-6"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: 'spring',
          stiffness: 260, 
          damping: 20,
          delay: 0.2 
        }}
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute -inset-3">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-dutch-orange via-dutch-purple to-dutch-blue absolute animate-spin-slow opacity-70 blur-md" />
              </div>
              <div className="bg-dutch-purple text-white w-14 h-14 rounded-full flex items-center justify-center relative">
                <Trophy className="h-8 w-8" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-dutch-purple mb-1">Partie terminée !</h2>
          
          {winner && (
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-bold text-dutch-blue">{winner.name}</span> remporte la partie !
            </motion.p>
          )}
        </div>
        
        {/* Classement des joueurs */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Classement final</h3>
          <div className="glass-panel p-3 space-y-2">
            {sortedPlayers.map((player, index) => (
              <div 
                key={player.id}
                className={`flex justify-between items-center p-2 rounded-lg ${index === 0 ? 'bg-dutch-purple/10' : 'bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white mr-2 ${
                    index === 0 ? 'bg-dutch-purple' :
                    index === 1 ? 'bg-dutch-blue' :
                    index === 2 ? 'bg-dutch-orange' : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`${index === 0 ? 'font-semibold' : ''}`}>{player.name}</span>
                </div>
                <span className={`font-semibold ${index === 0 ? 'text-dutch-purple' : ''}`}>{player.totalScore} pts</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Options pour continuer la partie */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Continuer la partie ?</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 glass-button"
              onClick={() => onContinue(continueLimit)}
            >
              <Play className="h-4 w-4 mr-1" /> +{continueLimit} pts
            </Button>
            <div className="flex gap-1">
              {[50, 100, 200].map(value => (
                <Button
                  key={value}
                  variant={continueLimit === value ? "default" : "outline"}
                  size="sm"
                  className={continueLimit === value ? "bg-dutch-blue text-white" : "glass-button"}
                  onClick={() => setContinueLimit(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 glass-button"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-1" /> Accueil
          </Button>
          <Button
            variant="outline"
            className="flex-1 glass-button"
            onClick={onRestart}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Nouvelle partie
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameResultOverlay;
