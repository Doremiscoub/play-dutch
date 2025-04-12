
import React from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, Table2 } from 'lucide-react';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="bg-white/70 backdrop-blur-sm p-1 rounded-full flex gap-2 shadow-sm border border-white">
        <motion.button
          onClick={() => onViewChange('list')}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full ${
            currentView === 'list'
              ? 'text-dutch-blue'
              : 'text-gray-500'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentView === 'list' && (
            <motion.div
              layoutId="tab-highlight"
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <ListOrdered className="h-4 w-4 relative z-10" />
          <span className="relative z-10 font-medium">Classement</span>
        </motion.button>

        <motion.button
          onClick={() => onViewChange('table')}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full ${
            currentView === 'table'
              ? 'text-dutch-blue'
              : 'text-gray-500'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentView === 'table' && (
            <motion.div
              layoutId="tab-highlight"
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <Table2 className="h-4 w-4 relative z-10" />
          <span className="relative z-10 font-medium">Tableau</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ScoreBoardTabs;
