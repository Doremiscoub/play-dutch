
import React, { useState, useEffect, useRef } from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
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
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [dutchPlayer, setDutchPlayer] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const submitHandled = useRef<boolean>(false);
  
  // Réinitialiser les scores à l'ouverture du dialog
  useEffect(() => {
    if (open) {
      const initialScores: { [key: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      setDutchPlayer(undefined);
      setIsSubmitting(false);
      submitHandled.current = false;
      
      // Focus sur le premier input après l'ouverture
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);
    }
  }, [open, players]);
  
  const handleScoreChange = (playerId: string, value: string) => {
    // Permettre les entrées vides ou numériques (positives et négatives)
    if (value === '' || value === '-' || /^-?\d+$/.test(value)) {
      const score = value === '' || value === '-' ? 0 : parseInt(value);
      setScores(prev => ({
        ...prev,
        [playerId]: score
      }));
    }
  };
  
  const adjustScore = (playerId: string, increment: number) => {
    setScores(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + increment
    }));
  };
  
  const handleDutchToggle = (playerId: string, checked: boolean) => {
    setDutchPlayer(checked ? playerId : undefined);
  };
  
  const validateScores = (): boolean => {
    // Vérifier que tous les scores sont définis
    const allPlayersHaveScores = players.every(player => 
      typeof scores[player.id] === 'number'
    );
    
    if (!allPlayersHaveScores) {
      toast.error('Tous les joueurs doivent avoir un score');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = () => {
    // Protection contre la double soumission
    if (isSubmitting || submitHandled.current) {
      return;
    }
    
    if (!validateScores()) {
      return;
    }
    
    setIsSubmitting(true);
    submitHandled.current = true;
    
    try {
      // Convertir l'objet scores en array de scores dans le même ordre que les joueurs
      const scoresArray = players.map(player => scores[player.id] || 0);
      
      // Fermer immédiatement le dialogue pour éviter la double soumission
      onClose();
      
      // APRÈS la fermeture, soumettre les scores
      // Petit délai pour s'assurer que le dialogue est bien fermé
      setTimeout(() => {
        onSubmit(scoresArray, dutchPlayer);
      }, 10);
    } catch (error) {
      console.error("Erreur lors de la soumission des scores:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement des scores");
      setIsSubmitting(false);
      submitHandled.current = false;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && !isSubmitting && !submitHandled.current) onClose();
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Ajouter une manche
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 rounded-lg bg-gray-50/50"
            >
              <div className="font-medium text-gray-700 w-full sm:w-1/3">{player.name}</div>
              
              <div className="flex flex-1 items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => adjustScore(player.id, -1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  
                  <Input
                    ref={index === 0 ? firstInputRef : undefined}
                    type="text"
                    value={scores[player.id] === 0 ? '' : scores[player.id]}
                    onChange={(e) => handleScoreChange(player.id, e.target.value)}
                    className="w-20 text-center"
                    placeholder="0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSubmitting && !submitHandled.current) {
                        handleSubmit();
                      }
                    }}
                  />
                  
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => adjustScore(player.id, 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 ml-2">
                  <Switch
                    id={`dutch-${player.id}`}
                    checked={dutchPlayer === player.id}
                    onCheckedChange={(checked) => handleDutchToggle(player.id, checked)}
                  />
                  <Label htmlFor={`dutch-${player.id}`} className="text-xs sm:text-sm text-dutch-orange">
                    Dutch
                  </Label>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 sm:flex-none"
            disabled={isSubmitting || submitHandled.current}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-dutch-blue text-white hover:bg-dutch-blue/90 flex-1 sm:flex-none"
            disabled={isSubmitting || submitHandled.current}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoundScoreForm;
