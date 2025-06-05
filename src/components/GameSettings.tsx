
import React from 'react';
import { UnifiedThemeSelector } from '@/components/ui/unified-theme-selector';

const GameSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Apparence</h3>
        <UnifiedThemeSelector />
      </div>
    </div>
  );
};

export default GameSettings;
