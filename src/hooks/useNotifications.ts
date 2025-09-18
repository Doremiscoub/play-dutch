import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface NotificationPermission {
  permission: NotificationPermission | 'default' | 'granted' | 'denied';
  isSupported: boolean;
}

export const useNotifications = () => {
  const [notificationState, setNotificationState] = useState<NotificationPermission>({
    permission: 'default',
    isSupported: false
  });

  useEffect(() => {
    // Vérifier si les notifications sont supportées
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    
    setNotificationState({
      permission: isSupported ? Notification.permission : 'denied',
      isSupported
    });
  }, []);

  const requestPermission = useCallback(async () => {
    if (!notificationState.isSupported) {
      toast.error('Les notifications ne sont pas supportées sur cet appareil');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationState(prev => ({ ...prev, permission }));
      
      if (permission === 'granted') {
        toast.success('Notifications activées !');
        return true;
      } else {
        toast.warning('Notifications refusées');
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      toast.error('Erreur lors de l\'activation des notifications');
      return false;
    }
  }, [notificationState.isSupported]);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (notificationState.permission !== 'granted') {
      return;
    }

    try {
      const notification = new Notification(title, {
        icon: '/professor.png',
        badge: '/professor.png',
        tag: 'dutch-game',
        ...options
      });

      // Auto-fermer après 5 secondes
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  }, [notificationState.permission]);

  const sendGameNotification = useCallback((type: 'round_end' | 'game_over' | 'player_joined', data?: any) => {
    const notifications = {
      round_end: {
        title: '🎯 Manche terminée',
        body: 'Nouvelle manche prête à être ajoutée !',
        tag: 'round-end'
      },
      game_over: {
        title: '🏆 Partie terminée',
        body: `Félicitations ! ${data?.winner || 'Le gagnant'} a remporté la partie`,
        tag: 'game-over'
      },
      player_joined: {
        title: '👥 Nouveau joueur',
        body: `${data?.playerName || 'Un joueur'} a rejoint la partie`,
        tag: 'player-joined'
      }
    };

    const config = notifications[type];
    if (config) {
      sendNotification(config.title, {
        body: config.body,
        tag: config.tag
      });
    }
  }, [sendNotification]);

  const scheduleReminder = useCallback((message: string, delayMs: number) => {
    if (notificationState.permission !== 'granted') {
      return;
    }

    setTimeout(() => {
      sendNotification('🔔 Rappel Dutch', {
        body: message,
        tag: 'reminder'
      });
    }, delayMs);
  }, [notificationState.permission, sendNotification]);

  return {
    permission: notificationState.permission,
    isSupported: notificationState.isSupported,
    isGranted: notificationState.permission === 'granted',
    requestPermission,
    sendNotification,
    sendGameNotification,
    scheduleReminder
  };
};