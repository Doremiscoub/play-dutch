/**
 * Page dédiée au mode multijoueur temps réel
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Wifi, 
  WifiOff, 
  GamepadIcon,
  ArrowLeft,
  Crown,
  Trophy
} from 'lucide-react';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { useRealtimeMultiplayer } from '@/hooks/useRealtimeMultiplayer';
import { MultiplayerLobby } from '@/components/multiplayer/MultiplayerLobby';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import ScoreBoard from '@/features/scoreboard/ScoreBoard';
import NewRoundModal from '@/components/NewRoundModal';
import { AICommentator } from '@/features/ai-commentator';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import GameLayout from '@/components/layout/GameLayout';
import { toast } from 'sonner';

const MultiplayerPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useSupabaseAuth();
  const { 
    isConnected,
    gameState,
    roomCode,
    connectedPlayers,
    isHost,
    addRound,
    undoRound,
    disconnect
  } = useRealtimeMultiplayer();

  const [gameMode, setGameMode] = useState<'lobby' | 'game'>('lobby');
  const [isScoreFormOpen, setIsScoreFormOpen] = useState(false);
  const [scores, setScores] = useState<{ [playerId: string]: number }>({});
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>();

  // Redirection si pas connecté
  useEffect(() => {
    if (!isSignedIn) {
      toast.error('Connexion requise pour le mode multijoueur');
      navigate('/sign-in');
    }
  }, [isSignedIn, navigate]);

  // Basculer en mode jeu quand une partie démarre
  const handleGameStart = (newGameState: any) => {
    console.log('🎮 Starting multiplayer game:', newGameState);
    setGameMode('game');
    
    // Initialiser les scores
    if (newGameState?.players) {
      const initialScores: { [playerId: string]: number } = {};
      newGameState.players.forEach((player: any) => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
    }
  };

  // Revenir au lobby
  const handleBackToLobby = () => {
    setGameMode('lobby');
    disconnect();
  };

  // Gestion des manches
  const handleAddRound = async () => {
    if (!gameState) return;
    
    const scoresArray = gameState.players.map(player => scores[player.id] || 0);
    const success = await addRound(scoresArray, dutchPlayerId);
    
    if (success) {
      setIsScoreFormOpen(false);
      
      // Réinitialiser les scores
      const initialScores: { [playerId: string]: number } = {};
      gameState.players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      setDutchPlayerId(undefined);
    }
  };

  const handleUndoLastRound = async () => {
    await undoRound();
  };

  const openScoreForm = () => {
    setIsScoreFormOpen(true);
  };

  if (!isSignedIn) {
    return null; // Redirection handled in useEffect
  }

  return (
    <PageShell variant="game">
      <MobileOptimizer pageType="game" className="min-h-screen">
        <UnifiedHeader 
          {...useUnifiedHeader({
            title: gameMode === 'lobby' ? 'Multijoueur' : `Partie ${roomCode}`,
            variant: gameMode === 'lobby' ? 'default' : 'game',
            showBackButton: true,
            onBack: gameMode === 'lobby' ? () => navigate('/') : handleBackToLobby,
            roundCount: gameState?.currentRound ? gameState.currentRound + 1 : undefined,
            scoreLimit: gameState?.scoreLimit,
            gameStartTime: gameState ? new Date() : undefined
          })}
        />

        <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
          {gameMode === 'lobby' ? (
            // Mode lobby - création et connexion aux parties
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MultiplayerLobby onGameStart={handleGameStart} />
            </motion.div>
          ) : (
            // Mode jeu - interface de partie multijoueur
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Informations de la partie */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isHost ? (
                      <Crown className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                    Partie Multijoueur
                    <Badge variant="outline" className="ml-auto">
                      {isConnected ? 'Connecté' : 'Déconnecté'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Code: {roomCode} • {connectedPlayers.length} joueur(s) connecté(s)
                    {isHost && ' • Vous êtes l\'hôte'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-gray-600" />
                      Limite: {gameState?.scoreLimit || 100} points
                    </div>
                    <div className="flex items-center gap-1">
                      <GamepadIcon className="w-4 h-4 text-gray-600" />
                      Manche {(gameState?.currentRound || 0) + 1}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Commentaires du Professeur Cartouche */}
              {gameState && (
                <div className="mb-6">
                  <AICommentator 
                    players={gameState.players}
                    roundCount={(gameState.roundHistory || []).length}
                    scoreLimit={gameState.scoreLimit || 100}
                    className="w-full max-w-6xl mx-auto"
                  />
                </div>
              )}

              {/* Tableau de scores */}
              {gameState && (
                <GameLayout>
                  <ScoreBoard
                    players={gameState.players}
                    onAddRound={() => {}} // Pas utilisé
                    onUndoLastRound={handleUndoLastRound}
                    onEndGame={handleBackToLobby}
                    roundHistory={gameState.roundHistory || []}
                    showGameEndConfirmation={false}
                    onConfirmEndGame={handleBackToLobby}
                    onCancelEndGame={() => {}}
                    scoreLimit={gameState.scoreLimit}
                    openScoreForm={openScoreForm}
                  />
                </GameLayout>
              )}

              {/* Modal pour ajouter une nouvelle manche */}
              {gameState && (
                <NewRoundModal
                  open={isScoreFormOpen}
                  onClose={() => setIsScoreFormOpen(false)}
                  players={gameState.players}
                  scores={scores}
                  setScores={setScores}
                  dutchPlayerId={dutchPlayerId}
                  setDutchPlayerId={setDutchPlayerId}
                  onAddRound={handleAddRound}
                />
              )}
            </motion.div>
          )}
        </div>
      </MobileOptimizer>
    </PageShell>
  );
};

export default MultiplayerPage;