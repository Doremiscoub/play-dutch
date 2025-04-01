
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Paintbrush, Volume2, VolumeX, Moon, Sun, User, Smartphone } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ThemeSelector from '@/components/ThemeSelector';
import ColorThemeSelector from '@/components/ColorThemeSelector';
import PageLayout from '@/components/PageLayout';
import OfflineMode from '@/components/OfflineMode';
import { useLocalStorage } from '@/hooks/use-local-storage';

const SettingsPage: React.FC = () => {
  const { themeMode } = useTheme();
  const { user, isSignedIn } = useUser();
  
  // Settings state
  const [soundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const [offlineModeEnabled, setOfflineModeEnabled] = useLocalStorage('dutch_offline_mode', false);
  
  const handleOfflineModeChange = (enabled: boolean) => {
    setOfflineModeEnabled(enabled);
  };
  
  return (
    <PageLayout
      title="Paramètres"
      subtitle="Personnalisez votre expérience de jeu"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/40 p-1 shadow-sm">
            <TabsTrigger 
              value="appearance" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue"
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              Apparence
            </TabsTrigger>
            <TabsTrigger 
              value="audio" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              Audio
            </TabsTrigger>
            <TabsTrigger 
              value="offline" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Hors-ligne
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue"
            >
              <User className="h-4 w-4 mr-2" />
              Compte
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>Personnalisez l'apparence de l'application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Thème de couleur</h3>
                  <ColorThemeSelector />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Mode d'affichage</Label>
                    <p className="text-sm text-gray-500">Choisissez entre clair, sombre ou automatique</p>
                  </div>
                  <ThemeSelector />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audio">
            <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Paramètres audio</CardTitle>
                <CardDescription>Gérez les sons et la musique du jeu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-effects">Effets sonores</Label>
                    <p className="text-sm text-gray-500">Sons des cartes et des actions</p>
                  </div>
                  <Switch 
                    id="sound-effects" 
                    checked={soundEnabled} 
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="background-music">Musique de fond</Label>
                    <p className="text-sm text-gray-500">Pas encore disponible</p>
                  </div>
                  <Switch 
                    id="background-music" 
                    checked={false}
                    disabled={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="offline">
            <OfflineMode onEnableOfflineMode={handleOfflineModeChange} />
          </TabsContent>
          
          <TabsContent value="account">
            <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>Compte utilisateur</CardTitle>
                <CardDescription>Gérez votre compte et vos informations personnelles.</CardDescription>
              </CardHeader>
              <CardContent>
                <SignedIn>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                      <AvatarImage src={user?.imageUrl} />
                      <AvatarFallback className="bg-dutch-blue text-white">
                        {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{user?.fullName || user?.username}</h3>
                      <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <div className="ml-auto">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Gérez votre profil, vos paramètres de compte et vos préférences de communication depuis le panneau de contrôle de votre compte.
                  </p>
                </SignedIn>
                
                <SignedOut>
                  <div className="text-center py-6">
                    <User className="h-16 w-16 mx-auto text-dutch-blue/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Vous n'êtes pas connecté</h3>
                    <p className="text-gray-600 mb-6">
                      Connectez-vous pour accéder à toutes les fonctionnalités et sauvegarder votre progression.
                    </p>
                    <Button variant="dutch-blue" className="w-full md:w-auto" size="lg" asChild>
                      <a href="/sign-in">Se connecter</a>
                    </Button>
                  </div>
                </SignedOut>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageLayout>
  );
};

export default SettingsPage;
