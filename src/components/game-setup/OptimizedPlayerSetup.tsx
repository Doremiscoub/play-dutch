
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Users, Clock, Target, Plus, Minus, Crown, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Player {
  name: string;
  emoji: string;
}

interface OptimizedPlayerSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

// Emojis simplifiés pour les joueurs
const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const OptimizedPlayerSetup: React.FC<OptimizedPlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);
  const prefersReducedMotion = useReducedMotion();

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

    const removedPlayer = players[players.length - 1];
    setPlayers(players.slice(0, -1));
    toast.info(`${removedPlayer.name} retiré`);
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

  // Calculs pour les statistiques
  const estimatedDuration = Math.round(15 + (players.length * 8));
  const difficulty = players.length <= 3 ? 'Facile' : players.length <= 6 ? 'Moyen' : 'Difficile';

  // Animations simplifiées
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4 }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* En-tête simplifié */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-4"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent"
        >
          Configuration des joueurs
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-600"
        >
          Configurez votre partie en quelques clics
        </motion.p>
      </motion.div>

      {/* Statistiques simplifiées */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="h-6 w-6 text-dutch-blue" />
                <span className="text-sm font-medium text-gray-600">Nombre de joueurs</span>
              </div>
              <div className="text-3xl font-bold text-dutch-blue">{players.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-dutch-purple" />
                <span className="text-sm font-medium text-gray-600">Durée estimée</span>
              </div>
              <div className="text-3xl font-bold text-dutch-purple">{estimatedDuration} min</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Target className="h-6 w-6 text-dutch-orange" />
                <span className="text-sm font-medium text-gray-600">Niveau de difficulté</span>
              </div>
              <div className="text-3xl font-bold text-dutch-orange">{difficulty}</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Contrôles simplifiés */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center gap-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={removePlayer}
          disabled={players.length <= 2}
          className="h-16 w-16 rounded-2xl bg-white/70 hover:bg-white/90 border border-dutch-blue/30 text-dutch-blue disabled:opacity-30"
        >
          <Minus className="h-8 w-8" />
        </Button>

        <div className="text-6xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent min-w-[120px] text-center">
          {players.length}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={addPlayer}
          disabled={players.length >= 10}
          className="h-16 w-16 rounded-2xl bg-white/70 hover:bg-white/90 border border-dutch-orange/30 text-dutch-orange disabled:opacity-30"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </motion.div>

      {/* Action shuffle */}
      {players.length > 2 && (
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <Button
            variant="ghost"
            onClick={shufflePlayers}
            className="bg-white/70 hover:bg-white/90 border border-dutch-purple/30 text-dutch-purple"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Mélanger l'ordre
          </Button>
        </motion.div>
      )}

      {/* Liste des joueurs simplifiée */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-center text-gray-800">Joueurs de la partie</h3>
        
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {players.map((player, index) => (
              <motion.div
                key={`${player.name}-${index}`}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="group"
              >
                <Card className="bg-white/70 hover:bg-white/85 border border-white/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Position avec couronne pour le premier */}
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 flex items-center justify-center text-sm font-bold text-dutch-blue">
                          {index + 1}
                        </div>
                        {index === 0 && (
                          <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                        )}
                      </div>

                      {/* Emoji cliquable */}
                      <button
                        onClick={() => randomizePlayerEmoji(index)}
                        className="text-2xl hover:scale-110 transition-transform duration-200"
                        title="Cliquer pour changer l'emoji"
                      >
                        {player.emoji}
                      </button>

                      {/* Nom du joueur éditable */}
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => updatePlayerName(index, e.target.value)}
                        className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-dutch-blue/30 rounded-lg px-2 py-1 font-semibold text-gray-800"
                        maxLength={15}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bouton de démarrage simplifié */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center pt-8"
      >
        <Button
          onClick={handleStartGame}
          size="lg"
          className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange text-white font-bold text-xl px-12 py-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Play className="h-6 w-6 mr-3" />
          Lancer la partie
        </Button>
      </motion.div>
    </div>
  );
};

export default OptimizedPlayerSetup;
