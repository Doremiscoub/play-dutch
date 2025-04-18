
import React from 'react';
import { Palette } from 'lucide-react';
import { Label } from '@/components/ui/label';
import ColorThemeSelector from '@/components/ColorThemeSelector';
import { Card } from '@/components/ui/card';

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-dutch-purple" />
          <Label className="font-medium text-gray-700">Thème de couleur</Label>
        </div>
        <ColorThemeSelector />
      </Card>
    </div>
  );
};

export default AppearanceSettings;
