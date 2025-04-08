
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

// Vérifier immédiatement si le mode hors ligne a déjà été activé précédemment
const isOfflineMode = localStorage.getItem('clerk_auth_failed') === 'true';

if (isOfflineMode) {
  console.info("Mode hors ligne détecté, authentification Clerk ignorée");
}

// Protection contre les erreurs d'initialisation de Clerk
if (typeof window !== 'undefined' && !isOfflineMode) {
  // Timeout très court pour détecter rapidement les problèmes d'initialisation Clerk
  setTimeout(() => {
    // Utilisation de la vérification sécurisée avec 'in' au lieu d'accéder directement à window.Clerk
    if (!('Clerk' in window) && !localStorage.getItem('clerk_auth_failed')) {
      console.warn("Clerk n'a pas pu être initialisé dans le délai imparti");
      localStorage.setItem('clerk_auth_failed', 'true');
      // Forcer un rechargement pour appliquer le mode hors ligne
      window.location.reload();
    }
  }, 800); // Timeout très court

  // Écouter les erreurs non gérées qui pourraient provenir de Clerk
  window.addEventListener('unhandledrejection', (event) => {
    // Vérifier si l'erreur provient de Clerk
    if (event.reason && typeof event.reason.message === 'string' && 
        (event.reason.message.includes('Clerk') || event.reason.message.includes('ClerkJS'))) {
      console.error("Erreur d'initialisation de Clerk:", event.reason);
      localStorage.setItem('clerk_auth_failed', 'true');
      // Forcer un rechargement pour appliquer le mode hors ligne
      window.location.reload();
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Utiliser une fonction pour rendre l'application avec ou sans ClerkProvider
const renderApp = () => {
  // Déjà en mode hors ligne
  if (isOfflineMode) {
    return (
      <React.StrictMode>
        <ThemeProvider>
          <App />
          <Toaster position="top-center" />
        </ThemeProvider>
      </React.StrictMode>
    );
  }
  
  // Mode normal avec tentative d'authentification
  return (
    <React.StrictMode>
      <ClerkProvider 
        publishableKey={CLERK_PUBLISHABLE_KEY}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        afterSignOutUrl="/"
        appearance={{
          elements: {
            // Style personnalisé VisionOS
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
          <Toaster position="top-center" />
        </ThemeProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
};

// Rendre l'application en utilisant la fonction
root.render(renderApp());
