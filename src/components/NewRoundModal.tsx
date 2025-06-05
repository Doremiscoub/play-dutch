
import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Minus, Plus, User, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

interface NewRoundModalProps {
  players: Player[];
  scores: number[];
  dutchPlayerId?: string;
  onClose: () => void;
  onAddRound: () => void;
  setScores: React.Dispatch<React.SetStateAction<number[]>>;
  setDutchPlayerId: React.Dispatch<React.SetStateAction<string | undefined>>;
  open: boolean;
}

const NewRoundModal: React.FC<NewRoundModalProps> = ({
  players,
  scores,
  dutchPlayerId,
  onClose,
  onAddRound,
  setScores,
  setDutchPlayerId,
  open
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && firstInputRef.current) {
      firstInputRef.current.focus();
    }
    if (open) {
      setIsSubmitting(false);
    }
  }, [open]);

  const handleScoreChange = (index: number, value: string) => {
    const newScores = [...scores];
    // Allow negative scores down to -6
    if (value === '' || value === '-') {
      newScores[index] = 0;
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && parsedValue >= -6) {
        newScores[index] = parsedValue;
      }
    }
    setScores(newScores);
  };

  const handleDutchToggle = (playerId: string) => {
    if (dutchPlayerId === playerId) {
      setDutchPlayerId(undefined);
    } else {
      setDutchPlayerId(playerId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    onClose();

    setTimeout(() => {
      onAddRound();
    }, 10);
  };

  const validateNumberInput = (input: string): boolean => {
    return /^-?\d*$/.test(input);
  };

  const adjustScore = (index: number, amount: number) => {
    const newScores = [...scores];
    const newValue = (newScores[index] || 0) + amount;
    // Allow negative scores down to -6
    newScores[index] = Math.max(-6, newValue);
    setScores(newScores);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Ajouter une manche</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              className="p-4 glass-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-medium text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{player.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => adjustScore(index, -1)}
                    className="w-8 h-8 rounded-full glass-button"
                    disabled={isSubmitting}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <input
                    ref={index === 0 ? firstInputRef : undefined}
                    type="text"
                    value={scores[index] === 0 ? '' : scores[index]}
                    onChange={(e) => {
                      if (validateNumberInput(e.target.value)) {
                        handleScoreChange(index, e.target.value);
                      }
                    }}
                    className="w-16 h-10 px-2 text-center glass-input text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 transition-all"
                    placeholder="0"
                    disabled={isSubmitting}
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => adjustScore(index, 1)}
                    className="w-8 h-8 rounded-full glass-button"
                    disabled={isSubmitting}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={dutchPlayerId === player.id ? "default" : "outline"}
                    className={`ml-2 rounded-full px-4 transition-all glass-button ${
                      dutchPlayerId === player.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                        : "text-green-700 hover:bg-green-50"
                    }`}
                    onClick={() => handleDutchToggle(player.id)}
                    disabled={isSubmitting}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Dutch
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          <DialogFooter className="mt-6 gap-3">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="glass-button"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? 'Validation...' : 'Valider la manche'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoundModal;
