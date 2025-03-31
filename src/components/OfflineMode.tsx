
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { WifiOff, Database, Wifi, Info, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface OfflineModeProps {
  onEnableOfflineMode: (enabled: boolean) => void;
}

const OfflineMode: React.FC<OfflineModeProps> = ({ onEnableOfflineMode }) => {
  const [isOfflineEnabled, setIsOfflineEnabled] = useLocalStorage('dutch_offline_mode', false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<{
    games: number;
    players: number;
    lastSync: string | null;
  }>({
    games: 0,
    players: 0,
    lastSync: null,
  });

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Calculate offline data stats
  useEffect(() => {
    if (isOfflineEnabled) {
      try {
        const games = localStorage.getItem('dutch_games') 
          ? JSON.parse(localStorage.getItem('dutch_games') || '[]').length 
          : 0;
          
        const players = localStorage.getItem('dutch_players') 
          ? JSON.parse(localStorage.getItem('dutch_players') || '[]').length 
          : 0;
          
        const lastSync = localStorage.getItem('dutch_last_sync');
        
        setOfflineData({
          games,
          players,
          lastSync,
        });
      } catch (error) {
        console.error('Error loading offline data stats:', error);
      }
    }
  }, [isOfflineEnabled]);

  const toggleOfflineMode = () => {
    const newValue = !isOfflineEnabled;
    setIsOfflineEnabled(newValue);
    
    if (newValue) {
      // Attempt to sync data before going offline
      syncOfflineData();
      toast.success('Mode hors-ligne activé', {
        description: 'Vos données seront stockées localement sur cet appareil',
      });
    } else {
      toast.info('Mode hors-ligne désactivé', {
        description: 'Vos données seront synchronisées avec le serveur',
      });
    }
    
    onEnableOfflineMode(newValue);
  };

  const syncOfflineData = () => {
    // Simulate sync
    setTimeout(() => {
      localStorage.setItem('dutch_last_sync', new Date().toISOString());
      toast.success('Données synchronisées avec succès', {
        description: 'Toutes vos parties et joueurs sont à jour',
      });
      
      // Update stats
      setOfflineData(prev => ({
        ...prev,
        lastSync: new Date().toISOString(),
      }));
    }, 1500);
  };

  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WifiOff className="h-5 w-5 text-dutch-blue" />
          Mode hors-ligne
        </CardTitle>
        <CardDescription>
          Accédez à vos parties et jouez sans connexion internet
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="offline-mode" className="text-base font-medium">
              Activer le mode hors-ligne
            </Label>
            <p className="text-sm text-muted-foreground">
              Les données seront stockées sur votre appareil
            </p>
          </div>
          <Switch 
            id="offline-mode" 
            checked={isOfflineEnabled}
            onCheckedChange={toggleOfflineMode}
          />
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Statut réseau:</span>
            <div className="flex items-center gap-1">
              {isOnline ? (
                <>
                  <span className="text-dutch-green font-medium">En ligne</span>
                  <Wifi className="h-4 w-4 text-dutch-green" />
                </>
              ) : (
                <>
                  <span className="text-dutch-orange font-medium">Hors-ligne</span>
                  <WifiOff className="h-4 w-4 text-dutch-orange" />
                </>
              )}
            </div>
          </div>
          
          {isOfflineEnabled && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Parties stockées localement:</span>
                <span className="font-medium">{offlineData.games}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Joueurs stockés localement:</span>
                <span className="font-medium">{offlineData.players}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Dernière synchronisation:</span>
                <span className="font-medium">
                  {offlineData.lastSync 
                    ? new Date(offlineData.lastSync).toLocaleString() 
                    : 'Jamais'
                  }
                </span>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-2 text-sm text-dutch-purple flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            Le mode hors-ligne vous permet de jouer sans connexion internet. Vos données sont stockées localement sur cet appareil et seront synchronisées lorsque vous vous reconnecterez.
          </p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full bg-white/50 border-dutch-blue/20 text-dutch-blue hover:bg-white/80"
          onClick={syncOfflineData}
          disabled={!isOfflineEnabled || !isOnline}
        >
          <Database className="h-4 w-4 mr-2" />
          Synchroniser maintenant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OfflineMode;
