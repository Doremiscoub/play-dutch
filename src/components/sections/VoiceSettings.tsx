
import React from 'react';
import { Mic } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import ElevenLabsSetup from '@/components/ElevenLabsSetup';

const VoiceSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="h-5 w-5 text-dutch-purple" />
          <Label className="font-medium text-gray-700">Configuration de la voix</Label>
        </div>
        <ElevenLabsSetup />
      </Card>
    </div>
  );
};

export default VoiceSettings;
