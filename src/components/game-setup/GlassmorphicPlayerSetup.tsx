
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Shuffle, Clock, Sparkles, Crown, Star, Zap } from 'lucide-react';
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

  const estimatedDuration = Math.round(players.length * 8 + 15);

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

      {/* En-tête avec statistiques amélioré */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 relative z-10"
      >
        {/* Titre principal avec effet de brillance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-2 relative"
        >
          {/* Effet de brillance en arrière-plan */}
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-dutch-blue/10 via-dutch-purple/10 to-dutch-orange/10 rounded-3xl blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.h3 
            className="text-3xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent relative z-10"
            animate={{
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% auto'
            }}
          >
            Configuration des joueurs
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-600 max-w-md mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Ajoutez vos amis et personnalisez votre partie Dutch
          </motion.p>
        </motion.div>

        {/* Statistiques en grille avec animations améliorées */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {/* Nombre de joueurs */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 rounded-3xl blur-lg"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative bg-gradient-to-br from-dutch-blue/15 via-dutch-blue/8 to-dutch-purple/15 backdrop-blur-xl rounded-3xl px-6 py-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center gap-4">
                <motion.div 
                  className="p-3 bg-dutch-blue/25 rounded-2xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="h-6 w-6 text-dutch-blue" />
                </motion.div>
                <div className="text-center">
                  <motion.div
                    key={players.length}
                    initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-3xl font-bold text-dutch-blue"
                  >
                    {players.length}
                  </motion.div>
                  <div className="text-sm text-gray-600 font-medium">
                    Joueur{players.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Durée estimée */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-orange/20 to-dutch-orange/30 rounded-3xl blur-lg"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
                ease: "easeInOut"
              }}
            />
            <div className="relative bg-gradient-to-br from-dutch-orange/15 via-dutch-orange/8 to-dutch-orange/20 backdrop-blur-xl rounded-3xl px-6 py-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center gap-4">
                <motion.div 
                  className="p-3 bg-dutch-orange/25 rounded-2xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Clock className="h-6 w-6 text-dutch-orange" />
                </motion.div>
                <div className="text-center">
                  <motion.div
                    key={estimatedDuration}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold text-dutch-orange"
                  >
                    {estimatedDuration}
                  </motion.div>
                  <div className="text-sm text-gray-600 font-medium">
                    Minutes
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Niveau de difficulté */}
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-purple/20 to-dutch-purple/30 rounded-3xl blur-lg"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 2,
                ease: "easeInOut"
              }}
            />
            <div className="relative bg-gradient-to-br from-dutch-purple/15 via-dutch-purple/8 to-dutch-purple/20 backdrop-blur-xl rounded-3xl px-6 py-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center gap-4">
                <motion.div 
                  className="p-3 bg-dutch-purple/25 rounded-2xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Crown className="h-6 w-6 text-dutch-purple" />
                </motion.div>
                <div className="text-center">
                  <div className="text-xl font-bold text-dutch-purple">
                    {players.length <= 3 ? 'Facile' : players.length <= 6 ? 'Moyen' : 'Expert'}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Niveau
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contrôles du nombre de joueurs avec animations sophistiquées */}
        <motion.div 
          className="flex items-center justify-center gap-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            whileHover={{ scale: 1.15, rotate: -5 }} 
            whileTap={{ scale: 0.9, rotate: 5 }}
            className="relative"
          >
            {/* Effet de lueur pour le bouton moins */}
            <motion.div
              className="absolute -inset-2 bg-red-400/30 rounded-3xl blur-lg opacity-0"
              animate={players.length > 2 ? {
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.1, 0.8]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <UnifiedButton
              variant="glass"
              size="icon-lg"
              onClick={removePlayer}
              disabled={players.length <= 2}
              animated
              className="disabled:opacity-40 shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10"
            >
              <Minus className="h-7 w-7" />
            </UnifiedButton>
          </motion.div>
          
          {/* Compteur central avec effets avancés */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Anneaux de lueur multiples */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange rounded-full blur-2xl opacity-40"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.div
              className="absolute -inset-6 bg-gradient-to-r from-dutch-orange via-dutch-purple to-dutch-blue rounded-full blur-xl opacity-30"
              animate={{ 
                rotate: -360,
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            />
            
            {/* Compteur principal */}
            <div className="relative bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange rounded-3xl px-10 py-6 min-w-[6rem] shadow-2xl border-2 border-white/40">
              <motion.span
                key={players.length}
                initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 20,
                  duration: 0.6
                }}
                className="text-4xl font-bold text-white block text-center relative z-10"
              >
                {players.length}
              </motion.span>
              
              {/* Étoiles décoratives */}
              <motion.div
                className="absolute -top-2 -left-2"
                animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="h-4 w-4 text-yellow-300" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2"
                animate={{ rotate: -360, scale: [1.2, 0.8, 1.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Zap className="h-4 w-4 text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 5 }} 
            whileTap={{ scale: 0.9, rotate: -5 }}
            className="relative"
          >
            {/* Effet de lueur pour le bouton plus */}
            <motion.div
              className="absolute -inset-2 bg-green-400/30 rounded-3xl blur-lg opacity-0"
              animate={players.length < 10 ? {
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.1, 0.8]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <UnifiedButton
              variant="glass"
              size="icon-lg"
              onClick={addPlayer}
              disabled={players.length >= 10}
              animated
              className="disabled:opacity-40 shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10"
            >
              <Plus className="h-7 w-7" />
            </UnifiedButton>
          </motion.div>
        </motion.div>

        {/* Bouton mélanger avec effets améliorés */}
        {players.length > 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-dutch-purple/20 to-dutch-orange/20 rounded-3xl blur-lg opacity-0"
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            />
            <UnifiedButton
              variant="ghost"
              size="lg"
              onClick={shufflePlayers}
              animated
              className="text-gray-700 hover:text-gray-900 bg-white/50 hover:bg-white/70 border-2 border-white/60 hover:border-white/80 shadow-lg hover:shadow-xl relative z-10 px-8 py-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="mr-3"
              >
                <Shuffle className="h-5 w-5" />
              </motion.div>
              <span className="font-medium">Mélanger l'ordre</span>
              <motion.div
                className="ml-2"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </UnifiedButton>
          </motion.div>
        )}
      </motion.div>

      {/* Liste des joueurs avec animations ultra-fluides */}
      <motion.div 
        className="space-y-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={`${player.name}-${index}`}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.8, rotateX: 30 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                layout: { duration: 0.4, ease: "easeInOut" },
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative"
            >
              {/* Effet de lueur au hover */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/10 via-dutch-purple/10 to-dutch-orange/10 rounded-3xl blur-xl opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <UnifiedCard variant="light" padding="none" interactive className="group overflow-hidden relative z-10 border-2 border-white/60 hover:border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-6 p-6">
                  {/* Position du joueur avec effet de couronne */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 border-3 border-gray-200/80 shadow-lg">
                      {index + 1}
                    </div>
                    {index === 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-2 -right-2"
                        whileHover={{ scale: 1.3, rotate: 20 }}
                      >
                        <Crown className="h-5 w-5 text-yellow-500 drop-shadow-lg" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Emoji du joueur avec effets avancés */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.8, rotate: -15 }}
                    onClick={() => randomizePlayerEmoji(index)}
                    className="
                      relative p-4 rounded-3xl text-3xl transition-all duration-300 min-w-[4rem] h-16 flex items-center justify-center
                      bg-gradient-to-br from-dutch-orange/20 via-dutch-orange/30 to-dutch-orange/40 
                      hover:from-dutch-orange/40 hover:via-dutch-orange/50 hover:to-dutch-orange/60
                      border-3 border-dutch-orange/50 hover:border-dutch-orange/80
                      shadow-xl hover:shadow-2xl
                      group/emoji overflow-hidden
                    "
                  >
                    <motion.span
                      key={player.emoji}
                      initial={{ scale: 0, rotate: -360, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 600,
                        damping: 20,
                        duration: 0.5
                      }}
                      className="relative z-10"
                    >
                      {player.emoji}
                    </motion.span>
                    
                    {/* Effet de brillance au hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-3xl bg-white/40 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Particules magiques */}
                    <AnimatePresence>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-dutch-orange rounded-full opacity-0 group-hover/emoji:opacity-100"
                          initial={{ scale: 0, x: 0, y: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            x: (Math.random() - 0.5) * 40,
                            y: (Math.random() - 0.5) * 40,
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 2
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.button>

                  {/* Nom du joueur avec design amélioré */}
                  <div className="flex-1">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <Input
                        value={player.name}
                        onChange={(e) => updatePlayerName(index, e.target.value)}
                        className="
                          bg-white/95 border-gray-200/80 focus:border-dutch-blue/90 
                          text-center font-semibold rounded-2xl text-xl h-14
                          transition-all duration-300
                          focus:ring-4 focus:ring-dutch-blue/20 focus:bg-white focus:shadow-xl
                          group-hover:bg-white group-hover:shadow-lg
                          placeholder:text-gray-400
                          border-2
                        "
                        placeholder={`Joueur ${index + 1}`}
                        maxLength={15}
                      />
                      
                      {/* Effet de brillance sur le champ */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 -skew-x-12"
                        whileFocus={{
                          opacity: [0, 1, 0],
                          x: [-100, 100]
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Barre de progression dynamique */}
                <motion.div
                  className="h-2 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  layoutId={`progress-${index}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </UnifiedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
