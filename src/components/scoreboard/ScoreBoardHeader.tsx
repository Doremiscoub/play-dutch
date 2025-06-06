
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Table } from 'lucide-react';
import GameSettings from '@/components/GameSettings';

interface ScoreBoardHeaderProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardHeader: React.FC<ScoreBoardHeaderProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <motion.div 
      className="flex justify-center items-center space-x-4 mb-8 mt-4 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <motion.button
        onClick={() => onViewChange('list')}
        className={`px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium min-w-[180px] ${
          currentView === 'list'
            ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg scale-105'
            : 'bg-white/80 backdrop-blur-xl border border-white/60 text-gray-800 hover:bg-white/90 hover:scale-102'
        }`}
        whileHover={{ scale: currentView === 'list' ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <BarChart3 className="h-4 w-4" />
        Classement détaillé
      </motion.button>
      
      <motion.button
        onClick={() => onViewChange('table')}
        className={`px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium min-w-[180px] ${
          currentView === 'table'
            ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg scale-105'
            : 'bg-white/80 backdrop-blur-xl border border-white/60 text-gray-800 hover:bg-white/90 hover:scale-102'
        }`}
        whileHover={{ scale: currentView === 'table' ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Table className="h-4 w-4" />
        Tableau des manches
      </motion.button>

      {/* Settings button using GameSettings modal */}
      <div className="ml-4">
        <GameSettings />
      </div>
    </motion.div>
  );
};

export default ScoreBoardHeader;
