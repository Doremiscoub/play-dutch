
import React from 'react';
import { motion } from 'framer-motion';
import { List, Table } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white/70 backdrop-blur-xl border-2 border-white/60 rounded-2xl p-2 shadow-xl">
        <div className="flex gap-1">
          <motion.button
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden",
              currentView === 'list' 
                ? "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg" 
                : "text-gray-600 hover:text-dutch-blue hover:bg-white/60"
            )}
            onClick={() => onViewChange('list')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentView === 'list' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-xl"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <List className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Liste</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden",
              currentView === 'table' 
                ? "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg" 
                : "text-gray-600 hover:text-dutch-blue hover:bg-white/60"
            )}
            onClick={() => onViewChange('table')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentView === 'table' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-xl"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Table className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Tableau</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardTabs;
