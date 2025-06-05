
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ActionButton from './ActionButton';
import PlayerSetupHeader from './PlayerSetupHeader';
import PlayerControls from './PlayerControls';
import PlayerList from './PlayerList';

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
    toast.success('Joueur ajouté !', {
      description: `${newPlayer.emoji} ${newPlayer.name} rejoint la partie`
    });
  };

  const removePlayer = () => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }

    const removedPlayer = players[players.length - 1];
    setPlayers(players.slice(0, -1));
    toast.info('Joueur retiré', {
      description: `${removedPlayer.emoji} ${removedPlayer.name} quitte la partie`
    });
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
    toast.success('Ordre des joueurs mélangé !', {
      description: 'Un nouvel ordre de jeu a été défini'
    });
  };

  const handleStartGame = () => {
    const playerNames = players.map(p => p.name.trim() || `Joueur ${players.indexOf(p) + 1}`);
    onStartGame(playerNames);
  };

  return (
    <div className="space-y-8 p-8 relative overflow-hidden">
      {/* Particules flottantes d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-dutch-blue/30 to-dutch-purple/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <PlayerSetupHeader playersCount={players.length} />

      <PlayerControls
        onShuffle={shufflePlayers}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
        disableAdd={players.length >= 10}
        disableRemove={players.length <= 2}
      />

      <PlayerList
        players={players}
        onUpdatePlayerName={updatePlayerName}
        onRandomizePlayerEmoji={randomizePlayerEmoji}
      />

      {/* Bouton de démarrage avec design épique */}
      <motion.div 
        className="flex justify-center pt-12 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 25 }}
      >
        <ActionButton
          onClick={handleStartGame}
          label="Lancer la partie"
        />
      </motion.div>

      {/* Conseils avec animations subtiles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center relative z-10"
      >
        <motion.p 
          className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          💡 <span className="font-medium">Astuce :</span> Cliquez sur les emojis pour les changer • Le mélange ajoute de la surprise • Personnalisez les noms pour plus de fun
        </motion.p>
      </motion.div>
    </div>
  );
};

export default GlassmorphicPlayerSetup;
