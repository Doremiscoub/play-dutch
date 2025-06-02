
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
    <div className="flex justify-center items-center space-x-1 mb-4">
      <Toggle
        pressed={currentView === 'list'}
        onPressedChange={() => onViewChange('list')}
        variant="default"
        size="lg"
        className="rounded-l-xl border-r-0"
      >
        Classement
      </Toggle>
      <Toggle
        pressed={currentView === 'table'}
        onPressedChange={() => onViewChange('table')}
        variant="default"
        size="lg"
        className="rounded-r-xl border-l-0"
      >
        Tableau détaillé
      </Toggle>
    </div>
  );
};

export default ScoreBoardTabs;
