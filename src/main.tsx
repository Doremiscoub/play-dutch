
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme.css'
import { ThemeProvider } from './hooks/use-theme'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from "sonner"

// Utilisation d'une clé Clerk de développement pour tester - à remplacer en production
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                             'pk_test_YmFsYW5jZWQtYnJlYW0tMjguY2xlcmsuYWNjb3VudHMuZGV2JA'

// Gestionnaire d'erreurs global pour Clerk
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
      window.location.reload();
    }
  });
  
  // Timeout court pour vérifier si Clerk est initialisé
  setTimeout(() => {
    if (typeof window !== 'undefined' && !('Clerk' in window) && 
        !localStorage.getItem('clerk_auth_failed')) {
      console.warn("Clerk n'a pas pu être initialisé dans le délai imparti");
      localStorage.setItem('clerk_auth_failed', 'true');
      window.location.reload();
    }
  }, 1500);
}

// Vérifier si le mode hors-ligne est déjà activé
const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Configurer la détection d'erreur si nécessaire
if (!isOfflineMode) {
  setupErrorHandling();
}

// Rendre l'application
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
