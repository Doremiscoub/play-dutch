
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Shuffle, Clock, Sparkles, Crown } from 'lucide-react';
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
    <div className="space-y-8 p-8">
      {/* En-tête avec statistiques amélioré */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
            Configuration des joueurs
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Ajoutez vos amis et personnalisez votre partie Dutch
          </p>
        </motion.div>

        {/* Statistiques en grille */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* Nombre de joueurs */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-br from-dutch-blue/10 via-dutch-blue/5 to-dutch-purple/10 backdrop-blur-xl rounded-2xl px-4 py-4 border border-white/40 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-dutch-blue/20 rounded-xl">
                  <Users className="h-5 w-5 text-dutch-blue" />
                </div>
                <div className="text-center">
                  <motion.div
                    key={players.length}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-dutch-blue"
                  >
                    {players.length}
                  </motion.div>
                  <div className="text-xs text-gray-600 font-medium">
                    Joueur{players.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Durée estimée */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dutch-orange/20 to-dutch-orange/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-br from-dutch-orange/10 via-dutch-orange/5 to-dutch-orange/15 backdrop-blur-xl rounded-2xl px-4 py-4 border border-white/40 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-dutch-orange/20 rounded-xl">
                  <Clock className="h-5 w-5 text-dutch-orange" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-dutch-orange">
                    {estimatedDuration}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Minutes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Niveau de difficulté */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dutch-purple/20 to-dutch-purple/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-gradient-to-br from-dutch-purple/10 via-dutch-purple/5 to-dutch-purple/15 backdrop-blur-xl rounded-2xl px-4 py-4 border border-white/40 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-dutch-purple/20 rounded-xl">
                  <Crown className="h-5 w-5 text-dutch-purple" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-dutch-purple">
                    {players.length <= 3 ? 'Facile' : players.length <= 6 ? 'Moyen' : 'Expert'}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Niveau
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contrôles du nombre de joueurs améliorés */}
        <motion.div 
          className="flex items-center justify-center gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <UnifiedButton
              variant="glass"
              size="icon-lg"
              onClick={removePlayer}
              disabled={players.length <= 2}
              animated
              className="disabled:opacity-40 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Minus className="h-6 w-6" />
            </UnifiedButton>
          </motion.div>
          
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Effet de lueur autour du nombre */}
            <div className="absolute -inset-4 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange rounded-full blur-lg opacity-30 animate-pulse" />
            <div className="relative bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-2xl px-8 py-4 min-w-[5rem] shadow-xl border border-white/30">
              <motion.span
                key={players.length}
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="text-3xl font-bold text-white block text-center"
              >
                {players.length}
              </motion.span>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <UnifiedButton
              variant="glass"
              size="icon-lg"
              onClick={addPlayer}
              disabled={players.length >= 10}
              animated
              className="disabled:opacity-40 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-6 w-6" />
            </UnifiedButton>
          </motion.div>
        </div>

        {/* Bouton mélanger amélioré */}
        {players.length > 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <UnifiedButton
              variant="ghost"
              size="md"
              onClick={shufflePlayers}
              animated
              className="text-gray-600 hover:text-gray-800 bg-white/40 hover:bg-white/60 border border-white/50 shadow-md hover:shadow-lg"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Shuffle className="h-4 w-4 mr-2" />
              </motion.div>
              Mélanger l'ordre
            </UnifiedButton>
          </motion.div>
        )}
      </motion.div>

      {/* Liste des joueurs avec animations améliorées */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={`${player.name}-${index}`}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.9, rotateX: 15 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                layout: { duration: 0.3, ease: "easeInOut" },
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              whileHover={{ y: -2 }}
            >
              <UnifiedCard variant="light" padding="none" interactive className="group overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  {/* Position du joueur */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 border-2 border-gray-200/60 shadow-md">
                      {index + 1}
                    </div>
                    {index === 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Crown className="h-4 w-4 text-yellow-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Emoji du joueur */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.85, rotate: -10 }}
                    onClick={() => randomizePlayerEmoji(index)}
                    className="
                      relative p-3 rounded-2xl text-2xl transition-all duration-300 min-w-[3.5rem] h-14 flex items-center justify-center
                      bg-gradient-to-br from-dutch-orange/20 via-dutch-orange/25 to-dutch-orange/30 
                      hover:from-dutch-orange/30 hover:via-dutch-orange/35 hover:to-dutch-orange/40
                      border-2 border-dutch-orange/40 hover:border-dutch-orange/60
                      shadow-lg hover:shadow-xl
                      group/emoji overflow-hidden
                    "
                  >
                    <motion.span
                      key={player.emoji}
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        duration: 0.3
                      }}
                      className="relative z-10"
                    >
                      {player.emoji}
                    </motion.span>
                    
                    {/* Effet de hover */}
                    <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover/emoji:opacity-100 transition-opacity duration-200" />
                    
                    {/* Particules d'effet */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover/emoji:opacity-100"
                      initial={false}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="absolute top-1 right-1 h-3 w-3 text-dutch-orange" />
                    </motion.div>
                  </motion.button>

                  {/* Nom du joueur */}
                  <div className="flex-1">
                    <Input
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="
                        bg-white/90 border-gray-200/60 focus:border-dutch-blue/80 
                        text-center font-medium rounded-xl text-lg h-12
                        transition-all duration-300
                        focus:ring-2 focus:ring-dutch-blue/20 focus:bg-white focus:shadow-lg
                        group-hover:bg-white/95 group-hover:shadow-md
                        placeholder:text-gray-400
                      "
                      placeholder={`Joueur ${index + 1}`}
                      maxLength={15}
                    />
                  </div>
                </div>

                {/* Barre de progression subtile en bas */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`progress-${index}`}
                />
              </UnifiedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bouton de démarrage amélioré */}
      <motion.div 
        className="flex justify-center pt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 25 }}
      >
        <ActionButton
          onClick={handleStartGame}
          label="Lancer la partie"
        />
      </motion.div>

      {/* Conseils subtils */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
          💡 Astuce : Cliquez sur les emojis pour les changer • Le mélange ajoute de la surprise
        </p>
      </motion.div>
    </div>
  );
};

export default GlassmorphicPlayerSetup;
