
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme.css'
import { ThemeProvider } from './hooks/use-theme'
import { ClerkProvider } from '@clerk/clerk-react'
import { toast } from 'sonner'

// Utilisation d'une clé Clerk de développement pour tester - à remplacer en production
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                               'pk_test_YmFsYW5jZWQtYnJlYW0tMjguY2xlcmsuYWNjb3VudHMuZGV2JA'

// Vérifier immédiatement si le mode hors ligne a déjà été activé précédemment
if (localStorage.getItem('clerk_auth_failed') === 'true') {
  console.info("Mode hors ligne détecté, authentification Clerk ignorée");
}

// Protection contre les erreurs d'initialisation de Clerk
if (typeof window !== 'undefined') {
  // Timeout très court pour détecter rapidement les problèmes d'initialisation Clerk
  setTimeout(() => {
    if (!window.Clerk && !localStorage.getItem('clerk_auth_failed')) {
      console.warn("Clerk n'a pas pu être initialisé dans le délai imparti");
      localStorage.setItem('clerk_auth_failed', 'true');
      toast.error("Problème d'authentification: mode hors ligne activé");
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
      toast.error("Problème d'authentification: mode hors ligne activé");
      // Forcer un rechargement pour appliquer le mode hors ligne
      window.location.reload();
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Vérifier si nous sommes déjà en mode hors ligne pour accélérer le rendu
if (localStorage.getItem('clerk_auth_failed') === 'true') {
  // En mode hors ligne, ne pas initialiser Clerk du tout
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  // Mode normal avec tentative d'authentification Clerk
  root.render(
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
            // Style personnalisé cohérent avec notre thème Dutch
            formButtonPrimary: 'bg-dutch-blue hover:bg-dutch-blue-dark focus:ring-dutch-blue/30',
            footerActionLink: 'text-dutch-blue hover:text-dutch-blue-dark',
          }
        }}
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
}
