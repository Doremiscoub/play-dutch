
import React from 'react';
import { Toggle } from '@/components/ui/toggle';

interface ScoreBoardTabsProps {
  currentView: 'list' | 'table';
  onViewChange: (view: 'list' | 'table') => void;
}

const ScoreBoardTabs: React.FC<ScoreBoardTabsProps> = ({
  currentView,
  onViewChange
}) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Toggle
        pressed={currentView === 'list'}
        onPressedChange={() => onViewChange('list')}
        variant="default"
        size="lg"
        className="rounded-l-md"
      >
        Classement
      </Toggle>
      <Toggle
        pressed={currentView === 'table'}
        onPressedChange={() => onViewChange('table')}
        variant="default"
        size="lg"
        className="rounded-r-md"
      >
        Tableau détaillé
      </Toggle>
    </div>
  );
};

export default ScoreBoardTabs;
