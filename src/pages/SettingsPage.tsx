import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/PageLayout';
import ThemeSelector from '@/components/ThemeSelector';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const SettingsPage = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const [resetConfirmationOpen, setResetConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value);
  };

  const handleResetHistory = () => {
    setResetConfirmationOpen(true);
  };

  const confirmResetHistory = () => {
    localStorage.removeItem('dutch_games');
    setResetConfirmationOpen(false);
    toast.success('L\'historique a été effacé !');
  };

  const cancelResetHistory = () => {
    setResetConfirmationOpen(false);
  };

  const toast = (message: string, type: 'success' | 'error' = 'success') => {
    const toastElement = document.createElement('div');
    toastElement.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 p-3 rounded-md shadow-lg z-50 ${type === 'error' ? 'border-2 border-red-500' : ''}`;
    toastElement.textContent = message;
    document.body.appendChild(toastElement);

    setTimeout(() => {
      toastElement.remove();
    }, 3000);
  };

  return (
    <PageLayout title="Réglages" subtitle="Personnalisez votre expérience">
      <div className="p-4 space-y-8 max-w-lg mx-auto">
        
        <div className="space-y-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/40 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Son</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Effets sonores</Label>
            <Switch id="sound" checked={soundEnabled} onCheckedChange={handleSoundToggle} />
          </div>
        </div>

        
        <div className="space-y-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/40 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Historique</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Effacer l'historique</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr(e) ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action supprimera définitivement toutes les parties enregistrées.
                  Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelResetHistory}>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={confirmResetHistory}>Effacer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="space-y-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/40 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Thème</h2>
          <div className="space-y-4">
            <ThemeSelector />
          </div>
        </div>

        
        {user && (
          <div className="space-y-4 bg-white/50 backdrop-blur-md rounded-xl border border-white/40 p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Compte</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-800">Connecté en tant que {user.firstName} {user.lastName}</p>
              <SignOutButton>
                <Button variant="outline">Se déconnecter</Button>
              </SignOutButton>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
