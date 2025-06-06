
import React from 'react';
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
      <div className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
        <div className="flex gap-1">
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200",
              currentView === 'list' 
                ? "bg-blue-500 text-white shadow-sm" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            )}
            onClick={() => onViewChange('list')}
          >
            <List className="h-4 w-4" />
            <span>Liste des joueurs</span>
          </button>
          
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200",
              currentView === 'table' 
                ? "bg-blue-500 text-white shadow-sm" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            )}
            onClick={() => onViewChange('table')}
          >
            <Table className="h-4 w-4" />
            <span>Tableau des manches</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardTabs;
