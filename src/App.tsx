
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

// SEO/GEO pages — isolated from core game logic
const DutchCardGamePage = React.lazy(() => import('./pages/seo/DutchCardGamePage'));
const DutchRulesPage = React.lazy(() => import('./pages/seo/DutchRulesPage'));
const DutchScoringPage = React.lazy(() => import('./pages/seo/DutchScoringPage'));
const ScoreTrackerPage = React.lazy(() => import('./pages/seo/ScoreTrackerPage'));
const CardGameScoreAppPage = React.lazy(() => import('./pages/seo/CardGameScoreAppPage'));
const WhatIsDutchCardGamePage = React.lazy(() => import('./pages/seo/WhatIsDutchCardGamePage'));
const HowToPlayDutchPage = React.lazy(() => import('./pages/seo/HowToPlayDutchPage'));
const HowToScoreDutchPage = React.lazy(() => import('./pages/seo/HowToScoreDutchPage'));
const BestScoreTrackerPage = React.lazy(() => import('./pages/seo/BestScoreTrackerPage'));
const HowToKeepScorePage = React.lazy(() => import('./pages/seo/HowToKeepScorePage'));

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
 */
const App: React.FC = () => {
  return (
    <UnifiedThemeProvider>
      <SupabaseAuthProvider>
        <EnhancedAdProvider>
          <Router>
          {/* V2: Clean static background */}
          <div className="fixed inset-0 w-full h-full -z-10">
            <AnimatedBackground variant="subtle" />
          </div>

          <RouteTracker />
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Chargement...</p>
              </div>
            </div>
          }>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />

              <Route index element={<Home />} />
              <Route path="setup" element={<SimpleGameSetup />} />
              <Route path="game" element={<SimpleGamePage />} />
              <Route path="join/:gameId" element={<JoinGamePage />} />
              <Route path="multiplayer" element={<MultiplayerPage />} />
              <Route path="history" element={<History />} />
              <Route path="rules" element={<RulesPage />} />

              <Route path="about" element={<AboutPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="dev-tools" element={<DeveloperTools />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="strategy" element={<GuideStrategy />} />

              {/* SEO/GEO pages — new routes, no impact on existing app */}
              <Route path="dutch-card-game" element={<DutchCardGamePage />} />
              <Route path="dutch-rules" element={<DutchRulesPage />} />
              <Route path="dutch-scoring" element={<DutchScoringPage />} />
              <Route path="score-tracker" element={<ScoreTrackerPage />} />
              <Route path="card-game-score-app" element={<CardGameScoreAppPage />} />
              <Route path="what-is-dutch-card-game" element={<WhatIsDutchCardGamePage />} />
              <Route path="how-to-play-dutch" element={<HowToPlayDutchPage />} />
              <Route path="how-to-score-dutch" element={<HowToScoreDutchPage />} />
              <Route path="best-score-tracker-card-games" element={<BestScoreTrackerPage />} />
              <Route path="how-to-keep-score-card-games" element={<HowToKeepScorePage />} />

              <Route path="aide" element={<Navigate to="/faq" replace />} />
              <Route path="questions" element={<Navigate to="/faq" replace />} />
              <Route path="guide" element={<Navigate to="/strategy" replace />} />
              <Route path="astuces" element={<Navigate to="/strategy" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          </Suspense>

          {/* Toast system */}
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              className: 'glass-elevated !rounded-xl !shadow-md',
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
