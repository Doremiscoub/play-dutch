
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Target, Plus, Minus } from 'lucide-react';

interface TournamentRoundsSelectorProps {
  rounds: number;
  onRoundsChange: (rounds: number) => void;
}

const TournamentRoundsSelector: React.FC<TournamentRoundsSelectorProps> = ({
  rounds,
  onRoundsChange
}) => {
  const presetRounds = [3, 5, 7, 10];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-dutch-orange" />
        <label className="text-sm font-medium text-gray-700">
          Nombre de manches
        </label>
      </div>
      
      {/* Presets */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {presetRounds.map((preset) => (
          <motion.div
            key={preset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={rounds === preset ? "default" : "outline"}
              size="sm"
              onClick={() => onRoundsChange(preset)}
              className={rounds === preset ? 
                "bg-dutch-orange text-white border-dutch-orange" : 
                "bg-white/70 hover:bg-white/90"
              }
            >
              {preset}
            </Button>
          </motion.div>
        ))}
      </div>
      
      {/* Custom selector */}
      <div className="flex items-center justify-center gap-4 bg-white/60 rounded-xl p-3 border border-white/40">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onRoundsChange(Math.max(1, rounds - 1))}
          className="h-8 w-8 bg-white/70 hover:bg-white/90"
          disabled={rounds <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-dutch-orange min-w-[3rem] text-center">
            {rounds}
          </span>
          <span className="text-sm text-gray-600">
            manche{rounds > 1 ? 's' : ''}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onRoundsChange(rounds + 1)}
          className="h-8 w-8 bg-white/70 hover:bg-white/90"
          disabled={rounds >= 20}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        Durée estimée : {Math.round(rounds * 10)} - {Math.round(rounds * 15)} minutes
      </div>
    </div>
  );
};

export default TournamentRoundsSelector;
