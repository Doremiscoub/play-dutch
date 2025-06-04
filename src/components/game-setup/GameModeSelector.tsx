
import React from 'react';
import { Play, Users, LockIcon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { GameCard } from '@/components/ui/game-card';
import { GameText } from '@/components/ui/game-typography';

const GameModeSelector: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Mode local */}
      <motion.div whileHover={{ scale: 1.02 }}>
        <GameCard variant="pokemonCard" className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GameCard variant="unoCard" className="p-2 w-auto h-auto">
              <Play className="h-5 w-5 text-white" />
            </GameCard>
            <div>
              <GameText variant="body" gameColor="primary" className="font-medium">
                Local
              </GameText>
              <GameText variant="caption" className="text-gray-600">
                Sur cet appareil
              </GameText>
            </div>
          </div>
          <div className="bg-game-primary/20 px-2 py-1 rounded text-xs font-medium text-game-primary">
            Actif
          </div>
        </GameCard>
      </motion.div>
      
      {/* Mode multijoueur (grisé) */}
      <GameCard variant="glass" className="p-3 flex items-center justify-between opacity-60">
        <div className="flex items-center gap-2">
          <GameCard variant="score" className="p-2 w-auto h-auto">
            <Users className="h-5 w-5 text-gray-500" />
          </GameCard>
          <div>
            <div className="flex items-center gap-1">
              <GameText variant="body" className="font-medium text-gray-500">
                Multijoueur
              </GameText>
              <div className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                À venir
              </div>
            </div>
            <GameText variant="caption" className="text-gray-500">
              Sur plusieurs appareils
            </GameText>
          </div>
        </div>
        <div>
          <LockIcon className="h-4 w-4 text-gray-400" />
        </div>
      </GameCard>
    </div>
  );
};

export default GameModeSelector;
