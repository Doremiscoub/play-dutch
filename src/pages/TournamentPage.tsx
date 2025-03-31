
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useTournamentStore from '@/store/tournamentStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, ArrowLeft, ArrowRight, Calendar, Star, Award, Users, Home } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import ProfCartouche from '@/components/ProfCartouche';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import TournamentPodium from '@/components/TournamentPodium';
import { TournamentPlayer } from '@/types/tournament';

const TournamentPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentTournament,
    tournamentHistory,
    resetTournament,
    getCurrentGame,
    getRemainingGames,
    getTournamentStandings
  } = useTournamentStore();
  
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Vérifier si nous sommes dans un tournoi actif
  useEffect(() => {
    if (!currentTournament && tournamentHistory.length === 0) {
      navigate('/');
    }
  }, [currentTournament, tournamentHistory, navigate]);
  
  // Effet de confetti pour la fin du tournoi
  useEffect(() => {
    if (currentTournament?.winner && showConfetti) {
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [currentTournament?.winner, showConfetti]);
  
  // Lancer l'animation de confetti après le rendu initial
  useEffect(() => {
    if (currentTournament?.winner && !showConfetti) {
      setTimeout(() => setShowConfetti(true), 1000);
    }
  }, [currentTournament?.winner, showConfetti]);

  const handleStartNewGame = () => {
    navigate('/game');
    toast.success('Nouvelle partie du tournoi lancée');
  };
  
  const handleEndTournament = () => {
    resetTournament();
    navigate('/');
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const getCurrentProgress = () => {
    if (!currentTournament) return 100;
    return ((currentTournament.currentGame - 1) / currentTournament.totalGames) * 100;
  };
  
  // Si aucun tournoi n'est actif et qu'il n'y a pas d'historique, rediriger vers la page d'accueil
  if (!currentTournament && tournamentHistory.length === 0) {
    return null;
  }
  
  const standings = getTournamentStandings();
  const tournament = currentTournament || tournamentHistory[tournamentHistory.length - 1];
  const isFinished = !currentTournament?.isActive;
  
  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="rounded-full hover:bg-gray-100/70"
            >
              <Home className="h-5 w-5" />
            </Button>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-dutch-orange to-dutch-purple bg-clip-text text-transparent">
              Tournoi: {tournament.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/70">
              <Calendar className="h-3 w-3 mr-1" />
              Partie {isFinished ? tournament.totalGames : getCurrentGame() - 1}/{tournament.totalGames}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="container px-4 py-6">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {tournament && (
              <>
                <Card className="bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 px-6 pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                          {isFinished ? 'Résultats du tournoi' : 'Classement provisoire'}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {tournament.totalGames} manches {isFinished ? 'terminées' : `- ${getRemainingGames()} restantes`}
                        </p>
                      </div>
                      
                      {!isFinished && (
                        <div className="flex items-center">
                          <div className="flex-grow mr-4">
                            <div className="text-xs text-gray-500 mb-1 flex justify-between">
                              <span>Progression</span>
                              <span>{Math.round(getCurrentProgress())}%</span>
                            </div>
                            <Progress value={getCurrentProgress()} className="h-2" />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-8">
                      <ProfCartouche 
                        players={standings.map(p => p.currentPlayer || {
                          id: p.id,
                          name: p.name,
                          totalScore: p.totalScore,
                          rounds: [],
                          stats: {
                            bestRound: p.bestGameScore || 0,
                            avgRound: p.avgScorePerGame,
                            dutchCount: p.dutchCount,
                            wins: p.wins
                          }
                        })} 
                        roundNumber={isFinished ? tournament.totalGames : getCurrentGame() - 1}
                        view="podium"
                      />

                      {/* Podium du tournoi */}
                      <TournamentPodium players={standings} isFinished={isFinished} />
                      
                      {/* Classement détaillé */}
                      <div className="mt-8 overflow-x-auto">
                        <table className="w-full bg-white/70 rounded-xl overflow-hidden">
                          <thead className="bg-dutch-blue/10 text-dutch-blue">
                            <tr>
                              <th className="px-4 py-3 text-left">Rang</th>
                              <th className="px-4 py-3 text-left">Joueur</th>
                              <th className="px-4 py-3 text-center">Score</th>
                              <th className="px-4 py-3 text-center">Parties</th>
                              <th className="px-4 py-3 text-center">Victoires</th>
                              <th className="px-4 py-3 text-center">Dutch</th>
                              <th className="px-4 py-3 text-center">Moy/partie</th>
                            </tr>
                          </thead>
                          <tbody>
                            {standings.map((player, index) => (
                              <tr 
                                key={player.id} 
                                className={`border-b border-gray-100 ${index === 0 ? 'bg-yellow-50/50' : ''}`}
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    {index === 0 ? (
                                      <Trophy className="h-5 w-5 text-dutch-yellow" />
                                    ) : index === 1 ? (
                                      <Medal className="h-5 w-5 text-dutch-purple" />
                                    ) : index === 2 ? (
                                      <Medal className="h-5 w-5 text-dutch-orange" />
                                    ) : (
                                      <span className="font-medium text-gray-500">{index + 1}</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-3 font-medium">
                                  {player.name}
                                  {tournament.winner === player.name && (
                                    <Badge variant="default" className="ml-2 bg-dutch-yellow text-white">
                                      Vainqueur
                                    </Badge>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center font-bold">{player.totalScore}</td>
                                <td className="px-4 py-3 text-center">{player.gamesPlayed}</td>
                                <td className="px-4 py-3 text-center">{player.wins}</td>
                                <td className="px-4 py-3 text-center">{player.dutchCount}</td>
                                <td className="px-4 py-3 text-center">
                                  {player.avgScorePerGame.toFixed(1)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {!isFinished ? (
                  <div className="fixed bottom-8 left-0 right-0 px-4 z-40">
                    <div className="max-w-md mx-auto">
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex gap-3"
                      >
                        <Button 
                          variant="outline" 
                          className="flex-1 bg-white/80 backdrop-blur-sm border border-white/40 shadow-md"
                          onClick={handleEndTournament}
                        >
                          Abandonner le tournoi
                        </Button>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md"
                          onClick={handleStartNewGame}
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          Jouer la partie suivante
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="fixed bottom-8 left-0 right-0 px-4 z-40">
                    <div className="max-w-md mx-auto">
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                      >
                        <Button 
                          className="w-full bg-gradient-to-r from-dutch-green to-dutch-blue text-white shadow-md"
                          onClick={handleGoHome}
                        >
                          <Home className="h-4 w-4 mr-2" />
                          Retour à l'accueil
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TournamentPage;
