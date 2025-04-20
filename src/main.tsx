
/**
 * Point d'entrée principal de l'application
 * Gère l'initialisation des services et le rendu React
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme.css'
import { ThemeProvider } from './hooks/use-theme'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from "sonner"
import { initializeSentry, SentryErrorBoundary } from './utils/sentryConfig'

// Clé Clerk pour le développement
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                             'pk_test_YmFsYW5jZWQtYnJlYW0tMjguY2xlcmsuYWNjb3VudHMuZGV2JA'

// Initialize Sentry as early as possible
initializeSentry().catch(error => {
  console.error('Failed to initialize Sentry:', error);
});

/**
 * Configure la gestion des erreurs globale pour Clerk sans déclenchement de rechargement
 */
function setupErrorHandling() {
  // Si l'application est déjà en mode hors-ligne, pas besoin de configurer la gestion d'erreurs
  if (localStorage.getItem('clerk_auth_failed') === 'true') {
    console.info("Mode hors ligne déjà activé, gestion d'erreurs Clerk ignorée");
    return;
  }
  
  // Intercepter les rejets de promesses non gérés
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && typeof event.reason.message === 'string' && 
        (event.reason.message.includes('Clerk') || event.reason.message.includes('ClerkJS'))) {
      console.error("Erreur d'initialisation de Clerk:", event.reason);
      localStorage.setItem('clerk_auth_failed', 'true');
      // Ne pas recharger la page - l'état sera pris en compte au prochain rendu
    }
  });
  
  // Gestionnaire d'erreurs global
  window.addEventListener('error', (event) => {
    if (event.error && event.error.message && 
        (event.error.message.includes('Clerk') || event.error.message.includes('ClerkJS'))) {
      console.error("Erreur Clerk détectée:", event.error);
      localStorage.setItem('clerk_auth_failed', 'true');
      // Ne pas recharger la page - l'état sera pris en compte au prochain rendu
    }
  });
  
  // Timeout court pour vérifier si Clerk est initialisé
  setTimeout(() => {
    if (typeof window !== 'undefined' && !('Clerk' in window) && 
        !localStorage.getItem('clerk_auth_failed')) {
      console.warn("Clerk n'a pas pu être initialisé dans le délai imparti");
      localStorage.setItem('clerk_auth_failed', 'true');
      // Ne pas recharger la page - l'état sera pris en compte au prochain rendu
    }
  }, 2000);
}

// Vérifier si le mode hors-ligne est déjà activé
const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';

// Créer la racine React
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Configurer la détection d'erreur si nécessaire
if (!isOfflineMode) {
  setupErrorHandling();
}

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

// Rendre l'application
root.render(
  <React.StrictMode>
    <SentryErrorBoundary fallback={FallbackComponent}>
      {isOfflineMode ? (
        // Mode hors-ligne : pas de ClerkProvider
        <ThemeProvider>
          <App />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      ) : (
        // Mode normal : avec ClerkProvider
        <ClerkProvider 
          publishableKey={CLERK_PUBLISHABLE_KEY}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          afterSignOutUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-dutch-blue hover:bg-dutch-blue/90 rounded-2xl transition-all',
              card: 'backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-sm',
              footerActionLink: 'text-dutch-blue hover:text-dutch-blue/90',
              rootBox: 'rounded-3xl overflow-hidden',
              formFieldInput: 'rounded-xl border border-white/50 bg-white/70 backdrop-blur-sm',
              identityPreview: 'rounded-xl bg-white/50 backdrop-blur-sm',
            }
          }}
        >
          <ThemeProvider>
            <App />
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </ClerkProvider>
      )}
    </SentryErrorBoundary>
  </React.StrictMode>
);
