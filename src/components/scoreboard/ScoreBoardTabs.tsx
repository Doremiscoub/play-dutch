
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <Tabs 
        defaultValue="list" 
        value={currentView}
        onValueChange={(value) => onViewChange(value as 'list' | 'table')} 
        className="w-full max-w-2xl"
      >
        <TabsList className="grid grid-cols-2 mb-2">
          <TabsTrigger value="list" className="flex items-center gap-1">
            <LayoutList className="h-4 w-4" /> Classement
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-1">
            <LayoutGrid className="h-4 w-4" /> Tableau détaillé
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ScoreBoardTabs;
