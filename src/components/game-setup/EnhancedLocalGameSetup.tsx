
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, Crown, Users, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import PlayerAddForm from './PlayerAddForm';
import QuickAddButtons from './QuickAddButtons';
import GameEstimation from './GameEstimation';

interface Player {
  name: string;
  emoji: string;
}

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

// Emojis pour les joueurs
const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);
  const [newPlayer, setNewPlayer] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎮');

  const handleAddPlayer = () => {
    if (!newPlayer.trim()) {
      toast.error('Entrez un nom de joueur');
      return;
    }

    if (newPlayer.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères');
      return;
    }

    if (players.some(p => p.name === newPlayer.trim())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayerObj: Player = {
      name: newPlayer.trim(),
      emoji: selectedEmoji
    };

    setPlayers([...players, newPlayerObj]);
    setNewPlayer('');
    toast.success(`${newPlayer.trim()} ajouté !`);
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }
    
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer.name} retiré`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleQuickAdd = (name: string) => {
    if (players.some(p => p.name === name)) return;
    if (players.length >= 10) return;
    
    const newPlayerObj: Player = {
      name,
      emoji: playerEmojis[players.length % playerEmojis.length]
    };
    
    setPlayers([...players, newPlayerObj]);
    toast.success(`${name} ajouté !`);
  };

  const quickNames = ['Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const availableQuickNames = quickNames.filter(name => !players.some(p => p.name === name));
  const canStartGame = players.length >= 2;

  return (
    <div className="relative overflow-hidden">
      {/* Particules d'arrière-plan animées */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-dutch-blue/30 to-dutch-purple/30 rounded-full"
            animate={{
              x: [0, Math.random() * 300 - 150, 0],
              y: [0, Math.random() * 300 - 150, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="border border-white/50 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative z-10">
          <CardHeader className="bg-gradient-to-r from-dutch-blue/15 via-dutch-purple/10 to-dutch-orange/15 relative">
            {/* Éléments décoratifs */}
            <motion.div
              className="absolute top-4 right-6 opacity-30"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="h-8 w-8 text-dutch-orange" />
            </motion.div>
            
            <motion.div
              className="absolute bottom-4 left-6 opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users className="h-10 w-10 text-dutch-blue" />
            </motion.div>

            <CardTitle className="flex items-center gap-3 relative z-10">
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {selectedEmoji}
              </motion.span>
              <div>
                <motion.span
                  className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent font-bold"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Partie rapide
                </motion.span>
                <CardDescription className="mt-1 text-gray-600">
                  Configuration simple pour commencer immédiatement
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <PlayerAddForm
                newPlayer={newPlayer}
                setNewPlayer={setNewPlayer}
                selectedEmoji={selectedEmoji}
                setSelectedEmoji={setSelectedEmoji}
                onAddPlayer={handleAddPlayer}
                playersCount={players.length}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <QuickAddButtons
                availableNames={availableQuickNames}
                onQuickAdd={handleQuickAdd}
              />
            </motion.div>

            {/* Liste des joueurs avec animations avancées */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                  Joueurs ({players.length})
                </h3>
                {players.length > 2 && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShufflePlayers}
                      className="bg-white/70 hover:bg-white/90 border-dutch-purple/30 hover:border-dutch-purple/50 text-dutch-purple hover:text-dutch-purple transition-all duration-300"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Shuffle className="h-4 w-4" />
                      </motion.div>
                      Mélanger
                    </Button>
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {players.map((player, index) => (
                    <motion.div 
                      key={`${player.name}-${index}`}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25,
                        layout: { duration: 0.3 }
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="relative group"
                    >
                      {/* Effet de lueur au hover */}
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="flex items-center justify-between p-4 bg-white/60 hover:bg-white/80 rounded-2xl border-2 border-white/50 hover:border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10">
                        <div className="flex items-center gap-4">
                          {/* Badge de position */}
                          <motion.div 
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 flex items-center justify-center text-sm font-bold text-dutch-blue border-2 border-dutch-blue/30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {index + 1}
                            {index === 0 && (
                              <motion.div
                                className="absolute -top-1 -right-1"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Crown className="h-4 w-4 text-yellow-500" />
                              </motion.div>
                            )}
                          </motion.div>
                          
                          {/* Emoji avec effet hover */}
                          <motion.span 
                            className="text-2xl"
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {player.emoji}
                          </motion.span>
                          
                          {/* Nom du joueur */}
                          <span className="font-semibold text-lg text-gray-800">
                            {player.name}
                          </span>
                        </div>
                        
                        {/* Bouton supprimer avec animation */}
                        <motion.div
                          whileHover={{ scale: players.length > 2 ? 1.1 : 1 }}
                          whileTap={{ scale: players.length > 2 ? 0.9 : 1 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemovePlayer(index)}
                            disabled={players.length <= 2}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                          >
                            <motion.span
                              animate={players.length > 2 ? { rotate: [0, 180, 0] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              ✕
                            </motion.span>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <GameEstimation playersCount={players.length} />
            </motion.div>
          </CardContent>
          
          <CardFooter className="bg-gradient-to-r from-gray-50/80 via-white/60 to-gray-50/80 border-t border-white/60 backdrop-blur-sm">
            <motion.div 
              className="w-full"
              whileHover={{ scale: canStartGame ? 1.02 : 1 }}
              whileTap={{ scale: canStartGame ? 0.98 : 1 }}
            >
              <Button 
                onClick={() => onStartGame(players.map(p => p.name))}
                className="w-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange text-white shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg py-6 relative overflow-hidden group"
                disabled={!canStartGame}
                size="lg"
              >
                {/* Effet de vague animée */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={canStartGame ? {
                    x: ['-100%', '100%']
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <motion.div
                    animate={canStartGame ? { 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Play className="h-6 w-6" />
                  </motion.div>
                  
                  <span>
                    {canStartGame ? 'Commencer la partie' : 'Ajoutez des joueurs pour continuer'}
                  </span>
                  
                  {canStartGame && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Sparkles className="h-5 w-5" />
                    </motion.div>
                  )}
                </div>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedLocalGameSetup;
