
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
        <h2 className="text-trinity text-2xl font-bold mb-3">
          🎯 Récapitulatif
        </h2>
        <p className="text-neutral-600">
          Vérifiez les paramètres de votre partie avant de commencer
        </p>
      </div>

      {/* Résumé de la configuration */}
      <div className="space-y-4">
        {/* Nombre de joueurs */}
        <div className="card-glass p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Nombre de joueurs</div>
                <div className="text-sm text-neutral-500">{playerCount} participants</div>
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
              <Target className="h-5 w-5 text-secondary" />
              <div>
                <div className="font-medium">Joueurs</div>
                <div className="text-sm text-neutral-500">{validPlayers.length} joueurs prêts</div>
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
          
          <div className="grid grid-cols-2 gap-2">
            {validPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="w-full justify-center py-2 text-sm"
                >
                  {player.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Règles rapides */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
        <h3 className="font-bold text-neutral-800 mb-2">🏆 Rappel des règles</h3>
        <ul className="text-sm text-neutral-600 space-y-1">
          <li>• <strong>Objectif :</strong> Avoir le score le plus bas</li>
          <li>• <strong>Dutch :</strong> Le joueur avec le score le plus bas de la manche</li>
          <li>• <strong>Fin :</strong> Premier à 100 points, gagnant = score total le plus bas</li>
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
          className="flex-2 font-bold text-lg"
        >
          🚀 Commencer la partie !
        </UnifiedButton>
      </div>
    </UnifiedCard>
  );
};

export default GameSummaryStep;
