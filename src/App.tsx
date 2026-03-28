
/**
 * Composant principal de l'application avec système de routes optimisé
 */
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from "sonner";
import * as Sentry from '@sentry/react';
import { addBreadcrumb } from './utils/sentryConfig';
import AnimatedBackground from './components/AnimatedBackground';

// Auth pages (eager - need fast load)
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Lazy-loaded pages
const Home = React.lazy(() => import('./pages/Home'));
const SimpleGameSetup = React.lazy(() => import('./pages/SimpleGameSetup'));
const SimpleGamePage = React.lazy(() => import('./pages/SimpleGamePage'));
const JoinGamePage = React.lazy(() => import('./pages/JoinGamePage'));
const History = React.lazy(() => import('./pages/History'));
const RulesPage = React.lazy(() => import('./pages/RulesPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const FAQPage = React.lazy(() => import('./pages/FAQPage'));
const GuideStrategy = React.lazy(() => import('./pages/GuideStrategy'));
const MultiplayerPage = React.lazy(() => import('./pages/MultiplayerPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const DeveloperTools = React.lazy(() => import('./pages/DeveloperTools'));

// Composants
import PWAInstallPrompt from './components/PWAInstallPrompt';
import AppLayout from './components/layout/AppLayout';

// Contexte
import { SupabaseAuthProvider } from './context/SupabaseAuthContext';
import { UnifiedThemeProvider } from './components/ui/unified-theme-provider';
import { EnhancedAdProvider } from './contexts/EnhancedAdContext';
import GDPRConsentBanner from './components/ads/GDPRConsentBanner';

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
        <EnhancedAdProvider>
          <Router>
          {/* Fond animé global avec vagues et pastilles - visible sur toute l'app */}
          <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
            <AnimatedBackground variant="subtle" />
          </div>
          
          <RouteTracker />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dutch-blue"></div></div>}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Pages d'authentification */}
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              
              {/* Pages principales */}
              <Route index element={<Home />} />
              <Route path="setup" element={<SimpleGameSetup />} />
              
              <Route path="game" element={<SimpleGamePage />} />
              <Route path="join/:gameId" element={<JoinGamePage />} />
              <Route path="multiplayer" element={<MultiplayerPage />} />
              <Route path="history" element={<History />} />
              <Route path="rules" element={<RulesPage />} />
              
              {/* Pages SEO / Contenu */}
              <Route path="about" element={<AboutPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="dev-tools" element={<DeveloperTools />} />
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
          </Suspense>

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
          <GDPRConsentBanner />
          </Router>
        </EnhancedAdProvider>
      </SupabaseAuthProvider>
    </UnifiedThemeProvider>
  );
};

export default Sentry.withProfiler(App, { name: 'App' });
