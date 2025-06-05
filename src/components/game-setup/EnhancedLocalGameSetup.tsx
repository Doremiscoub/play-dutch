
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, Crown, Users, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import PlayerAddForm from './PlayerAddForm';
import QuickAddButtons from './QuickAddButtons';
import GameEstimation from './GameEstimation';

interface Player {
  name: string;
  emoji: string;
}

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

// Emojis pour les joueurs
const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);
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

    if (players.some(p => p.name === newPlayer.trim())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayerObj: Player = {
      name: newPlayer.trim(),
      emoji: selectedEmoji
    };

    setPlayers([...players, newPlayerObj]);
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
    toast.info(`${removedPlayer.name} retiré`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleQuickAdd = (name: string) => {
    if (players.some(p => p.name === name)) return;
    if (players.length >= 10) return;
    
    const newPlayerObj: Player = {
      name,
      emoji: playerEmojis[players.length % playerEmojis.length]
    };
    
    setPlayers([...players, newPlayerObj]);
    toast.success(`${name} ajouté !`);
  };

  const quickNames = ['Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const availableQuickNames = quickNames.filter(name => !players.some(p => p.name === name));
  const canStartGame = players.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="border border-white/50 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-dutch-blue/10 via-dutch-purple/8 to-dutch-orange/10 text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <motion.span 
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {selectedEmoji}
            </motion.span>
            <span className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent font-bold">
              Configuration de partie
            </span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Ajoutez les joueurs et commencez votre partie de Dutch
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          <PlayerAddForm
            newPlayer={newPlayer}
            setNewPlayer={setNewPlayer}
            selectedEmoji={selectedEmoji}
            setSelectedEmoji={setSelectedEmoji}
            onAddPlayer={handleAddPlayer}
            playersCount={players.length}
          />
          
          <QuickAddButtons
            availableNames={availableQuickNames}
            onQuickAdd={handleQuickAdd}
          />

          {/* Liste des joueurs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                Joueurs ({players.length})
              </h3>
              {players.length > 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShufflePlayers}
                  className="bg-white/70 hover:bg-white/90 border-dutch-purple/30"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Mélanger
                </Button>
              )}
            </div>
            
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
                    className="flex items-center justify-between p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-white/50 shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 flex items-center justify-center text-sm font-bold text-dutch-blue border border-dutch-blue/30">
                        {index + 1}
                      </div>
                      <span className="text-2xl">{player.emoji}</span>
                      <span className="font-semibold text-lg text-gray-800">{player.name}</span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePlayer(index)}
                      disabled={players.length <= 2}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-30"
                    >
                      ✕
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <GameEstimation playersCount={players.length} />
        </CardContent>
        
        <CardFooter className="bg-gradient-to-r from-gray-50/80 via-white/60 to-gray-50/80 border-t border-white/60">
          <Button 
            onClick={() => onStartGame(players.map(p => p.name))}
            className="w-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange text-white shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 font-bold text-lg py-6"
            disabled={!canStartGame}
            size="lg"
          >
            <div className="flex items-center justify-center gap-3">
              <Play className="h-6 w-6" />
              <span>
                {canStartGame ? 'Commencer la partie' : 'Ajoutez des joueurs pour continuer'}
              </span>
              {canStartGame && <Sparkles className="h-5 w-5" />}
            </div>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EnhancedLocalGameSetup;
