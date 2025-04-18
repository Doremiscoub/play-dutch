
/**
 * Composant principal de l'application avec système de routes optimisé
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from "sonner";

// Pages
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import GameSetup from './components/GameSetup';
import History from './pages/History';
import Rules from './pages/Rules';
import SettingsPage from './pages/SettingsPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Composants
import ProtectedRoute from './components/ProtectedRoute';
import { useGamePersistence } from './hooks/useGamePersistence';

// Contexte
import { AuthProvider } from './context/AuthContext';

/**
 * Composant principal de l'application
 * Gère le routage et l'initialisation globale
 */
const App: React.FC = () => {
  const { hasActiveGame } = useGamePersistence();
  
  // Notification de mode hors-ligne si détecté
  useEffect(() => {
    try {
      const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';
      if (isOfflineMode) {
        toast.info("Mode hors-ligne activé", { id: "offline-mode" });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mode hors-ligne:", error);
    }
  }, []);
  
  // Vérifier si une nouvelle partie est explicitement demandée
  const isNewGameRequested = () => {
    return localStorage.getItem('dutch_new_game_requested') === 'true';
  };
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Pages d'authentification */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          {/* Pages principales */}
          <Route path="/" element={<Home />} />
          <Route path="/game/setup" element={<GameSetup />} />
          <Route path="/game" element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
          <Route path="/rules" element={<Rules />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Redirection pour les routes non définies */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      
      {/* Configuration globale du système de toast */}
      <Toaster 
        position="top-center" 
        richColors 
        closeButton 
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          },
          duration: 3000
        }}
      />
    </AuthProvider>
  );
};

export default App;
