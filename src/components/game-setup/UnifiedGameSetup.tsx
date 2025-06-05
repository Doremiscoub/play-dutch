
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Shuffle, Play, Users } from 'lucide-react';
import { toast } from 'sonner';
import SimplifiedPlayerNameInput from './SimplifiedPlayerNameInput';

interface Player {
  name: string;
  emoji: string;
}

interface UnifiedGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const UnifiedGameSetup: React.FC<UnifiedGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);
  const [isStarting, setIsStarting] = useState(false);

  const addPlayer = () => {
    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs autorisés');
      return;
    }

    const newPlayer: Player = {
      name: `Joueur ${players.length + 1}`,
      emoji: playerEmojis[players.length % playerEmojis.length]
    };

    setPlayers([...players, newPlayer]);
    toast.success('Joueur ajouté !');
  };

  const removePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs pour jouer');
      return;
    }

    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer.name} retiré de la partie`);
  };

  const updatePlayerName = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);
  };

  const changePlayerEmoji = (index: number) => {
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

  const handleStartGame = async () => {
    if (isStarting) return;

    console.log('UnifiedGameSetup: Starting game with players:', players);
    setIsStarting(true);

    try {
      // Valider les noms des joueurs
      const validPlayerNames = players.map(player => {
        const trimmedName = player.name.trim();
        return trimmedName || `Joueur ${players.indexOf(player) + 1}`;
      });

      console.log('UnifiedGameSetup: Valid player names:', validPlayerNames);

      // Sauvegarder dans localStorage avec le nouveau format
      const playerData = players.map(player => ({
        name: player.name.trim() || `Joueur ${players.indexOf(player) + 1}`,
        emoji: player.emoji
      }));

      localStorage.setItem('dutch_player_setup', JSON.stringify(playerData));
      console.log('UnifiedGameSetup: Saved player data to localStorage:', playerData);

      // Attendre un peu pour s'assurer que localStorage est bien mis à jour
      await new Promise(resolve => setTimeout(resolve, 100));

      onStartGame(validPlayerNames);
    } catch (error) {
      console.error('UnifiedGameSetup: Error starting game:', error);
      toast.error('Erreur lors du démarrage de la partie');
      setIsStarting(false);
    }
  };

  const canStartGame = players.length >= 2 && !isStarting;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
          Configuration des joueurs
        </h1>
        <p className="text-gray-600">
          Ajoutez les joueurs et commencez votre partie Dutch
        </p>
      </motion.div>

      <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl">
        <CardHeader className="space-y-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-dutch-blue" />
            Joueurs de la partie ({players.length})
          </CardTitle>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              onClick={addPlayer}
              disabled={players.length >= 10}
              className="bg-dutch-blue hover:bg-dutch-blue/90 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>

            <Button
              onClick={() => removePlayer(players.length - 1)}
              disabled={players.length <= 2}
              variant="outline"
              size="sm"
            >
              <Minus className="h-4 w-4 mr-1" />
              Retirer
            </Button>

            {players.length > 2 && (
              <Button
                onClick={shufflePlayers}
                variant="outline"
                size="sm"
              >
                <Shuffle className="h-4 w-4 mr-1" />
                Mélanger
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Players List */}
          <AnimatePresence mode="popLayout">
            {players.map((player, index) => (
              <SimplifiedPlayerNameInput
                key={`${player.name}-${index}`}
                index={index}
                name={player.name}
                emoji={player.emoji}
                onChange={updatePlayerName}
                onRemove={removePlayer}
                onEmojiClick={changePlayerEmoji}
                canRemove={players.length > 2}
              />
            ))}
          </AnimatePresence>

          {/* Start Game Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-6"
          >
            <Button
              onClick={handleStartGame}
              disabled={!canStartGame}
              className="w-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange text-white font-semibold text-lg py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              size="lg"
            >
              <div className="flex items-center justify-center gap-3">
                {isStarting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Commencer la partie
                  </>
                )}
              </div>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedGameSetup;
