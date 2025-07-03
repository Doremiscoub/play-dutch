
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ColorThemeSelector: React.FC = () => {
  const { currentTheme } = useTheme();

  // Simple version that just shows the current theme but doesn't allow changing
  // (as per user's request to remove theme picker functionality)
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 p-2 rounded-xl glass-dark">
        <div className="w-5 h-5 rounded-full bg-dutch-blue"></div>
        <span className="text-sm">Thème {currentTheme}</span>
        <Check className="ml-auto h-4 w-4 text-dutch-blue" />
      </div>
    </div>
  );
};

export default ColorThemeSelector;
