
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { PageLayout } from '@/components/PageLayout';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Trash2, Volume2, Volume1, VolumeX, RefreshCcw, ArrowRight, Moon, SunMedium, Languages, Send, Sparkles } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const [soundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const [darkMode, setDarkMode] = useLocalStorage('dutch_dark_mode', false);
  const [colorTheme, setColorTheme] = useLocalStorage('dutch_color_theme', 'blue');
  const [aiCommentary, setAiCommentary] = useLocalStorage('dutch_ai_commentary', true);
  const [language, setLanguage] = useLocalStorage('dutch_language', 'fr');
  
  const handleClearHistory = () => {
    const confirm = window.confirm("Êtes-vous sûr de vouloir effacer l'historique des parties ? Cette action est irréversible.");
    if (confirm) {
      localStorage.removeItem('dutch_games');
      toast.success("Historique des parties effacé");
    }
  };
  
  const handleResetSettings = () => {
    const confirm = window.confirm("Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?");
    if (confirm) {
      setSoundEnabled(true);
      setDarkMode(false);
      setColorTheme('blue');
      setAiCommentary(true);
      setLanguage('fr');
      toast.success("Paramètres réinitialisés");
    }
  };
  
  const handleContactSupport = () => {
    window.open('mailto:support@dutch-app.com?subject=Support%20Dutch%20App', '_blank');
    toast.success("Ouverture de votre client mail...");
  };

  return (
    <PageLayout title="Réglages" subtitle="Personnalisez votre expérience" showThemeSelector={true}>
      <motion.div 
        className="max-w-md mx-auto w-full p-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Son et Voix */}
        <div className="dutch-card rounded-3xl p-5 bg-white/80 backdrop-blur-sm shadow-md border border-white/30">
          <h2 className="text-lg font-semibold mb-4 text-dutch-blue">Son et Voix</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-dutch-blue" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-400" />
                )}
                <span>Effets sonores</span>
              </div>
              <Switch 
                checked={soundEnabled} 
                onCheckedChange={setSoundEnabled}
                className="data-[state=checked]:bg-dutch-blue"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className={`h-5 w-5 ${aiCommentary ? 'text-dutch-purple' : 'text-gray-400'}`} />
                <span>Commentaires IA</span>
              </div>
              <Switch 
                checked={aiCommentary} 
                onCheckedChange={setAiCommentary}
                className="data-[state=checked]:bg-dutch-purple"
              />
            </div>
          </div>
        </div>
        
        {/* Apparence */}
        <div className="dutch-card rounded-3xl p-5 bg-white/80 backdrop-blur-sm shadow-md border border-white/30">
          <h2 className="text-lg font-semibold mb-4 text-dutch-orange">Apparence</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-dutch-purple" />
                ) : (
                  <SunMedium className="h-5 w-5 text-dutch-orange" />
                )}
                <span>Mode sombre</span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-dutch-purple"
              />
            </div>
            
            <div className="pt-2">
              <p className="text-sm mb-3 text-gray-600">Thème de couleur</p>
              <ThemeSelector currentTheme={colorTheme} onThemeChange={setColorTheme} />
            </div>
          </div>
        </div>
        
        {/* Langue */}
        <div className="dutch-card rounded-3xl p-5 bg-white/80 backdrop-blur-sm shadow-md border border-white/30">
          <h2 className="text-lg font-semibold mb-4 text-dutch-purple">Langue</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-dutch-purple" />
                <span>Langue de l'application</span>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-full bg-white/70 border border-gray-200 px-3 py-1 text-sm"
              >
                <option value="fr">Français</option>
                <option value="en" disabled>English (coming soon)</option>
                <option value="es" disabled>Español (coming soon)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Données et vie privée */}
        <div className="dutch-card rounded-3xl p-5 bg-white/80 backdrop-blur-sm shadow-md border border-white/30">
          <h2 className="text-lg font-semibold mb-4 text-dutch-blue">Données et vie privée</h2>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-between rounded-xl border-gray-200"
              onClick={handleClearHistory}
            >
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                <span>Effacer l'historique</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between rounded-xl border-gray-200"
              onClick={handleResetSettings}
            >
              <div className="flex items-center gap-2">
                <RefreshCcw className="h-4 w-4 text-dutch-orange" />
                <span>Réinitialiser les paramètres</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Support */}
        <div className="dutch-card rounded-3xl p-5 bg-white/80 backdrop-blur-sm shadow-md border border-white/30">
          <h2 className="text-lg font-semibold mb-4 text-dutch-purple">Support</h2>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-between rounded-xl border-gray-200"
              onClick={handleContactSupport}
            >
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4 text-dutch-blue" />
                <span>Contacter le support</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">Dutch App v1.0</p>
              <p className="text-xs text-gray-500 mt-1">© 2023 Dutch Team</p>
            </div>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default SettingsPage;
