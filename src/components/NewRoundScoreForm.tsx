
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { Plus, Minus, Zap, Users } from 'lucide-react';
import { GameCard } from '@/components/ui/game-card';
import { GameText, GameHeader, ActionText } from '@/components/ui/game-typography';
import { GameButton } from '@/components/ui/game-button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface NewRoundScoreFormProps {
  players: Player[];
  open: boolean;
  onClose: () => void;
  onSubmit: (scores: number[], dutchPlayerId?: string) => void;
}

const NewRoundScoreForm: React.FC<NewRoundScoreFormProps> = ({
  players,
  open,
  onClose,
  onSubmit
}) => {
  const [scores, setScores] = useState<number[]>(players.map(() => 0));
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setScores(players.map(() => 0));
      setDutchPlayerId(undefined);
      setIsSubmitting(false);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [open, players]);

  const handleScoreChange = (index: number, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10) || 0;
    const newScores = [...scores];
    newScores[index] = Math.max(0, numValue);
    setScores(newScores);
  };

  const adjustScore = (index: number, amount: number) => {
    const newScores = [...scores];
    newScores[index] = Math.max(0, (newScores[index] || 0) + amount);
    setScores(newScores);
  };

  const handleDutchToggle = (playerId: string) => {
    setDutchPlayerId(dutchPlayerId === playerId ? undefined : playerId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    if (totalScore === 0) {
      toast.error("Ajoutez au moins un score !");
      return;
    }

    setIsSubmitting(true);
    onSubmit(scores, dutchPlayerId);
    toast.success("Manche ajoutée avec succès !");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <GameHeader gameColor="gameGradient" effect="shadow" className="mb-2">
            <Users className="inline mr-3 h-8 w-8" />
            NOUVELLE MANCHE
          </GameHeader>
          <GameText variant="adventure" gameColor="primary">
            Entrez les scores de cette manche
          </GameText>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <GameCard variant="playingCard" className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Player Info */}
                    <div className="flex items-center gap-3">
                      <GameCard variant="unoCard" className="w-12 h-12 flex items-center justify-center">
                        <ActionText gameColor="white" className="text-lg font-bold">
                          {index + 1}
                        </ActionText>
                      </GameCard>
                      
                      <div>
                        <GameText variant="cardTitle" className="font-bold">
                          {player.name}
                        </GameText>
                        <GameText variant="caption" gameColor="default" className="opacity-70">
                          Total: {player.totalScore} pts
                        </GameText>
                      </div>
                    </div>

                    {/* Score Controls */}
                    <div className="flex items-center gap-2">
                      <GameButton
                        type="button"
                        variant="classic"
                        size="icon"
                        onClick={() => adjustScore(index, -1)}
                        disabled={isSubmitting || scores[index] <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </GameButton>

                      <GameCard variant="score" className="px-4 py-2">
                        <Input
                          ref={index === 0 ? firstInputRef : undefined}
                          type="number"
                          min="0"
                          max="100"
                          value={scores[index] || ''}
                          onChange={(e) => handleScoreChange(index, e.target.value)}
                          className="w-16 text-center font-bold text-xl border-0 bg-transparent focus:ring-0 p-0"
                          disabled={isSubmitting}
                          placeholder="0"
                        />
                      </GameCard>

                      <GameButton
                        type="button"
                        variant="classic"
                        size="icon"
                        onClick={() => adjustScore(index, 1)}
                        disabled={isSubmitting}
                      >
                        <Plus className="h-4 w-4" />
                      </GameButton>

                      {/* Dutch Button */}
                      <GameButton
                        type="button"
                        variant={dutchPlayerId === player.id ? "uno" : "ghost"}
                        size="sm"
                        onClick={() => handleDutchToggle(player.id)}
                        disabled={isSubmitting}
                        className="ml-2"
                      >
                        <Zap className="mr-1 h-4 w-4" />
                        Dutch
                      </GameButton>
                    </div>
                  </div>
                </GameCard>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Dutch Explanation */}
          {dutchPlayerId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <GameCard variant="pokemonCard" className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-dutch-orange" />
                  <GameText variant="body" className="font-medium">
                    {players.find(p => p.id === dutchPlayerId)?.name} a coupé (Dutch) !
                  </GameText>
                </div>
              </GameCard>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <GameButton
              type="button"
              variant="ghost"
              size="lg"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Annuler
            </GameButton>
            
            <GameButton
              type="submit"
              variant="uno"
              size="lg"
              disabled={isSubmitting || scores.every(score => score === 0)}
              className="flex-1"
            >
              {isSubmitting ? 'Ajout...' : 'Ajouter la manche'}
            </GameButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoundScoreForm;
