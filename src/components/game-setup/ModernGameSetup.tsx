import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Shuffle, X, Gamepad2, Trophy } from 'lucide-react';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
import { Badge } from '@/components/ui/badge';

interface Player {
  name: string;
  emoji: string;
}

interface ModernGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

// Emojis modernes pour les joueurs
const modernEmojis = ['🎮', '🎯', '🚀', '⭐', '🔥', '⚡', '🎲', '🎪', '🌟', '💎', '🎨', '🦄'];

const quickNames = ['Alex', 'Charlie', 'Dana', 'Eve', 'Frank', 'Grace', 'Hugo', 'Iris'];

const ModernGameSetup: React.FC<ModernGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '🎮' },
    { name: 'Bob', emoji: '🎯' }
  ]);
  const [newPlayer, setNewPlayer] = useState('');
  const [selectedEmoji] = useState('🎮');

  const handleAddPlayer = () => {
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

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayerObj: Player = {
      name: newPlayer.trim(),
      emoji: modernEmojis[players.length % modernEmojis.length]
    };

    setPlayers([...players, newPlayerObj]);
    setNewPlayer('');
    toast.success(`${newPlayer.trim()} rejoint la partie !`, {
      icon: '🎮'
    });
  };

  const handleQuickAdd = (name: string) => {
    if (players.some(p => p.name === name)) return;
    if (players.length >= 10) return;
    
    const newPlayerObj: Player = {
      name,
      emoji: modernEmojis[players.length % modernEmojis.length]
    };
    
    setPlayers([...players, newPlayerObj]);
    toast.success(`${name} rejoint la partie !`, {
      icon: '🎮'
    });
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs pour jouer');
      return;
    }
    
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer.name} a quitté la partie`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !', {
      icon: '🔀'
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPlayer();
    }
  };

  const availableQuickNames = quickNames.filter(name => 
    !players.some(p => p.name === name)
  ).slice(0, 4);

  const canStartGame = players.length >= 2;
  const gameEstimate = players.length * 5; // ~5 minutes per player

  return (
    <div className="space-y-8">
      {/* Header simplifié */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <motion.div 
          className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30 overflow-hidden"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ProfessorAvatar size="md" animate={true} mood="happy" showParticles={false} />
        </motion.div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
          Créer une partie
        </h1>
        <p className="text-neutral-600 font-medium">
          Ajoutez les joueurs et lancez votre partie de Dutch
        </p>
      </motion.div>

      {/* Ajout de joueurs */}
      <Card className="card-glass">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-trinity-purple-700 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Ajouter un joueur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Champ d'ajout */}
          <div className="flex gap-3">
            <Input
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Nom du joueur"
              className="flex-1 bg-white/80 border-white/60 focus:border-trinity-blue-400 transition-all duration-300 rounded-2xl"
              onKeyDown={handleKeyDown}
              maxLength={20}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleAddPlayer}
                className="bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white hover:from-trinity-blue-600 hover:to-trinity-purple-600 rounded-2xl px-6 shadow-lg"
                disabled={players.length >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Boutons d'ajout rapide */}
          {availableQuickNames.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Ajout rapide :</p>
              <div className="flex flex-wrap gap-2">
                {availableQuickNames.map((name) => (
                  <motion.div key={name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAdd(name)}
                      className="bg-white/60 border-white/60 hover:bg-trinity-orange-50 hover:border-trinity-orange-300 rounded-xl"
                    >
                      + {name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liste des joueurs */}
      <Card className="card-glass">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-trinity-orange-700 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Joueurs de la partie
              <Badge variant="secondary" className="ml-2">
                {players.length}/10
              </Badge>
            </CardTitle>
            {players.length > 2 && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShufflePlayers}
                  className="bg-white/60 border-white/60 hover:bg-trinity-purple-50 hover:border-trinity-purple-300 rounded-xl"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Mélanger
                </Button>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {players.map((player, index) => (
                <motion.div 
                  key={`${player.name}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/70 rounded-2xl transition-all duration-300 border border-white/40 hover:border-white/60 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                      index === 0 ? 'from-amber-400 to-amber-600' :
                      index === 1 ? 'from-gray-300 to-gray-500' :
                      index === 2 ? 'from-orange-400 to-orange-600' :
                      'from-trinity-blue-400 to-trinity-purple-500'
                    } flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {index + 1}
                    </div>
                    <div className="text-3xl">{player.emoji}</div>
                    <div>
                      <div className="font-bold text-lg text-gray-800">{player.name}</div>
                      <div className="text-sm text-gray-500">
                        {index === 0 ? 'Premier joueur' : `Joueur ${index + 1}`}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePlayer(index)}
                      disabled={players.length <= 2}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Estimation et démarrage */}
      <Card className="card-glass">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-trinity-blue-600">{players.length}</div>
                <div className="text-sm text-gray-600">Joueurs</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-trinity-purple-600">~{gameEstimate}min</div>
                <div className="text-sm text-gray-600">Durée estimée</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-trinity-orange-600">Dutch</div>
                <div className="text-sm text-gray-600">Mode de jeu</div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: canStartGame ? 1.02 : 1 }}
              whileTap={{ scale: canStartGame ? 0.98 : 1 }}
            >
              <Button
                onClick={() => onStartGame(players.map(p => p.name))}
                disabled={!canStartGame}
                size="lg"
                className={`w-full py-6 text-xl font-bold rounded-2xl shadow-lg transition-all duration-300 ${
                  canStartGame
                    ? 'bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500 text-white hover:from-trinity-blue-600 hover:via-trinity-purple-600 hover:to-trinity-orange-600 shadow-2xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Gamepad2 className="h-6 w-6 mr-3" />
                {canStartGame ? 'Commencer la partie !' : 'Ajoutez au moins 2 joueurs'}
              </Button>
            </motion.div>

            {!canStartGame && (
              <p className="text-sm text-gray-500">
                Il faut au moins 2 joueurs pour commencer une partie
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernGameSetup;