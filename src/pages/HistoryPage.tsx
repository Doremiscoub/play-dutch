
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { History, User, Calendar, Users, Trophy } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/PageLayout';
import GameHistory from '@/components/GameHistory';

const HistoryPage: React.FC = () => {
  return (
    <PageLayout
      title="Historique"
      subtitle="Consultez l'historique de vos parties"
      showThemeSelector={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <SignedIn>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/40 p-1 shadow-sm">
              <TabsTrigger value="recent" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue">
                <History className="h-4 w-4 mr-2" />
                Récentes
              </TabsTrigger>
              <TabsTrigger value="stats" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue">
                <Trophy className="h-4 w-4 mr-2" />
                Statistiques
              </TabsTrigger>
              <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 text-dutch-blue">
                <Calendar className="h-4 w-4 mr-2" />
                Toutes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent">
              <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Parties récentes</CardTitle>
                  <CardDescription>Vos 5 dernières parties</CardDescription>
                </CardHeader>
                <CardContent>
                  <GameHistory limit={5} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Statistiques de jeu</CardTitle>
                  <CardDescription>Votre performance et vos accomplissements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="rounded-xl bg-white/60 border border-white/40">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Trophy className="h-10 w-10 text-dutch-orange mt-2 mb-2" />
                        <p className="text-sm text-gray-500">Parties gagnées</p>
                        <p className="text-3xl font-bold text-dutch-blue">12</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="rounded-xl bg-white/60 border border-white/40">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Users className="h-10 w-10 text-dutch-purple mt-2 mb-2" />
                        <p className="text-sm text-gray-500">Parties jouées</p>
                        <p className="text-3xl font-bold text-dutch-blue">24</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="rounded-xl bg-white/60 border border-white/40">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Badge className="h-10 w-10 text-dutch-blue mt-2 mb-2 flex items-center justify-center">
                          <span className="text-lg font-bold">50%</span>
                        </Badge>
                        <p className="text-sm text-gray-500">Taux de victoire</p>
                        <p className="text-3xl font-bold text-dutch-blue">50%</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p className="text-center text-gray-500 text-sm">
                    D'autres statistiques détaillées seront disponibles prochainement.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all">
              <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>Historique complet</CardTitle>
                  <CardDescription>Toutes vos parties enregistrées</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <GameHistory limit={20} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SignedIn>
        
        <SignedOut>
          <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>Historique des parties</CardTitle>
              <CardDescription>Connectez-vous pour voir votre historique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <User className="h-16 w-16 mx-auto text-dutch-blue/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Vous n'êtes pas connecté</h3>
                <p className="text-gray-600 mb-6">
                  Connectez-vous pour accéder à l'historique de vos parties et voir vos statistiques.
                </p>
                <Button variant="dutch-blue" className="w-full sm:w-auto" size="lg" asChild>
                  <a href="/sign-in">Se connecter</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </SignedOut>
      </motion.div>
    </PageLayout>
  );
};

export default HistoryPage;
