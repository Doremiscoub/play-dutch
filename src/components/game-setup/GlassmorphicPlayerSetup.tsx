
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

// Emojis simplifiés pour les joueurs
const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

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
      emoji: playerEmojis[players.length % playerEmojis.length]
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
    updatedPlayers[index].name = name.slice(0, 15);
    setPlayers(updatedPlayers);
  };

  const randomizePlayerEmoji = (index: number) => {
    const currentEmoji = players[index].emoji;
    const availableEmojis = playerEmojis.filter(emoji => emoji !== currentEmoji);
    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
    
    const updatedPlayers = [...players];
    updatedPlayers[index].emoji = randomEmoji;
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
      {/* Contrôle du nombre de joueurs */}
      <UnifiedCard variant="light" padding="lg" className="text-center">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-dutch-blue" />
            <span className="font-semibold text-gray-700">Joueurs</span>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={removePlayer}
                disabled={players.length <= 2}
                className="bg-white/80 border-gray-200 hover:bg-white rounded-full h-12 w-12"
              >
                <Minus className="h-5 w-5" />
              </Button>
            </motion.div>
            
            <div className="bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-2xl px-6 py-3 min-w-[4rem]">
              <span className="text-2xl font-bold text-white text-center">
                {players.length}
              </span>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={addPlayer}
                disabled={players.length >= 10}
                className="bg-white/80 border-gray-200 hover:bg-white rounded-full h-12 w-12"
              >
                <Plus className="h-5 w-5" />
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
              className="bg-white/60 hover:bg-white/80 rounded-2xl border-gray-200"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Mélanger l'ordre
            </Button>
          </motion.div>
        )}
      </UnifiedCard>

      {/* Liste des joueurs */}
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
                  {/* Emoji cliquable avec animation */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    onClick={() => randomizePlayerEmoji(index)}
                    className="
                      p-3 rounded-xl text-xl transition-all duration-200 min-w-[3rem] h-12
                      bg-gradient-to-br from-dutch-orange/20 to-dutch-orange/30 
                      hover:from-dutch-orange/30 hover:to-dutch-orange/40
                      border border-dutch-orange/40 hover:border-dutch-orange/60
                      group relative
                    "
                  >
                    <motion.span
                      key={player.emoji}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {player.emoji}
                    </motion.span>
                    
                    {/* Indicateur de clic */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.button>

                  {/* Nom du joueur */}
                  <div className="flex-1">
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="bg-white/80 border-gray-200 focus:border-dutch-blue text-center font-medium rounded-2xl"
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

      {/* Bouton de démarrage */}
      <motion.div 
        className="pt-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white rounded-2xl py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          size="lg"
        >
          <Play className="h-6 w-6 mr-3" />
          Commencer la partie
        </Button>
      </motion.div>
    </div>
  );
};

export default GlassmorphicPlayerSetup;
