
import React from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface PlayerNameInputProps {
  index: number;
  name: string;
  onChange: (index: number, name: string) => void;
  placeholder?: string;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ index, name, onChange, placeholder }) => {
  return (
    <motion.div 
      key={index} 
      className="flex items-center gap-3"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold shadow-md">
        {index + 1}
      </div>
      <div className="relative flex-grow">
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-lg blur opacity-30"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Input
          value={name}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder={placeholder || `Joueur ${index + 1}`}
          className="dutch-input border border-white/40 shadow-sm relative z-10 backdrop-blur-sm"
          maxLength={20}
        />
      </div>
    </motion.div>
  );
};

export default PlayerNameInput;
