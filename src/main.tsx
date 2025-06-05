
/**
 * Point d'entrée principal de l'application
 * Gère l'initialisation des services et le rendu React
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme.css'
import { Toaster } from "sonner"
import { initializeSentry, SentryErrorBoundary } from './utils/sentryConfig'
import { UnifiedThemeProvider } from './components/ui/unified-theme-provider'

// Initialize Sentry as early as possible
initializeSentry().catch(error => {
  console.error('Failed to initialize Sentry:', error);
});

// Vérifier si le mode hors-ligne est déjà activé
const isOfflineMode = localStorage.getItem('auth_offline_mode') === 'true';

// Créer la racine React
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Custom fallback component for Sentry error boundary
const FallbackComponent = () => (
  <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-red-700">
    <h2 className="text-lg font-semibold mb-2">Une erreur est survenue</h2>
    <p>L'application a rencontré un problème inattendu. Essayez de rafraîchir la page.</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Rafraîchir la page
    </button>
  </div>
);

// Rendre l'application avec UnifiedThemeProvider au plus haut niveau
root.render(
  <React.StrictMode>
    <SentryErrorBoundary fallback={FallbackComponent}>
      <UnifiedThemeProvider>
        <App />
        <Toaster position="top-center" richColors />
      </UnifiedThemeProvider>
    </SentryErrorBoundary>
  </React.StrictMode>
);
