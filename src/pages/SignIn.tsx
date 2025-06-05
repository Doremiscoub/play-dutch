import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';
import AnimatedBackground from '../components/AnimatedBackground';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { toast } from 'sonner';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const SignIn: React.FC = () => {
  const { isOfflineMode } = useSupabaseAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  
  // En mode hors ligne, afficher une interface alternative
  if (isOfflineMode) {
    const enableOfflineMode = () => {
      localStorage.setItem('auth_offline_mode', 'true');
      toast.success('Mode hors ligne activé');
      navigate('/');
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBackground />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <UnifiedTopBar 
            title="Connexion"
            showBackButton
            onBack={() => navigate('/')}
            showSettings={false}
            showRules={false}
          />
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-8">
            <h2 className="text-2xl font-medium text-dutch-blue mb-4">Mode hors ligne</h2>
            <p className="text-gray-600 mb-6">
              La connexion au service d'authentification n'est pas disponible actuellement. 
              Vous pouvez continuer à utiliser l'application en mode hors ligne.
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                variant="dutch-primary"
                className="w-full" 
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

  // Interface d'authentification normale
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <UnifiedTopBar 
          title={isSignUp ? "Inscription" : "Connexion"}
          showBackButton
          onBack={() => navigate('/')}
          showSettings={false}
          showRules={false}
        />
        
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-6">
          {isSignUp ? (
            <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
          ) : (
            <SignInForm onSwitchToSignUp={() => setIsSignUp(true)} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
