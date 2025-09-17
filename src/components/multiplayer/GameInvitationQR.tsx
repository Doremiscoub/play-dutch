/**
 * Composant pour générer et afficher un QR code d'invitation multijoueur
 * Permet de partager une partie en cours avec d'autres joueurs
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  QrCode, 
  Share2, 
  Copy, 
  Users, 
  Timer,
  Smartphone,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useUnifiedGameState } from '@/hooks/game/useUnifiedGameState';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { toast } from 'sonner';

interface GameInvitationQRProps {
  className?: string;
}

// Simulation QR Code (en attendant une vraie librairie QR)
const QRCodeDisplay: React.FC<{ value: string; size?: number }> = ({ value, size = 200 }) => {
  return (
    <div 
      className="border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white mx-auto" 
      style={{ width: size, height: size }}
    >
      <div className="text-center p-4">
        <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-600" />
        <p className="text-xs text-gray-500 break-all font-mono">
          {value.substring(0, 20)}...
        </p>
      </div>
    </div>
  );
};

export const GameInvitationQR: React.FC<GameInvitationQRProps> = ({ className = '' }) => {
  const { isSignedIn, user } = useSupabaseAuth();
  const { hasGame, currentGameId, players, syncStatus } = useUnifiedGameState();
  
  const [inviteUrl, setInviteUrl] = useState<string>('');
  const [shareCode, setShareCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Génération du lien d'invitation
  useEffect(() => {
    if (hasGame && currentGameId && isSignedIn) {
      const baseUrl = window.location.origin;
      const gameUrl = `${baseUrl}/join/${currentGameId}`;
      setInviteUrl(gameUrl);
      
      // Code court pour partage manuel
      setShareCode(currentGameId.substring(0, 8).toUpperCase());
    } else {
      setInviteUrl('');
      setShareCode('');
    }
  }, [hasGame, currentGameId, isSignedIn]);

  const handleCopyUrl = async () => {
    if (!inviteUrl) return;
    
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast.success('Lien copié!');
    } catch (error) {
      // Fallback pour navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = inviteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Lien copié!');
    }
  };

  const handleCopyCode = async () => {
    if (!shareCode) return;
    
    try {
      await navigator.clipboard.writeText(shareCode);
      toast.success('Code copié!');
    } catch (error) {
      toast.error('Erreur lors de la copie');
    }
  };

  const handleShare = async () => {
    if (!inviteUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoindre ma partie Dutch',
          text: `Rejoins ma partie de Dutch avec ${players.length} joueurs!`,
          url: inviteUrl,
        });
        toast.success('Invitation partagée!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Erreur lors du partage');
        }
      }
    } else {
      // Fallback: copier le lien
      await handleCopyUrl();
    }
  };

  const canCreateInvite = hasGame && isSignedIn && syncStatus === 'synced';

  if (!hasGame) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Multijoueur
          </CardTitle>
          <CardDescription>
            Créez une partie pour inviter d'autres joueurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">
              Aucune partie en cours
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/setup'}>
              Créer une partie
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isSignedIn) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Multijoueur
          </CardTitle>
          <CardDescription>
            Connectez-vous pour partager votre partie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">
              La connexion est requise pour le mode multijoueur
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/sign-in'}>
              Se connecter
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Inviter des joueurs
        </CardTitle>
        <CardDescription>
          Partagez votre partie avec vos amis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* État de synchronisation */}
        <div className="flex items-center gap-2">
          <Badge variant={syncStatus === 'synced' ? 'default' : 'secondary'}>
            {syncStatus === 'synced' ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Synchronisé
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 mr-1" />
                {syncStatus === 'syncing' ? 'Synchronisation...' : 'Non synchronisé'}
              </>
            )}
          </Badge>
          {syncStatus === 'syncing' && (
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
          )}
        </div>

        {canCreateInvite ? (
          <>
            {/* QR Code */}
            <div className="text-center">
              <QRCodeDisplay value={inviteUrl} size={180} />
              <p className="text-sm text-gray-600 mt-2">
                Scannez pour rejoindre la partie
              </p>
            </div>

            <Separator />

            {/* Lien de partage */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Lien d'invitation</label>
              <div className="flex gap-2">
                <Input
                  value={inviteUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button size="sm" variant="outline" onClick={handleCopyUrl}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Code court */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Code de partie</label>
              <div className="flex gap-2">
                <Input
                  value={shareCode}
                  readOnly
                  className="font-mono text-lg font-bold text-center"
                />
                <Button size="sm" variant="outline" onClick={handleCopyCode}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Les autres joueurs peuvent saisir ce code pour rejoindre
              </p>
            </div>

            <Separator />

            {/* Actions de partage */}
            <div className="flex gap-2">
              <Button onClick={handleShare} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" onClick={handleCopyUrl}>
                <Copy className="w-4 h-4 mr-2" />
                Copier le lien
              </Button>
            </div>

            {/* Informations sur la partie */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Informations de la partie</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Joueurs:</span>
                  <span>{players.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode:</span>
                  <span>Temps réel</span>
                </div>
                <div className="flex justify-between">
                  <span>Statut:</span>
                  <Badge variant="outline" className="text-xs">
                    En attente de joueurs
                  </Badge>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <Timer className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600 mb-2">
              {syncStatus === 'syncing' 
                ? 'Synchronisation en cours...' 
                : 'Partie non synchronisée'
              }
            </p>
            <p className="text-sm text-gray-500">
              La synchronisation est requise pour inviter des joueurs
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};