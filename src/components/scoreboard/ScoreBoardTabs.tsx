
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
    <div className="flex justify-center mb-8 px-4">
      <motion.div 
        className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-3 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-2">
          <motion.button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center relative overflow-hidden",
              currentView === 'list' 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105" 
                : "text-neutral-700 hover:bg-gradient-to-r hover:from-blue-400/20 hover:to-blue-500/20 hover:scale-102"
            )}
            onClick={() => onViewChange('list')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentView === 'list' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-600/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.div
              animate={{ rotate: currentView === 'list' ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <List className="h-5 w-5 relative z-10" />
            </motion.div>
            <span className="hidden sm:inline relative z-10">🏆 Classement</span>
            <span className="sm:hidden relative z-10">Liste</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center relative overflow-hidden",
              currentView === 'table' 
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105" 
                : "text-neutral-700 hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-purple-500/20 hover:scale-102"
            )}
            onClick={() => onViewChange('table')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentView === 'table' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-purple-600/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.div
              animate={{ rotate: currentView === 'table' ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Table className="h-5 w-5 relative z-10" />
            </motion.div>
            <span className="hidden sm:inline relative z-10">📊 Tableau</span>
            <span className="sm:hidden relative z-10">Manches</span>
          </motion.button>
          
          <motion.button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center relative overflow-hidden",
              currentView === 'stats' 
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105" 
                : "text-neutral-700 hover:bg-gradient-to-r hover:from-green-400/20 hover:to-green-500/20 hover:scale-102"
            )}
            onClick={() => onViewChange('stats')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentView === 'stats' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-green-600/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <motion.div
              animate={{ rotate: currentView === 'stats' ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <BarChart3 className="h-5 w-5 relative z-10" />
            </motion.div>
            <span className="hidden sm:inline relative z-10">📈 Statistiques</span>
            <span className="sm:hidden relative z-10">Stats</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreBoardTabs;
