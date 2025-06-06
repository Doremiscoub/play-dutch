
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <motion.div 
      className="flex justify-center items-center mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 p-1">
        <Button
          variant={currentView === 'list' ? 'dutch-primary' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('list')}
          className={`rounded-lg transition-all duration-200 ${
            currentView === 'list' 
              ? 'bg-dutch-blue text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/30'
          }`}
        >
          Vue Liste
        </Button>
        <Button
          variant={currentView === 'table' ? 'dutch-primary' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('table')}
          className={`rounded-lg transition-all duration-200 ${
            currentView === 'table' 
              ? 'bg-dutch-blue text-white shadow-sm' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/30'
          }`}
        >
          Tableau
        </Button>
      </div>
    </motion.div>
  );
};

export default ScoreBoardTabs;
