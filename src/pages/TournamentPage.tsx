
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useTournamentStore from '@/store/tournamentStore';
import { Player, PlayerStatistics } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import ScoreBoard from '@/components/ScoreBoard';
import TournamentPodium from '@/components/TournamentPodium';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, BarChart2, Award } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedBackground from '@/components/AnimatedBackground';

const TournamentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    activeTournament, 
    updateTournament, 
    createTournamentGame,
    updateTournamentGame,
    finishTournament
  } = useTournamentStore();
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentGame, setCurrentGame] = useState(1);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [tournamentFinished, setTournamentFinished] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  useEffect(() => {
    // Initialize tournament from navigation state if available
    const state = location.state as { 
      tournamentName?: string;
      players?: string[];
      rounds?: number;
    } | null;
    
    if (state?.players && state.tournamentName && state.rounds) {
      // Convert string names to Player objects
      const playerObjects: Player[] = state.players.map(name => ({
        id: uuidv4(),
        name,
        totalScore: 0,
        rounds: [],
        stats: {
          bestRound: null,
          dutchCount: 0,
          averageScore: 0,
          worstRound: null,
          improvementRate: 0,
          consistencyScore: 0,
          winStreak: 0,
          roundsWon: 0,
          wins: 0,
          dutchSuccessRate: 0,
          playStyle: ''
        }
      }));
      
      setPlayers(playerObjects);
    } else if (activeTournament) {
      // If we have an active tournament but no state, initialize from the store
      const tournamentPlayers: Player[] = activeTournament.players.map(tp => ({
        id: tp.id,
        name: tp.name,
        totalScore: tp.totalScore,
        rounds: [],
        stats: {
          bestRound: null,
          dutchCount: tp.dutchCount,
          averageScore: tp.avgScorePerGame || 0,
          worstRound: null,
          improvementRate: 0,
          consistencyScore: 0,
          winStreak: 0,
          roundsWon: 0,
          wins: tp.wins,
          dutchSuccessRate: 0,
          playStyle: ''
        }
      }));
      
      setPlayers(tournamentPlayers);
      setCurrentGame(activeTournament.currentGame);
    } else {
      // No tournament info, go back to home
      navigate('/');
    }
  }, [location, activeTournament, navigate]);
  
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    // Update player scores for the current round
    const updatedPlayers = players.map((player, index) => {
      const isDutch = player.id === dutchPlayerId;
      return {
        ...player,
        rounds: [
          ...player.rounds,
          { score: scores[index], isDutch }
        ],
        totalScore: player.totalScore + scores[index],
        stats: {
          ...player.stats,
          dutchCount: player.stats?.dutchCount || 0 + (isDutch ? 1 : 0),
        }
      };
    });
    
    setPlayers(updatedPlayers);
  };

  const handleEndGame = () => {
    if (!activeTournament) return;
    
    // Find the winner of this game
    let highestScore = -999;
    let winnerName = '';
    let winnerId = '';
    
    players.forEach(player => {
      if (player.totalScore > highestScore) {
        highestScore = player.totalScore;
        winnerName = player.name;
        winnerId = player.id;
      }
    });
    
    // Create or update the game in the tournament store
    const gameData = {
      players: players.map(p => ({
        id: p.id,
        name: p.name,
        score: p.totalScore,
        isDutch: p.rounds.some(r => r.isDutch)
      })),
      winner: winnerName,
      winnerId
    };
    
    // If this game exists, update it, otherwise create it
    updateTournamentGame(activeTournament.id, currentGame, gameData);
    
    // Check if tournament is finished
    if (currentGame >= activeTournament.totalGames) {
      setTournamentFinished(true);
      
      // Find overall tournament winner
      const tournamentPlayers = activeTournament.players.map(tp => {
        // Find this player in the current game
        const currentPlayer = players.find(p => p.id === tp.id);
        
        return {
          ...tp,
          totalScore: tp.totalScore + (currentPlayer?.totalScore || 0),
          wins: tp.wins + (winnerId === tp.id ? 1 : 0),
          dutchCount: tp.dutchCount + (currentPlayer?.stats?.dutchCount || 0)
        };
      });
      
      // Find tournament winner
      let highestTotalScore = -999;
      let tournamentWinner = '';
      
      tournamentPlayers.forEach(player => {
        if (player.totalScore > highestTotalScore) {
          highestTotalScore = player.totalScore;
          tournamentWinner = player.name;
        }
      });
      
      // Update tournament
      finishTournament(activeTournament.id, {
        players: tournamentPlayers,
        winner: tournamentWinner
      });
      
      // Show toast
      toast.success(`${tournamentWinner} remporte le tournoi !`, {
        description: `Score final: ${highestTotalScore} points`
      });
    } else {
      // Move to next game
      setIsGameFinished(true);
      
      // Update tournament state
      updateTournament(activeTournament.id, {
        currentGame: currentGame + 1,
        players: activeTournament.players.map(tp => {
          // Find this player in the current game
          const currentPlayer = players.find(p => p.id === tp.id);
          
          return {
            ...tp,
            totalScore: tp.totalScore + (currentPlayer?.totalScore || 0),
            wins: tp.wins + (winnerId === tp.id ? 1 : 0),
            dutchCount: tp.dutchCount + (currentPlayer?.stats?.dutchCount || 0),
            // Update other stats as needed
          };
        })
      });
    }
  };
  
  const startNextGame = () => {
    // Reset players for the next game
    const resetPlayers = players.map(player => ({
      ...player,
      totalScore: 0,
      rounds: []
    }));
    
    setPlayers(resetPlayers);
    setCurrentGame(prev => prev + 1);
    setIsGameFinished(false);
  };
  
  const goToHome = () => {
    navigate('/');
  };
  
  if (tournamentFinished) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground variant="subtle" />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline"
              onClick={goToHome}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </Button>
            
            <Button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2"
            >
              {showStats ? <Trophy size={16} /> : <BarChart2 size={16} />}
              {showStats ? 'Voir le podium' : 'Voir les statistiques'}
            </Button>
          </div>
          
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-dutch-orange" />
                Tournoi terminé: {activeTournament?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showStats ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Statistiques du tournoi</h2>
                  {/* Add tournament stats here */}
                </div>
              ) : (
                <TournamentPodium 
                  players={activeTournament?.players.map(p => ({
                    id: p.id,
                    name: p.name,
                    score: p.totalScore,
                    wins: p.wins,
                    dutchCount: p.dutchCount
                  })) || []}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  if (isGameFinished) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground variant="subtle" />
        
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-dutch-orange" />
                Partie {currentGame} terminée
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Résultats</h2>
                
                <div className="space-y-4 mb-8">
                  {players
                    .sort((a, b) => b.totalScore - a.totalScore)
                    .map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between bg-white/50 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-dutch-orange' : 'bg-dutch-purple'}`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{player.name}</span>
                        </div>
                        <span className="font-bold">{player.totalScore} pts</span>
                      </div>
                    ))}
                </div>
                
                <Button 
                  onClick={startNextGame}
                  className="bg-dutch-blue text-white w-full py-6 rounded-xl"
                >
                  Commencer la partie {currentGame + 1}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground variant="subtle" />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-4 bg-white/80 backdrop-blur-sm border border-white/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-dutch-orange" />
                {activeTournament?.name} - Partie {currentGame}/{activeTournament?.totalGames}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
        
        <ScoreBoard 
          players={players}
          onAddRound={handleAddRound}
          onEndGame={handleEndGame}
          onUndoLastRound={() => {
            // Implementation for undo last round
            const updatedPlayers = players.map(player => {
              const lastRound = player.rounds[player.rounds.length - 1];
              return {
                ...player,
                rounds: player.rounds.slice(0, -1),
                totalScore: player.totalScore - (lastRound?.score || 0),
              };
            });
            setPlayers(updatedPlayers);
          }}
        />
      </div>
    </div>
  );
};

export default TournamentPage;
