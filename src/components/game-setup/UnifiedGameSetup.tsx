
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Trophy, Sparkles, Shuffle } from 'lucide-react';
import { GameHeader, GameText, ActionText } from '@/components/ui/game-typography';
import { GameButton } from '@/components/ui/game-button';
import { GameCard } from '@/components/ui/game-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UnifiedGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const getRandomEmoji = () => {
  const emojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋', '🤔', '😴', '🤯', '🥸', '🤠', '👻', '🤖', '👽', '🦄', '🐻'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const UnifiedGameSetup: React.FC<UnifiedGameSetupProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [playerEmojis, setPlayerEmojis] = useState<string[]>(() => 
    Array(2).fill('').map(() => getRandomEmoji())
  );
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addPlayer = () => {
    if (playerNames.length < 10) {
      setPlayerNames([...playerNames, '']);
      setPlayerEmojis([...playerEmojis, getRandomEmoji()]);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
      setPlayerEmojis(playerEmojis.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const updatePlayerEmoji = (index: number, emoji: string) => {
    const newEmojis = [...playerEmojis];
    newEmojis[index] = emoji;
    setPlayerEmojis(newEmojis);
  };

  const randomizeAllEmojis = () => {
    const newEmojis = playerEmojis.map(() => getRandomEmoji());
    setPlayerEmojis(newEmojis);
    toast.success('Emojis mélangés !');
  };

  const handleStartGame = () => {
    if (isSubmitting) return;
    
    const validNames = playerNames.filter(name => name.trim() !== '');
    if (validNames.length >= 2) {
      setIsSubmitting(true);
      
      // Prepare player data with emojis
      const playerData = validNames.map((name, index) => ({
        name: name.trim(),
        emoji: playerEmojis[index] || getRandomEmoji()
      }));
      
      localStorage.setItem('dutch_score_limit', scoreLimit.toString());
      localStorage.setItem('dutch_player_setup', JSON.stringify(playerData));
      
      setTimeout(() => {
        onStartGame(validNames);
      }, 300);
    } else {
      toast.error("Il faut au moins 2 joueurs pour commencer");
    }
  };

  const canStartGame = playerNames.filter(name => name.trim() !== '').length >= 2;

  return (
    <GameCard variant="glass" className="p-8">
      {/* Score Limit Section */}
      <GameCard variant="pokemonCard" className="p-6 mb-8">
        <div className="text-center">
          <GameText variant="cardTitle" gameColor="default" className="mb-4 flex items-center justify-center">
            <Trophy className="mr-2 h-5 w-5" />
            Limite de score
          </GameText>
          
          <div className="flex items-center justify-center gap-4">
            <GameButton
              variant="classic"
              size="icon"
              onClick={() => setScoreLimit(Math.max(50, scoreLimit - 10))}
            >
              <Minus className="h-4 w-4" />
            </GameButton>
            
            <GameCard variant="unoCard" className="px-6 py-3">
              <ActionText gameColor="white" className="text-4xl">
                {scoreLimit}
              </ActionText>
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
          <GameText variant="cardTitle" gameColor="default" className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            Joueurs ({playerNames.length})
          </GameText>
          
          <div className="flex gap-2">
            <GameButton
              variant="pokemon"
              size="sm"
              onClick={randomizeAllEmojis}
            >
              <Shuffle className="mr-1 h-4 w-4" />
              Mélanger
            </GameButton>
            
            {playerNames.length < 10 && (
              <GameButton
                variant="uno"
                size="sm"
                onClick={addPlayer}
              >
                <Plus className="mr-1 h-4 w-4" />
                Ajouter
              </GameButton>
            )}
          </div>
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
                    <GameCard variant="unoCard" className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <ActionText gameColor="white">
                        {index + 1}
                      </ActionText>
                    </GameCard>
                    
                    <div 
                      className="w-12 h-12 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center text-xl shadow-sm cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => updatePlayerEmoji(index, getRandomEmoji())}
                    >
                      {playerEmojis[index] || '🎮'}
                    </div>
                    
                    <Input
                      placeholder={`Joueur ${index + 1}`}
                      value={name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="flex-1 text-lg font-semibold bg-white/50 border-2 border-gray-300 rounded-xl focus:border-game-blue focus:ring-game-blue/20"
                      disabled={isSubmitting}
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
      <div className="text-center">
        <GameButton
          variant="uno"
          size="xl"
          onClick={handleStartGame}
          disabled={!canStartGame || isSubmitting}
          className="w-full md:w-auto min-w-64"
        >
          <Users className="mr-3 h-6 w-6" />
          {isSubmitting ? 'CRÉATION...' : 'COMMENCER LA PARTIE'}
        </GameButton>
        
        {!canStartGame && (
          <GameText variant="caption" gameColor="default" className="mt-3 opacity-70">
            Ajoutez au moins 2 joueurs pour commencer
          </GameText>
        )}
      </div>
    </GameCard>
  );
};

export default UnifiedGameSetup;
