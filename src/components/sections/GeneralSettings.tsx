
import React from 'react';
import { Bell, VolumeX, Smartphone, Database } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSound } from '@/hooks/use-sound';
import { useLocalStorage } from '@/hooks/use-local-storage';

const GeneralSettings = () => {
  const { isSoundEnabled, setSoundEnabled } = useSound();
  const [offlineModeEnabled, setOfflineModeEnabled] = useLocalStorage('dutch_offline_mode', false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
        <Label htmlFor="sound-toggle" className="font-medium flex items-center gap-2 text-gray-700">
          {isSoundEnabled ? <Bell className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          Sons et effets
        </Label>
        <Switch 
          id="sound-toggle" 
          checked={isSoundEnabled} 
          onCheckedChange={setSoundEnabled}
        />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
        <Label htmlFor="offline-mode" className="font-medium flex items-center gap-2 text-gray-700">
          <Smartphone className="h-4 w-4" />
          Mode hors-ligne
        </Label>
        <Switch 
          id="offline-mode" 
          checked={offlineModeEnabled} 
          onCheckedChange={setOfflineModeEnabled}
        />
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-shadow">
        <Label htmlFor="auto-save" className="font-medium flex items-center gap-2 text-gray-700">
          <Database className="h-4 w-4" />
          Sauvegarde automatique
        </Label>
        <Switch 
          id="auto-save" 
          defaultChecked={true}
          checked={true}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
