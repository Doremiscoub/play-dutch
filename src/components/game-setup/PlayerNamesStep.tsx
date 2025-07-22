
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SetupPlayer } from './types';

interface PlayerNamesStepProps {
  playerCount: number;
  players: SetupPlayer[];
  onPlayersChange: (players: SetupPlayer[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const PlayerNamesStep: React.FC<PlayerNamesStepProps> = ({
  playerCount,
  players,
  onPlayersChange,
  onNext,
  onBack
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState('');

  // Initialiser les joueurs si nécessaire
  useEffect(() => {
    if (players.length !== playerCount) {
      const newPlayers: SetupPlayer[] = [];
      for (let i = 0; i < playerCount; i++) {
        newPlayers.push({
          id: `player-${i + 1}`,
          name: players[i]?.name || `Joueur ${i + 1}`,
          isReady: players[i]?.isReady || false
        });
      }
      onPlayersChange(newPlayers);
    }
  }, [playerCount, players, onPlayersChange]);

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setTempName(players[index]?.name || '');
  };

  const saveEdit = () => {
    if (editingIndex !== null && tempName.trim()) {
      const updatedPlayers = [...players];
      updatedPlayers[editingIndex] = {
        ...updatedPlayers[editingIndex],
        name: tempName.trim(),
        isReady: true
      };
      onPlayersChange(updatedPlayers);
      setEditingIndex(null);
      setTempName('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTempName('');
  };

  const canProceed = players.length >= 2 && players.every(p => p.name && p.name.trim().length > 0);

  return (
    <UnifiedCard variant="glass" padding="lg" className="space-y-6">
      <div className="text-center">
        <h2 className="text-trinity text-2xl font-bold mb-3">
          ✏️ Noms des joueurs
        </h2>
        <p className="text-neutral-600">
          Personnalisez les noms des {playerCount} joueurs
        </p>
      </div>

      {/* Liste des joueurs */}
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <div className="card-glass p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="min-w-[80px]">
                    Joueur {index + 1}
                  </Badge>

                  {editingIndex === index ? (
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Nom du joueur"
                        className="flex-1"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                      <UnifiedButton
                        variant="primary"
                        size="sm"
                        onClick={saveEdit}
                        disabled={!tempName.trim()}
                      >
                        <Check className="h-4 w-4" />
                      </UnifiedButton>
                      <UnifiedButton
                        variant="ghost"
                        size="sm"
                        onClick={cancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </UnifiedButton>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium text-neutral-800">
                        {player.name}
                      </span>
                      <UnifiedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(index)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </UnifiedButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Informations */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
        <p className="text-sm text-neutral-600">
          <strong>💡 Astuce :</strong> Utilisez des noms courts et facilement reconnaissables pour une meilleure expérience de jeu
        </p>
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
          onClick={onNext}
          disabled={!canProceed}
          className="flex-2 font-bold"
        >
          {canProceed ? 'Créer la partie 🎯' : 'Complétez les noms'}
        </UnifiedButton>
      </div>
    </UnifiedCard>
  );
};

export default PlayerNamesStep;
