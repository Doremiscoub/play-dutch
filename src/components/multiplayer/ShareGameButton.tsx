import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Users, 
  QrCode, 
  Copy, 
  CheckCircle,
  Smartphone
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { GameInvitationQR } from './GameInvitationQR';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { toast } from 'sonner';

interface ShareGameButtonProps {
  gameId: string;
  gameName: string;
  playersCount: number;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const ShareGameButton: React.FC<ShareGameButtonProps> = ({
  gameId,
  gameName,
  playersCount,
  variant = 'default',
  size = 'default',
  className
}) => {
  const { isSignedIn } = useSupabaseAuth();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');

  React.useEffect(() => {
    const baseUrl = window.location.origin;
    setInviteUrl(`${baseUrl}/join/${gameId}`);
  }, [gameId]);

  const handleShare = async () => {
    if (!isSignedIn) {
      toast.error('Connexion requise pour partager une partie');
      return;
    }

    // Vérifier si l'API de partage native est disponible
    if ('navigator' in window && 'share' in navigator) {
      try {
        await navigator.share({
          title: 'Rejoindre une partie Dutch',
          text: `Rejoins ma partie "${gameName}" sur Dutch!`,
          url: inviteUrl
        });
        return;
      } catch (error) {
        // L'utilisateur a annulé ou erreur, passer au dialog
        console.log('Native share cancelled or failed');
      }
    }

    // Fallback : ouvrir le dialog de partage
    setShowShareDialog(true);
  };

  const quickCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast.success('Lien copié!');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Impossible de copier le lien');
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'lg': return 'h-12 px-6 text-base';
      case 'sm': return 'h-8 px-3 text-sm';
      default: return 'h-10 px-4';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-5 h-5';
      default: return 'w-4 h-4';
    }
  };

  if (!isSignedIn) {
    return (
      <Button
        variant="outline"
        size={size}
        disabled
        className={`${getSizeClass()} ${className}`}
        title="Connexion requise"
      >
        <Users className={`${getIconSize()} mr-2`} />
        Multijoueur
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={handleShare}
        variant={variant}
        size={size}
        className={`relative ${getSizeClass()} ${className}`}
      >
        <Share2 className={`${getIconSize()} mr-2`} />
        Inviter
        {playersCount > 1 && (
          <Badge 
            variant="secondary" 
            className="ml-2 bg-white/20 text-white border-white/30"
          >
            {playersCount}
          </Badge>
        )}
      </Button>

      {/* Dialog de partage avancé */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Inviter des joueurs
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Titre de la partie */}
            <div className="text-center">
              <h3 className="font-semibold text-lg">{gameName}</h3>
              <p className="text-sm text-muted-foreground">
                {playersCount} joueur{playersCount > 1 ? 's' : ''} actuellement
              </p>
            </div>

            {/* QR Code complet */}
            <GameInvitationQR
              gameId={gameId}
              gameName={gameName}
              playersCount={playersCount}
              className="border-0 shadow-none bg-transparent"
            />

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={quickCopy}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copier le lien
              </Button>

              <Button
                onClick={() => {
                  setShowShareDialog(false);
                  // Ouvrir l'app native de partage si disponible
                  if ('navigator' in window && 'share' in navigator) {
                    navigator.share({
                      title: 'Rejoindre une partie Dutch',
                      text: `Rejoins ma partie "${gameName}" sur Dutch!`,
                      url: inviteUrl
                    });
                  }
                }}
                className="flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                Partager
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Les joueurs qui rejoignent verront vos scores en temps réel et pourront participer aux prochaines manches.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareGameButton;