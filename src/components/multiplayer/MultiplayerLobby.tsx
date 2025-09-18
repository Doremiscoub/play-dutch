/**
 * Composant pour créer et rejoindre des parties multijoueur
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Wifi, 
  WifiOff, 
  Copy, 
  QrCode,
  Crown,
  Clock,
  Trophy,
  UserPlus,
  GamepadIcon,
  Loader2
} from 'lucide-react';
import { useRealtimeMultiplayer } from '@/hooks/useRealtimeMultiplayer';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { GameInvitationQR } from './GameInvitationQR';
import { toast } from 'sonner';

interface MultiplayerLobbyProps {
  onGameStart?: (gameState: any) => void;
  className?: string;
}

export const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ 
  onGameStart, 
  className = '' 
}) => {
  const { isSignedIn, user } = useSupabaseAuth();
  const {
    isConnected,
    isConnecting,
    gameState,
    roomCode,
    connectedPlayers,
    isHost,
    canManageGame,
    connectWebSocket,
    createGame,
    joinGame,
    disconnect
  } = useRealtimeMultiplayer();

  const [joinRoomCode, setJoinRoomCode] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [playerNames, setPlayerNames] = useState<string[]>(['']);

  // Ajouter/supprimer des champs de noms de joueurs
  const addPlayerField = () => {
    if (playerNames.length < 10) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const removePlayerField = (index: number) => {
    if (playerNames.length > 1) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleCreateGame = async () => {
    const validNames = playerNames.filter(name => name.trim().length > 0);
    
    if (validNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour créer une partie');
      return;
    }

    // Créer les objets Player
    const players = validNames.map((name, index) => ({
      id: index === 0 && user ? user.id : `player_${index}`,
      name: name.trim(),
      emoji: ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'][index % 10],
      totalScore: 0,
      rounds: [],
      avatarColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }));

    await createGame(players, 100);
  };

  const handleJoinGame = async () => {
    if (joinRoomCode.trim().length === 0) {
      toast.error('Veuillez entrer un code de partie');
      return;
    }

    await joinGame(joinRoomCode.trim().toUpperCase());
  };

  const copyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      toast.success('Code copié dans le presse-papier !');
    }
  };

  const shareGameLink = () => {
    if (roomCode) {
      const gameUrl = `${window.location.origin}/?join=${roomCode}`;
      navigator.clipboard.writeText(gameUrl);
      toast.success('Lien de la partie copié !');
    }
  };

  // Vérifier s'il y a un code de partie dans l'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode && isConnected) {
      setJoinRoomCode(joinCode);
      joinGame(joinCode);
    }
  }, [isConnected, joinGame]);

  // Démarrer le jeu quand l'état change
  useEffect(() => {
    if (gameState && onGameStart) {
      onGameStart(gameState);
    }
  }, [gameState, onGameStart]);

  if (!isSignedIn) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Mode Multijoueur
          </CardTitle>
          <CardDescription>
            Connectez-vous pour jouer avec vos amis en temps réel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <GamepadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">
              Le mode multijoueur nécessite une connexion
            </p>
            <Button 
              onClick={() => window.location.href = '/sign-in'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Se connecter
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* État de connexion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
            Multijoueur Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant={isConnected ? "default" : "destructive"}>
                {isConnecting ? 'Connexion...' : isConnected ? 'Connecté' : 'Déconnecté'}
              </Badge>
              <p className="text-sm text-gray-600 mt-1">
                {isConnected 
                  ? 'Prêt pour le multijoueur' 
                  : 'Connexion au serveur multijoueur requise'
                }
              </p>
            </div>
            
            {!isConnected && !isConnecting && (
              <Button onClick={connectWebSocket} size="sm">
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Wifi className="w-4 h-4 mr-2" />
                )}
                Connecter
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interface de jeu actif */}
      {gameState && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Partie en Cours
            </CardTitle>
            <CardDescription>
              Code: {roomCode} • {connectedPlayers.length} joueur(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button onClick={copyRoomCode} size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copier le code
                </Button>
                <Button onClick={shareGameLink} size="sm" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Partager le lien
                </Button>
                <Button 
                  onClick={() => setShowQRCode(!showQRCode)} 
                  size="sm" 
                  variant="outline"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
              </div>

              {showQRCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <GameInvitationQR roomCode={roomCode} />
                </motion.div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Joueurs connectés:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {connectedPlayers.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="text-lg">{player.emoji}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{player.name}</p>
                        <p className="text-xs text-gray-500">
                          {player.totalScore} points
                        </p>
                      </div>
                      {isHost && player.id === user?.id && (
                        <Crown className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Trophy className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Limite: {gameState.scoreLimit} points
                </span>
                <Clock className="w-4 h-4 text-gray-600 ml-4" />
                <span className="text-sm text-gray-600">
                  Manche {gameState.currentRound + 1}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onGameStart?.(gameState)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <GamepadIcon className="w-4 h-4 mr-2" />
                  Rejoindre la partie
                </Button>
                
                <Button onClick={disconnect} variant="outline">
                  Quitter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interface de création/rejoindre partie */}
      {!gameState && isConnected && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Créer une partie */}
          <Card>
            <CardHeader>
              <CardTitle>Créer une Partie</CardTitle>
              <CardDescription>
                Invitez vos amis à rejoindre votre partie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Joueurs (2-10)</Label>
                  {playerNames.map((name, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        placeholder={`Joueur ${index + 1}`}
                        value={name}
                        onChange={(e) => updatePlayerName(index, e.target.value)}
                        className="flex-1"
                      />
                      {index > 0 && (
                        <Button
                          onClick={() => removePlayerField(index)}
                          size="sm"
                          variant="outline"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {playerNames.length < 10 && (
                    <Button
                      onClick={addPlayerField}
                      size="sm"
                      variant="outline"
                      className="mt-2"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Ajouter un joueur
                    </Button>
                  )}
                </div>

                <Button 
                  onClick={handleCreateGame}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={playerNames.filter(n => n.trim()).length < 2}
                >
                  Créer la Partie
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rejoindre une partie */}
          <Card>
            <CardHeader>
              <CardTitle>Rejoindre une Partie</CardTitle>
              <CardDescription>
                Entrez le code de la partie de votre ami
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roomCode">Code de la partie</Label>
                  <Input
                    id="roomCode"
                    placeholder="Ex: ABC123"
                    value={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value.toUpperCase())}
                    className="text-center text-lg font-mono"
                    maxLength={6}
                  />
                </div>

                <Button 
                  onClick={handleJoinGame}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={joinRoomCode.trim().length === 0}
                >
                  Rejoindre
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};