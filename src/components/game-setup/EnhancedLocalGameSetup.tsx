
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Play, Plus, Users, Zap, Clock, Trash2, Shuffle, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import EmojiSelector from './EmojiSelector';

interface Player {
  name: string;
  emoji: string;
}

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😀');
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);

  const suggestedNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'Gabriel', 'Hannah'];

  const addPlayer = () => {
    if (!newPlayerName.trim()) {
      toast.error('Entrez un nom de joueur');
      return;
    }

    if (newPlayerName.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères');
      return;
    }

    if (players.some(p => p.name.toLowerCase() === newPlayerName.trim().toLowerCase())) {
      toast.error('Ce nom est déjà utilisé');
      return;
    }

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayer: Player = {
      name: newPlayerName.trim(),
      emoji: selectedEmoji
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
    setSelectedEmoji('😀');
    setIsAddingPlayer(false);
    toast.success(`${newPlayer.name} ajouté à la partie !`);
  };

  const removePlayer = (index: number) => {
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer.name} retiré de la partie`);
  };

  const addQuickPlayer = (name: string) => {
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      toast.error('Ce nom est déjà utilisé');
      return;
    }

    const emojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const newPlayer: Player = { name, emoji: randomEmoji };
    setPlayers([...players, newPlayer]);
    toast.success(`${name} ajouté rapidement !`);
  };

  const shufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.info('Ordre des joueurs mélangé !');
  };

  const startGame = () => {
    if (players.length < 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }
    
    onStartGame(players.map(p => p.name));
  };

  const canStartGame = players.length >= 2;
  const estimatedDuration = players.length * 5; // minutes

  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-dutch-blue" />
          Partie Rapide
        </CardTitle>
        <CardDescription>
          Lancez une partie immédiatement avec vos amis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Quick Add Suggestions */}
        {players.length < 6 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-dutch-purple" />
              Ajout rapide
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedNames
                .filter(name => !players.some(p => p.name === name))
                .slice(0, 4)
                .map((name) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addQuickPlayer(name)}
                      className="bg-white/70 hover:bg-white/90 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {name}
                    </Button>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Custom Player Add */}
        <div className="space-y-3">
          {!isAddingPlayer ? (
            <Button
              onClick={() => setIsAddingPlayer(true)}
              variant="outline"
              className="w-full bg-white/70 hover:bg-white/90 border-dashed border-2 border-gray-300 hover:border-dutch-blue transition-colors"
              disabled={players.length >= 10}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un joueur personnalisé
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 rounded-xl p-4 border border-white/60 space-y-3"
            >
              <div className="flex gap-2">
                <Input
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Nom du joueur"
                  className="bg-white/70"
                  onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                  maxLength={15}
                />
                <EmojiSelector
                  selectedEmoji={selectedEmoji}
                  onEmojiSelect={setSelectedEmoji}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addPlayer} size="sm" className="bg-dutch-blue text-white flex-1">
                  <Plus className="h-3 w-3 mr-1" />
                  Ajouter
                </Button>
                <Button 
                  onClick={() => setIsAddingPlayer(false)} 
                  variant="outline" 
                  size="sm"
                  className="bg-white/70"
                >
                  Annuler
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Players List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="h-4 w-4 text-dutch-blue" />
              Joueurs ({players.length})
              {canStartGame && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  ✅ Prêt
                </Badge>
              )}
            </h3>
            {players.length > 2 && (
              <Button
                onClick={shufflePlayers}
                variant="ghost"
                size="sm"
                className="text-dutch-purple hover:bg-dutch-purple/10"
              >
                <Shuffle className="h-3 w-3 mr-1" />
                Mélanger
              </Button>
            )}
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {players.map((player, index) => (
                <motion.div
                  key={`${player.name}-${index}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="group flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/60 hover:bg-white/90 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 text-lg">
                        {player.emoji}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium text-sm text-gray-800">{player.name}</span>
                      <div className="text-xs text-gray-500">Joueur {index + 1}</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removePlayer(index)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {players.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500"
              >
                <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Ajoutez des joueurs pour commencer</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Game Info */}
        {players.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-xl p-4 border border-white/40"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-dutch-blue" />
                <span className="text-gray-600">Durée estimée :</span>
                <span className="font-medium">{estimatedDuration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-dutch-orange" />
                <span className="text-gray-600">Mode :</span>
                <span className="font-medium">Rapide</span>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
      
      <div className="px-6 pb-6">
        <motion.div whileHover={{ scale: canStartGame ? 1.02 : 1 }}>
          <Button 
            onClick={startGame}
            disabled={!canStartGame}
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            {canStartGame ? 'Commencer la partie' : 'Ajoutez au moins 2 joueurs'}
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};

export default EnhancedLocalGameSetup;
