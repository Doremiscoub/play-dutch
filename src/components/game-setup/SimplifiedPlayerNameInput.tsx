
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimplifiedPlayerNameInputProps {
  index: number;
  name: string;
  onChange: (index: number, name: string) => void;
  onRemove?: (index: number) => void;
  canRemove?: boolean;
  emoji?: string;
  onEmojiClick?: (index: number) => void;
}

const SimplifiedPlayerNameInput: React.FC<SimplifiedPlayerNameInputProps> = ({ 
  index, 
  name, 
  onChange, 
  onRemove,
  canRemove = true,
  emoji = '😀',
  onEmojiClick
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-3 p-4 bg-white/60 hover:bg-white/80 rounded-2xl border border-white/50 hover:border-dutch-blue/30 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Position Badge */}
      <div className="w-8 h-8 rounded-full bg-dutch-blue/10 border border-dutch-blue/30 flex items-center justify-center text-sm font-semibold text-dutch-blue">
        {index + 1}
      </div>
      
      {/* Emoji Button */}
      <button
        type="button"
        onClick={() => onEmojiClick?.(index)}
        className="text-2xl hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-dutch-blue/50 rounded-full p-1"
        title="Changer l'emoji"
      >
        {emoji}
      </button>
      
      {/* Name Input */}
      <div className="flex-1">
        <Input
          value={name}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder={`Joueur ${index + 1}`}
          className="border-none bg-transparent focus:bg-white/50 focus:ring-2 focus:ring-dutch-blue/50 transition-all duration-200 text-base font-medium"
          maxLength={20}
          autoComplete="off"
        />
      </div>
      
      {/* Remove Button */}
      {canRemove && onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0 rounded-full transition-all duration-200"
          title="Supprimer ce joueur"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </motion.div>
  );
};

export default SimplifiedPlayerNameInput;
