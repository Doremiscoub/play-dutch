
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Settings, Palette, Mic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from '@/components/layouts/PageLayout';
import GeneralSettings from '@/components/sections/GeneralSettings';
import AppearanceSettings from '@/components/sections/AppearanceSettings';
import VoiceSettings from '@/components/sections/VoiceSettings';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromGame = location.state?.from === '/game';
  
  const handleBack = () => {
    if (location.state?.from) {
      // Navigation vers l'écran précédent spécifique si fourni
      navigate(location.state.from);
    } else {
      // Utilisation de navigate(-1) pour revenir à l'écran précédent
      navigate(-1);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
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
              Retour
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
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 rounded-xl bg-white/50 backdrop-blur-md p-1 shadow-sm">
              <TabsTrigger 
                value="general"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Général
              </TabsTrigger>
              <TabsTrigger 
                value="appearance"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                Apparence
              </TabsTrigger>
              <TabsTrigger 
                value="voice"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Voix
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-6">
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
              
              <TabsContent value="appearance">
                <AppearanceSettings />
              </TabsContent>
              
              <TabsContent value="voice">
                <VoiceSettings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
