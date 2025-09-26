import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Users, Share2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DESIGN_TOKENS } from '@/design';

interface GameInvitationQRProps {
  gameId: string;
  gameName: string;
  playersCount: number;
  onJoinGame?: (gameId: string) => void;
  className?: string;
}

export const GameInvitationQR: React.FC<GameInvitationQRProps> = ({
  gameId,
  gameName,
  playersCount,
  onJoinGame,
  className
}) => {
  const [inviteUrl, setInviteUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    // Construire l'URL d'invitation
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/join/${gameId}`;
    setInviteUrl(url);

    // Vérifier si l'API de partage natif est supportée
    setShareSupported('navigator' in window && 'share' in navigator);
  }, [gameId]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      toast.success('Lien d\'invitation copié!');
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Impossible de copier le lien');
    }
  };

  const shareInvite = async () => {
    if (!shareSupported) {
      copyInviteLink();
      return;
    }

    try {
      await navigator.share({
        title: 'Rejoindre une partie Dutch',
        text: `Rejoins ma partie "${gameName}" sur Dutch!`,
        url: inviteUrl
      });
    } catch (error) {
      console.error('Share failed:', error);
      copyInviteLink();
    }
  };

  const handleJoinClick = () => {
    if (onJoinGame) {
      onJoinGame(gameId);
    }
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md border border-white/20 shadow-xl ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-5 h-5 text-primary" />
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {playersCount} joueur{playersCount > 1 ? 's' : ''}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          {gameName}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Scanne le QR code pour rejoindre la partie
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* QR Code */}
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 bg-white rounded-2xl shadow-inner">
            <QRCodeSVG
              value={inviteUrl}
              size={180}
              level="M"
              includeMargin
              fgColor={DESIGN_TOKENS.primitive.neutral[900]}
              bgColor={DESIGN_TOKENS.primitive.neutral[50]}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={copyInviteLink}
            variant="outline"
            className="flex items-center gap-2 h-12"
            disabled={copied}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 text-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs">Copié!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copier</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <Button
            onClick={shareInvite}
            variant="default"
            className="flex items-center gap-2 h-12"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs">
              {shareSupported ? 'Partager' : 'Copier'}
            </span>
          </Button>
        </div>

        {/* Lien URL pour référence */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Lien d'invitation:</p>
          <code className="text-xs break-all text-primary font-mono">
            {inviteUrl}
          </code>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Partagez ce QR code ou le lien pour inviter d'autres joueurs à rejoindre votre partie en temps réel.
          </p>
        </div>
      </CardContent>

      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
    </Card>
  );
};

export default GameInvitationQR;