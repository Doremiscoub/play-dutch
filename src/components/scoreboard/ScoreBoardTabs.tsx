
import React from 'react';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
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
      <UnifiedTabs
        value={currentView}
        onValueChange={onViewChange}
        options={tabOptions}
        variant="default"
      />
    </div>
  );
};

export default ScoreBoardTabs;
