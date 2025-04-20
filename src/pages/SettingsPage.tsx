import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import ElevenLabsSetup from '@/components/ElevenLabsSetup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import * as Sentry from '@sentry/react';
import { addBreadcrumb } from '@/utils/sentryConfig';

const SettingsPage = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const [resetConfirmationOpen, setResetConfirmationOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value);
    addBreadcrumb('settings', 'Sound settings changed', { enabled: value });
  };

  const handleResetHistory = () => {
    setResetConfirmationOpen(true);
    addBreadcrumb('settings', 'Reset history dialog opened');
  };

  const confirmResetHistory = () => {
    localStorage.removeItem('dutch_games');
    setResetConfirmationOpen(false);
    toast.success('L\'historique a été effacé !');
    addBreadcrumb('settings', 'Game history was reset');
    Sentry.captureMessage('User reset game history', 'info');
  };

  const cancelResetHistory = () => {
    setResetConfirmationOpen(false);
    addBreadcrumb('settings', 'Reset history canceled');
  };

  return (
    <PageLayout title="Réglages" subtitle="Personnalisez votre expérience de jeu" backgroundVariant="subtle">
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 rounded-xl bg-white/50 backdrop-blur-md p-1 shadow-sm">
          <TabsTrigger 
            value="general" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
          >
            Général
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
          >
            Voix & Sons
          </TabsTrigger>
          <TabsTrigger 
            value="diagnostic" 
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
          >
            Diagnostic
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-8">
          {/* Gestion des données */}
          <div className="vision-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Gestion des données</h2>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleResetHistory}
                >
                  Effacer l'historique des parties
                </Button>
              </div>
            </div>
          </div>

          {/* Compte - affiché uniquement si un utilisateur est connecté */}
          {user && (
            <div className="vision-card p-6">
              <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Compte</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.fullName || user.username}</p>
                    <p className="text-sm text-gray-500">{user.firstName} {user.lastName}</p>
                  </div>
                  {signOut && (
                    <Button variant="outline" onClick={signOut}>Déconnexion</Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="voice" className="space-y-8">
          {/* Réglages du son */}
          <div className="vision-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Effets sonores</h2>
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-toggle" className="cursor-pointer">Activer les sons du jeu</Label>
              <Switch 
                id="sound-toggle" 
                checked={soundEnabled}
                onCheckedChange={handleSoundToggle}
              />
            </div>
          </div>
          
          {/* Configuration d'Eleven Labs */}
          <div className="vision-card p-6">
            <ElevenLabsSetup />
          </div>
        </TabsContent>
        
        <TabsContent value="diagnostic" className="space-y-8">
          {/* Informations de diagnostic */}
          <div className="vision-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Diagnostic</h2>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-600">Mode: {import.meta.env.MODE}</p>
                <p className="text-sm text-gray-600">Connexion: {navigator.onLine ? 'En ligne' : 'Hors ligne'}</p>
                <p className="text-sm text-gray-600">PWA: {isRunningAsPWA() ? 'Oui' : 'Non'}</p>
                <p className="text-sm text-gray-600">Cache DB: {localStorage.getItem('dutch_games') ? 'Présent' : 'Vide'}</p>
                
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    addBreadcrumb('diagnostic', 'Test error triggered');
                    Sentry.captureMessage('Test error from settings', 'warning');
                    toast.info('Test d\'erreur envoyé à Sentry');
                  }}
                >
                  Tester la connexion Sentry
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Confirmation de réinitialisation */}
      <AlertDialog open={resetConfirmationOpen}>
        <AlertDialogContent className="bg-white rounded-2xl border-white/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Effacer l'historique ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement l'historique de toutes vos parties. Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelResetHistory} className="bg-gray-100 hover:bg-gray-200 text-gray-700">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmResetHistory} className="bg-red-500 hover:bg-red-600 text-white">Effacer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default SettingsPage;
