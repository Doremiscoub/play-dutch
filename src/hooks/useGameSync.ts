import { useState, useEffect, useCallback } from 'react';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingChanges: number;
  isSyncing: boolean;
}

export const useGameSync = () => {
  const { user } = useSupabaseAuth();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    lastSync: null,
    pendingChanges: 0,
    isSyncing: false
  });

  // Détecter les changements de statut réseau
  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
      syncPendingChanges();
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
      toast.warning('Mode hors ligne activé', {
        description: 'Vos données seront synchronisées à la reconnexion'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncPendingChanges = useCallback(async () => {
    if (!user || !syncStatus.isOnline) return;

    setSyncStatus(prev => ({ ...prev, isSyncing: true }));

    try {
      // Récupérer les changements locaux en attente
      const pendingChanges = JSON.parse(localStorage.getItem('dutch_pending_sync') || '[]');
      
      if (pendingChanges.length === 0) {
        setSyncStatus(prev => ({ 
          ...prev, 
          isSyncing: false,
          lastSync: new Date()
        }));
        return;
      }

      // Synchroniser chaque changement
      for (const change of pendingChanges) {
        await processChange(change);
      }

      // Nettoyer les changements synchronisés
      localStorage.removeItem('dutch_pending_sync');
      
      setSyncStatus(prev => ({
        ...prev,
        isSyncing: false,
        lastSync: new Date(),
        pendingChanges: 0
      }));

      toast.success('Synchronisation terminée', {
        description: `${pendingChanges.length} changement(s) synchronisé(s)`
      });

    } catch (error) {
      console.error('Erreur de synchronisation:', error);
      setSyncStatus(prev => ({ ...prev, isSyncing: false }));
      toast.error('Erreur de synchronisation');
    }
  }, [user, syncStatus.isOnline]);

  const processChange = async (change: any) => {
    switch (change.type) {
      case 'game_update':
        await supabase
          .from('games')
          .upsert(change.data)
          .select();
        break;
      case 'player_update':
        await supabase
          .from('players')
          .upsert(change.data)
          .select();
        break;
      case 'round_add':
        // Pour l'instant, on stocke les rounds dans les métadonnées du jeu
        // ou dans une structure personnalisée
        console.log('Round data to sync:', change.data);
        break;
      default:
        console.warn('Type de changement non reconnu:', change.type);
    }
  };

  const addPendingChange = useCallback((type: string, data: any) => {
    const pendingChanges = JSON.parse(localStorage.getItem('dutch_pending_sync') || '[]');
    pendingChanges.push({
      id: Date.now(),
      type,
      data,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('dutch_pending_sync', JSON.stringify(pendingChanges));
    
    setSyncStatus(prev => ({ 
      ...prev, 
      pendingChanges: pendingChanges.length 
    }));

    // Tenter une synchronisation immédiate si en ligne
    if (syncStatus.isOnline && user) {
      syncPendingChanges();
    }
  }, [user, syncStatus.isOnline, syncPendingChanges]);

  const forceSyncAll = useCallback(async () => {
    if (!user) {
      toast.error('Connexion requise pour la synchronisation');
      return;
    }

    await syncPendingChanges();
  }, [user, syncPendingChanges]);

  return {
    syncStatus,
    addPendingChange,
    forceSyncAll,
    syncPendingChanges
  };
};