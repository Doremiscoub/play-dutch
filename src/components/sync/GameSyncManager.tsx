/**
 * Composant de gestion de la synchronisation des parties
 * Interface pour migrer, charger et gérer les parties cloud
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Cloud, 
  CloudOff, 
  Download, 
  Upload, 
  RefreshCw, 
  Trash2,
  Clock,
  Users,
  Trophy,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useUnifiedGameState } from '@/hooks/game/useUnifiedGameState';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { SupabaseGameService } from '@/services/supabaseGameService';
import { toast } from 'sonner';

interface GameSyncManagerProps {
  className?: string;
}

export const GameSyncManager: React.FC<GameSyncManagerProps> = ({ className = '' }) => {
  const { isSignedIn, user } = useSupabaseAuth();
  const {
    hasGame,
    syncStatus,
    lastSync,
    currentGameId,
    availableGames,
    loadGameFromCloud,
    migrateLocalToCloud,
    loadAvailableGames,
    canSync
  } = useUnifiedGameState();

  const [isLoading, setIsLoading] = useState(false);

  const handleMigrateToCloud = async () => {
    setIsLoading(true);
    try {
      await migrateLocalToCloud();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadGame = async (gameId: string) => {
    setIsLoading(true);
    try {
      await loadGameFromCloud(gameId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette partie ?')) return;
    
    setIsLoading(true);
    try {
      const success = await SupabaseGameService.deleteGame(gameId);
      if (success) {
        toast.success('Partie supprimée');
        await loadAvailableGames();
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'error': return <CloudOff className="w-4 h-4" />;
      default: return <WifiOff className="w-4 h-4" />;
    }
  };

  if (!isSignedIn) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudOff className="w-5 h-5" />
            Synchronisation Cloud
          </CardTitle>
          <CardDescription>
            Connectez-vous pour synchroniser vos parties sur tous vos appareils
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <WifiOff className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">
              Mode hors ligne - vos parties sont sauvegardées localement
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/sign-in'}>
              Se connecter pour synchroniser
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* État de synchronisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            État de synchronisation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={getSyncStatusColor()}>
                {getSyncStatusIcon()}
              </div>
              <div>
                <p className="font-medium capitalize">{syncStatus}</p>
                <p className="text-sm text-gray-600">
                  {lastSync ? `Dernière sync: ${lastSync.toLocaleString()}` : 'Jamais synchronisé'}
                </p>
              </div>
            </div>
            
            {hasGame && syncStatus === 'local' && (
              <Button 
                onClick={handleMigrateToCloud}
                disabled={isLoading}
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Migrer vers le cloud
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parties disponibles dans le cloud */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Parties dans le cloud
            </CardTitle>
            <CardDescription>
              Vos parties sauvegardées et synchronisées
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={loadAvailableGames}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </CardHeader>
        <CardContent>
          {availableGames.length === 0 ? (
            <div className="text-center py-8">
              <Cloud className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">
                Aucune partie sauvegardée dans le cloud
              </p>
              {hasGame && (
                <Button 
                  onClick={handleMigrateToCloud}
                  disabled={isLoading}
                  variant="outline"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Sauvegarder la partie actuelle
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {availableGames.map((game) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{game.name}</h4>
                        <Badge variant={game.isGameOver ? 'secondary' : 'default'}>
                          {game.isGameOver ? 'Terminée' : 'En cours'}
                        </Badge>
                        {currentGameId === game.id && (
                          <Badge variant="outline" className="text-green-600">
                            Actuelle
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {game.players.length} joueurs
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          Limite: {game.scoreLimit}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {game.lastUpdated.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {currentGameId !== game.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLoadGame(game.id)}
                          disabled={isLoading}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Charger
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteGame(game.id)}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};