import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { SupabaseGameService } from '@/services/supabaseGameService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Trophy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PageShell from '@/components/layout/PageShell';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { ProfessorAvatar } from '@/features/ai-commentator';

interface GameInfo {
  id: string;
  name: string;
  playersCount: number;
  scoreLimit: number;
  status: string;
  createdAt: Date;
}

const JoinGamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { isSignedIn, user } = useSupabaseAuth();
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) {
      setError('ID de partie invalide');
      setLoading(false);
      return;
    }

    loadGameInfo();
  }, [gameId]);

  const loadGameInfo = async () => {
    if (!gameId) return;

    try {
      setLoading(true);
      const game = await SupabaseGameService.loadGame(gameId);
      
      if (!game) {
        setError('Partie introuvable ou expirée');
        return;
      }

      setGameInfo({
        id: game.id,
        name: game.name,
        playersCount: game.players.length,
        scoreLimit: game.scoreLimit,
        status: game.status,
        createdAt: new Date(game.lastUpdated)
      });
    } catch (err) {
      console.error('Failed to load game info:', err);
      setError('Impossible de charger les informations de la partie');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!gameId || !gameInfo) return;

    setJoining(true);
    
    try {
      if (!isSignedIn) {
        // Rediriger vers la connexion avec retour automatique
        navigate(`/sign-in?redirect=/join/${gameId}`);
        return;
      }

      // Charger la partie complète et la synchroniser localement
      const fullGame = await SupabaseGameService.loadGame(gameId);
      if (!fullGame) {
        toast.error('Impossible de rejoindre cette partie');
        return;
      }

      // Rediriger vers la partie avec un paramètre indiquant qu'on l'a rejoint
      navigate(`/game?joined=${gameId}`);
      toast.success(`Vous avez rejoint "${fullGame.name}"!`);
      
    } catch (error) {
      console.error('Failed to join game:', error);
      toast.error('Impossible de rejoindre la partie');
    } finally {
      setJoining(false);
    }
  };

  const handleCreateOwnGame = () => {
    navigate('/setup');
  };

  if (loading) {
    return (
      <PageShell variant="default">
        <UnifiedHeader
          title="Chargement..."
          showBackButton
          onBack={() => navigate('/')}
        />
        <div className="flex items-center justify-center min-h-[50vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Chargement des informations...</p>
          </motion.div>
        </div>
      </PageShell>
    );
  }

  if (error || !gameInfo) {
    return (
      <PageShell variant="default">
        <UnifiedHeader
          title="Erreur"
          showBackButton
          onBack={() => navigate('/')}
        />
        <div className="container mx-auto px-4 py-8 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader className="text-center">
                <ProfessorAvatar size="md" mood="surprised" />
                <CardTitle className="text-red-800 mt-4">
                  Oops! Partie introuvable
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-red-700">
                  {error || 'Cette partie n\'existe plus ou a expiré.'}
                </p>
                <Button 
                  onClick={handleCreateOwnGame}
                  className="w-full"
                >
                  Créer votre propre partie
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell variant="default">
      <UnifiedHeader
        title="Rejoindre une partie"
        showBackButton
        onBack={() => navigate('/')}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md border border-white/20 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ProfessorAvatar 
                  size="lg" 
                  mood="excited" 
                  animate
                />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {gameInfo.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Vous êtes invité à rejoindre cette partie
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Informations de la partie */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{gameInfo.playersCount}</p>
                    <p className="text-xs text-muted-foreground">Joueurs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Trophy className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{gameInfo.scoreLimit}</p>
                    <p className="text-xs text-muted-foreground">Limite</p>
                  </div>
                </div>
              </div>

              {/* Statut de la partie */}
              <div className="flex items-center justify-center gap-2">
                <Badge 
                  variant={gameInfo.status === 'active' ? 'default' : 'secondary'}
                  className="flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  {gameInfo.status === 'active' ? 'Partie en cours' : 'Partie terminée'}
                </Badge>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <AnimatePresence>
                  {gameInfo.status === 'active' ? (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        onClick={handleJoinGame}
                        disabled={joining}
                        className="w-full h-12 text-base font-semibold"
                        size="lg"
                      >
                        {joining ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Connexion...
                          </>
                        ) : isSignedIn ? (
                          'Rejoindre la partie'
                        ) : (
                          'Se connecter pour rejoindre'
                        )}
                      </Button>
                      
                      {!isSignedIn && (
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          Vous devez être connecté pour rejoindre une partie multijoueur
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="completed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-muted-foreground mb-4">
                        Cette partie est terminée, mais vous pouvez en créer une nouvelle !
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  onClick={handleCreateOwnGame}
                  variant="outline"
                  className="w-full"
                >
                  Créer ma propre partie
                </Button>
              </div>

              {/* Info sur le créateur */}
              <div className="pt-4 border-t border-border/50 text-center">
                <p className="text-xs text-muted-foreground">
                  Créée {gameInfo.createdAt.toLocaleDateString()} à {gameInfo.createdAt.toLocaleTimeString()}
                </p>
              </div>
            </CardContent>

            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          </Card>
        </motion.div>
      </div>
    </PageShell>
  );
};

export default JoinGamePage;