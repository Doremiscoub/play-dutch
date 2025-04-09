
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import GameSetup from './components/GameSetup';
import History from './pages/History';
import Rules from './pages/Rules';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { SignIn, SignUp } from "@clerk/clerk-react";
import { toast } from 'sonner';

const App = () => {
  // Notification de mode hors-ligne si détecté
  useEffect(() => {
    const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';
    if (isOfflineMode) {
      toast.info("Mode hors-ligne activé");
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        {/* Pages d'authentification */}
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
        
        {/* Pages principales */}
        <Route path="/" element={<Home />} />
        <Route path="/game/setup" element={<GameSetup />} />
        <Route path="/game" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        
        {/* Redirection pour les routes non définies */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
