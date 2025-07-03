
import React from 'react';
import { List, Table, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      <div className="card-glass p-2 shadow-glass-lg">
        <div className="flex gap-2">
          <button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center",
              currentView === 'list' 
                ? "btn-glass-trinity text-white shadow-trinity scale-105 transform" 
                : "text-foreground hover:text-trinity-blue-500 hover:bg-glass-light hover:scale-102"
            )}
            onClick={() => onViewChange('list')}
          >
            <List className="h-5 w-5" />
            <span className="hidden sm:inline">Classement</span>
            <span className="sm:hidden">Liste</span>
          </button>
          
          <button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center",
              currentView === 'table' 
                ? "btn-glass-trinity text-white shadow-trinity scale-105 transform" 
                : "text-foreground hover:text-trinity-blue-500 hover:bg-glass-light hover:scale-102"
            )}
            onClick={() => onViewChange('table')}
          >
            <Table className="h-5 w-5" />
            <span className="hidden sm:inline">Tableau</span>
            <span className="sm:hidden">Manches</span>
          </button>
          
          <button
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center",
              currentView === 'stats' 
                ? "btn-glass-trinity text-white shadow-trinity scale-105 transform" 
                : "text-foreground hover:text-trinity-blue-500 hover:bg-glass-light hover:scale-102"
            )}
            onClick={() => onViewChange('stats')}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="hidden sm:inline">Statistiques</span>
            <span className="sm:hidden">Stats</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardTabs;
