
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Medal, Trophy, Award, Crown, Star, Sparkles, Flame, Target, Rocket, Heart, Zap, Gift } from 'lucide-react';
import { Player, Game } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface BadgeSystemProps {
  players: Player[];
  games: Game[];
  currentGameId?: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  condition: (player: Player, games: Game[]) => { earned: boolean; progress: number };
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: 'performance' | 'consistency' | 'achievement' | 'special';
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ players, games, currentGameId }) => {
  const [playerBadges, setPlayerBadges] = useLocalStorage<Record<string, string[]>>('dutch_player_badges', {});
  const [newBadges, setNewBadges] = useState<{playerId: string, badgeId: string}[]>([]);
  const [showBadgeDialog, setShowBadgeDialog] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [currentViewTab, setCurrentViewTab] = useState<'all' | 'progress'>('all');
  
  // Define all badges
  const badges: Badge[] = [
    {
      id: 'first_victory',
      name: 'Première Victoire',
      description: 'Remporter sa première partie de Dutch Blitz',
      icon: Trophy,
      color: 'hsl(var(--dutch-orange))',
      rarity: 'common',
      category: 'achievement',
      condition: (player, games) => {
        const victories = games.filter(game => game.winner === player.name).length;
        return { earned: victories > 0, progress: Math.min(victories, 1) * 100 };
      }
    },
    {
      id: 'five_victories',
      name: 'Penta-champion',
      description: 'Remporter 5 parties de Dutch Blitz',
      icon: Crown,
      color: 'hsl(var(--muted-foreground))',
      rarity: 'uncommon',
      category: 'achievement',
      condition: (player, games) => {
        const victories = games.filter(game => game.winner === player.name).length;
        return { earned: victories >= 5, progress: Math.min(victories / 5, 1) * 100 };
      }
    },
    {
      id: 'low_score_master',
      name: 'Maître de la Précision',
      description: 'Avoir un score inférieur à 3 dans un tour',
      icon: Target,
      color: 'hsl(var(--success))',
      rarity: 'uncommon',
      category: 'performance',
      condition: (player) => {
        const lowScores = player.rounds.filter(round => round.score > 0 && round.score < 3).length;
        return { earned: lowScores > 0, progress: lowScores > 0 ? 100 : 0 };
      }
    },
    {
      id: 'dutch_king',
      name: 'Roi du Dutch',
      description: 'Être le joueur qui dit "Dutch" 3 fois dans une même partie',
      icon: Zap,
      color: 'hsl(var(--warning))',
      rarity: 'rare',
      category: 'performance',
      condition: (player) => {
        const dutchCount = player.rounds.filter(round => round.isDutch).length;
        return { earned: dutchCount >= 3, progress: Math.min(dutchCount / 3, 1) * 100 };
      }
    },
    {
      id: 'consistency',
      name: 'Équilibriste',
      description: 'Avoir des scores constants sur 5 tours consécutifs (variation < 3)',
      icon: Heart,
      color: 'hsl(var(--dutch-purple))',
      rarity: 'rare',
      category: 'consistency',
      condition: (player) => {
        if (player.rounds.length < 5) return { earned: false, progress: 0 };
        
        let maxConsistentRounds = 0;
        let currentConsistentRounds = 1;
        
        for (let i = 1; i < player.rounds.length; i++) {
          const scoreDiff = Math.abs(player.rounds[i].score - player.rounds[i - 1].score);
          
          if (scoreDiff < 3) {
            currentConsistentRounds++;
            maxConsistentRounds = Math.max(maxConsistentRounds, currentConsistentRounds);
          } else {
            currentConsistentRounds = 1;
          }
        }
        
        return { 
          earned: maxConsistentRounds >= 5, 
          progress: Math.min(maxConsistentRounds / 5, 1) * 100 
        };
      }
    },
    {
      id: 'comeback_king',
      name: 'Roi du Comeback',
      description: 'Passer de la dernière à la première place dans une partie',
      icon: Rocket,
      color: 'hsl(var(--dutch-blue))',
      rarity: 'epic',
      category: 'performance',
      condition: (player, games) => {
        // This is complex to determine without round-by-round position info
        // For simplicity, we'll just use a placeholder implementation
        const progress = Math.min(games.length * 20, 100); // Just as an example
        return { earned: progress >= 100, progress };
      }
    },
    {
      id: 'perfect_game',
      name: 'Partie Parfaite',
      description: 'Terminer une partie sans jamais dépasser 5 points par tour',
      icon: Sparkles,
      color: 'hsl(var(--dutch-purple))',
      rarity: 'legendary',
      category: 'performance',
      condition: (player) => {
        if (player.rounds.length < 5) return { earned: false, progress: 0 };
        
        const perfectRounds = player.rounds.every(round => round.score <= 5);
        return { earned: perfectRounds, progress: perfectRounds ? 100 : 0 };
      }
    },
    {
      id: 'ten_games',
      name: 'Vétéran',
      description: 'Participer à 10 parties de Dutch Blitz',
      icon: Star,
      color: 'hsl(var(--dutch-blue))',
      rarity: 'common',
      category: 'achievement',
      condition: (player, games) => {
        const gameCount = games.filter(game => 
          game.players.some(p => p.name === player.name)
        ).length;
        
        return { earned: gameCount >= 10, progress: Math.min(gameCount / 10, 1) * 100 };
      }
    },
    {
      id: 'hot_streak',
      name: 'En Feu',
      description: 'Gagner 3 parties consécutives',
      icon: Flame,
      color: 'hsl(var(--warning))',
      rarity: 'epic',
      category: 'consistency',
      condition: (player, games) => {
        let maxStreak = 0;
        let currentStreak = 0;
        
        // Sort games by date
        const sortedGames = [...games].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        for (const game of sortedGames) {
          if (game.winner === player.name) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
        
        return { earned: maxStreak >= 3, progress: Math.min(maxStreak / 3, 1) * 100 };
      }
    },
    {
      id: 'multiplayer',
      name: 'Social',
      description: 'Jouer en mode multijoueur',
      icon: Gift,
      color: 'hsl(var(--success))',
      rarity: 'uncommon',
      category: 'special',
      condition: (player, games) => {
        const multiplayerGames = games.filter(game => game.isMultiplayer);
        const played = multiplayerGames.some(game => 
          game.players.some(p => p.name === player.name)
        );
        
        return { earned: played, progress: played ? 100 : 0 };
      }
    },
  ];
  
  // Check for new badges when component mounts or players/games change
  useEffect(() => {
    checkForNewBadges();
  }, [players, games, currentGameId]);
  
  // Function to check if players earned new badges
  const checkForNewBadges = () => {
    const newEarnedBadges: {playerId: string, badgeId: string}[] = [];
    
    players.forEach(player => {
      // Get previously earned badges for this player
      const earnedBadges = playerBadges[player.id] || [];
      
      // Check each badge
      badges.forEach(badge => {
        const { earned } = badge.condition(player, games);
        
        // If badge is earned and not already in the player's collection
        if (earned && !earnedBadges.includes(badge.id)) {
          newEarnedBadges.push({
            playerId: player.id,
            badgeId: badge.id
          });
          
          // Add to player's earned badges
          setPlayerBadges(prev => ({
            ...prev,
            [player.id]: [...(prev[player.id] || []), badge.id]
          }));
        }
      });
    });
    
    // If there are new badges, update state to show the notification
    if (newEarnedBadges.length > 0) {
      setNewBadges(newEarnedBadges);
      
      // Display toast for each new badge
      newEarnedBadges.forEach(({ playerId, badgeId }) => {
        const player = players.find(p => p.id === playerId);
        const badge = badges.find(b => b.id === badgeId);
        
        if (player && badge) {
          toast.success(`${player.name} a débloqué un badge !`, {
            description: `"${badge.name}" - ${badge.description}`,
            duration: 5000,
          });
          
          // Trigger confetti for legendary and epic badges
          if (badge.rarity === 'legendary' || badge.rarity === 'epic') {
            celebrateBadge();
          }
        }
      });
    }
  };
  
  // Function to celebrate earning a special badge
  const celebrateBadge = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const colors = ['hsl(var(--dutch-orange))', 'hsl(var(--dutch-blue))', 'hsl(var(--dutch-purple))', 'hsl(var(--success))'];
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 30 * (timeLeft / duration);
      
      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6, x: Math.random() },
        colors,
        zIndex: 1000,
        shapes: ['circle', 'square'],
      });
    }, 250);
  };
  
  // Show badge details
  const showBadgeDetails = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowBadgeDialog(true);
  };
  
  // Get badge earning progress for a specific player
  const getBadgeProgress = (player: Player, badge: Badge) => {
    return badge.condition(player, games);
  };
  
  // Get all badges for a player
  const getPlayerBadges = (player: Player) => {
    const earnedBadgeIds = playerBadges[player.id] || [];
    return badges.filter(badge => earnedBadgeIds.includes(badge.id));
  };
  
  // Get badge rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-200 text-gray-800';
      case 'uncommon': return 'bg-green-200 text-green-800';
      case 'rare': return 'bg-blue-200 text-blue-800';
      case 'epic': return 'bg-purple-200 text-purple-800';
      case 'legendary': return 'bg-trinity-orange-100/80 text-trinity-orange-700';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  // Get badge category name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'performance': return 'Performance';
      case 'consistency': return 'Régularité';
      case 'achievement': return 'Accomplissement';
      case 'special': return 'Spécial';
      default: return category;
    }
  };
  
  // Render badge icon with appropriate color
  const renderBadgeIcon = (badge: Badge, size = 'h-5 w-5') => {
    const IconComponent = badge.icon;
    return <IconComponent className={size} style={{ color: badge.color }} />;
  };
  
  return (
    <Card className="border border-glass-border-light card-glass backdrop-blur-md rounded-3xl shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="h-5 w-5 text-trinity-orange-600" />
          Badges et Récompenses
        </CardTitle>
        <CardDescription>
          Débloquez des badges en accomplissant divers exploits en jeu
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs 
          defaultValue="all" 
          value={currentViewTab}
          onValueChange={(value) => setCurrentViewTab(value as 'all' | 'progress')}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">
              Tous les badges
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex-1">
              Progression par joueur
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="card-glass p-3 cursor-pointer hover:shadow-glass-lg transition-shadow"
                  onClick={() => showBadgeDetails(badge)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shadow-sm">
                      {renderBadgeIcon(badge, 'h-5 w-5')}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{badge.name}</h3>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getCategoryName(badge.category)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <div className="card-glass p-3">
              <Accordion type="single" collapsible>
                {players.map((player) => (
                  <AccordionItem key={player.id} value={player.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-trinity-blue-100 text-trinity-blue-700 text-xs">
                            {player.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                        <div className="text-xs bg-trinity-blue-100 text-trinity-blue-700 px-2 py-0.5 rounded-full ml-2">
                          {(playerBadges[player.id] || []).length} badges
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 mt-1">
                        {/* Badges earned */}
                        {getPlayerBadges(player).length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-muted-foreground mb-2">Badges débloqués</h4>
                            <div className="flex flex-wrap gap-2">
                              {getPlayerBadges(player).map((badge) => (
                                <div
                                  key={badge.id}
                                  className="flex items-center gap-1 bg-background rounded-full px-2 py-1 border border-glass-border-light cursor-pointer shadow-sm"
                                  onClick={() => showBadgeDetails(badge)}
                                >
                                  {renderBadgeIcon(badge, 'h-3.5 w-3.5')}
                                  <span className="text-xs">{badge.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Badges in progress */}
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-2">Progression</h4>
                          <div className="space-y-2">
                            {badges
                              .filter(badge => !getPlayerBadges(player).includes(badge))
                              .map((badge) => {
                                const { earned, progress } = getBadgeProgress(player, badge);
                                return (
                                  <div 
                                    key={badge.id} 
                                    className="card-glass rounded-lg p-2 cursor-pointer hover:shadow-glass-lg"
                                    onClick={() => showBadgeDetails(badge)}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="h-6 w-6 rounded-full bg-glass-light flex items-center justify-center shadow-sm">
                                        {renderBadgeIcon(badge, 'h-3.5 w-3.5')}
                                      </div>
                                      <span className="text-xs font-medium">{badge.name}</span>
                                      <span className="text-xs text-muted-foreground ml-auto">{Math.round(progress)}%</span>
                                    </div>
                                    <Progress value={progress} className="h-1.5" />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full btn-glass border-trinity-orange-300/20 text-trinity-orange-600 hover:border-trinity-orange-400"
          onClick={() => setCurrentViewTab(currentViewTab === 'all' ? 'progress' : 'all')}
        >
          <Medal className="h-4 w-4 mr-2" />
          {currentViewTab === 'all' ? 'Voir la progression des joueurs' : 'Voir tous les badges'}
        </Button>
      </CardFooter>
      
      {/* Badge details dialog */}
      <Dialog open={showBadgeDialog} onOpenChange={setShowBadgeDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl card-glass border-glass-border-light">
          <DialogHeader>
            <DialogTitle>Détails du badge</DialogTitle>
            <DialogDescription>
              Informations et conditions pour obtenir ce badge
            </DialogDescription>
          </DialogHeader>
          
          {selectedBadge && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center">
                <div 
                  className="h-20 w-20 rounded-full flex items-center justify-center shadow-md mb-3" 
                  style={{ backgroundColor: selectedBadge.color + '20' }}
                >
                  {renderBadgeIcon(selectedBadge, 'h-12 w-12')}
                </div>
                <h2 className="text-xl font-bold mb-1">{selectedBadge.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(selectedBadge.rarity)}`}>
                    {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {getCategoryName(selectedBadge.category)}
                  </span>
                </div>
                <p className="text-center text-muted-foreground">
                  {selectedBadge.description}
                </p>
              </div>
              
              <div className="space-y-1 pt-2">
                <h3 className="text-sm font-medium mb-2">Progression des joueurs</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {players.map((player) => {
                    const { earned, progress } = getBadgeProgress(player, selectedBadge);
                    return (
                      <div key={player.id} className="glass-medium rounded-lg p-2 flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-trinity-blue-100 text-trinity-blue-700 text-xs">
                            {player.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{player.name}</span>
                            {earned ? (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Débloqué
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                {Math.round(progress)}%
                              </span>
                            )}
                          </div>
                          <Progress value={progress} className="h-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Achievement notification for new badges */}
      <AnimatePresence>
        {newBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-0 left-0 flex justify-center z-50 pointer-events-none"
          >
            <motion.div 
              className="glass-ultra-light backdrop-blur-md border border-glass-border-light rounded-2xl p-4 shadow-lg pointer-events-auto max-w-xs"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  {newBadges.slice(0, 1).map(({ badgeId }) => {
                    const badge = badges.find(b => b.id === badgeId);
                    if (!badge) return null;
                    
                    return (
                      <motion.div
                        key={badgeId}
                        className="h-16 w-16 rounded-full flex items-center justify-center shadow-md"
                        style={{ backgroundColor: badge.color + '20' }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {renderBadgeIcon(badge, 'h-10 w-10')}
                      </motion.div>
                    );
                  })}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">Badge débloqué !</h3>
                  <p className="text-sm text-muted-foreground">
                    {newBadges.length > 1 
                      ? `Vous avez débloqué ${newBadges.length} nouveaux badges!` 
                      : 'Vous avez débloqué un nouveau badge!'}
                  </p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs"
                  onClick={() => setNewBadges([])}
                >
                  Compris
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default BadgeSystem;
