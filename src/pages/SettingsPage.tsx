
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VolumeX, Volume2, ArrowLeft, Moon, Sun, Paintbrush, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeSelector from '@/components/ThemeSelector';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  useEffect(() => {
    // Load sound setting from localStorage
    const savedSoundEnabled = window.localStorage.getItem('dutch_sound_enabled');
    if (savedSoundEnabled !== null) {
      setSoundEnabled(savedSoundEnabled !== 'false');
    }
  }, []);
  
  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled);
    window.localStorage.setItem('dutch_sound_enabled', enabled.toString());
    toast({
      title: enabled ? 'Sons activés' : 'Sons désactivés',
      description: enabled ? 'Les effets sonores sont maintenant activés.' : 'Les effets sonores sont maintenant désactivés.',
      duration: 3000,
    });
  };
  
  return (
    <motion.div 
      className="min-h-screen p-6 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 -z-10" />
      
      <motion.div
        className="absolute top-20 left-[15%] w-56 h-56 rounded-full bg-dutch-blue/5 blur-3xl -z-5"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-[10%] w-64 h-64 rounded-full bg-dutch-orange/5 blur-3xl -z-5"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <Link to="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" size="icon" className="rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white/60">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent">Réglages</h1>
        
        {/* Sons */}
        <motion.div 
          className="dutch-card mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="h-5 w-5 text-dutch-blue" />
              ) : (
                <VolumeX className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-dutch-blue">Sons</h2>
                <p className="text-sm text-gray-500">Effets sonores du jeu</p>
              </div>
            </div>
            <Switch
              checked={soundEnabled}
              onCheckedChange={handleSoundToggle}
              className={soundEnabled ? "bg-dutch-blue" : ""}
            />
          </div>
        </motion.div>
        
        {/* Thème */}
        <motion.div 
          className="dutch-card mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="h-5 w-5 text-dutch-purple" />
              <div>
                <h2 className="text-xl font-semibold text-dutch-purple">Thème</h2>
                <p className="text-sm text-gray-500">Couleurs de l'interface</p>
              </div>
            </div>
            <ThemeSelector />
          </div>
        </motion.div>
        
        {/* Mode sombre - à implémenter ultérieurement */}
        <motion.div 
          className="dutch-card mb-6 opacity-50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-gray-400" />
              <div>
                <h2 className="text-xl font-semibold text-gray-400">Mode sombre</h2>
                <p className="text-sm text-gray-500">Bientôt disponible</p>
              </div>
            </div>
            <Switch disabled className="opacity-50" />
          </div>
        </motion.div>
        
        {/* À propos */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-gray-500">Dutch Game v1.0</p>
          <p className="text-xs text-gray-400 mt-1">© 2023 Tous droits réservés</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
