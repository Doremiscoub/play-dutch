
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence } from 'framer-motion';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import GamePage from '@/pages/GamePage';
import GameSetupPage from '@/pages/GameSetupPage';
import HistoryPage from '@/pages/HistoryPage';
import RulesPage from '@/pages/RulesPage';
import SettingsPage from '@/pages/SettingsPage';
import BrickBreaker from '@/components/EasterEgg/BrickBreaker';
import { cleanupOldData } from '@/utils/pwaUtils';

function App() {
  // Nettoyage des anciennes données au démarrage de l'application
  useEffect(() => {
    cleanupOldData(30); // Nettoyer les données de plus de 30 jours
  }, []);

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
          <Route path="/game-setup" element={<GameSetupPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </Router>
  );
}

export default App;
