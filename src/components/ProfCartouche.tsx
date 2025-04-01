
import React, { memo, useMemo } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Crown, Award, HeartHandshake, Target, Zap, Star } from 'lucide-react';
import { composedClasses } from '@/config/uiConfig';

interface ProfCartoucheProps {
  players: Player[];
  roundNumber: number;
  view: 'podium' | 'table';
}

/**
 * Composant qui affiche un cartouche de commentaires du "Prof"
 * Mémorisé pour éviter les re-renderings inutiles
 */
const ProfCartouche: React.FC<ProfCartoucheProps> = memo(({ players, roundNumber, view }) => {
  // Générer le commentaire en fonction des données des joueurs et du mode de vue
  const comment = useMemo(() => {
    if (players.length === 0) return "Commencez la partie !";
    
    // Si aucune manche n'a été jouée
    if (roundNumber === 0) {
      if (players.length === 2) {
        return "Duel en perspective ! Qui sera le vainqueur ?";
      } else if (players.length === 3) {
        return "Partie à trois ! Ça va être chaud !";
      } else if (players.length >= 4) {
        return "Plein de joueurs ! Ça va être une belle bataille !";
      }
      return "Que la partie commence !";
    }
    
    // Tableau de commentaires possibles
    const comments = [
      // Commentaires sur le leader
      {
        condition: () => players.length > 1 && roundNumber > 1,
        getText: () => {
          const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
          const leader = sortedPlayers[0];
          const secondPlayer = sortedPlayers[1];
          const difference = secondPlayer.totalScore - leader.totalScore;
          
          if (difference > 20) {
            return `${leader.name} domine la partie avec ${difference} points d'avance !`;
          } else if (difference > 10) {
            return `${leader.name} a une bonne avance, mais rien n'est joué !`;
          } else if (difference < 5 && difference > 0) {
            return `C'est serré entre ${leader.name} et ${secondPlayer.name} ! Seulement ${difference} points d'écart !`;
          }
          return `${leader.name} est en tête pour l'instant.`;
        }
      },
      
      // Commentaires sur les dutchCount
      {
        condition: () => players.some(p => p.stats?.dutchCount && p.stats.dutchCount > 2),
        getText: () => {
          const dutchPlayer = [...players]
            .filter(p => p.stats?.dutchCount && p.stats.dutchCount > 2)
            .sort((a, b) => (b.stats?.dutchCount || 0) - (a.stats?.dutchCount || 0))[0];
          
          return `${dutchPlayer.name} dit souvent "Dutch" ! ${dutchPlayer.stats?.dutchCount} fois déjà !`;
        }
      },
      
      // Commentaires sur les consistencyScore
      {
        condition: () => players.some(p => p.stats?.consistencyScore && p.stats.consistencyScore < 4),
        getText: () => {
          const consistentPlayer = [...players]
            .filter(p => p.stats?.consistencyScore && p.stats.consistencyScore < 4)
            .sort((a, b) => (a.stats?.consistencyScore || 99) - (b.stats?.consistencyScore || 99))[0];
          
          return `${consistentPlayer.name} est très régulier dans son jeu !`;
        }
      },
      
      // Commentaires sur les bestRound
      {
        condition: () => players.some(p => p.stats?.bestRound && p.stats.bestRound < 5 && p.stats.bestRound > 0),
        getText: () => {
          const bestPlayer = [...players]
            .filter(p => p.stats?.bestRound && p.stats.bestRound < 5 && p.stats.bestRound > 0)
            .sort((a, b) => (a.stats?.bestRound || 99) - (b.stats?.bestRound || 99))[0];
          
          return `${bestPlayer.name} a fait un score impressionnant de ${bestPlayer.stats?.bestRound} !`;
        }
      },
      
      // Commentaires sur les winStreak
      {
        condition: () => players.some(p => p.stats?.winStreak && p.stats.winStreak > 2),
        getText: () => {
          const streakPlayer = [...players]
            .filter(p => p.stats?.winStreak && p.stats.winStreak > 2)
            .sort((a, b) => (b.stats?.winStreak || 0) - (a.stats?.winStreak || 0))[0];
          
          return `${streakPlayer.name} est en feu avec ${streakPlayer.stats?.winStreak} victoires consécutives !`;
        }
      },
      
      // Commentaires sur les scores très serrés
      {
        condition: () => {
          if (players.length < 2) return false;
          const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
          const totalScores = sortedPlayers.map(p => p.totalScore);
          const maxDiff = Math.max(...totalScores) - Math.min(...totalScores);
          return maxDiff < 10 && roundNumber > 2;
        },
        getText: () => "Les scores sont très serrés ! Tout peut encore arriver !"
      },
      
      // Commentaires sur le nombre de manches
      {
        condition: () => roundNumber > 10,
        getText: () => `Déjà ${roundNumber} manches ! Quelle partie !`
      },
      
      // Commentaires génériques
      {
        condition: () => true,
        getText: () => {
          const genericComments = [
            "Qui va gagner cette manche ?",
            "Concentrez-vous sur vos cartes !",
            "N'oubliez pas de dire Dutch !",
            "Un bon joueur sait quand dire Dutch !",
            "La chance sourit aux audacieux !",
            "Stratégie ou chance ? Un peu des deux !",
            "Une bonne main peut tout changer !",
            "Gardez un œil sur vos adversaires !",
            "Soyez attentifs aux cartes jouées !",
          ];
          return genericComments[Math.floor(Math.random() * genericComments.length)];
        }
      }
    ];
    
    // Choisir un commentaire applicable
    const applicableComments = comments.filter(c => c.condition());
    // Favoriser les commentaires spécifiques
    const specificComments = applicableComments.slice(0, -1);
    
    if (specificComments.length > 0) {
      // Choisir un commentaire spécifique aléatoire
      return specificComments[Math.floor(Math.random() * specificComments.length)].getText();
    }
    
    // Sinon, retourner un commentaire générique
    return applicableComments[applicableComments.length - 1].getText();
  }, [players, roundNumber]);
  
  // Déterminer l'icône à afficher
  const getIcon = () => {
    if (players.some(p => p.stats?.dutchCount && p.stats.dutchCount > 2)) {
      return <HeartHandshake className="h-5 w-5 text-dutch-orange" />;
    }
    
    if (players.some(p => p.stats?.winStreak && p.stats.winStreak > 2)) {
      return <Star className="h-5 w-5 text-dutch-yellow" />;
    }
    
    if (players.some(p => p.stats?.bestRound && p.stats.bestRound < 5 && p.stats.bestRound > 0)) {
      return <Target className="h-5 w-5 text-dutch-green" />;
    }
    
    if (players.some(p => p.stats?.consistencyScore && p.stats.consistencyScore < 4)) {
      return <Zap className="h-5 w-5 text-dutch-blue" />;
    }
    
    if (players.length > 1 && roundNumber > 1) {
      return <Crown className="h-5 w-5 text-dutch-purple" />;
    }
    
    return <Award className="h-5 w-5 text-dutch-blue" />;
  };
  
  return (
    <motion.div 
      className={`${composedClasses.card} border-l-4 border-l-dutch-purple p-3 mb-4`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dutch-purple to-dutch-blue flex items-center justify-center text-white shadow-sm">
            <span className="font-bold text-lg">P</span>
          </div>
          <motion.div 
            className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {getIcon()}
          </motion.div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-dutch-purple flex items-center gap-1.5">
            Le Prof
            <span className="text-xs font-normal text-gray-400">
              • Commentateur
            </span>
          </h3>
          <p className="text-gray-700 mt-1">
            {comment}
          </p>
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Optimisation de performance: ne re-render que si nécessaire
  return (
    prevProps.roundNumber === nextProps.roundNumber &&
    prevProps.view === nextProps.view &&
    prevProps.players.length === nextProps.players.length &&
    prevProps.players.every((player, index) => {
      const nextPlayer = nextProps.players[index];
      return (
        player.id === nextPlayer.id &&
        player.totalScore === nextPlayer.totalScore &&
        player.rounds.length === nextPlayer.rounds.length &&
        player.stats?.dutchCount === nextPlayer.stats?.dutchCount &&
        player.stats?.winStreak === nextPlayer.stats?.winStreak &&
        player.stats?.bestRound === nextPlayer.stats?.bestRound &&
        player.stats?.consistencyScore === nextPlayer.stats?.consistencyScore
      );
    })
  );
});

ProfCartouche.displayName = 'ProfCartouche';

export default ProfCartouche;
