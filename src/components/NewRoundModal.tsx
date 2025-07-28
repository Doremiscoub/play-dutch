
import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Minus, Plus, User, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import useIsMobile from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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
      <DialogContent className={`glass-modal ${isMobile ? 'sm:max-w-[95vw] max-h-[85vh]' : 'sm:max-w-lg'}`}>
        <DialogHeader>
          <DialogTitle className={`font-semibold text-gray-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            Ajouter une manche
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className={`mt-4 ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              className={`vision-card ${isMobile ? 'p-3' : 'p-4'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className={`flex items-center ${isMobile ? 'flex-col gap-3' : 'justify-between'}`}>
                <div className={`flex items-center gap-3 ${isMobile ? 'w-full justify-center' : ''}`}>
                  <div className={`rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-medium ${isMobile ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                    {index + 1}
                  </div>
                  <span className={`font-medium text-gray-800 ${isMobile ? 'text-sm' : ''}`}>
                    {isMobile && player.name.length > 12 ? player.name.substring(0, 12) + '...' : player.name}
                  </span>
                </div>

                <div className={`flex items-center ${isMobile ? 'gap-2 w-full justify-center' : 'gap-3'}`}>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => adjustScore(index, -1)}
                    className={`rounded-full lg-popover lg-tint-primary-50 lg-hover-state ${isMobile ? 'w-10 h-10 min-h-[40px] touch-target' : 'w-8 h-8'}`}
                    disabled={isSubmitting}
                  >
                    <Minus className={`${isMobile ? 'h-4 w-4' : 'h-3 w-3'}`} />
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
                    className={`px-2 text-center glass-input text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 transition-all ${
                      isMobile ? 'w-20 h-12 text-lg touch-target' : 'w-16 h-10'
                    }`}
                    placeholder="0"
                    disabled={isSubmitting}
                  />

                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => adjustScore(index, 1)}
                    className={`rounded-full lg-popover lg-tint-primary-50 lg-hover-state ${isMobile ? 'w-10 h-10 min-h-[40px] touch-target' : 'w-8 h-8'}`}
                    disabled={isSubmitting}
                  >
                    <Plus className={`${isMobile ? 'h-4 w-4' : 'h-3 w-3'}`} />
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant={dutchPlayerId === player.id ? "default" : "outline"}
                    className={`rounded-full transition-all lg-hover-state ${
                      isMobile ? 'px-3 py-2 text-xs min-h-[40px] touch-target' : 'ml-2 px-4'
                    } ${
                      dutchPlayerId === player.id
                        ? "lg-card lg-tint-accent-60 text-white lg-elevation-03"
                        : "lg-popover lg-tint-secondary-50 text-white hover:lg-tint-secondary-70"
                    }`}
                    onClick={() => handleDutchToggle(player.id)}
                    disabled={isSubmitting}
                  >
                    <Zap className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-3 w-3 mr-1'}`} />
                    {isMobile ? 'D' : 'Dutch'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          <DialogFooter className={`${isMobile ? 'mt-4 gap-2 flex-col' : 'mt-6 gap-3'}`}>
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className={`lg-popover lg-tint-primary-50 lg-hover-state ${isMobile ? 'w-full min-h-[48px] touch-target' : ''}`}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md hover:shadow-lg transition-all ${
                isMobile ? 'w-full min-h-[48px] touch-target' : ''
              }`}
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
