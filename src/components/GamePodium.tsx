
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, BarChart3, ArrowLeft, Medal, Target, Fire, Zap } from 'lucide-react';
import { playConfetti } from '@/utils/animationUtils';
import PageLayout from './PageLayout';
import { Card, CardContent } from '@/components/ui/card';

interface GamePodiumProps {
  players: Player[];
  onNewGame: () => void;
  gameDuration?: string;
}

const GamePodium: React.FC<GamePodiumProps> = ({ players, onNewGame, gameDuration }) => {
  const navigate = useNavigate();
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Générer un titre aléatoire fun
  const funTitles = [
    "Les légendes du Dutch !",
    "Quel match !",
    "Un Dutch mémorable !",
    "Champions de cartes !",
    "La bataille finale !",
    "Duel de titans !",
    "Partie épique terminée !"
  ];
  
  const randomTitle = useMemo(() => {
    return funTitles[Math.floor(Math.random() * funTitles.length)];
  }, []);
  
  // Définir le vainqueur
  const winner = sortedPlayers[0];
  
  // Récupérer les stats fun pour l'écran de fin de partie
  const funStats = useMemo(() => {
    const stats = [];
    
    // Joueur avec le plus de manches perdues consécutives
    const maxConsecutiveLosses = players.reduce((max, player) => {
      let current = 0;
      let maxForPlayer = 0;
      
      player.rounds.forEach(round => {
        if (round.score > 0) {
          current = 0;
        } else {
          current++;
          maxForPlayer = Math.max(maxForPlayer, current);
        }
      });
      
      return maxForPlayer > max.count ? { player: player.name, count: maxForPlayer } : max;
    }, { player: '', count: 0 });
    
    // Joueur ayant "dutché" le plus souvent
    const dutchCounts = players.reduce((acc, player) => {
      const dutchCount = player.rounds.filter(round => round.isDutch).length;
      return dutchCount > 0 ? [...acc, { player: player.name, count: dutchCount }] : acc;
    }, [] as Array<{ player: string, count: number }>);
    
    const mostDutch = dutchCounts.sort((a, b) => b.count - a.count)[0];
    
    // Ajout des stats si elles existent
    if (maxConsecutiveLosses.count > 1) {
      stats.push({
        text: `${maxConsecutiveLosses.player} a perdu ${maxConsecutiveLosses.count} manches d'affilée`,
        icon: <Fire className="h-5 w-5 text-dutch-orange" />
      });
    }
    
    if (mostDutch && mostDutch.count > 0) {
      stats.push({
        text: `${mostDutch.player} a "dutché" ${mostDutch.count} fois`,
        icon: <Zap className="h-5 w-5 text-dutch-purple" />
      });
    }
    
    // Joueur avec la meilleure moyenne
    const bestAverage = players.reduce((best, player) => {
      const avg = player.stats?.averageScore || 0;
      return avg > best.avg ? { player: player.name, avg } : best;
    }, { player: '', avg: 0 });
    
    if (bestAverage.avg > 0) {
      stats.push({
        text: `${bestAverage.player} a la meilleure moyenne: ${bestAverage.avg.toFixed(1)} pts/manche`,
        icon: <Target className="h-5 w-5 text-dutch-blue" />
      });
    }
    
    return stats;
  }, [players]);
  
  // Lancer les confettis dès que le composant est monté
  useEffect(() => {
    playConfetti(5000);
  }, []);
  
  // Animations pour les médailles
  const medalAnimation = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };
  
  // Animations pour les joueurs
  const playerAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5
      }
    })
  };
  
  // Obtenir la position des joueurs sur le podium
  const getPodiumPosition = (index: number) => {
    // Position par défaut en fonction du classement
    switch(index) {
      case 0: return { order: 2, height: 'h-36 md:h-44', color: 'bg-yellow-400' };
      case 1: return { order: 1, height: 'h-28 md:h-36', color: 'bg-gray-300' };
      case 2: return { order: 3, height: 'h-20 md:h-28', color: 'bg-amber-600' };
      default: return { order: index + 1, height: 'h-16', color: 'bg-gray-200' };
    }
  };
  
  return (
    <PageLayout backgroundVariant="default" showBackButton={true}>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
            {randomTitle}
          </h1>
          <p className="text-lg mt-2 text-gray-600">
            {winner.name} remporte la partie avec {winner.totalScore} points
          </p>
          {gameDuration && (
            <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              Durée de la partie: {gameDuration}
            </div>
          )}
        </motion.div>
        
        {/* Affichage du podium */}
        <div className="relative mb-16 mt-28">
          {/* Positions des joueurs sur le podium */}
          <div className="flex items-end justify-center gap-4 md:gap-6 h-52 md:h-72">
            {sortedPlayers.slice(0, 3).map((player, index) => {
              const { order, height, color } = getPodiumPosition(index);
              
              return (
                <div key={player.id} className="relative" style={{ order }}>
                  {/* Médaille */}
                  <motion.div 
                    className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
                    variants={medalAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className={`rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} p-3 shadow-lg`}>
                      <Trophy className={`h-6 w-6 md:h-8 md:w-8 ${index === 0 ? 'text-yellow-100' : 'text-white'}`} />
                    </div>
                    <div className="text-center mt-2 font-bold">
                      {index === 0 ? '1er' : index === 1 ? '2e' : '3e'}
                    </div>
                  </motion.div>
                  
                  {/* Joueur */}
                  <motion.div 
                    className="relative flex flex-col items-center"
                    custom={index}
                    variants={playerAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-col items-center absolute -top-14 left-1/2 transform -translate-x-1/2 w-full">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-1 shadow-md overflow-hidden">
                        <span className="text-lg font-bold text-gray-800">{player.name.charAt(0)}</span>
                      </div>
                      <div className="text-center text-sm font-medium truncate max-w-[80px] md:max-w-[120px]">
                        {player.name}
                      </div>
                      <div className="text-center text-xs font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                        {player.totalScore} pts
                      </div>
                    </div>
                    
                    {/* Podium */}
                    <div className={`${color} ${height} w-20 md:w-28 rounded-t-lg shadow-lg flex items-center justify-center relative z-0`}>
                      <span className="absolute bottom-2 text-xs text-white font-bold opacity-80">
                        {index + 1}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Statistiques fun de la partie */}
        {funStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-white/70 backdrop-blur-md rounded-xl border border-white/40 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-dutch-blue mb-3">Moments marquants</h3>
                <div className="space-y-2">
                  {funStats.map((stat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      {stat.icon}
                      <span>{stat.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Affichage des autres joueurs */}
        {sortedPlayers.length > 3 && (
          <div className="mt-12 px-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Autres participants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedPlayers.slice(3).map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-gray-500">{index + 4}</span>
                      </div>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        {player.stats && (
                          <div className="text-xs text-gray-500 mt-1">
                            Moyenne: {player.stats.averageScore.toFixed(1)} pts/manche
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-lg font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                      {player.totalScore}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Boutons d'action */}
        <motion.div 
          className="mt-12 flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={onNewGame}
            className="bg-gradient-to-r from-dutch-purple to-dutch-blue text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            Nouvelle partie
          </Button>
          
          <Button 
            onClick={() => navigate('/history')}
            className="bg-white text-dutch-orange border border-dutch-orange/20 hover:bg-dutch-orange/10 rounded-full px-8 py-6"
            variant="outline"
            size="lg"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Voir l'historique
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default GamePodium;
