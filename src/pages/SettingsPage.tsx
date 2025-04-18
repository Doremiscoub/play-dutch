
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import ElevenLabsSetup from '@/components/ElevenLabsSetup';
import ThemeSelector from '@/components/ThemeSelector';
import AdvancedThemeSelector from '@/components/AdvancedThemeSelector';
import PageLayout from '@/components/layouts/PageLayout';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromGame = location.state?.from === '/game';
  
  // Fonction pour gérer le retour en arrière intelligent
  const handleBack = () => {
    if (isFromGame) {
      // Si on vient de /game, on y retourne
      navigate('/game');
    } else {
      // Sinon on retourne à l'accueil
      navigate('/');
    }
  };

  return (
    <PageLayout>
      <motion.div
        className="w-full max-w-4xl mx-auto px-2 sm:px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-3xl font-bold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Réglages
          </motion.h1>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 bg-white/70 border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFromGame ? 'Retour au jeu' : 'Accueil'}
            </Button>
            
            {isFromGame && (
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-white/70 border-gray-200"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="game" className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-gray-100">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="game">Jeu</TabsTrigger>
            <TabsTrigger value="audio">Voix & Sons</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="game" className="space-y-6">
            <GameSettings />
          </TabsContent>
          
          <TabsContent value="audio" className="space-y-6">
            <ElevenLabsSetup />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <ThemeSelector />
            <div className="h-6" />
            <AdvancedThemeSelector />
          </TabsContent>
        </Tabs>
      </motion.div>
    </PageLayout>
  );
};

export default SettingsPage;
