
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from '@/types';

interface NewRoundModalProps {
  players: Player[];
  onClose: () => void;
  onSave: (scores: number[]) => void;
}

const NewRoundModal: React.FC<NewRoundModalProps> = ({ players, onClose, onSave }) => {
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));
  const [dutchPlayer, setDutchPlayer] = useState<number | null>(null);
  const [dutchPenaltyApplied, setDutchPenaltyApplied] = useState(false);
  
  const handleScoreChange = (index: number, value: string) => {
    const newScore = parseInt(value) || 0;
    const newScores = [...scores];
    newScores[index] = newScore;
    setScores(newScores);
  };
  
  const handleDutchPlayerClick = (index: number) => {
    if (dutchPlayer === index) {
      setDutchPlayer(null);
      if (dutchPenaltyApplied) {
        const newScores = [...scores];
        newScores[index] -= 10;
        setScores(newScores);
        setDutchPenaltyApplied(false);
      }
    } else {
      // Remove penalty from previous Dutch player if there was one
      if (dutchPlayer !== null && dutchPenaltyApplied) {
        const newScores = [...scores];
        newScores[dutchPlayer] -= 10;
        setScores(newScores);
      }
      
      setDutchPlayer(index);
      
      // Calculate if this player should get the Dutch penalty
      const lowestScoreIndex = scores.indexOf(Math.min(...scores));
      if (lowestScoreIndex !== index) {
        const newScores = [...scores];
        newScores[index] += 10;
        setScores(newScores);
        setDutchPenaltyApplied(true);
      } else {
        setDutchPenaltyApplied(false);
      }
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-dutch-blue">Scores de la manche</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4 my-4">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-10 w-10 ${dutchPlayer === index ? 'bg-dutch-orange text-white border-dutch-orange' : ''}`}
                onClick={() => handleDutchPlayerClick(index)}
              >
                {dutchPlayer === index ? 'D' : (index + 1)}
              </Button>
              
              <div className="flex-grow">
                <p className="text-sm font-medium">{player.name}</p>
                {dutchPlayer === index && dutchPenaltyApplied && (
                  <p className="text-xs text-dutch-orange">+10 points de pénalité Dutch</p>
                )}
              </div>
              
              <Input
                type="number"
                min="0"
                value={scores[index] || ''}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                className="w-16 text-center dutch-input"
              />
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => onSave(scores)}
          className="w-full dutch-button bg-dutch-blue hover:bg-dutch-blue/90"
        >
          <Check className="mr-2 h-5 w-5" /> Sauvegarder
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NewRoundModal;
