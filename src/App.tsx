
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
  const [shouldShowOfflineToast, setShouldShowOfflineToast] = useState(false);

  // Nettoyage des anciennes données au démarrage de l'application
  useEffect(() => {
    cleanupOldData(30); // Nettoyer les données de plus de 30 jours
  }, []);

  // Vérifier immédiatement si une erreur d'authentification a déjà été rencontrée
  useEffect(() => {
    if (localStorage.getItem('clerk_auth_failed') === 'true') {
      setOfflineMode(true);
      setIsLoading(false);
      setShouldShowOfflineToast(true);
    } else {
      // Si pas déjà en mode hors ligne, définir un court délai pour vérifier si Clerk est disponible
      const timer = setTimeout(() => {
        // Vérification sécurisée de l'existence de Clerk dans window
        const clerkAvailable = typeof window !== 'undefined' && 'Clerk' in window;
        if (!clerkAvailable) {
          console.warn("Clerk n'a pas pu être initialisé");
          localStorage.setItem('clerk_auth_failed', 'true');
          setOfflineMode(true);
          setShouldShowOfflineToast(true);
        }
        // Dans tous les cas, terminer le chargement
        setIsLoading(false);
      }, 500); // 500ms de délai
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Afficher une notification pour le mode hors ligne - toujours défini, jamais conditionnel
  useEffect(() => {
    if (shouldShowOfflineToast) {
      toast.info("Mode hors ligne activé", {
        description: "L'application fonctionne sans authentification",
        duration: 3000
      });
    }
  }, [shouldShowOfflineToast]);

  // Si l'application est encore en chargement, afficher un loader
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-dutch-blue/30 border-t-dutch-blue rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Chargement de l'application...</p>
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
      <Toaster />
    </Router>
  );
}

export default App;
