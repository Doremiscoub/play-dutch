import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Gamepad2, 
  Cloud,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface AuthFlowManagerProps {
  onAuthSuccess?: () => void;
  className?: string;
}

export const AuthFlowManager: React.FC<AuthFlowManagerProps> = ({
  onAuthSuccess,
  className
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isSignedIn, user } = useSupabaseAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Récupérer la redirection depuis les params URL
  const redirectPath = searchParams.get('redirect');
  const gameId = searchParams.get('gameId');

  useEffect(() => {
    if (isSignedIn && user) {
      handleAuthSuccess();
    }
  }, [isSignedIn, user]);

  const handleAuthSuccess = async () => {
    setIsProcessing(true);
    setShowWelcome(true);

    // Attendre un peu pour l'animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Rediriger vers la destination appropriée
    if (redirectPath) {
      navigate(redirectPath, { replace: true });
    } else if (gameId) {
      navigate(`/join/${gameId}`, { replace: true });
    } else {
      navigate('/setup', { replace: true });
    }

    toast.success('Connexion réussie!');
    
    if (onAuthSuccess) {
      onAuthSuccess();
    }

    setIsProcessing(false);
  };

  const getAuthBenefits = () => [
    {
      icon: <Cloud className="w-5 h-5 text-blue-500" />,
      title: 'Synchronisation automatique',
      description: 'Vos parties sont sauvegardées dans le cloud'
    },
    {
      icon: <Users className="w-5 h-5 text-green-500" />,
      title: 'Mode multijoueur',
      description: 'Jouez avec vos amis en temps réel'
    },
    {
      icon: <Gamepad2 className="w-5 h-5 text-purple-500" />,
      title: 'Historique complet',
      description: 'Accédez à toutes vos parties précédentes'
    }
  ];

  if (showWelcome && isSignedIn) {
    return (
      <div className={`min-h-[60vh] flex items-center justify-center ${className}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-green-800">
                Connexion réussie !
              </CardTitle>
              <p className="text-green-700 text-sm">
                Bienvenue, {user?.email?.split('@')[0]}
              </p>
            </CardHeader>

            <CardContent className="text-center space-y-4">
              {isProcessing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-green-700"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Préparation de votre session...</span>
                </motion.div>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  Redirection en cours...
                </Badge>
              )}
            </CardContent>

            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Avantages de la connexion */}
      <Card className="bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Pourquoi se connecter ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getAuthBenefits().map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border border-white/30"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Indication de redirection si nécessaire */}
      {(redirectPath || gameId) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <Gamepad2 className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {gameId 
                    ? 'Vous serez redirigé vers la partie après connexion' 
                    : 'Retour à votre navigation en cours'
                  }
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AuthFlowManager;