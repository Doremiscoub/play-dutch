
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

// Composant simplifié pour le sélecteur de thème qui ne cause pas d'erreur React.Children.only
const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, themes } = useTheme();

  const handleThemeChange = () => {
    // Rotation simple entre les thèmes disponibles
    const currentIndex = themes.findIndex(theme => theme.name === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeChange}
        className="rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-white/30 shadow-sm"
        aria-label="Changer de thème"
      >
        <Palette className="h-5 w-5 text-dutch-blue" />
      </Button>
    </motion.div>
  );
};

export default ThemeSelector;
