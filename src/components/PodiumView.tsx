import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Medal, Award, Share2, Copy, X, Twitter, Facebook, Camera, Download, Instagram, Video, Film, Youtube } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import { ReceiptCard } from '@/components/ui/receipt-card';

export interface PodiumViewProps {
  players: Player[];
  onClose: () => void;
  isMultiplayer?: boolean;
}

const PodiumView: React.FC<PodiumViewProps> = ({ players, onClose, isMultiplayer = false }) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [reelMode, setReelMode] = useState<'image' | 'animated'>('image');
  const [activeTab, setActiveTab] = useState('share');
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const reelPreviewRef = useRef<HTMLDivElement>(null);
  const [isGeneratingReel, setIsGeneratingReel] = useState(false);
  const animationControls = useAnimation();
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const topPlayers = sortedPlayers.slice(0, Math.min(3, sortedPlayers.length));
  const otherPlayers = sortedPlayers.slice(Math.min(3, sortedPlayers.length));
  
  const getPlayerStat = (player: Player) => {
    const stats = player.stats || {
      bestRound: null,
      dutchCount: 0,
      averageScore: 0,
      worstRound: null
    };
    
    const bestStat = stats.bestRound !== null
      ? `Meilleur manche: ${stats.bestRound}`
      : stats.dutchCount > 0
        ? `Dutch: ${stats.dutchCount} fois`
        : `Moyenne: ${Math.round(stats.averageScore * 10) / 10}`;
    
    return bestStat;
  };
  
  const getPodiumHeight = (position: number) => {
    if (position === 0) return 'h-36';
    if (position === 1) return 'h-28';
    return 'h-20';
  };

  const handleCopyInviteLink = async () => {
    try {
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
  
  const handleShareOnSocial = (platform: 'twitter' | 'facebook' | 'instagram') => {
    const text = `Je viens de jouer à Dutch! ${topPlayers[0]?.name} a gagné avec ${topPlayers[0]?.totalScore} points!`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    } else if (platform === 'instagram') {
      captureAndDownloadResults();
      toast.info("Instagram ne permet pas le partage direct via le web", {
        description: "Téléchargez l'image et partagez-la manuellement sur Instagram"
      });
      return;
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
        description: "Vous pouvez maintenant partager cette image"
      });
    } catch (error) {
      toast.error("Impossible de capturer les résultats", {
        description: "Veuillez essayer à nouveau"
      });
    } finally {
      setIsCapturing(false);
    }
  };

  const generateSocialReel = async () => {
    setIsGeneratingReel(true);
    
    try {
      await animationControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 1.5 }
      });
      
      setTimeout(async () => {
        const reelElement = reelPreviewRef.current;
        if (!reelElement) return;
        
        const canvas = await html2canvas(reelElement, {
          backgroundColor: null,
          scale: 2,
        });
        
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'dutch-game-reel.png';
        link.click();
        
        toast.success("Reel généré!", {
          description: "Téléchargez et partagez sur Instagram ou TikTok"
        });
        setIsGeneratingReel(false);
      }, 1500);
      
    } catch (error) {
      toast.error("Impossible de générer le reel", {
        description: "Veuillez essayer à nouveau"
      });
      setIsGeneratingReel(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
      <ReceiptCard className="w-full max-w-xl bg-white p-8 mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="bg-dutch-purple/10 text-dutch-purple">
              {isMultiplayer ? 'Partie multijoueur' : 'Partie locale'}
            </Badge>
            <Badge variant="outline" className="bg-dutch-blue/10 text-dutch-blue">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent mb-2">
            Résultats de la partie
          </h2>
          <p className="text-gray-600">
            {topPlayers[0]?.name} remporte la partie avec {topPlayers[0]?.totalScore} points !
          </p>
        </div>
        
        <div className="flex items-end justify-center gap-4 mb-10 h-48">
          {topPlayers.map((player, index) => {
            let podiumPosition = index;
            if (topPlayers.length === 3) {
              if (index === 0) podiumPosition = 1;
              else if (index === 1) podiumPosition = 0;
              else podiumPosition = 2;
            } else if (topPlayers.length === 2) {
              podiumPosition = index;
            }
            
            const positionClasses = [
              "order-1",
              "order-2",
              "order-3"
            ];
            
            const positionIcons = [
              <Medal key="silver" className="h-7 w-7 text-gray-400" aria-hidden="true" />,
              <Trophy key="gold" className="h-8 w-8 text-dutch-yellow" aria-hidden="true" />,
              <Award key="bronze" className="h-7 w-7 text-dutch-orange" aria-hidden="true" />
            ];
            
            const colorClasses = [
              "from-gray-100 to-gray-300 border-gray-400",
              "from-yellow-50 to-yellow-200 border-dutch-yellow",
              "from-orange-50 to-orange-200 border-dutch-orange"
            ];
            
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
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center mb-1 border border-white/30 shadow-md overflow-hidden group">
                      <motion.span 
                        className="text-xl font-bold"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >{player.totalScore}</motion.span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-dutch-purple/0 to-dutch-pink/0 opacity-0 group-hover:opacity-100" 
                        whileHover={{ opacity: 0.2 }}
                      />
                    </div>
                    <span className="text-sm font-semibold max-w-20 truncate">{player.name}</span>
                    <span className="text-xs text-gray-500">{getPlayerStat(player)}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {otherPlayers.length > 0 && (
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Autres joueurs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {otherPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="p-3 rounded-xl bg-white/50 border border-white/30 flex justify-between items-center hover:bg-white/80 transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                  whileHover={{ y: -2, boxShadow: "0 6px 20px -5px rgba(0,0,0,0.1)" }}
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
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-2 mb-4">
                      <TabsTrigger value="share" className="rounded-l-lg">Partage Simple</TabsTrigger>
                      <TabsTrigger value="reel" className="rounded-r-lg">Créer un Reel</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="share" className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
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
                        
                        <Button 
                          className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90"
                          onClick={() => handleShareOnSocial('instagram')}
                        >
                          <Instagram className="w-4 h-4 mr-2" />
                          Insta
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
                    </TabsContent>
                    
                    <TabsContent value="reel" className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-sm text-gray-700 mb-3">
                          Créez un reel à partager sur Instagram ou TikTok !
                        </p>
                        
                        <div 
                          ref={reelPreviewRef}
                          className="aspect-[9/16] max-h-[400px] overflow-hidden rounded-xl bg-gradient-to-r from-dutch-purple/10 via-dutch-blue/10 to-dutch-pink/10 flex flex-col items-center justify-center p-6 relative mb-4"
                        >
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-dutch-purple/30 via-dutch-blue/20 to-dutch-pink/30 z-0"
                            animate={{ 
                              backgroundPosition: ['0% 0%', '100% 100%'], 
                            }}
                            transition={{ 
                              duration: 15, 
                              repeat: Infinity, 
                              repeatType: 'reverse' 
                            }}
                          />
                          
                          <motion.div 
                            className="absolute -top-5 -left-5 -right-5 -bottom-5 blur-2xl bg-gradient-to-br from-dutch-yellow/20 via-dutch-blue/10 to-dutch-purple/20 z-0 opacity-70"
                            animate={{ 
                              rotate: [0, 360],
                            }}
                            transition={{ 
                              duration: 20, 
                              repeat: Infinity, 
                              ease: "linear" 
                            }}
                          />

                          <motion.div
                            className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl p-4 w-full max-w-[80%] text-center border border-white/50 shadow-lg"
                            animate={animationControls}
                          >
                            <h3 className="text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
                              Dutch Card Game
                            </h3>
                            
                            <div className="flex justify-center mb-4">
                              <div className="bg-white/80 rounded-full p-2 shadow-md">
                                <Trophy className="h-8 w-8 text-dutch-yellow" />
                              </div>
                            </div>
                            
                            <p className="font-bold text-lg mb-1">
                              {topPlayers[0]?.name} gagne!
                            </p>
                            <p className="text-sm text-gray-700 mb-3">
                              avec {topPlayers[0]?.totalScore} points
                            </p>
                            
                            <div className="flex justify-around mb-2">
                              {topPlayers.slice(0, 3).map((player, idx) => (
                                <div key={player.id} className="text-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                                    idx === 0 
                                      ? "bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900" 
                                      : idx === 1 
                                        ? "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900"
                                        : "bg-gradient-to-r from-orange-200 to-orange-400 text-orange-900"
                                  }`}>
                                    {idx + 1}
                                  </div>
                                  <p className="text-xs font-medium">{player.name}</p>
                                  <p className="text-xs">{player.totalScore}</p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                          
                          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/70 font-medium z-10">
                            #DutchCardGame
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white hover:opacity-90"
                            onClick={generateSocialReel}
                            disabled={isGeneratingReel}
                          >
                            {isGeneratingReel ? (
                              <>Génération en cours...</>
                            ) : (
                              <>
                                <Instagram className="w-4 h-4 mr-2" />
                                Pour Instagram
                              </>
                            )}
                          </Button>
                          
                          <Button 
                            className="w-full bg-black text-white hover:bg-black/90"
                            onClick={generateSocialReel}
                            disabled={isGeneratingReel}
                          >
                            {isGeneratingReel ? (
                              <>Génération en cours...</>
                            ) : (
                              <>
                                <Video className="w-4 h-4 mr-2" />
                                Pour TikTok
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="default"
              className="bg-gradient-to-r from-dutch-purple to-dutch-pink text-white hover:opacity-90"
              onClick={() => {
                setActiveTab('reel');
                setShareDialogOpen(true);
              }}
            >
              <Film className="w-4 h-4 mr-2" />
              Créer un Reel
            </Button>
            
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
      </ReceiptCard>

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
