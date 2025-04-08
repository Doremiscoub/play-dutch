
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence } from 'framer-motion';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import GamePage from '@/pages/GamePage';
import HistoryPage from '@/pages/HistoryPage';
import RulesPage from '@/pages/RulesPage';
import SettingsPage from '@/pages/SettingsPage';
import BrickBreaker from '@/components/EasterEgg/BrickBreaker';
import GameSetup from '@/components/GameSetup';
import { cleanupOldData } from '@/utils/pwaUtils';
import { toast } from 'sonner';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  // Nettoyage des anciennes données au démarrage de l'application
  useEffect(() => {
    cleanupOldData(30); // Nettoyer les données de plus de 30 jours
  }, []);

  // Vérifier immédiatement si une erreur d'authentification a déjà été rencontrée
  useEffect(() => {
    const isOffline = localStorage.getItem('clerk_auth_failed') === 'true';
    setOfflineMode(isOffline);
    
    if (isOffline) {
      setIsLoading(false);
      // Afficher la notification une seule fois après le chargement initial
      const hasShownOfflineToast = sessionStorage.getItem('offline_toast_shown');
      if (!hasShownOfflineToast) {
        setTimeout(() => {
          toast.info("Mode hors ligne activé", {
            description: "L'application fonctionne sans authentification",
            duration: 3000
          });
          sessionStorage.setItem('offline_toast_shown', 'true');
        }, 500);
      }
    } else {
      // Si pas déjà en mode hors ligne, vérifier si Clerk est disponible
      const timer = setTimeout(() => {
        // Vérification sécurisée de l'existence de Clerk dans window
        const clerkAvailable = typeof window !== 'undefined' && 'Clerk' in window;
        if (!clerkAvailable) {
          console.warn("Clerk n'a pas pu être initialisé");
          localStorage.setItem('clerk_auth_failed', 'true');
          setOfflineMode(true);
          toast.info("Mode hors ligne activé", {
            description: "L'application fonctionne sans authentification",
            duration: 3000
          });
        }
        // Terminer le chargement
        setIsLoading(false);
      }, 500); 
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Si l'application est encore en chargement, afficher un loader modernisé
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center glass-light">
        <div className="flex flex-col items-center scale-in">
          <div className="h-14 w-14 rounded-full border-3 border-dutch-blue/20 border-t-dutch-blue border-r-dutch-blue/70 animate-spin mb-5" />
          <p className="text-gray-600 font-medium text-lg">Chargement de Dutch</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/easter-egg" element={<BrickBreaker onClose={() => window.history.back()} />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/setup" element={<GameSetup />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#333',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '16px',
          },
          success: {
            style: {
              backgroundColor: 'rgba(230, 255, 237, 0.8)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
            },
          },
          error: {
            style: {
              backgroundColor: 'rgba(254, 226, 226, 0.8)', 
              border: '1px solid rgba(248, 113, 113, 0.3)',
            },
          },
          info: {
            style: {
              backgroundColor: 'rgba(219, 234, 254, 0.8)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
