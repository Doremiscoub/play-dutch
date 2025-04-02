
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/theme.css'
import { ThemeProvider } from './hooks/use-theme'
import { ClerkProvider } from '@clerk/clerk-react'
import { toast } from 'sonner'

// Utilisation d'une clé Clerk de développement pour tester - à remplacer en production
const CLERK_PUBLISHABLE_KEY = 'pk_test_YmFsYW5jZWQtYnJlYW0tMjguY2xlcmsuYWNjb3VudHMuZGV2JA'

// Protection contre les erreurs d'initialisation de Clerk
const handleClerkError = (err: any) => {
  console.error("Erreur d'initialisation de Clerk:", err);
  toast.error("Problème d'authentification. Mode hors ligne activé.");
  // L'application continuera de fonctionner même sans authentification
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
      afterSignOutUrl="/"
      appearance={{
        elements: {
          // Style personnalisé cohérent avec notre thème Dutch
          formButtonPrimary: 'bg-dutch-blue hover:bg-dutch-blue-dark focus:ring-dutch-blue/30',
          footerActionLink: 'text-dutch-blue hover:text-dutch-blue-dark',
        }
      }}
      onError={handleClerkError}
    >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
