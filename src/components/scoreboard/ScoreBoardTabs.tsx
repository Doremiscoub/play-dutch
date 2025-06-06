
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { List, Table } from 'lucide-react';

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
      <div className="flex bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 p-1.5 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('list')}
          className={`rounded-xl transition-all duration-300 px-4 py-2 font-medium ${
            currentView === 'list' 
              ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg transform scale-105' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/30 hover:scale-102'
          }`}
        >
          <List className="h-4 w-4 mr-2" />
          Vue Liste
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('table')}
          className={`rounded-xl transition-all duration-300 px-4 py-2 font-medium ${
            currentView === 'table' 
              ? 'bg-gradient-to-r from-dutch-purple to-dutch-orange text-white shadow-lg transform scale-105' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/30 hover:scale-102'
          }`}
        >
          <Table className="h-4 w-4 mr-2" />
          Tableau
        </Button>
      </div>
    </motion.div>
  );
};

export default ScoreBoardTabs;
