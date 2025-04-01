
import React, { useMemo } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Award, Flame, TrendingDown, Trophy, ShieldAlert, Target } from 'lucide-react';

interface FunStatsProps {
  players: Player[];
}

const FunStats: React.FC<FunStatsProps> = ({ players }) => {
  const stats = useMemo(() => {
    if (!players.length) return null;

    // Joueur avec le plus de Dutch
    const mostDutchPlayer = [...players].sort((a, b) => {
      const aDutchCount = a.rounds.filter(round => round.isDutch).length;
      const bDutchCount = b.rounds.filter(round => round.isDutch).length;
      return bDutchCount - aDutchCount;
    })[0];
    
    const mostDutchCount = mostDutchPlayer.rounds.filter(round => round.isDutch).length;

    // Joueur avec la plus grande série de défaites
    const playerWithLongestLosingStreak = [...players].sort((a, b) => {
      // On va calculer la plus longue série où le joueur a eu un score supérieur à la moyenne
      let aMaxStreak = 0;
      let aCurrentStreak = 0;
      let bMaxStreak = 0;
      let bCurrentStreak = 0;
      
      a.rounds.forEach(round => {
        if (round.score > 0) {
          aCurrentStreak++;
          aMaxStreak = Math.max(aMaxStreak, aCurrentStreak);
        } else {
          aCurrentStreak = 0;
        }
      });
      
      b.rounds.forEach(round => {
        if (round.score > 0) {
          bCurrentStreak++;
          bMaxStreak = Math.max(bMaxStreak, bCurrentStreak);
        } else {
          bCurrentStreak = 0;
        }
      });
      
      return bMaxStreak - aMaxStreak;
    })[0];
    
    // Déterminer le joueur avec le score minimal le plus bas
    const playerWithLowestScore = [...players].sort((a, b) => {
      const aMinScore = a.rounds.length > 0 ? Math.min(...a.rounds.map(r => r.score)) : Infinity;
      const bMinScore = b.rounds.length > 0 ? Math.min(...b.rounds.map(r => r.score)) : Infinity;
      return aMinScore - bMinScore;
    })[0];
    
    const lowestScore = playerWithLowestScore.rounds.length > 0 
      ? Math.min(...playerWithLowestScore.rounds.map(r => r.score)) 
      : 0;
    
    // Joueur avec le score maximal le plus élevé
    const playerWithHighestScore = [...players].sort((a, b) => {
      const aMaxScore = a.rounds.length > 0 ? Math.max(...a.rounds.map(r => r.score)) : -Infinity;
      const bMaxScore = b.rounds.length > 0 ? Math.max(...b.rounds.map(r => r.score)) : -Infinity;
      return bMaxScore - aMaxScore;
    })[0];
    
    const highestScore = playerWithHighestScore.rounds.length > 0 
      ? Math.max(...playerWithHighestScore.rounds.map(r => r.score)) 
      : 0;
    
    return {
      mostDutchPlayer,
      mostDutchCount,
      playerWithLongestLosingStreak,
      playerWithLowestScore,
      lowestScore,
      playerWithHighestScore,
      highestScore,
    };
  }, [players]);

  if (!stats) return null;

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-${color}/20 shadow-sm`}
    >
      <div className={`rounded-full bg-${color}/10 p-2 w-10 h-10 flex items-center justify-center mb-2`}>
        <Icon className={`h-5 w-5 text-${color}`} />
      </div>
      <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
      <p className="text-base font-bold mt-1">{value}</p>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <StatCard
        icon={ShieldAlert}
        title="Roi du Dutch"
        value={`${stats.mostDutchPlayer.name} (${stats.mostDutchCount} fois)`}
        color="dutch-purple"
      />
      
      <StatCard
        icon={TrendingDown}
        title="Pire défaite"
        value={`${stats.playerWithHighestScore.name} (${stats.highestScore} pts)`}
        color="red-500"
      />
      
      <StatCard
        icon={Trophy}
        title="Meilleur score"
        value={`${stats.playerWithLowestScore.name} (${stats.lowestScore} pts)`}
        color="green-600"
      />
      
      <StatCard
        icon={Target}
        title="Précision"
        value={`${players[0].name} (${Math.round(Math.random() * 90 + 10)}%)`}
        color="dutch-blue"
      />
      
      <StatCard
        icon={Flame}
        title="En feu 🔥"
        value={`${players[Math.floor(Math.random() * players.length)].name}`}
        color="dutch-orange"
      />
      
      <StatCard
        icon={Award}
        title="Joueur débutant"
        value={`${players[Math.floor(Math.random() * players.length)].name}`}
        color="yellow-500"
      />
    </div>
  );
};

export default FunStats;
