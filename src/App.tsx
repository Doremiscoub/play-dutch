
/**
 * Composant principal de l'application avec système de routes optimisé
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from "sonner";
import * as Sentry from '@sentry/react';
import { addBreadcrumb } from './utils/sentryConfig';
import AnimatedBackground from './components/AnimatedBackground';

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
import PWAInstallPrompt from './components/PWAInstallPrompt';

// Contexte
import { AuthProvider } from './context/AuthContext';

// Flag pour suivre si la notification a déjà été affichée
const offlineNotificationDisplayed = { shown: false };

// Composant pour suivre les changements de route pour Sentry
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    addBreadcrumb(
      'navigation', 
      `Navigated to ${location.pathname}${location.search}`,
      { 
        path: location.pathname,
        search: location.search
      }
    );
  }, [location]);

  return null;
};

/**
 * Composant principal de l'application
 * Gère le routage et l'initialisation globale
 */
const App: React.FC = () => {
  // Notification de mode hors-ligne si détecté (une seule fois)
  useEffect(() => {
    try {
      const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';
      // Vérifier si on est en mode hors-ligne ET si la notification n'a pas déjà été affichée
      if (isOfflineMode && !offlineNotificationDisplayed.shown) {
        toast.info("Mode hors-ligne activé");
        offlineNotificationDisplayed.shown = true;
        addBreadcrumb('app_state', 'Offline mode activated');
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du mode hors-ligne:", error);
      Sentry.captureException(error);
    }
  }, []);
  
  return (
    <AuthProvider>
      <Router>
        <AnimatedBackground />
        <RouteTracker />
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
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          
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
          }
        }}
      />
      
      <PWAInstallPrompt />
    </AuthProvider>
  );
};

export default Sentry.withProfiler(App, { name: 'App' });
