
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import EmojiSelector from './EmojiSelector';

interface PlayerAddFormProps {
  newPlayer: string;
  setNewPlayer: (name: string) => void;
  selectedEmoji: string;
  setSelectedEmoji: (emoji: string) => void;
  onAddPlayer: () => void;
  playersCount: number;
}

const PlayerAddForm: React.FC<PlayerAddFormProps> = ({
  newPlayer,
  setNewPlayer,
  selectedEmoji,
  setSelectedEmoji,
  onAddPlayer,
  playersCount
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddPlayer();
    }
  };

  return (
    <div className="space-y-3">
      {/* Emoji Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Thème de la partie</label>
        <EmojiSelector 
          selectedEmoji={selectedEmoji} 
          onEmojiSelect={setSelectedEmoji} 
        />
      </div>

      {/* Add Player */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Nom du joueur"
            className="bg-white/70 border-white/60 focus:border-dutch-blue transition-colors"
            onKeyDown={handleKeyDown}
            maxLength={20}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={onAddPlayer}
              className="bg-dutch-blue text-white hover:bg-dutch-blue/90"
              disabled={playersCount >= 10}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlayerAddForm;
