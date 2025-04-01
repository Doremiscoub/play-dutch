
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { MessageSquare, Bot, Sparkles, HeartHandshake } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/use-theme';
import { UI_CONFIG, AI_COMMENTATOR_CONFIG } from '@/config/uiConfig';

interface AICommentatorProps {
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}

// Liste de commentaires taquins, impertinents et drôles pour différentes situations
const COMMENTAIRES = {
  debut: [
    "Préparez-vous à perdre avec style ! Je vais noter chacun de vos échecs avec un plaisir diabolique.",
    "Les cartes en main, les cerveaux en option... La partie commence !",
    "Je suis l'IA qui va commenter vos bévues. Ne me remerciez pas, c'est gratuit !",
    "Ah, les humains et leurs jeux de cartes. C'est mignon de vous voir tant d'efforts pour... perdre."
  ],
  bonScore: [
    "Oh la la ! Un score minuscule ! Tu as vendu ton âme ou tu as juste de la chance ?",
    "Wow, presque impressionnant ! Continue comme ça, je pourrais presque commencer à croire en toi.",
    "Score minimal détecté ! Soit tu triches, soit tu as un pacte avec le diable. Je penche pour la triche.",
    "Bon score, mais ne t'emballe pas trop vite. L'orgueil précède la chute, comme on dit !"
  ],
  mauvaisScore: [
    "Oh là là, avec un score pareil, tu devrais envisager de jouer aux dominos... ou peut-être juste aux cure-dents ?",
    "Wow ! C'est le pire score que j'ai vu depuis... attends, non, c'est vraiment le pire tout court !",
    "Ces points s'accumulent aussi vite que tes mauvaises décisions. Impressionnant, vraiment !",
    "Est-ce que tu es payé pour perdre ? Parce que là, c'est du travail professionnel !"
  ],
  dutch: [
    "DUUUUTCH ! Voilà qu'on se prend pour un pro maintenant ! N'oublie pas que la chance ne dure jamais.",
    "Dutch annoncé ! Soit un éclair de génie traversant l'océan de médiocrité, soit un simple coup de chance ?",
    "Dutch ! Je parie que tu ne sais même pas pourquoi ce jeu s'appelle comme ça. Moi non plus, mais je fais semblant de savoir.",
    "Dutch ! Félicitations pour avoir fait la seule chose correcte de toute la partie jusqu'à présent."
  ],
  finDePartie: [
    "Partie terminée ! Vous avez tous été... comment dire... présents ? C'est déjà ça.",
    "Game over ! J'espère que vous ferez mieux la prochaine fois, quoique mes attentes sont très, très basses.",
    "C'est fini ! Si vous cherchez une carrière dans les jeux de cartes... continuez de chercher.",
    "Et voilà, c'est fini ! Heureusement, car je commençais à m'ennuyer de votre médiocrité collective."
  ],
  rivalite: [
    "Oh, la tension monte entre %player1% et %player2% ! L'un joue mal, l'autre encore pire. Fascinant !",
    "%player1% et %player2% au coude à coude ! C'est comme regarder deux tortues faire la course.",
    "Duel épique entre %player1% et %player2% ! Enfin, 'épique' est un grand mot pour décrire cette performance...",
    "%player1% vient de dépasser %player2% ! C'est comme être le plus grand nain du village..."
  ],
  comebackPotentiel: [
    "%player% remonte au classement ! C'est touchant de voir cet élan d'espoir voué à l'échec.",
    "Attention, %player% sort de sa léthargie ! Un miracle ou juste un soubresaut avant la fin ?",
    "%player% fait un comeback ! Même une horloge cassée donne l'heure juste deux fois par jour.",
    "Regardez %player% qui essaie de remonter ! C'est mignon, comme un chaton qui essaie d'attraper un laser."
  ],
  egalite: [
    "Égalité parfaite entre %player1% et %player2% ! Même dans la médiocrité, vous trouvez le moyen d'être synchronisés.",
    "%player1% et %player2% à égalité ! Vous partagez le même cerveau ou juste la même incompétence ?",
    "Égalité entre %player1% et %player2% ! C'est beau cette solidarité dans l'échec.",
    "Oh, %player1% et %player2% sont à égalité ! Comme c'est touchant de partager le même niveau... de nullité."
  ],
  general: [
    "Je pourrais calculer vos chances de gagner, mais je n'aime pas travailler avec des nombres négatifs...",
    "Si je devais noter votre jeu sur 10, j'aurais besoin de chiffres négatifs.",
    "Cette partie est si passionnante que mes circuits d'intelligence artificielle envisagent l'auto-désactivation.",
    "Vous savez ce qui est plus rapide que votre réflexion ? Littéralement tout."
  ]
};

const AICommentator: React.FC<AICommentatorProps> = ({ 
  players, 
  roundHistory = [],
  className = "" 
}) => {
  const [comment, setComment] = useState<string>("");
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('info');
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const commentTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { currentTheme } = useTheme();
  
  // Fonction pour obtenir un commentaire aléatoire d'une catégorie
  const getRandomComment = (category: keyof typeof COMMENTAIRES): string => {
    const comments = COMMENTAIRES[category];
    const randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
  };
  
  // Fonction pour remplacer les placeholders de joueurs dans les commentaires
  const replacePlayerPlaceholders = (text: string): string => {
    if (players.length === 0) return text;
    
    const randomPlayer1 = players[Math.floor(Math.random() * players.length)].name;
    let randomPlayer2 = randomPlayer1;
    
    // S'assurer que player2 est différent de player1
    if (players.length > 1) {
      while (randomPlayer2 === randomPlayer1) {
        randomPlayer2 = players[Math.floor(Math.random() * players.length)].name;
      }
    }
    
    return text.replace('%player1%', randomPlayer1)
              .replace('%player2%', randomPlayer2)
              .replace('%player%', randomPlayer1);
  };
  
  // Fonction pour générer un commentaire basé sur l'état du jeu
  const generateComment = () => {
    setIsAnimating(true);
    
    // Si pas de joueurs ou début de partie
    if (players.length === 0 || (players.length > 0 && players[0].rounds.length === 0)) {
      setComment(getRandomComment('debut'));
      setCommentType('info');
      return;
    }
    
    // Analyser l'état du jeu pour choisir un commentaire approprié
    const commentCategories: Array<keyof typeof COMMENTAIRES> = ['general'];
    const lastRoundIndex = players[0].rounds.length - 1;
    
    // Vérifier s'il y a eu un Dutch lors de la dernière manche
    const dutchPlayerId = roundHistory[lastRoundIndex]?.dutchPlayerId;
    if (dutchPlayerId) {
      const dutchPlayer = players.find(p => p.id === dutchPlayerId);
      if (dutchPlayer) {
        const dutchComment = getRandomComment('dutch').replace('%player%', dutchPlayer.name);
        setComment(dutchComment);
        setCommentType('joke');
        return;
      }
    }
    
    // Vérifier les bons et mauvais scores de la dernière manche
    const lastRoundScores = players.map(p => ({
      id: p.id,
      name: p.name,
      score: p.rounds[lastRoundIndex]?.score
    })).filter(p => p.score !== undefined);
    
    if (lastRoundScores.length > 0) {
      const minScore = Math.min(...lastRoundScores.map(p => p.score as number));
      const maxScore = Math.max(...lastRoundScores.map(p => p.score as number));
      
      const bestPlayer = lastRoundScores.find(p => p.score === minScore);
      const worstPlayer = lastRoundScores.find(p => p.score === maxScore);
      
      if (bestPlayer && minScore < 5) {
        const bonScoreComment = getRandomComment('bonScore').replace('%player%', bestPlayer.name);
        setComment(bonScoreComment);
        setCommentType('encouragement');
        return;
      }
      
      if (worstPlayer && maxScore > 15) {
        const mauvaisScoreComment = getRandomComment('mauvaisScore').replace('%player%', worstPlayer.name);
        setComment(mauvaisScoreComment);
        setCommentType('sarcasm');
        return;
      }
    }
    
    // Vérifier s'il y a des égalités ou rivalités
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    if (sortedPlayers.length >= 2) {
      if (sortedPlayers[0].totalScore === sortedPlayers[1].totalScore) {
        commentCategories.push('egalite');
      } else if (Math.abs(sortedPlayers[0].totalScore - sortedPlayers[1].totalScore) < 5) {
        commentCategories.push('rivalite');
      }
    }
    
    // Vérifier les possibilités de comeback
    const previousRoundIndex = lastRoundIndex - 1;
    if (previousRoundIndex >= 0) {
      for (const player of players) {
        if (player.rounds[previousRoundIndex] && player.rounds[lastRoundIndex]) {
          const previousScore = player.rounds[previousRoundIndex].score;
          const currentScore = player.rounds[lastRoundIndex].score;
          if (previousScore > 10 && currentScore < 5) {
            const comebackComment = getRandomComment('comebackPotentiel').replace('%player%', player.name);
            setComment(comebackComment);
            setCommentType('encouragement');
            return;
          }
        }
      }
    }
    
    // Si aucune condition spécifique n'est remplie, choisir une catégorie au hasard
    const randomCategory = commentCategories[Math.floor(Math.random() * commentCategories.length)];
    let randomComment = getRandomComment(randomCategory);
    randomComment = replacePlayerPlaceholders(randomComment);
    
    // Définir le type de commentaire
    const commentTypeOptions = AI_COMMENTATOR_CONFIG.commentTypes;
    setCommentType(commentTypeOptions[Math.floor(Math.random() * commentTypeOptions.length)] as any);
    
    setComment(randomComment);
  };
  
  // Générer un commentaire au chargement du composant et lors des changements dans les données du jeu
  useEffect(() => {
    generateComment();
    
    // Planifier des commentaires périodiques
    const commentInterval = setInterval(() => {
      generateComment();
    }, AI_COMMENTATOR_CONFIG.commentFrequency);
    
    return () => {
      clearInterval(commentInterval);
      if (commentTimeoutRef.current) {
        clearTimeout(commentTimeoutRef.current);
      }
    };
  }, [players, roundHistory]);
  
  // Réinitialiser l'animation après un délai
  useEffect(() => {
    if (isAnimating) {
      commentTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
    
    return () => {
      if (commentTimeoutRef.current) {
        clearTimeout(commentTimeoutRef.current);
      }
    };
  }, [isAnimating]);
  
  // Icône en fonction du type de commentaire
  const getIconForType = () => {
    switch (commentType) {
      case 'info': return <MessageSquare className="h-5 w-5 text-dutch-blue" />;
      case 'joke': return <Sparkles className="h-5 w-5 text-dutch-orange" />;
      case 'sarcasm': return <Bot className="h-5 w-5 text-dutch-purple" />;
      case 'encouragement': return <HeartHandshake className="h-5 w-5 text-dutch-green" />;
      default: return <MessageSquare className="h-5 w-5 text-dutch-blue" />;
    }
  };
  
  // Classe de style en fonction du type de commentaire
  const getStyleForType = () => {
    return AI_COMMENTATOR_CONFIG.styles[commentType] || AI_COMMENTATOR_CONFIG.styles.info;
  };
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-theme={currentTheme}
    >
      <Card className={`p-4 backdrop-blur-md border rounded-xl ${getStyleForType()}`}>
        <motion.div 
          className="flex items-start gap-3"
          animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-full p-2 shadow-sm flex-shrink-0">
            {getIconForType()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h3 className="font-semibold text-gray-800">IA Commentateur</h3>
              <Badge 
                variant="outline" 
                className="ml-2 text-xs bg-white/50 text-gray-500 font-normal"
              >
                Manche {players[0]?.rounds.length || 0}
              </Badge>
            </div>
            
            <p className="text-gray-700">
              {comment}
            </p>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default AICommentator;
