
import React from 'react';
import { Button } from '@/components/ui/button';
import { ListFilter, Table2 } from 'lucide-react';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex gap-2 rounded-xl bg-gray-100/80 backdrop-blur-sm p-1.5 shadow-sm border border-white/50 hover:shadow-md transition-all">
      <Button
        variant={currentView === 'list' ? 'dutch-blue' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="flex-1 rounded-lg text-gray-800 hover:text-dutch-blue hover:bg-white/80"
      >
        <ListFilter className="w-4 h-4 mr-2" />
        Classement
      </Button>
      <Button
        variant={currentView === 'table' ? 'dutch-blue' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="flex-1 rounded-lg text-gray-800 hover:text-dutch-blue hover:bg-white/80"
      >
        <Table2 className="w-4 h-4 mr-2" />
        Tableau
      </Button>
    </div>
  );
};

export default ScoreBoardTabs;
