
import React from 'react';
import { ToggleTabs } from '@/components/ui/toggle-tabs';
import { LayoutGrid, LayoutList } from 'lucide-react';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({ currentView, onViewChange }) => {
  const tabOptions = [
    { 
      value: "list", 
      label: "Classement", 
      icon: <LayoutList className="h-4 w-4" />
    },
    { 
      value: "table", 
      label: "Tableau détaillé", 
      icon: <LayoutGrid className="h-4 w-4" />
    },
  ];

  return (
    <div className="flex justify-center mb-6">
      <ToggleTabs
        value={currentView}
        onValueChange={onViewChange}
        options={tabOptions}
        variant="default"
        size="full"
      />
    </div>
  );
};

export default ScoreBoardTabs;
