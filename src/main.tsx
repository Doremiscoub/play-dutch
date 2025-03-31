
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Remplacez cette valeur par votre véritable clé publishable de Clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_dummy-key-for-development";

// Vérification de la clé (en développement uniquement)
if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      elements: {
        formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
        card: 'backdrop-blur-md bg-white/80 shadow-xl border border-gray-100',
        headerTitle: 'text-dutch-blue text-xl',
        footerAction: 'text-dutch-purple hover:text-dutch-blue',
      }
    }}
  >
    <App />
  </ClerkProvider>
);
