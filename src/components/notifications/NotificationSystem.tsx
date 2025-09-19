import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSwitch } from '@/components/ui/enhanced-switch';
import { toast } from 'sonner';

interface NotificationSystemProps {
  className?: string;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ className }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [gameReminders, setGameReminders] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  useEffect(() => {
    // Check current notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    // Load preferences from localStorage
    const savedGameReminders = localStorage.getItem('dutch-game-reminders');
    const savedAchievementAlerts = localStorage.getItem('dutch-achievement-alerts');
    
    if (savedGameReminders) setGameReminders(JSON.parse(savedGameReminders));
    if (savedAchievementAlerts) setAchievementAlerts(JSON.parse(savedAchievementAlerts));
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Votre navigateur ne supporte pas les notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success('Notifications activées !');
        
        // Test notification
        new Notification('Dutch - Notifications activées', {
          body: 'Vous recevrez maintenant des notifications pour vos parties !',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      } else {
        toast.error('Permission refusée pour les notifications');
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      toast.error('Erreur lors de l\'activation des notifications');
    }
  };

  const toggleNotifications = () => {
    if (permission !== 'granted') {
      requestNotificationPermission();
    } else {
      setNotificationsEnabled(!notificationsEnabled);
      toast.success(notificationsEnabled ? 'Notifications désactivées' : 'Notifications activées');
    }
  };

  const toggleGameReminders = (enabled: boolean) => {
    setGameReminders(enabled);
    localStorage.setItem('dutch-game-reminders', JSON.stringify(enabled));
    toast.success(enabled ? 'Rappels de partie activés' : 'Rappels de partie désactivés');
  };

  const toggleAchievementAlerts = (enabled: boolean) => {
    setAchievementAlerts(enabled);
    localStorage.setItem('dutch-achievement-alerts', JSON.stringify(enabled));
    toast.success(enabled ? 'Alertes de succès activées' : 'Alertes de succès désactivées');
  };

  const sendTestNotification = () => {
    if (permission !== 'granted') {
      toast.error('Les notifications ne sont pas autorisées');
      return;
    }

    new Notification('Dutch - Test de notification', {
      body: 'Ceci est un test de notification. Tout fonctionne parfaitement ! 🎮',
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    });

    toast.success('Notification test envoyée !');
  };

  return (
    <Card className={`glass-morphism border-white/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Système de Notifications
        </CardTitle>
        <CardDescription>
          Recevez des notifications pour vos parties et succès
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Permission générale */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">Activer les notifications</p>
            <p className="text-sm text-muted-foreground">
              Autoriser les notifications push dans votre navigateur
            </p>
          </div>
          <div className="flex items-center gap-2">
            {permission === 'granted' ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-orange-500" />
            )}
            <EnhancedSwitch
              checked={notificationsEnabled}
              onCheckedChange={toggleNotifications}
            />
          </div>
        </div>

        {/* Options spécifiques */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: notificationsEnabled ? 1 : 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Rappels de partie</p>
              <p className="text-sm text-muted-foreground">
                Notifications pour reprendre une partie en cours
              </p>
            </div>
            <EnhancedSwitch
              checked={gameReminders && notificationsEnabled}
              onCheckedChange={toggleGameReminders}
              disabled={!notificationsEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Alertes de succès</p>
              <p className="text-sm text-muted-foreground">
                Notifications lors de l'obtention de nouveaux succès
              </p>
            </div>
            <EnhancedSwitch
              checked={achievementAlerts && notificationsEnabled}
              onCheckedChange={toggleAchievementAlerts}
              disabled={!notificationsEnabled}
            />
          </div>
        </motion.div>

        {/* Test */}
        {notificationsEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-4 border-t border-white/20"
          >
            <Button
              variant="outline"
              onClick={sendTestNotification}
              className="w-full"
            >
              <Bell className="h-4 w-4 mr-2" />
              Envoyer une notification test
            </Button>
          </motion.div>
        )}

        {/* Info sur les permissions */}
        {permission === 'denied' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-orange-100/20 border border-orange-300/30 rounded-lg"
          >
            <p className="text-sm text-orange-800">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              Les notifications ont été bloquées. Vous pouvez les réactiver dans les paramètres de votre navigateur.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};