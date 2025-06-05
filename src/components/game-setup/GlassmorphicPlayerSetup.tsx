
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Shuffle, Clock } from 'lucide-react';
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

  const estimatedDuration = Math.round(players.length * 8 + 15);

  return (
    <div className="space-y-6 p-6">
      {/* En-tête avec statistiques */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-6">
          {/* Nombre de joueurs */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/30"
          >
            <Users className="h-5 w-5 text-dutch-blue" />
            <span className="font-semibold text-gray-700">
              {players.length} joueur{players.length > 1 ? 's' : ''}
            </span>
          </motion.div>

          {/* Durée estimée */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-gradient-to-r from-dutch-orange/10 to-dutch-orange/15 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/30"
          >
            <Clock className="h-5 w-5 text-dutch-orange" />
            <span className="font-semibold text-gray-700">
              ~{estimatedDuration} min
            </span>
          </motion.div>
        </div>

        {/* Contrôles du nombre de joueurs */}
        <div className="flex items-center justify-center gap-6">
          <UnifiedButton
            variant="glass"
            size="icon-lg"
            onClick={removePlayer}
            disabled={players.length <= 2}
            animated
            className="disabled:opacity-40"
          >
            <Minus className="h-5 w-5" />
          </UnifiedButton>
          
          <motion.div 
            className="bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-2xl px-6 py-3 min-w-[4rem] shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              key={players.length}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-white block text-center"
            >
              {players.length}
            </motion.span>
          </motion.div>
          
          <UnifiedButton
            variant="glass"
            size="icon-lg"
            onClick={addPlayer}
            disabled={players.length >= 10}
            animated
            className="disabled:opacity-40"
          >
            <Plus className="h-5 w-5" />
          </UnifiedButton>
        </div>

        {/* Bouton mélanger */}
        {players.length > 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <UnifiedButton
              variant="ghost"
              size="sm"
              onClick={shufflePlayers}
              animated
              className="text-gray-600 hover:text-gray-800"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Mélanger l'ordre
            </UnifiedButton>
          </motion.div>
        )}
      </motion.div>

      {/* Liste des joueurs */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.03,
                layout: { duration: 0.3 }
              }}
            >
              <UnifiedCard variant="light" padding="md" interactive className="group">
                <div className="flex items-center gap-4">
                  {/* Emoji du joueur */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9, rotate: -5 }}
                    onClick={() => randomizePlayerEmoji(index)}
                    className="
                      relative p-3 rounded-2xl text-2xl transition-all duration-300 min-w-[3.5rem] h-14 flex items-center justify-center
                      bg-gradient-to-br from-dutch-orange/20 to-dutch-orange/30 
                      hover:from-dutch-orange/30 hover:to-dutch-orange/40
                      border border-dutch-orange/40 hover:border-dutch-orange/60
                      shadow-md hover:shadow-lg
                      group/emoji
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
                    >
                      {player.emoji}
                    </motion.span>
                    
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover/emoji:opacity-100 transition-opacity duration-200" />
                  </motion.button>

                  {/* Nom du joueur */}
                  <div className="flex-1">
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="
                        bg-white/90 border-gray-200/60 focus:border-dutch-blue/80 
                        text-center font-medium rounded-xl text-lg h-12
                        transition-all duration-200
                        focus:ring-2 focus:ring-dutch-blue/20 focus:bg-white
                        group-hover:bg-white/95
                      "
                      placeholder={`Joueur ${index + 1}`}
                      maxLength={15}
                    />
                  </div>

                  {/* Indicateur de position */}
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 border border-gray-200/60"
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </UnifiedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bouton de démarrage */}
      <motion.div 
        className="flex justify-center pt-6"
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
