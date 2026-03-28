
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { toast } from 'sonner';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import PageShell from '@/components/layout/PageShell';
import { ArrowLeft } from 'lucide-react';

const SignIn: React.FC = () => {
  const { isOfflineMode } = useSupabaseAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  if (isOfflineMode) {
    const enableOfflineMode = () => {
      localStorage.setItem('auth_offline_mode', 'true');
      toast.success('Mode hors ligne activé');
      navigate('/');
    };

    return (
      <PageShell variant="minimal">
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-elevated border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Mode hors ligne</h2>
              <p className="text-sm text-muted-foreground mb-6">
                La connexion n'est pas disponible. Vous pouvez continuer en mode hors ligne.
              </p>
              <div className="flex flex-col gap-3">
                <Button className="w-full" onClick={enableOfflineMode}>
                  Continuer sans compte
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell variant="minimal">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <img
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch"
              className="h-16 mx-auto mb-3"
            />
            <h1 className="text-xl font-bold font-display text-foreground">
              {isSignUp ? 'Créer un compte' : 'Se connecter'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? 'Rejoignez la communauté Dutch' : 'Content de vous revoir !'}
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-elevated border border-border p-6">
            {isSignUp ? (
              <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
            ) : (
              <SignInForm onSwitchToSignUp={() => setIsSignUp(true)} />
            )}
          </div>

          {/* Back link */}
          <div className="text-center mt-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour à l'accueil
            </Button>
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
};

export default SignIn;
