/**
 * Composant de gestion de la synchronisation des parties - Version simplifiée
 */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, CloudOff, Wifi, WifiOff } from 'lucide-react';
import { useUnifiedGameState } from '@/hooks/game/useUnifiedGameState';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';

interface GameSyncManagerProps {
  className?: string;
}

export const GameSyncManager: React.FC<GameSyncManagerProps> = ({ className = '' }) => {
  const { isSignedIn } = useSupabaseAuth();
  const { syncStatus, lastSync } = useUnifiedGameState();

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'synced': return 'text-green-600';
      case 'syncing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'synced': return <Cloud className="w-4 h-4" />;
      case 'syncing': return <Cloud className="w-4 h-4 animate-pulse" />;
      case 'error': return <CloudOff className="w-4 h-4" />;
      default: return <WifiOff className="w-4 h-4" />;
    }
  };

  if (!isSignedIn) return null;

  return (
    <Card className={`mb-4 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Wifi className="w-4 h-4" />
          Synchronisation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className={getSyncStatusColor()}>
            {getSyncStatusIcon()}
          </div>
          <div>
            <Badge variant="outline" className="capitalize">
              {syncStatus}
            </Badge>
            {lastSync && (
              <p className="text-xs text-gray-500 mt-1">
                Dernière sync: {lastSync.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};