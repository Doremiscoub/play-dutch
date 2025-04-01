
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Undo, Flag, CheckCircle2 } from 'lucide-react';
import NewRoundScoreForm from './NewRoundScoreForm';
import { Player } from '@/types';
import { toast } from 'sonner';

interface CustomScoreBoardButtonsProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onRequestUndoLastRound: () => void;
  onEndGame: () => void;
}

const CustomScoreBoardButtons: React.FC<CustomScoreBoardButtonsProps> = ({
  players,
  onAddRound,
  onRequestUndoLastRound,
  onEndGame
}) => {
  const [showScoreForm, setShowScoreForm] = useState(false);
  
  // Fonction pour ouvrir le formulaire de saisie de scores
  const handleOpenScoreForm = () => {
    if (players.length === 0) {
      toast.error("Aucun joueur trouvé");
      return;
    }
    setShowScoreForm(true);
  };
  
  // Fonction pour fermer le formulaire de saisie de scores
  const handleCloseScoreForm = () => {
    setShowScoreForm(false);
  };
  
  // Fonction pour gérer la soumission des scores
  const handleSubmitScores = (scores: number[], dutchPlayerId?: string) => {
    onAddRound(scores, dutchPlayerId);
    setShowScoreForm(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
        >
          <Button
            onClick={onEndGame}
            size="icon"
            variant="outline"
            className="bg-white text-dutch-purple shadow-lg border border-dutch-purple/20 rounded-full h-12 w-12"
            title="Terminer la partie"
          >
            <Flag className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.3 }}
        >
          <Button
            onClick={onRequestUndoLastRound}
            size="icon"
            variant="outline"
            className="bg-white text-dutch-orange shadow-lg border border-dutch-orange/20 rounded-full h-12 w-12"
            title="Annuler la dernière manche"
          >
            <Undo className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleOpenScoreForm}
            className="px-8 bg-gradient-to-r from-dutch-purple to-dutch-blue shadow-xl rounded-full h-14"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouvelle manche
          </Button>
        </motion.div>
      </div>
      
      <NewRoundScoreForm
        players={players}
        open={showScoreForm}
        onClose={handleCloseScoreForm}
        onSubmit={handleSubmitScores}
      />
    </>
  );
};

export default CustomScoreBoardButtons;
