
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
    <div className="flex justify-center mb-4 md:mb-8 px-2 md:px-4">
      <motion.div 
        className="bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20 backdrop-blur-xl border border-purple-300/30 rounded-2xl md:rounded-3xl p-2 md:p-4 shadow-xl w-full max-w-md md:max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-1 md:gap-3">
          <motion.button
            className={cn(
              "flex items-center gap-1 md:gap-3 px-3 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 min-w-0 md:min-w-[140px] justify-center relative overflow-hidden flex-1 text-sm md:text-base",
              currentView === 'list' 
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl transform scale-105 md:scale-110" 
                : "text-purple-700 hover:bg-gradient-to-r hover:from-purple-400/30 hover:to-pink-400/30 hover:scale-105"
            )}
            onClick={() => onViewChange('list')}
            whileHover={{ y: -3, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentView === 'list' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/40 to-pink-400/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.span
              className="text-xl md:text-2xl relative z-10"
              animate={{ rotate: currentView === 'list' ? [0, -15, 15, 0] : 0 }}
              transition={{ duration: 0.6 }}
            >
              🏆
            </motion.span>
            <span className="hidden sm:inline relative z-10">Classement</span>
            <span className="sm:hidden relative z-10">Liste</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-1 md:gap-3 px-3 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 min-w-0 md:min-w-[140px] justify-center relative overflow-hidden flex-1 text-sm md:text-base",
              currentView === 'table' 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl transform scale-105 md:scale-110" 
                : "text-orange-700 hover:bg-gradient-to-r hover:from-orange-400/30 hover:to-red-400/30 hover:scale-105"
            )}
            onClick={() => onViewChange('table')}
            whileHover={{ y: -3, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentView === 'table' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/40 to-red-400/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.span
              className="text-xl md:text-2xl relative z-10"
              animate={{ rotate: currentView === 'table' ? [0, -15, 15, 0] : 0 }}
              transition={{ duration: 0.6 }}
            >
              📊
            </motion.span>
            <span className="hidden sm:inline relative z-10">Tableau</span>
            <span className="sm:hidden relative z-10">Manches</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-1 md:gap-3 px-3 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all duration-300 min-w-0 md:min-w-[140px] justify-center relative overflow-hidden flex-1 text-sm md:text-base",
              currentView === 'stats' 
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-xl transform scale-105 md:scale-110" 
                : "text-cyan-700 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-blue-400/30 hover:scale-105"
            )}
            onClick={() => onViewChange('stats')}
            whileHover={{ y: -3, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentView === 'stats' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-400/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.span
              className="text-xl md:text-2xl relative z-10"
              animate={{ rotate: currentView === 'stats' ? [0, -15, 15, 0] : 0 }}
              transition={{ duration: 0.6 }}
            >
              📈
            </motion.span>
            <span className="hidden sm:inline relative z-10">Statistiques</span>
            <span className="sm:hidden relative z-10">Stats</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreBoardTabs;
