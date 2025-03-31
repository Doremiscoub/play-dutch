
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from '@/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NewRoundModalProps {
  players: Player[];
  onClose: () => void;
  onSave: (scores: number[], dutchPlayerId?: string) => void;
}

const NewRoundModal: React.FC<NewRoundModalProps> = ({ players, onClose, onSave }) => {
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));
  const [dutchPlayer, setDutchPlayer] = useState<number | null>(null);
  const [dutchPenaltyApplied, setDutchPenaltyApplied] = useState(false);
  const [showDutchWarning, setShowDutchWarning] = useState(false);
  const [lowestScorePlayer, setLowestScorePlayer] = useState<number | null>(null);
  
  useEffect(() => {
    // Find player with lowest score after each score update
    // For negative scores, the most negative is considered "lowest"
    const validScores = scores.filter(score => score !== 0);
    if (validScores.length > 0) {
      const lowestScore = Math.min(...validScores);
      const lowestIndex = scores.findIndex(score => score === lowestScore && score !== 0);
      setLowestScorePlayer(lowestIndex >= 0 ? lowestIndex : null);
    } else {
      setLowestScorePlayer(null);
    }
  }, [scores]);
  
  const handleScoreChange = (index: number, value: string) => {
    // Parse as int, allowing for negative values
    const newScore = parseInt(value) || 0;
    const newScores = [...scores];
    newScores[index] = newScore;
    setScores(newScores);
    
    // If this player is the Dutch player, check if they need the penalty
    if (dutchPlayer === index) {
      checkDutchPenalty(index, newScores);
    }
  };
  
  const checkDutchPenalty = (dutchIndex: number, currentScores: number[]) => {
    // Get the lowest score excluding the Dutch player
    const otherScores = [...currentScores];
    otherScores.splice(dutchIndex, 1);
    const filteredScores = otherScores.filter(score => score !== 0);
    
    // If no valid scores, don't apply penalty
    if (filteredScores.length === 0) {
      setDutchPenaltyApplied(false);
      setShowDutchWarning(false);
      return;
    }
    
    const lowestScore = Math.min(...filteredScores);
    
    // Check if the Dutch player has the lowest score - for negative values, the most negative is "lowest"
    const dutchPlayerScore = currentScores[dutchIndex];
    const shouldApplyPenalty = dutchPlayerScore > lowestScore && dutchPlayerScore !== 0;
    
    // If we need to apply the penalty but haven't yet
    if (shouldApplyPenalty && !dutchPenaltyApplied) {
      const newScores = [...currentScores];
      newScores[dutchIndex] += 10;
      setScores(newScores);
      setDutchPenaltyApplied(true);
      setShowDutchWarning(true);
    } 
    // If we applied the penalty but no longer need it
    else if (!shouldApplyPenalty && dutchPenaltyApplied) {
      const newScores = [...currentScores];
      newScores[dutchIndex] -= 10;
      setScores(newScores);
      setDutchPenaltyApplied(false);
      setShowDutchWarning(false);
    }
  };
  
  const handleDutchPlayerClick = (index: number) => {
    if (dutchPlayer === index) {
      // Remove Dutch player status
      setDutchPlayer(null);
      if (dutchPenaltyApplied) {
        const newScores = [...scores];
        newScores[index] -= 10;
        setScores(newScores);
        setDutchPenaltyApplied(false);
        setShowDutchWarning(false);
      }
    } else {
      // Remove penalty from previous Dutch player if there was one
      if (dutchPlayer !== null && dutchPenaltyApplied) {
        const newScores = [...scores];
        newScores[dutchPlayer] -= 10;
        setScores(newScores);
      }
      
      setDutchPlayer(index);
      
      // Check if new Dutch player needs penalty
      const newScores = [...scores];
      // Get the lowest score excluding the new Dutch player
      const otherScores = [...newScores];
      otherScores.splice(index, 1);
      const filteredScores = otherScores.filter(score => score !== 0);
      
      if (filteredScores.length > 0 && newScores[index] !== 0) {
        const lowestScore = Math.min(...filteredScores);
        
        if (newScores[index] > lowestScore) {
          newScores[index] += 10;
          setScores(newScores);
          setDutchPenaltyApplied(true);
          setShowDutchWarning(true);
        } else {
          setDutchPenaltyApplied(false);
          setShowDutchWarning(false);
        }
      }
    }
  };
  
  const handleSave = () => {
    const dutchPlayerId = dutchPlayer !== null ? players[dutchPlayer].id : undefined;
    onSave(scores, dutchPlayerId);
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/40"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Scores de la manche</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <AnimatePresence>
          {showDutchWarning && (
            <motion.div 
              className="bg-orange-50 border border-dutch-orange/30 rounded-xl p-3 mb-4 flex items-start gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertTriangle className="h-5 w-5 text-dutch-orange flex-shrink-0 mt-0.5" />
              <p className="text-sm text-dutch-orange/90">
                Le joueur Dutch n'a pas le score le plus bas. 
                Une pénalité de +10 points a été appliquée.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-4 my-4">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center gap-3">
              <div className="flex items-center">
                <Switch
                  id={`dutch-${player.id}`}
                  checked={dutchPlayer === index}
                  onCheckedChange={() => handleDutchPlayerClick(index)}
                  className={dutchPlayer === index ? "bg-dutch-orange" : ""}
                />
                <Label 
                  htmlFor={`dutch-${player.id}`}
                  className="ml-2 text-xs font-medium"
                >
                  Dutch
                </Label>
              </div>
              
              <div className="flex-grow">
                <p className="text-sm font-medium flex items-center gap-1">
                  {player.name}
                  {lowestScorePlayer === index && scores[index] !== 0 && (
                    <Crown className="h-3 w-3 text-dutch-yellow" />
                  )}
                </p>
                {dutchPlayer === index && dutchPenaltyApplied && (
                  <p className="text-xs text-dutch-orange">+10 points de pénalité</p>
                )}
              </div>
              
              <Input
                type="number"
                value={scores[index] || ''}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                className={`w-16 text-center dutch-input ${lowestScorePlayer === index && scores[index] !== 0 ? 'ring-2 ring-dutch-yellow/50' : ''}`}
              />
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleSave}
          className="w-full dutch-button bg-gradient-to-r from-dutch-blue to-dutch-purple hover:bg-dutch-blue/90"
        >
          <Check className="mr-2 h-5 w-5" /> Sauvegarder
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NewRoundModal;
