import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import ElevenLabsSetup from '@/components/ElevenLabsSetup';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { useAuth } from '@/context/AuthContext';
import * as Sentry from '@sentry/react';
import { addBreadcrumb } from '@/utils/sentryConfig';
import { isRunningAsPWA } from '@/utils/pwaUtils';
import { ModernTitle } from '@/components/ui/modern-title';

const SettingsPage = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const [resetConfirmationOpen, setResetConfirmationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const tabOptions = [
    { value: "general", label: "Général" },
    { value: "voice", label: "Voix & Sons" },
    { value: "diagnostic", label: "Diagnostic" },
  ];

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
    <PageLayout backgroundVariant="subtle">
      <div className="w-full max-w-6xl mx-auto px-1 sm:px-2">
        <PageHeader 
          title={<ModernTitle withSparkles variant="h1">Réglages</ModernTitle>}
          onBack={() => navigate('/')}
          showSettings={false}
        />
        
        <UnifiedTabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          options={tabOptions}
          variant="default"
        />
        
        {activeTab === "general" && (
          <div className="space-y-8 mt-6">
            {/* Gestion des données */}
            <div className="vision-card p-6">
              <h2 className="text-2xl font-medium text-dutch-blue mb-4">Gestion des données</h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="y2k-glass" 
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
                <h2 className="text-2xl font-medium text-dutch-blue mb-4">Compte</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.fullName || user.firstName || 'Utilisateur'}</p>
                      <p className="text-sm text-gray-500">{user.firstName} {user.lastName}</p>
                    </div>
                    {signOut && (
                      <Button 
                        variant="y2k-blue"
                        onClick={signOut}
                      >
                        Déconnexion
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "voice" && (
          <div className="space-y-8 mt-6">
            {/* Réglages du son */}
            <div className="vision-card p-6">
              <h2 className="text-2xl font-medium text-dutch-blue mb-4">Effets sonores</h2>
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
          </div>
        )}
        
        {activeTab === "diagnostic" && (
          <div className="space-y-8 mt-6">
            {/* Informations de diagnostic */}
            <div className="vision-card p-6">
              <h2 className="text-2xl font-medium text-dutch-blue mb-4">Diagnostic</h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-600">Mode: {import.meta.env.MODE}</p>
                  <p className="text-sm text-gray-600">Connexion: {navigator.onLine ? 'En ligne' : 'Hors ligne'}</p>
                  <p className="text-sm text-gray-600">PWA: {isRunningAsPWA() ? 'Oui' : 'Non'}</p>
                  <p className="text-sm text-gray-600">Cache DB: {localStorage.getItem('dutch_games') ? 'Présent' : 'Vide'}</p>
                  
                  <Button 
                    variant="y2k-blue" 
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
          </div>
        )}

        {/* Confirmation de réinitialisation */}
        <AlertDialog open={resetConfirmationOpen}>
          <AlertDialogContent className="bg-white/90 backdrop-blur-xl rounded-2xl border-white/50 shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-dutch-blue font-bold">Effacer l'historique ?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Cette action supprimera définitivement l'historique de toutes vos parties. Cette action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelResetHistory} className="bg-gray-100 hover:bg-gray-200 text-gray-700 hover:-translate-y-0.5 transition-all">Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmResetHistory} className="btn-y2k-blue bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md">Effacer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
