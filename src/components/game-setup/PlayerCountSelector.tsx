import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface PlayerCountSelectorProps {
  count: number;
  onChange: (count: number) => void;
}

const PlayerCountSelector: React.FC<PlayerCountSelectorProps> = ({ count, onChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="dutch-glass"
        size="icon"
        onClick={() => onChange(Math.max(2, count - 1))}
        disabled={count <= 2}
        className="h-12 w-12"
      >
        <Minus className="h-5 w-5" />
      </Button>

      <span className="text-xl font-semibold">{count}</span>

      <Button
        variant="dutch-glass"
        size="icon"
        onClick={() => onChange(Math.min(10, count + 1))}
        disabled={count >= 10}
        className="h-12 w-12"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PlayerCountSelector;
