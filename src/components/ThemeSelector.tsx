import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import GameSettings from './GameSettings';

const ThemeSelector: React.FC = () => {
  // Note: we've simplified this component as we're removing theme selector functionality
  // per user request, but keeping the component to avoid breaking references
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="absolute top-4 right-4 z-10"
    >
      <GameSettings />
    </motion.div>
  );
};

export default ThemeSelector;
