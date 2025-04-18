
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameSettings from '@/components/GameSettings';
import ElevenLabsSetup from '@/components/ElevenLabsSetup';
import ThemeSelector from '@/components/ThemeSelector';
import PageLayout from '@/components/layouts/PageLayout';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromGame = location.state?.from === '/game';
  
  const handleBack = () => {
    if (isFromGame) {
      navigate('/game');
    } else {
      navigate('/');
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Réglages
          </motion.h1>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFromGame ? 'Retour au jeu' : 'Accueil'}
            </Button>
            
            {isFromGame && (
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-white/70 hover:bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50">
          <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 rounded-xl bg-white/50 backdrop-blur-md p-1 shadow-sm">
              <TabsTrigger value="game" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5">
                Jeu
              </TabsTrigger>
              <TabsTrigger value="audio" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5">
                Voix & Sons
              </TabsTrigger>
              <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5">
                Apparence
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-6">
              <TabsContent value="game" className="mt-0">
                <GameSettings />
              </TabsContent>
              
              <TabsContent value="audio" className="mt-0">
                <ElevenLabsSetup />
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0">
                <ThemeSelector />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
