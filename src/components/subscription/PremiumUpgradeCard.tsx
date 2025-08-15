import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PremiumUpgradeCardProps {
  className?: string;
}

const PremiumUpgradeCard: React.FC<PremiumUpgradeCardProps> = ({ className = '' }) => {
  const { isPremium, isLoading, createCheckoutSession } = useSubscription();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      await createCheckoutSession();
      toast({
        title: "Redirection vers le paiement",
        description: "Vous allez être redirigé vers la page de paiement sécurisée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'accéder au système de paiement.",
        variant: "destructive",
      });
    }
  };

  if (isPremium) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-trinity-orange-500 via-trinity-purple-500 to-trinity-blue-500 text-white border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 mr-2" />
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold mb-2">Passez en Premium</h3>
          <p className="text-white/90 text-sm mb-4">
            Profitez de l'expérience sans publicité !
          </p>
          <Button
            onClick={handleUpgrade}
            disabled={isLoading}
            variant="secondary"
            className="w-full bg-white text-trinity-purple-700 hover:bg-white/90"
          >
            {isLoading ? 'Chargement...' : 'Découvrir Premium'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumUpgradeCard;