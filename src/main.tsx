
/**
 * Point d'entrée principal de l'application - Version Production
 * Optimisé pour performances et SEO
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { initializeSentry, SentryErrorBoundary } from './utils/sentryConfig'
import { logger } from '@/utils/logger';

// Initialize Sentry as early as possible
initializeSentry().catch(error => {
  console.error('Failed to initialize Sentry:', error);
});

// Configuration QueryClient optimisée pour production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Créer la racine React avec vérification
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = ReactDOM.createRoot(rootElement);

// Custom fallback component for Sentry error boundary
const FallbackComponent = () => (
  <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-red-700 max-w-lg mx-auto mt-20">
    <h2 className="text-lg font-semibold mb-2">🚨 Une erreur est survenue</h2>
    <p className="mb-4">L'application a rencontré un problème inattendu. Essayez de rafraîchir la page.</p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      🔄 Rafraîchir la page
    </button>
  </div>
);

// Render avec tous les providers optimisés
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SentryErrorBoundary fallback={FallbackComponent}>
        <App />
      </SentryErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);

// Performance monitoring pour production  
if (import.meta.env.PROD) {
  // Service Worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently handle SW registration failures
    });
  }
  
  // Performance timing (simple et typé)
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (perfData) {
      logger.debug('Dutch Card Game - Performance:', {
        pageLoadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
        domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
        totalTime: Math.round(perfData.loadEventEnd - perfData.fetchStart)
      });
    }
  });
}
