
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Get the publishable key from environment variables or use provided key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YmFsYW5jZWQtYnJlYW0tMjguY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      elements: {
        formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
        card: 'backdrop-blur-md bg-white/80 shadow-xl border border-gray-100',
        headerTitle: 'text-dutch-blue text-xl',
        footerAction: 'text-dutch-purple hover:text-dutch-blue',
        socialButtonsIconButton: 'border border-gray-300 hover:bg-gray-100',
        // Styles pour Google, TikTok et Apple
        socialButtonsProviderIcon__google: 'w-5 h-5',
        socialButtonsProviderIcon__tiktok: 'w-5 h-5',
        socialButtonsProviderIcon__apple: 'w-5 h-5'
      }
    }}
  >
    <App />
  </ClerkProvider>
);
