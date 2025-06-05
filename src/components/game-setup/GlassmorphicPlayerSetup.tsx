
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Play, Shuffle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { UnifiedCard } from '@/components/ui/unified-card';

interface Player {
  name: string;
  emoji: string;
}

interface GlassmorphicPlayerSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const emojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋', '🤔', '🤯', '🥸', '🤠', '👻', '🤖', '👽', '🦄', '🐻', '🎮'];

const GlassmorphicPlayerSetup: React.FC<GlassmorphicPlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);

  const addPlayer = () => {
    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayer: Player = {
      name: `Joueur ${players.length + 1}`,
      emoji: emojis[players.length % emojis.length]
    };

    setPlayers([...players, newPlayer]);
    toast.success('Joueur ajouté !');
  };

  const removePlayer = () => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }

    setPlayers(players.slice(0, -1));
    toast.info('Joueur retiré');
  };

  const updatePlayerName = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name.slice(0, 15); // Limit name length
    setPlayers(updatedPlayers);
  };

  const updatePlayerEmoji = (index: number, emoji: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].emoji = emoji;
    setPlayers(updatedPlayers);
  };

  const shufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleStartGame = () => {
    const playerNames = players.map(p => p.name.trim() || `Joueur ${players.indexOf(p) + 1}`);
    onStartGame(playerNames);
  };

  return (
    <div className="space-y-6">
      {/* Player Count Control */}
      <UnifiedCard variant="light" padding="md" className="text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-dutch-blue" />
            <span className="font-medium text-gray-700">Joueurs ({players.length})</span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={removePlayer}
                disabled={players.length <= 2}
                className="bg-white/70 border-white/60 hover:bg-white/90 rounded-full h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <span className="mx-4 text-2xl font-bold text-dutch-purple min-w-[3rem] text-center">
              {players.length}
            </span>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={addPlayer}
                disabled={players.length >= 10}
                className="bg-white/70 border-white/60 hover:bg-white/90 rounded-full h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {players.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={shufflePlayers}
              className="bg-white/50 hover:bg-white/80 rounded-full"
            >
              <Shuffle className="h-3 w-3 mr-2" />
              Mélanger
            </Button>
          </motion.div>
        )}
      </UnifiedCard>

      {/* Players List */}
      <div className="space-y-3">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <UnifiedCard variant="light" padding="md" interactive>
                <div className="flex items-center gap-4">
                  {/* Emoji Selector */}
                  <div className="flex flex-wrap gap-1">
                    {emojis.slice(0, 6).map((emoji) => (
                      <motion.button
                        key={emoji}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updatePlayerEmoji(index, emoji)}
                        className={`
                          p-2 rounded-xl text-lg transition-all duration-200 min-w-[2.5rem]
                          ${player.emoji === emoji 
                            ? 'bg-dutch-orange/20 ring-2 ring-dutch-orange transform scale-110' 
                            : 'bg-white/50 hover:bg-white/80'
                          }
                        `}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>

                  {/* Name Input */}
                  <div className="flex-1">
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="bg-white/70 border-white/60 focus:border-dutch-blue text-center font-medium text-lg rounded-2xl"
                      placeholder={`Joueur ${index + 1}`}
                      maxLength={15}
                    />
                  </div>
                </div>
              </UnifiedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Start Game Button */}
      <motion.div 
        className="pt-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white rounded-2xl py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <Play className="h-5 w-5 mr-3" />
          Commencer la partie
        </Button>
      </motion.div>
    </div>
  );
};

export default GlassmorphicPlayerSetup;
