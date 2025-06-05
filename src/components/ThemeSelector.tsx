
import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedThemeSelector } from '@/components/ui/unified-theme-selector';

// Ce composant est maintenu pour compatibilité mais utilise maintenant le sélecteur unifié
const ThemeSelector: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="absolute top-4 right-4 z-10"
    >
      <UnifiedThemeSelector />
    </motion.div>
  );
};

export default ThemeSelector;
