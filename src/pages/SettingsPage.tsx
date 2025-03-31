
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme, themeConfig } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Paintbrush, Volume2, VolumeX, Moon, Sun, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ThemeSelector from '@/components/ThemeSelector';
import PageLayout from '@/components/PageLayout';

const SettingsPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const { user, isSignedIn } = useUser();
  
  // Mock settings state
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  
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
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/40 p-1 shadow-sm">
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
              value="account" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue col-span-2 md:col-span-1"
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
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(themeConfig).map(([id, theme]) => (
                      <motion.div
                        key={id}
                        className="relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card 
                          className={`flex items-center p-4 cursor-pointer hover:shadow-md transition-shadow ${
                            currentTheme === id 
                              ? 'ring-2 ring-dutch-blue border-transparent' 
                              : 'border-gray-200/60'
                          }`}
                          onClick={() => useTheme.getState().setTheme(id as any)}
                        >
                          <div className="flex gap-2 mr-4">
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: theme.primary }}
                            ></div>
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: theme.secondary }}
                            ></div>
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: theme.accent }}
                            ></div>
                          </div>
                          <span className="font-medium">{theme.name}</span>
                          {currentTheme === id && (
                            <div className="absolute right-4 h-5 w-5 bg-dutch-blue text-white rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Mode sombre</Label>
                    <p className="text-sm text-gray-500">Pas encore disponible</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-gray-500" />
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                      disabled={true}
                    />
                    <Moon className="h-4 w-4 text-gray-500" />
                  </div>
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
