
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Play, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Player {
  name: string;
  emoji: string;
}

const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const SimpleGameSetup: React.FC = () => {
  const navigate = useNavigate();
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
  };

  const removePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs pour jouer');
      return;
    }

    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayerName = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);
  };

  const handleStartGame = async () => {
    if (isStarting) return;

    setIsStarting(true);

    try {
      const playerNames = players.map(player => 
        player.name.trim() || `Joueur ${players.indexOf(player) + 1}`
      );

      // Navigate with player data in URL params
      const params = new URLSearchParams();
      params.set('players', encodeURIComponent(JSON.stringify(playerNames)));
      params.set('new', 'true');
      
      navigate(`/game?${params.toString()}`);
    } catch (error) {
      console.error('Error starting game:', error);
      toast.error('Erreur lors du démarrage de la partie');
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
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
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {players.map((player, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-white/40"
              >
                <div className="text-2xl">{player.emoji}</div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dutch-blue"
                  placeholder={`Joueur ${index + 1}`}
                />
                {players.length > 2 && (
                  <Button
                    onClick={() => removePlayer(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6"
            >
              <Button
                onClick={handleStartGame}
                disabled={players.length < 2 || isStarting}
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
    </div>
  );
};

export default SimpleGameSetup;
