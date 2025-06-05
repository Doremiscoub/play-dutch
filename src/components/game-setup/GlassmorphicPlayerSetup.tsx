
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import { UnifiedCard } from '@/components/ui/unified-card';
import { UnifiedButton } from '@/components/ui/unified-button';
import { Input } from '@/components/ui/input';
import ActionButton from './ActionButton';

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
    <div className="space-y-8 p-6">
      {/* En-tête avec compte des joueurs */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 backdrop-blur-md rounded-3xl px-6 py-3 border border-white/30"
        >
          <Users className="h-5 w-5 text-dutch-blue" />
          <span className="font-semibold text-gray-700">
            {players.length} joueur{players.length > 1 ? 's' : ''}
          </span>
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          <UnifiedButton
            variant="glass"
            size="icon-lg"
            onClick={removePlayer}
            disabled={players.length <= 2}
            animated
          >
            <Minus className="h-5 w-5" />
          </UnifiedButton>
          
          <div className="bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-3xl px-8 py-4 min-w-[5rem]">
            <motion.span
              key={players.length}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-white"
            >
              {players.length}
            </motion.span>
          </div>
          
          <UnifiedButton
            variant="glass"
            size="icon-lg"
            onClick={addPlayer}
            disabled={players.length >= 10}
            animated
          >
            <Plus className="h-5 w-5" />
          </UnifiedButton>
        </div>

        {players.length > 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <UnifiedButton
              variant="ghost"
              size="sm"
              onClick={shufflePlayers}
              animated
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Mélanger l'ordre
            </UnifiedButton>
          </motion.div>
        )}
      </div>

      {/* Liste des joueurs */}
      <div className="space-y-4">
        <AnimatePresence>
          {players.map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <UnifiedCard variant="light" padding="md" interactive>
                <div className="flex items-center gap-4">
                  {/* Emoji du joueur */}
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
                      relative p-3 rounded-2xl text-2xl transition-all duration-300 min-w-[3.5rem] h-14
                      bg-gradient-to-br from-dutch-orange/20 to-dutch-orange/30 
                      hover:from-dutch-orange/30 hover:to-dutch-orange/40
                      border border-dutch-orange/40 hover:border-dutch-orange/60
                      shadow-lg hover:shadow-xl
                      group
                    "
                  >
                    <motion.span
                      key={player.emoji}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      className="block"
                    >
                      {player.emoji}
                    </motion.span>
                    
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.button>

                  {/* Nom du joueur */}
                  <div className="flex-1">
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="
                        bg-white/80 border-gray-200 focus:border-dutch-blue 
                        text-center font-medium rounded-2xl text-lg
                        transition-all duration-200
                        focus:ring-2 focus:ring-dutch-blue/20
                      "
                      placeholder={`Joueur ${index + 1}`}
                      maxLength={15}
                    />
                  </div>

                  {/* Indicateur de position */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                    {index + 1}
                  </div>
                </div>
              </UnifiedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Estimation de durée */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <UnifiedCard variant="medium" padding="md">
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-600">Durée estimée</div>
            <div className="text-2xl font-bold text-dutch-blue">
              {Math.round(players.length * 8 + 15)} minutes
            </div>
          </div>
        </UnifiedCard>
      </motion.div>

      {/* Bouton de démarrage */}
      <motion.div 
        className="flex justify-center pt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ActionButton
          onClick={handleStartGame}
          label="Commencer la partie"
        />
      </motion.div>
    </div>
  );
};

export default GlassmorphicPlayerSetup;
