
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Plus, Shuffle, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import EmojiSelector from './EmojiSelector';

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<string[]>(['Alice', 'Bob']);
  const [newPlayer, setNewPlayer] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎮');

  const handleAddPlayer = () => {
    if (!newPlayer.trim()) {
      toast.error('Entrez un nom de joueur');
      return;
    }

    if (newPlayer.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères');
      return;
    }

    if (players.includes(newPlayer.trim())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
    toast.success(`${newPlayer.trim()} ajouté !`);
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }
    
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer} retiré`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleQuickAdd = (name: string) => {
    if (players.includes(name)) return;
    if (players.length >= 10) return;
    
    setPlayers([...players, name]);
    toast.success(`${name} ajouté !`);
  };

  const quickNames = ['Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const availableQuickNames = quickNames.filter(name => !players.includes(name));
  
  const estimatedDuration = Math.round(players.length * 8 + 15); // minutes

  const canStartGame = players.length >= 2;

  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10">
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{selectedEmoji}</span>
          <div>
            <span>Partie rapide</span>
            <CardDescription className="mt-1">
              Configuration simple pour commencer immédiatement
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Emoji Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Thème de la partie</label>
          <EmojiSelector 
            selectedEmoji={selectedEmoji} 
            onEmojiSelect={setSelectedEmoji} 
          />
        </div>

        {/* Add Player */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Nom du joueur"
              className="bg-white/70 border-white/60 focus:border-dutch-blue transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
              maxLength={20}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleAddPlayer}
                className="bg-dutch-blue text-white hover:bg-dutch-blue/90"
                disabled={players.length >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          {/* Quick Add */}
          {availableQuickNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 self-center">Ajout rapide:</span>
              {availableQuickNames.slice(0, 4).map((name) => (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(name)}
                  className="text-xs bg-white/50 hover:bg-white/80"
                >
                  + {name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Players List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-dutch-blue" />
              <span className="text-sm font-medium text-gray-700">Joueurs ({players.length})</span>
            </div>
            {players.length > 2 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShufflePlayers}
                className="bg-white/50 hover:bg-white/80"
              >
                <Shuffle className="h-3 w-3 mr-1" />
                Mélanger
              </Button>
            )}
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            <AnimatePresence>
              {players.map((player, index) => (
                <motion.div
                  key={`${player}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between bg-white/60 rounded-xl p-3 border border-white/40"
                >
                  <span className="font-medium text-gray-800">{player}</span>
                  {players.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePlayer(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      ×
                    </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="bg-dutch-blue/10 rounded-xl p-4 border border-white/40">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-dutch-blue" />
              <span className="text-gray-700">Durée estimée</span>
            </div>
            <span className="font-medium text-dutch-blue">{estimatedDuration} minutes</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50/50 border-t border-white/40">
        <motion.div className="w-full" whileHover={{ scale: canStartGame ? 1.02 : 1 }}>
          <Button 
            onClick={() => onStartGame(players)}
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!canStartGame}
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            {canStartGame ? 'Commencer la partie' : 'Ajoutez des joueurs pour continuer'}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedLocalGameSetup;
