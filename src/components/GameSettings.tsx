
import React from 'react';
import { UnifiedThemeSelector } from '@/components/ui/unified-theme-selector';

const GameSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Apparence</h3>
        <div className="flex justify-center">
          <UnifiedThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
