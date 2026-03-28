
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Check, X } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Input } from '@/components/ui/input';
import { SetupPlayer } from './types';
import SimpleEmojiSelector from './SimpleEmojiSelector';
import { DESIGN_TOKENS } from '@/design';

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
  const [editError, setEditError] = useState<string | null>(null);

  const MAX_NAME_LENGTH = 20;

  // Initialiser les joueurs si nécessaire
  useEffect(() => {
    if (players.length !== playerCount) {
      const defaultEmojis = ['🎮', '🎯', '🃏', '🎲', '🏆', '⭐', '🎊', '🎉', '🔥', '💫'];
      const newPlayers: SetupPlayer[] = [];
      for (let i = 0; i < playerCount; i++) {
        newPlayers.push({
          id: `player-${i + 1}`,
          name: players[i]?.name || `Joueur ${i + 1}`,
          emoji: players[i]?.emoji || defaultEmojis[i % defaultEmojis.length],
          isReady: players[i]?.isReady || false
        });
      }
      onPlayersChange(newPlayers);
    }
  }, [playerCount, players, onPlayersChange]);

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setTempName(players[index]?.name || '');
    setEditError(null);
  };

  const validateName = (name: string, currentIndex: number): string | null => {
    const trimmed = name.trim();
    if (!trimmed) {
      return 'Le nom ne peut pas être vide';
    }
    if (trimmed.length > MAX_NAME_LENGTH) {
      return `Le nom ne peut pas dépasser ${MAX_NAME_LENGTH} caractères`;
    }
    const duplicate = players.some(
      (p, i) => i !== currentIndex && p.name.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (duplicate) {
      return 'Ce nom est déjà utilisé par un autre joueur';
    }
    return null;
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const trimmed = tempName.trim();
    const error = validateName(trimmed, editingIndex);
    if (error) {
      setEditError(error);
      return;
    }
    const updatedPlayers = [...players];
    updatedPlayers[editingIndex] = {
      ...updatedPlayers[editingIndex],
      name: trimmed,
      isReady: true
    };
    onPlayersChange(updatedPlayers);
    setEditingIndex(null);
    setTempName('');
    setEditError(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTempName('');
    setEditError(null);
  };

  const updatePlayerEmoji = (index: number, emoji: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      emoji
    };
    onPlayersChange(updatedPlayers);
  };

  const canProceed = players.length >= 2 && players.every(p => p.name && p.name.trim().length > 0);

  return (
    <UnifiedCard variant="glass" padding="lg" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3" style={{
          background: DESIGN_TOKENS.gradients.trinity,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ✏️ Noms des joueurs
        </h2>
        <p className="text-neutral-700">
          Personnalisez les noms des {playerCount} joueurs
        </p>
      </div>

      {/* Liste des joueurs */}
      <div className="grid gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <div className="card-glass p-3 sm:p-4 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <SimpleEmojiSelector
                    selectedEmoji={player.emoji}
                    onEmojiSelect={(emoji) => updatePlayerEmoji(index, emoji)}
                    playerIndex={index}
                  />

                  {editingIndex === index ? (
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="flex-1 relative">
                          <Input
                            value={tempName}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.length <= MAX_NAME_LENGTH) {
                                setTempName(value);
                                setEditError(null);
                              }
                            }}
                            maxLength={MAX_NAME_LENGTH}
                            placeholder="Nom du joueur"
                            className={`flex-1 text-neutral-800 placeholder:text-neutral-500 h-10 touch-target pr-14 ${editError ? 'border-red-500 focus:ring-red-500' : ''}`}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit();
                              if (e.key === 'Escape') cancelEdit();
                            }}
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none">
                            {tempName.length}/{MAX_NAME_LENGTH}
                          </span>
                        </div>
                        <UnifiedButton
                          variant="primary"
                          size="sm"
                          onClick={saveEdit}
                          disabled={!tempName.trim()}
                          className="min-h-[40px] min-w-[40px] touch-target"
                          aria-label="Confirmer le nom"
                        >
                          <Check className="h-4 w-4" />
                        </UnifiedButton>
                        <UnifiedButton
                          variant="ghost"
                          size="sm"
                          onClick={cancelEdit}
                          className="min-h-[40px] min-w-[40px] touch-target"
                          aria-label="Annuler la modification"
                        >
                          <X className="h-4 w-4" />
                        </UnifiedButton>
                      </div>
                      {editError && (
                        <p className="text-xs text-red-500 ml-1">{editError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium text-neutral-800 leading-tight break-words pr-2">
                        {player.name}
                      </span>
                      <UnifiedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(index)}
                        className="min-h-[40px] min-w-[40px] touch-target flex-shrink-0"
                        aria-label={`Modifier le nom de ${player.name}`}
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
        <p className="text-sm text-neutral-700">
          <strong>Astuce :</strong> Utilisez des noms courts et facilement reconnaissables pour une meilleure expérience de jeu
        </p>
      </div>

      {/* Boutons de navigation */}
      <div className="flex gap-2 sm:gap-3">
        <UnifiedButton
          variant="ghost"
          size="lg"
          onClick={onBack}
          className="flex-1 min-h-[48px] touch-target"
        >
          ← Retour
        </UnifiedButton>
        
        <UnifiedButton
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-[2] font-bold min-h-[48px] touch-target"
        >
          {canProceed ? 'Créer la partie' : 'Complétez les noms'}
        </UnifiedButton>
      </div>
    </UnifiedCard>
  );
};

export default PlayerNamesStep;
