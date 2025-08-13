
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Users, Target } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Badge } from '@/components/ui/badge';
import { SetupPlayer } from './types';

interface GameSummaryStepProps {
  playerCount: number;
  players: SetupPlayer[];
  onStartGame: () => void;
  onBack: () => void;
  onEditPlayers: () => void;
  onEditCount: () => void;
}

const GameSummaryStep: React.FC<GameSummaryStepProps> = ({
  playerCount,
  players,
  onStartGame,
  onBack,
  onEditPlayers,
  onEditCount
}) => {
  const validPlayers = players.filter(p => p.name && p.name.trim().length > 0);

  return (
    <UnifiedCard variant="glass" padding="lg" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3" style={{
          background: 'linear-gradient(135deg, hsl(var(--dutch-blue)), hsl(var(--dutch-purple)))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎯 Récapitulatif
        </h2>
        <p className="text-neutral-700">
          Vérifiez les paramètres de votre partie avant de commencer
        </p>
      </div>

      {/* Résumé de la configuration */}
      <div className="space-y-4">
        {/* Nombre de joueurs */}
        <div className="card-glass p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-500/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-neutral-800">Nombre de joueurs</div>
                <div className="text-sm text-neutral-600">{playerCount} participants</div>
              </div>
            </div>
            <UnifiedButton
              variant="ghost"
              size="sm"
              onClick={onEditCount}
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </UnifiedButton>
          </div>
        </div>

        {/* Liste des joueurs */}
        <div className="card-glass p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-500/30 flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-neutral-800">Joueurs</div>
                <div className="text-sm text-neutral-600">{validPlayers.length} joueurs prêts</div>
              </div>
            </div>
            <UnifiedButton
              variant="ghost"
              size="sm"
              onClick={onEditPlayers}
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </UnifiedButton>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {validPlayers.map((player, index) => {
              const playerColors = [
                'from-blue-400/20 to-blue-500/30 border-blue-400/40 text-blue-700',
                'from-purple-400/20 to-purple-500/30 border-purple-400/40 text-purple-700',
                'from-green-400/20 to-green-500/30 border-green-400/40 text-green-700',
                'from-orange-400/20 to-orange-500/30 border-orange-400/40 text-orange-700',
                'from-pink-400/20 to-pink-500/30 border-pink-400/40 text-pink-700',
                'from-cyan-400/20 to-cyan-500/30 border-cyan-400/40 text-cyan-700'
              ];
              const colorClass = playerColors[index % playerColors.length];
              
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="transform-gpu"
                >
                  <div className={`
                    bg-gradient-to-br ${colorClass}
                    rounded-xl p-3 border-2 
                    flex items-center justify-center gap-2
                    transition-all duration-200
                    hover:shadow-lg animate-fade-in
                  `}>
                    <span className="text-xl">{player.emoji}</span>
                    <span className="font-medium text-sm">{player.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Règles rapides */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
        <h3 className="font-bold text-neutral-800 mb-2 flex items-center gap-2">
          <span className="text-xl">🏆</span> 
          Rappel des règles
        </h3>
        <ul className="text-sm text-neutral-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <span><strong className="text-neutral-800">Objectif :</strong> Avoir le score le plus bas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong className="text-neutral-800">Dutch :</strong> Le joueur avec le score le plus bas de la manche</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">•</span>
            <span><strong className="text-neutral-800">Fin :</strong> Premier à 100 points, gagnant = score total le plus bas</span>
          </li>
        </ul>
      </div>

      {/* Boutons de navigation */}
      <div className="flex gap-3">
        <UnifiedButton
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="flex-1"
        >
          ← Retour
        </UnifiedButton>
        
        <UnifiedButton
          variant="primary"
          size="lg"
          onClick={onStartGame}
          className="flex-2 font-bold text-sm sm:text-lg px-4 py-2 min-w-0 overflow-hidden"
        >
          <span className="truncate">🚀 Commencer la partie !</span>
        </UnifiedButton>
      </div>
    </UnifiedCard>
  );
};

export default GameSummaryStep;
