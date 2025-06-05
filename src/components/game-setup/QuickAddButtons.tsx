
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickAddButtonsProps {
  availableNames: string[];
  onQuickAdd: (name: string) => void;
}

const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({
  availableNames,
  onQuickAdd
}) => {
  if (availableNames.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-xs text-gray-500 self-center">Ajout rapide:</span>
      {availableNames.slice(0, 4).map((name) => (
        <Button
          key={name}
          variant="outline"
          size="sm"
          onClick={() => onQuickAdd(name)}
          className="text-xs bg-white/50 hover:bg-white/80"
        >
          + {name}
        </Button>
      ))}
    </div>
  );
};

export default QuickAddButtons;
