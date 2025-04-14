
import React, { useState } from 'react';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ElevenLabsSetupProps {
  className?: string;
}

const ElevenLabsSetup: React.FC<ElevenLabsSetupProps> = ({ className = '' }) => {
  const { 
    config, 
    isLoading, 
    error, 
    saveApiKey, 
    setVoice, 
    setEnabled, 
    testApiKey,
    availableVoices
  } = useElevenLabs();
  
  const [apiKey, setApiKey] = useState<string>(config.apiKey || '');
  const [testingKey, setTestingKey] = useState(false);
  
  const handleSaveKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Veuillez entrer votre clé API');
      return;
    }
    
    setTestingKey(true);
    const isValid = await testApiKey(apiKey);
    setTestingKey(false);
    
    if (isValid) {
      saveApiKey(apiKey);
      toast.success('Clé API sauvegardée avec succès');
    } else {
      toast.error('Clé API invalide');
    }
  };
  
  const handleVoiceChange = (voiceId: string) => {
    setVoice(voiceId);
    toast.success('Voix mise à jour');
  };
  
  const handleToggleEnabled = (checked: boolean) => {
    setEnabled(checked);
    toast.success(checked ? 'Eleven Labs activé' : 'Eleven Labs désactivé');
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuration Eleven Labs</h3>
        <p className="text-sm text-gray-600">
          Intégrez des voix premium pour une expérience audio immersive
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key" className="text-sm font-medium">
            Clé API Eleven Labs
          </Label>
          <div className="flex gap-2">
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Entrez votre clé API Eleven Labs"
              className="flex-1"
            />
            <Button 
              onClick={handleSaveKey} 
              disabled={isLoading || testingKey}
              size="sm"
              className="whitespace-nowrap"
            >
              {testingKey ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Enregistrer
            </Button>
          </div>
          {error && (
            <p className="text-xs text-red-500 flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Vous pouvez obtenir une clé API sur <a href="https://elevenlabs.io/app" target="_blank" rel="noopener noreferrer" className="text-dutch-blue hover:underline">elevenlabs.io</a>
          </p>
        </div>
        
        {config.apiKey && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-eleven-labs" className="cursor-pointer">
                Activer Eleven Labs
              </Label>
              <Switch 
                id="enable-eleven-labs" 
                checked={config.enabled}
                onCheckedChange={handleToggleEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voice-select" className="text-sm font-medium">
                Voix du Professeur Cartouche
              </Label>
              <Select
                value={config.voiceId}
                onValueChange={handleVoiceChange}
                disabled={!config.enabled}
              >
                <SelectTrigger id="voice-select" className="w-full">
                  <SelectValue placeholder="Sélectionner une voix" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name} - {voice.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choisissez la voix qui sera utilisée pour le Professeur Cartouche
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ElevenLabsSetup;
