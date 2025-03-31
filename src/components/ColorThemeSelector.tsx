
import React from 'react';
import { Card } from '@/components/ui/card';
import { useTheme, themeConfig } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

const ColorThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(themeConfig).map(([id, theme]) => (
        <motion.div
          key={id}
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card 
            className={`flex items-center p-4 cursor-pointer hover:shadow-md transition-shadow ${
              currentTheme === id 
                ? 'ring-2 ring-dutch-blue border-transparent' 
                : 'border-gray-200/60'
            }`}
            onClick={() => setTheme(id as any)}
          >
            <div className="flex gap-2 mr-4">
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: theme.primary }}
              ></div>
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: theme.secondary }}
              ></div>
              <div 
                className="w-6 h-6 rounded-full" 
                style={{ backgroundColor: theme.accent }}
              ></div>
            </div>
            <span className="font-medium">{theme.name}</span>
            {currentTheme === id && (
              <div className="absolute right-4 h-5 w-5 bg-dutch-blue text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ColorThemeSelector;
