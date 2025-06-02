
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnifiedButton } from '@/components/ui/unified-button';
import { Button } from '@/components/ui/button';
import { Minus, Plus, User } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNumPlayersChange = (increment: boolean) => {
    const newNum = increment 
      ? Math.min(numPlayers + 1, 10) 
      : Math.max(numPlayers - 1, 2);
    
    setNumPlayers(newNum);
    
    if (increment && numPlayers < 10) {
      setPlayerNames([...playerNames, `Joueur ${numPlayers + 1}`]);
    } else if (!increment && numPlayers > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const validateForm = () => {
    const trimmedNames = playerNames.map(name => name.trim());
    
    // Check for empty names
    const emptyIndex = trimmedNames.findIndex(name => name === '');
    if (emptyIndex !== -1) {
      toast.error(`Le nom du joueur ${emptyIndex + 1} est requis`);
      return false;
    }
    
    // Check for duplicate names
    const duplicates = trimmedNames.filter((name, index) => trimmedNames.indexOf(name) !== index);
    if (duplicates.length > 0) {
      toast.error(`Le nom "${duplicates[0]}" est utilisé plusieurs fois`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const validPlayerNames = playerNames.map(name => 
        name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
      );
      
      localStorage.setItem('dutch_player_setup', JSON.stringify(validPlayerNames));
      
      setTimeout(() => {
        onStartGame(validPlayerNames);
      }, 300);
    } catch (error) {
      console.error("Erreur lors de la configuration des joueurs:", error);
      toast.error("Une erreur est survenue lors de la configuration");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Player Count Selector */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-800">Nombre de joueurs</h3>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/80 transition-all"
            onClick={() => handleNumPlayersChange(false)}
            disabled={numPlayers <= 2}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {numPlayers}
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm hover:bg-white/80 transition-all"
            onClick={() => handleNumPlayersChange(true)}
            disabled={numPlayers >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Player Names */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">Noms des joueurs</h3>
          <AnimatePresence>
            {playerNames.map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center text-white text-sm font-medium shadow-md">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 transition-all"
                  placeholder={`Nom du joueur ${index + 1}`}
                  disabled={isSubmitting}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="pt-4">
          <UnifiedButton 
            type="submit" 
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création...' : 'Commencer la partie'}
          </UnifiedButton>
        </div>
      </form>
    </div>
  );
};

export default EnhancedLocalGameSetup;
