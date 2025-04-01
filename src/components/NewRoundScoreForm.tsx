
import React, { useState, useEffect } from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
  
  // Réinitialiser les scores à l'ouverture du dialog
  useEffect(() => {
    if (open) {
      const initialScores: { [key: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      setDutchPlayer(undefined);
    }
  }, [open, players]);
  
  const handleScoreChange = (playerId: string, value: string) => {
    const score = parseInt(value) || 0;
    setScores(prev => ({
      ...prev,
      [playerId]: score
    }));
  };
  
  const handleDutchToggle = (playerId: string, checked: boolean) => {
    setDutchPlayer(checked ? playerId : undefined);
  };
  
  const handleSubmit = () => {
    // Convertir l'objet scores en array de scores dans le même ordre que les joueurs
    const scoresArray = players.map(player => scores[player.id] || 0);
    onSubmit(scoresArray, dutchPlayer);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Ajouter une manche
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {players.map(player => (
            <div key={player.id} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 rounded-lg bg-gray-50/50">
              <div className="font-medium text-gray-700 w-full sm:w-1/3">{player.name}</div>
              
              <div className="flex flex-1 items-center space-x-3">
                <Input
                  type="number"
                  value={scores[player.id] || ''}
                  onChange={(e) => handleScoreChange(player.id, e.target.value)}
                  className="w-24"
                  placeholder="Score"
                />
                
                <div className="flex items-center space-x-2">
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
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button 
            onClick={handleSubmit}
            className="bg-dutch-blue text-white hover:bg-dutch-blue/90"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewRoundScoreForm;
