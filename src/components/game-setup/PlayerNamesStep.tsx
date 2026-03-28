import React, { useState, useEffect } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SetupPlayer } from './types';
import SimpleEmojiSelector from './SimpleEmojiSelector';

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

  // Initialize players if needed
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
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
          Noms des joueurs
        </h2>
        <p className="text-muted-foreground">
          Personnalisez les noms des {playerCount} joueurs
        </p>
      </div>

      {/* Player list */}
      <div className="grid gap-3">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="border border-gray-200 bg-white rounded-xl p-3 sm:p-4"
          >
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
                        className={`flex-1 h-10 pr-14 ${editError ? 'border-red-500 focus:ring-red-500' : ''}`}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                        {tempName.length}/{MAX_NAME_LENGTH}
                      </span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={saveEdit}
                      disabled={!tempName.trim()}
                      className="min-h-[40px] min-w-[40px]"
                      aria-label="Confirmer le nom"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelEdit}
                      className="min-h-[40px] min-w-[40px]"
                      aria-label="Annuler la modification"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {editError && (
                    <p className="text-xs text-red-500 ml-1">{editError}</p>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium text-foreground leading-tight break-words pr-2">
                    {player.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditing(index)}
                    className="min-h-[40px] min-w-[40px] flex-shrink-0"
                    aria-label={`Modifier le nom de ${player.name}`}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="bg-purple-50 rounded-xl p-4">
        <p className="text-sm text-purple-700">
          <strong>Astuce :</strong> Utilisez des noms courts et facilement reconnaissables pour une meilleure expérience de jeu
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1 min-h-[48px]"
        >
          Retour
        </Button>

        <Button
          variant="default"
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-[2] font-semibold min-h-[48px]"
        >
          {canProceed ? 'Créer la partie' : 'Complétez les noms'}
        </Button>
      </div>
    </Card>
  );
};

export default PlayerNamesStep;
