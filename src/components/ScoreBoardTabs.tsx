
/**
 * Onglets pour basculer entre les différentes vues du tableau des scores
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Table2 } from 'lucide-react';

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Tabs 
        value={currentView} 
        onValueChange={(value) => onViewChange(value as 'list' | 'table')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 bg-white/50 backdrop-blur-sm border border-white/50 shadow-sm rounded-xl">
          <TabsTrigger 
            value="list" 
            className="rounded-lg data-[state=active]:bg-white/90 data-[state=active]:shadow-sm data-[state=active]:text-dutch-blue flex items-center space-x-1"
          >
            <List className="h-4 w-4 mr-1" /> Classement
          </TabsTrigger>
          <TabsTrigger 
            value="table" 
            className="rounded-lg data-[state=active]:bg-white/90 data-[state=active]:shadow-sm data-[state=active]:text-dutch-blue flex items-center space-x-1"
          >
            <Table2 className="h-4 w-4 mr-1" /> Détail des manches
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default ScoreBoardTabs;
