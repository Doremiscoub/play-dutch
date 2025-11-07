
import React from 'react';
import { List, Table, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table' | 'stats';
  onViewChange: (view: 'list' | 'table' | 'stats') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <div className="flex justify-center mb-3 md:mb-6 px-2 md:px-4">
      <motion.div 
        className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-2 shadow-lg w-full max-w-md md:max-w-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex gap-0.5 md:gap-2">
          <motion.button
            className={cn(
              "flex items-center gap-1 md:gap-2 px-2 md:px-6 py-1.5 md:py-3 rounded-xl font-bold transition-all duration-150 min-w-0 md:min-w-[120px] justify-center flex-1 text-sm md:text-base",
              currentView === 'list' 
                ? "bg-purple-500 text-white shadow-md" 
                : "text-purple-700 hover:bg-purple-50"
            )}
            onClick={() => onViewChange('list')}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg md:text-xl">🏆</span>
            <span className="hidden sm:inline">Classement</span>
            <span className="sm:hidden">Liste</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-1 md:gap-2 px-2 md:px-6 py-1.5 md:py-3 rounded-xl font-bold transition-all duration-150 min-w-0 md:min-w-[120px] justify-center flex-1 text-sm md:text-base",
              currentView === 'table' 
                ? "bg-orange-500 text-white shadow-md" 
                : "text-orange-700 hover:bg-orange-50"
            )}
            onClick={() => onViewChange('table')}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg md:text-xl">📊</span>
            <span className="hidden sm:inline">Tableau</span>
            <span className="sm:hidden">Manches</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-1 md:gap-2 px-2 md:px-6 py-1.5 md:py-3 rounded-xl font-bold transition-all duration-150 min-w-0 md:min-w-[120px] justify-center flex-1 text-sm md:text-base",
              currentView === 'stats' 
                ? "bg-cyan-500 text-white shadow-md" 
                : "text-cyan-700 hover:bg-cyan-50"
            )}
            onClick={() => onViewChange('stats')}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg md:text-xl">📈</span>
            <span className="hidden sm:inline">Statistiques</span>
            <span className="sm:hidden">Stats</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreBoardTabs;
