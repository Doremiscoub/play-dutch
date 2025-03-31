
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Medal, Award, Share2, Copy, X, Twitter, Facebook, Camera, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';

interface PodiumViewProps {
  players: Player[];
  onClose: () => void;
  isMultiplayer?: boolean;
}

const PodiumView: React.FC<PodiumViewProps> = ({ players, onClose, isMultiplayer = false }) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  // Sort players by score (ascending is better in Dutch)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Get top 3 players (or less if fewer players)
  const topPlayers = sortedPlayers.slice(0, Math.min(3, sortedPlayers.length));
  
  // Get remaining players
  const otherPlayers = sortedPlayers.slice(Math.min(3, sortedPlayers.length));
  
  // Calculate player statistics for display
  const getPlayerStat = (player: Player) => {
    const stats = player.stats || {
      bestRound: null,
      dutchCount: 0,
      averageScore: 0,
      worstRound: null
    };
    
    // Calculate the most common statistic
    const bestStat = stats.bestRound !== null
      ? `Meilleur manche: ${stats.bestRound}`
      : stats.dutchCount > 0
        ? `Dutch: ${stats.dutchCount} fois`
        : `Moyenne: ${Math.round(stats.averageScore * 10) / 10}`;
    
    return bestStat;
  };
  
  // Determine podium heights
  const getPodiumHeight = (position: number) => {
    if (position === 0) return 'h-36';
    if (position === 1) return 'h-28';
    return 'h-20';
  };

  const handleCopyInviteLink = async () => {
    try {
      // In a real app, this would be a dynamic link to the game results
      const gameLink = window.location.href;
      await navigator.clipboard.writeText(gameLink);
      toast.success("Lien copié!", {
        description: "Le lien a été copié dans le presse-papier",
      });
    } catch (error) {
      toast.error("Impossible de copier le lien", {
        description: "Veuillez copier le lien manuellement",
      });
    }
  };
  
  const handleShareOnSocial = (platform: 'twitter' | 'facebook') => {
    const text = `Je viens de jouer à Dutch! ${topPlayers[0]?.name} a gagné avec ${topPlayers[0]?.totalScore} points!`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  const captureAndDownloadResults = async () => {
    setIsCapturing(true);
    
    try {
      const resultsElement = document.getElementById('game-results');
      if (!resultsElement) return;
      
      const canvas = await html2canvas(resultsElement, {
        backgroundColor: null,
        scale: 2,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'dutch-game-results.png';
      link.click();
      
      toast.success("Capture d'écran téléchargée!", {
        description: "Vous pouvez maintenant partager cette image",
      });
    } catch (error) {
      toast.error("Impossible de capturer les résultats", {
        description: "Veuillez essayer à nouveau",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-xl rounded-3xl bg-white/60 backdrop-blur-md border border-white/20 p-8 shadow-lg overflow-y-auto max-h-[90vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        id="game-results"
      >
        <div className="text-center mb-8">
          <div className="flex justify-end">
            <Badge variant="outline" className="bg-dutch-purple/10 text-dutch-purple mb-4">
              {isMultiplayer ? 'Partie multijoueur' : 'Partie locale'}
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-dutch-blue mb-2">Résultats de la partie</h2>
          <p className="text-gray-600">
            {topPlayers[0]?.name} remporte la partie avec {topPlayers[0]?.totalScore} points !
          </p>
        </div>
        
        {/* Podium section */}
        <div className="flex items-end justify-center gap-4 mb-10 h-48">
          {topPlayers.map((player, index) => {
            // Determine which position (0 = winner, so needs to be in center)
            let podiumPosition = index;
            if (topPlayers.length === 3) {
              // For 3 players: Shift positions to make winner in center
              if (index === 0) podiumPosition = 1; // Winner in center
              else if (index === 1) podiumPosition = 0; // 2nd place on left
              else podiumPosition = 2; // 3rd place on right
            } else if (topPlayers.length === 2) {
              // For 2 players: Have winner on left and 2nd on right
              podiumPosition = index;
            }
            
            // Position-specific styling
            const positionClasses = [
              "order-1", // 2nd place (left)
              "order-2", // 1st place (middle)
              "order-3", // 3rd place (right)
            ];
            
            // Position-specific icons
            const positionIcons = [
              <Medal key="silver" className="h-7 w-7 text-gray-400" aria-hidden="true" />,
              <Trophy key="gold" className="h-8 w-8 text-dutch-yellow" aria-hidden="true" />,
              <Award key="bronze" className="h-7 w-7 text-dutch-orange" aria-hidden="true" />
            ];
            
            // Color classes for each position
            const colorClasses = [
              "from-gray-100 to-gray-300 border-gray-400", // 2nd
              "from-yellow-50 to-yellow-200 border-dutch-yellow", // 1st
              "from-orange-50 to-orange-200 border-dutch-orange", // 3rd
            ];
            
            // Animation delays
            const animDelays = [0.3, 0.1, 0.5];
            
            return (
              <motion.div
                key={player.id}
                className={cn(
                  "flex flex-col items-center",
                  positionClasses[podiumPosition]
                )}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: animDelays[podiumPosition], duration: 0.4 }}
              >
                <div className="flex flex-col items-center gap-2 mb-2">
                  {positionIcons[podiumPosition]}
                  <span className="font-bold text-sm">
                    {index === 0 ? "1er" : index === 1 ? "2ème" : "3ème"}
                  </span>
                </div>
                
                <motion.div 
                  className={cn(
                    "relative w-24 flex flex-col items-center justify-start rounded-t-xl bg-gradient-to-b border-b-4 shadow-md",
                    getPodiumHeight(podiumPosition),
                    colorClasses[podiumPosition]
                  )}
                  initial={{ height: 0, opacity: 0.5 }}
                  animate={{ height: getPodiumHeight(podiumPosition), opacity: 1 }}
                  transition={{ delay: animDelays[podiumPosition] + 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="absolute -top-16 flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: animDelays[podiumPosition] + 0.4, duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-1 border border-white/30 shadow-md">
                      <span className="text-xl font-bold">{player.totalScore}</span>
                    </div>
                    <span className="text-sm font-semibold max-w-20 truncate">{player.name}</span>
                    <span className="text-xs text-gray-500">{getPlayerStat(player)}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Other players */}
        {otherPlayers.length > 0 && (
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Autres joueurs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {otherPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="p-3 rounded-xl bg-white/50 border border-white/30 flex justify-between items-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      {index + 4}
                    </div>
                    <span className="font-medium text-sm">{player.name}</span>
                  </div>
                  <span className="font-bold">{player.totalScore}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Share banner */}
        <motion.div 
          className="mt-8 rounded-xl bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 p-4 border border-white/50 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <p className="text-gray-700 mb-3">Partagez vos résultats avec vos amis !</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-white/50 text-dutch-blue border-dutch-blue/20 hover:bg-white/80"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-dutch-blue">Partager les résultats</h3>
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <X className="w-4 h-4" />
                      </Button>
                    </DialogClose>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      className="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                      onClick={() => handleShareOnSocial('twitter')}
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    
                    <Button 
                      className="bg-[#4267B2] text-white hover:bg-[#4267B2]/90"
                      onClick={() => handleShareOnSocial('facebook')}
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleCopyInviteLink}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copier le lien
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={captureAndDownloadResults}
                    disabled={isCapturing}
                  >
                    {isCapturing ? (
                      <>Création de l'image...</>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Capture d'écran
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline"
              className="bg-white/50 text-dutch-purple border-dutch-purple/20 hover:bg-white/80"
              onClick={captureAndDownloadResults}
              disabled={isCapturing}
            >
              {isCapturing ? (
                <>Création...</>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Action buttons */}
      <div className="flex gap-3 mt-6 w-full max-w-xl">
        <motion.button
          className="flex-1 rounded-full px-4 py-3 bg-dutch-purple/10 hover:bg-dutch-purple/20 text-dutch-purple border border-dutch-purple/20"
          onClick={onClose}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Retour au jeu
        </motion.button>
        <motion.button
          className="flex-1 rounded-full px-4 py-3 bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-md"
          onClick={onClose}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Nouvelle partie
        </motion.button>
      </div>
    </div>
  );
};

export default PodiumView;
