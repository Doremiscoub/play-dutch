/**
 * Composant pour générer et afficher un QR code d'invitation multijoueur
 * Permet de partager une partie en cours avec d'autres joueurs
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  QrCode, 
  Share2, 
  Copy, 
  Users, 
  Smartphone,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface GameInvitationQRProps {
  roomCode: string;
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

export const GameInvitationQR: React.FC<GameInvitationQRProps> = ({ 
  roomCode,
  className = '' 
}) => {
  const [gameUrl, setGameUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/?join=${roomCode}`;
    setGameUrl(fullUrl);
    setShortUrl(`dutch.app/join/${roomCode}`); // URL courte simulée
  }, [roomCode]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${type} copié!`);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Erreur lors de la copie');
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoins ma partie Dutch!',
          text: `Code de partie: ${roomCode}`,
          url: gameUrl
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback - copier le lien
      copyToClipboard(gameUrl, 'Lien');
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Inviter des Joueurs
        </CardTitle>
        <CardDescription>
          Partagez ce code ou ce QR code pour inviter vos amis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Code de la partie */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Code de la partie</div>
          <div className="text-3xl font-mono font-bold bg-gray-100 rounded-lg py-4 px-6 inline-block">
            {roomCode}
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <QRCodeDisplay value={gameUrl} size={180} />
          <p className="text-xs text-gray-500 mt-2">
            Scannez avec votre téléphone
          </p>
        </div>

        {/* Lien de partage */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Lien de partage</label>
          <div className="flex gap-2">
            <Input 
              value={gameUrl}
              readOnly
              className="font-mono text-xs"
            />
            <Button 
              onClick={() => copyToClipboard(gameUrl, 'Lien')}
              size="sm"
              variant="outline"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => copyToClipboard(roomCode, 'Code')}
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copier le code
          </Button>
          
          <Button 
            onClick={shareNative}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Comment rejoindre
          </h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Scannez le QR code avec votre téléphone</p>
            <p>• Ou cliquez sur le lien partagé</p>
            <p>• Ou entrez le code {roomCode} dans l'app</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};