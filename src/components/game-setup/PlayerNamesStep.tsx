import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Check, Edit3, GripVertical, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { SetupPlayer, MODERN_EMOJIS, QUICK_NAMES, MAX_PLAYERS } from './types';

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
  const [newPlayer, setNewPlayer] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  const addPlayer = () => {
    if (!newPlayer.trim()) {
      toast.error('Entrez un nom de joueur');
      return;
    }

    if (newPlayer.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères');
      return;
    }

    if (players.some(p => p.name.toLowerCase() === newPlayer.trim().toLowerCase())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    if (players.length >= playerCount) {
      toast.error(`Maximum ${playerCount} joueurs`);
      return;
    }

    const newPlayerObj: SetupPlayer = {
      name: newPlayer.trim(),
      emoji: MODERN_EMOJIS[players.length % MODERN_EMOJIS.length]
    };

    onPlayersChange([...players, newPlayerObj]);
    setNewPlayer('');
    toast.success(`${newPlayer.trim()} rejoint la partie !`, { icon: '🎮' });
  };

  const quickAddPlayer = (name: string) => {
    if (players.some(p => p.name === name) || players.length >= playerCount) return;
    
    const newPlayerObj: SetupPlayer = {
      name,
      emoji: MODERN_EMOJIS[players.length % MODERN_EMOJIS.length]
    };
    
    onPlayersChange([...players, newPlayerObj]);
    toast.success(`${name} rejoint la partie !`, { icon: '🎮' });
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingName(players[index].name);
  };

  const saveEdit = () => {
    if (!editingName.trim() || editingIndex === null) return;

    if (players.some((p, i) => i !== editingIndex && p.name.toLowerCase() === editingName.trim().toLowerCase())) {
      toast.error('Ce nom est déjà utilisé');
      return;
    }

    const updatedPlayers = [...players];
    updatedPlayers[editingIndex] = { ...updatedPlayers[editingIndex], name: editingName.trim() };
    onPlayersChange(updatedPlayers);
    setEditingIndex(null);
    setEditingName('');
    toast.success('Nom modifié !');
  };

  const removePlayer = (index: number) => {
    const removedPlayer = players[index];
    onPlayersChange(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer.name} a quitté la partie`);
  };

  const handleReorder = (newOrder: SetupPlayer[]) => {
    onPlayersChange(newOrder);
  };

  const availableQuickNames = QUICK_NAMES.filter(name => 
    !players.some(p => p.name === name)
  );

  const canContinue = players.length === playerCount;
  const progressPercentage = (players.length / playerCount) * 100;

  return (
    <div className="space-y-6 p-6">
      {/* Header avec progress */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30">
          <div className="text-4xl">👥</div>
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
          Noms des joueurs
        </h1>
        <div className="space-y-3">
          <p className="text-neutral-700 font-medium">
            Ajoutez les {playerCount} joueurs
          </p>
          <div className="flex items-center gap-3 justify-center">
            <Badge variant="secondary" className="bg-trinity-blue-100 text-trinity-blue-700 border border-trinity-blue-200">
              {players.length}/{playerCount}
            </Badge>
            <div className="w-24 h-2 bg-neutral-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {players.length < playerCount && (
        <Card className="card-glass bg-white/90 border border-white/60">
          <CardContent className="p-4 space-y-4">
            <div className="flex gap-3">
              <Input
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                placeholder={`Joueur ${players.length + 1}`}
                className="flex-1 bg-white border-neutral-300 focus:border-trinity-blue-500 focus:ring-1 focus:ring-trinity-blue-200 rounded-xl"
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                maxLength={20}
              />
              <Button 
                onClick={addPlayer}
                disabled={players.length >= MAX_PLAYERS}
                className="bg-gradient-to-r from-trinity-blue-600 to-trinity-purple-600 hover:from-trinity-blue-700 hover:to-trinity-purple-700 text-white rounded-xl px-4 shadow-md"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {availableQuickNames.length > 0 && (
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-2">Ajout rapide :</p>
                <div className="flex gap-2 flex-wrap">
                  {availableQuickNames.slice(0, 6).map((name) => (
                    <Button
                      key={name}
                      variant="outline"
                      size="sm"
                      onClick={() => quickAddPlayer(name)}
                      className="bg-white border-neutral-300 hover:bg-trinity-orange-50 hover:border-trinity-orange-300 text-neutral-700 rounded-lg text-xs"
                    >
                      + {name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Liste des joueurs */}
      {players.length > 0 && (
        <Card className="card-glass bg-white/90 border border-white/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-trinity-orange-700">
                Joueurs ({players.length}/{playerCount})
              </CardTitle>
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <GripVertical className="h-3 w-3" />
                Réorganiser
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {players.map((player, index) => (
                <div 
                  key={`${player.name}-${index}`}
                  className="cursor-default"
                >
                  <div className="flex items-center justify-between p-3 bg-white/90 hover:bg-white rounded-xl transition-all border border-neutral-200 group shadow-sm">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                        index === 0 ? 'from-amber-400 to-amber-600' :
                        index === 1 ? 'from-neutral-300 to-neutral-500' :
                        index === 2 ? 'from-orange-400 to-orange-600' :
                        'from-trinity-blue-400 to-trinity-purple-500'
                      } flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {index + 1}
                      </div>
                      <div className="text-2xl">{player.emoji}</div>
                      <div>
                        {editingIndex === index ? (
                          <div className="flex gap-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="w-28 h-8 text-sm"
                              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                              autoFocus
                            />
                            <Button size="sm" onClick={saveEdit} className="h-8 px-2">
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div 
                            className="font-semibold text-neutral-800 cursor-pointer hover:text-trinity-blue-600"
                            onClick={() => startEditing(index)}
                          >
                            {player.name}
                          </div>
                        )}
                        <div className="text-xs text-neutral-500">
                          {index === 0 ? 'Premier' : `#${index + 1}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(index)}
                        className="h-8 w-8 p-0 text-trinity-blue-600 hover:bg-trinity-blue-100 rounded-lg"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePlayer(index)}
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 rounded-lg"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex-1 py-4 text-lg font-bold rounded-xl bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <Button
          onClick={onNext}
          disabled={!canContinue}
          size="lg"
          className={`flex-1 py-4 text-lg font-bold rounded-xl shadow-lg transition-all border-2 ${
            canContinue
              ? 'bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 text-white hover:from-trinity-blue-700 hover:via-trinity-purple-700 hover:to-trinity-orange-700 border-trinity-blue-500'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed border-neutral-400'
          }`}
        >
          {canContinue ? 'Continuer' : `Il manque ${playerCount - players.length} joueur${playerCount - players.length > 1 ? 's' : ''}`}
        </Button>
      </div>
    </div>
  );
};

export default PlayerNamesStep;