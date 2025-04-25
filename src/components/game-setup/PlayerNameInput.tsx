
import React from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { SETUP_UI } from '@/config/setup-ui';
import { cn } from '@/lib/utils';

interface PlayerNameInputProps {
  index: number;
  name: string;
  onChange: (index: number, name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ index, name, onChange }) => {
  return (
    <motion.div 
      key={index} 
      className={SETUP_UI.player.container}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
    >
      <div className={SETUP_UI.player.number}>
        {index + 1}
      </div>
      <div className={SETUP_UI.player.input.wrapper}>
        <motion.div 
          className={SETUP_UI.player.input.glow}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Input
          value={name}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder={`Joueur ${index + 1}`}
          className={cn(SETUP_UI.player.input.base)}
          maxLength={20}
        />
      </div>
    </motion.div>
  );
};

export default PlayerNameInput;
