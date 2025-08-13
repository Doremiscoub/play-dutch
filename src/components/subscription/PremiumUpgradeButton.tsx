import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';

interface PremiumUpgradeButtonProps {
  variant?: 'default' | 'compact' | 'banner';
  className?: string;
}

const PremiumUpgradeButton: React.FC<PremiumUpgradeButtonProps> = ({ 
  variant = 'default',
  className = '' 
}) => {
  const { isPremium, createCheckoutSession } = useSubscription();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      await createCheckoutSession();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de démarrer l'abonnement",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isPremium) {
    return (
      <Badge variant="secondary" className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300">
        <Crown className="w-3 h-3 mr-1" />
        Premium
      </Badge>
    );
  }

  if (variant === 'compact') {
    return (
      <Button
        onClick={handleUpgrade}
        disabled={isLoading}
        size="sm"
        className={`bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 ${className}`}
      >
        <Crown className="w-3 h-3 mr-1" />
        Premium
      </Button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                Passez en Premium
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Supprimez les publicités • 3,99€/mois
              </p>
            </div>
          </div>
          <Button
            onClick={handleUpgrade}
            disabled={isLoading}
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
          >
            {isLoading ? 'Chargement...' : 'Upgrade'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={isLoading}
      className={`bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 ${className}`}
    >
      <Crown className="w-4 h-4 mr-2" />
      {isLoading ? 'Chargement...' : 'Passer en Premium • 3,99€/mois'}
    </Button>
  );
};

export default PremiumUpgradeButton;