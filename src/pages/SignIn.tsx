
import React from 'react';
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const SignIn: React.FC = () => {
  const { isOfflineMode } = useAuth();
  const navigate = useNavigate();

  // En mode hors ligne, afficher une interface alternative
  if (isOfflineMode) {
    const enableOfflineMode = () => {
      localStorage.setItem('clerk_auth_failed', 'true');
      toast.success('Mode hors ligne activé');
      navigate('/');
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBackground variant="default" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <Link to="/" className="inline-block mb-8">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-8">
            <h2 className="text-2xl font-bold text-dutch-blue mb-4">Mode hors ligne</h2>
            <p className="text-gray-600 mb-6">
              La connexion au service d'authentification n'est pas disponible actuellement. 
              Vous pouvez continuer à utiliser l'application en mode hors ligne.
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                className="w-full bg-dutch-blue text-white" 
                onClick={enableOfflineMode}
              >
                Continuer sans compte
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/')}
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // En mode normal, utiliser le composant Clerk
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground variant="default" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Link to="/" className="inline-block mb-8">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
        
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-6">
          <ClerkSignIn 
            appearance={{
              variables: {
                colorPrimary: "#0A84FF",
                colorTextOnPrimaryBackground: "white",
                colorTextSecondary: "#4B5563",
                colorBackground: "transparent",
                fontFamily: "SF Pro Text, SF Pro Display, system-ui, sans-serif",
                borderRadius: "1rem"
              },
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-0 p-4",
                headerTitle: "text-2xl font-bold text-dutch-blue",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "bg-white hover:bg-gray-50 border border-gray-200",
                dividerLine: "bg-gray-200",
                formFieldLabel: "text-gray-700",
                formFieldInput: "bg-white border-gray-300 focus:border-dutch-blue focus:ring-dutch-blue/20",
                footerActionLink: "text-dutch-blue hover:text-dutch-blue-dark",
                formButtonPrimary: "bg-dutch-blue hover:bg-dutch-blue-dark focus:ring-dutch-blue/30",
              }
            }}
            redirectUrl="/game"
            routing="path"
            path="/sign-in"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
