
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Trophy, Sparkles } from 'lucide-react';
import { GameHeader, GameText, ActionText } from '@/components/ui/game-typography';
import { GameButton } from '@/components/ui/game-button';
import { GameCard } from '@/components/ui/game-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GameSetupGlassmorphicProps {
  onStartGame: (playerNames: string[]) => void;
}

const GameSetupGlassmorphic: React.FC<GameSetupGlassmorphicProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [scoreLimit, setScoreLimit] = useState<number>(100);

  const addPlayer = () => {
    if (playerNames.length < 10) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const validNames = playerNames.filter(name => name.trim() !== '');
    if (validNames.length >= 2) {
      localStorage.setItem('dutch_score_limit', scoreLimit.toString());
      onStartGame(validNames);
    }
  };

  const canStartGame = playerNames.filter(name => name.trim() !== '').length >= 2;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <GameCard variant="glass" className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <GameHeader gameColor="gameGradient" effect="shadow" className="mb-4">
                <Users className="inline mr-3 h-10 w-10" />
                CRÉER UNE PARTIE
              </GameHeader>
              <GameText variant="adventure" gameColor="primary" className="text-lg">
                Configurez votre partie de Dutch
              </GameText>
            </div>

            {/* Score Limit */}
            <GameCard variant="score" className="p-6 mb-8">
              <div className="text-center">
                <Label className="text-lg font-semibold text-gray-700 mb-4 block">
                  <Trophy className="inline mr-2 h-5 w-5" />
                  Limite de score
                </Label>
                <div className="flex items-center justify-center gap-4">
                  <GameButton
                    variant="classic"
                    size="icon"
                    onClick={() => setScoreLimit(Math.max(50, scoreLimit - 10))}
                  >
                    <Minus className="h-4 w-4" />
                  </GameButton>
                  
                  <GameCard variant="unoCard" className="px-6 py-3">
                    <GameText variant="scoreDisplay" gameColor="white" className="text-4xl">
                      {scoreLimit}
                    </GameText>
                  </GameCard>
                  
                  <GameButton
                    variant="classic"
                    size="icon"
                    onClick={() => setScoreLimit(Math.min(500, scoreLimit + 10))}
                  >
                    <Plus className="h-4 w-4" />
                  </GameButton>
                </div>
              </div>
            </GameCard>

            {/* Players Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Label className="text-xl font-bold text-gray-700">
                  <Sparkles className="inline mr-2 h-5 w-5" />
                  Joueurs ({playerNames.length})
                </Label>
                
                {playerNames.length < 10 && (
                  <GameButton
                    variant="pokemon"
                    size="sm"
                    onClick={addPlayer}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Ajouter
                  </GameButton>
                )}
              </div>

              <div className="grid gap-4">
                <AnimatePresence>
                  {playerNames.map((name, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GameCard variant="playingCard" className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <GameCard variant="unoCard" className="w-12 h-12 flex items-center justify-center">
                              <ActionText gameColor="white">
                                {index + 1}
                              </ActionText>
                            </GameCard>
                          </div>
                          
                          <Input
                            placeholder={`Joueur ${index + 1}`}
                            value={name}
                            onChange={(e) => updatePlayerName(index, e.target.value)}
                            className="flex-1 text-lg font-semibold bg-white/50 border-2 border-gray-300 rounded-xl"
                          />
                          
                          {playerNames.length > 2 && (
                            <GameButton
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => removePlayer(index)}
                            >
                              <Minus className="h-4 w-4" />
                            </GameButton>
                          )}
                        </div>
                      </GameCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Start Game Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GameButton
                variant="uno"
                size="xl"
                onClick={handleStartGame}
                disabled={!canStartGame}
                className="w-full md:w-auto min-w-64"
              >
                <Users className="mr-3 h-6 w-6" />
                COMMENCER LA PARTIE
              </GameButton>
              
              {!canStartGame && (
                <GameText variant="caption" gameColor="default" className="mt-3 opacity-70">
                  Ajoutez au moins 2 joueurs pour commencer
                </GameText>
              )}
            </motion.div>
          </GameCard>
        </motion.div>
      </div>
    </div>
  );
};

export default GameSetupGlassmorphic;
