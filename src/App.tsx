
/**
 * Composant principal de l'application avec système de routes optimisé
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from "sonner";
import * as Sentry from '@sentry/react';
import { addBreadcrumb } from './utils/sentryConfig';
import AnimatedBackground from './components/AnimatedBackground';

// Pages
import Home from './pages/Home';
import SimpleGameSetup from './pages/SimpleGameSetup';
import SimpleGamePage from './pages/SimpleGamePage';
import History from './pages/History';
import RulesPage from './pages/RulesPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import GuideStrategy from './pages/GuideStrategy';

// Composants
import ProtectedRoute from './components/ProtectedRoute';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import AppLayout from './components/layout/AppLayout';

// Contexte
import { SupabaseAuthProvider } from './context/SupabaseAuthContext';
import { UnifiedThemeProvider } from './components/ui/unified-theme-provider';

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
  return (
    <UnifiedThemeProvider>
      <SupabaseAuthProvider>
        <Router>
          {/* Fond animé global avec vagues et pastilles - visible sur toute l'app */}
          <div className="fixed inset-0 w-full h-full -z-10">
            <AnimatedBackground />
          </div>
          
          <RouteTracker />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Pages d'authentification */}
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              
              {/* Pages principales */}
              <Route index element={<Home />} />
              <Route path="setup" element={<Navigate to="/simple-setup" replace />} />
              <Route path="game" element={<Navigate to="/simple-game" replace />} />
              <Route path="simple-setup" element={<SimpleGameSetup />} />
              <Route path="simple-game" element={<SimpleGamePage />} />
              <Route path="history" element={<History />} />
              <Route path="rules" element={<RulesPage />} />
              
              {/* Pages SEO / Contenu */}
              <Route path="about" element={<AboutPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="strategy" element={<GuideStrategy />} />
              
              {/* Redirections SEO friendly */}
              <Route path="aide" element={<Navigate to="/faq" replace />} />
              <Route path="questions" element={<Navigate to="/faq" replace />} />
              <Route path="guide" element={<Navigate to="/strategy" replace />} />
              <Route path="astuces" element={<Navigate to="/strategy" replace />} />
              
              {/* Redirection pour les routes non définies */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          
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
        </Router>
      </SupabaseAuthProvider>
    </UnifiedThemeProvider>
  );
};

export default Sentry.withProfiler(App, { name: 'App' });
