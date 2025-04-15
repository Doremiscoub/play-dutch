
import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

interface NewRoundModalProps {
  players: Player[];
  scores: number[];
  dutchPlayerId?: string;
  onClose: () => void;
  onAddRound: () => void;
  setScores: React.Dispatch<React.SetStateAction<number[]>>;
  setDutchPlayerId: React.Dispatch<React.SetStateAction<string | undefined>>;
  modalRef?: React.RefObject<HTMLDialogElement>;
}

const NewRoundModal: React.FC<NewRoundModalProps> = ({
  players,
  scores,
  dutchPlayerId,
  onClose,
  onAddRound,
  setScores,
  setDutchPlayerId,
  modalRef
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleScoreChange = (index: number, value: string) => {
    const newScores = [...scores];
    // Permettre les valeurs négatives
    newScores[index] = value === '' ? 0 : parseInt(value);
    setScores(newScores);
  };

  const handleDutchToggle = (playerId: string) => {
    if (dutchPlayerId === playerId) {
      setDutchPlayerId(undefined);
    } else {
      setDutchPlayerId(playerId);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false);
      onClose();
    }
  };
  
  // Gestion de la soumission du formulaire pour éviter la double soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    onAddRound();
    handleClose(); // Fermer immédiatement après soumission
  };

  // Fonction utilitaire pour valider l'entrée numérique, acceptant les valeurs négatives
  const validateNumberInput = (input: string): boolean => {
    return /^-?\d*$/.test(input); // Accepte les chiffres et un signe négatif au début
  };

  // Fonction pour incrémenter/décrémenter le score
  const adjustScore = (index: number, amount: number) => {
    const newScores = [...scores];
    newScores[index] = (newScores[index] || 0) + amount;
    setScores(newScores);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ajouter une manche</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              className="p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-dutch-blue/10 flex items-center justify-center text-dutch-blue font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{player.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    onClick={() => adjustScore(index, -1)}
                    className="rounded-full"
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
                    className="w-14 h-10 px-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dutch-blue"
                    placeholder="0"
                  />

                  <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    onClick={() => adjustScore(index, 1)}
                    className="rounded-full"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>

                  <Button
                    type="button"
                    size="pill-sm"
                    variant={dutchPlayerId === player.id ? "pill-orange" : "pill-glass"}
                    className={`ml-2 ${
                      dutchPlayerId === player.id
                        ? "text-white bg-dutch-orange"
                        : "text-dutch-orange border-dutch-orange/30"
                    }`}
                    onClick={() => handleDutchToggle(player.id)}
                  >
                    Dutch
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          <DialogFooter className="mt-6 gap-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              variant="dutch-blue"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ajout...' : 'Ajouter la manche'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoundModal;
