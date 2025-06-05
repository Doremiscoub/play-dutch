
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Player } from '@/types';
import PlayerRankBadge from '../../game/PlayerRankBadge';
import PlayerCardStats from './PlayerCardStats';
import PlayerCardTrends from './PlayerCardTrends';
import PlayerCardRecentRounds from './PlayerCardRecentRounds';
import PlayerCardScore from './PlayerCardScore';
import { cn } from '@/lib/utils';

interface PlayerCardContentProps {
  player: Player;
  rank: number;
  isExpanded: boolean;
  cardData: {
    isWinner: boolean;
    isLastPlace: boolean;
    recentRounds: any[];
    hasPositiveTrend: boolean;
    hasNegativeTrend: boolean;
    dutchCount: number;
    currentStreak: number;
  };
}

const PlayerCardContent: React.FC<PlayerCardContentProps> = ({
  player,
  rank,
  isExpanded,
  cardData
}) => {
  return (
    <div className="relative z-10 p-4">
      {/* Vue compacte par défaut */}
      <div className="flex items-center gap-4">
        <PlayerRankBadge 
          position={rank} 
          size="lg" 
          showAnimation={true}
        />
        
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl">{player.emoji || '😊'}</span>
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {player.name}
          </h3>
        </div>

        <PlayerCardScore
          score={player.totalScore}
          rank={rank}
          roundCount={player.rounds.length}
          isWinner={cardData.isWinner}
        />

        <ChevronDown 
          className={cn(
            "h-6 w-6 text-gray-400 transition-transform duration-300 ml-2",
            isExpanded ? "rotate-180" : ""
          )}
        />
      </div>

      {/* Contenu étendu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="space-y-4">
              {/* Tendances et statistiques */}
              <PlayerCardTrends
                player={player}
                hasPositiveTrend={cardData.hasPositiveTrend}
                hasNegativeTrend={cardData.hasNegativeTrend}
                dutchCount={cardData.dutchCount}
                currentStreak={cardData.currentStreak}
              />
              
              <PlayerCardStats player={player} rank={rank} />
              
              <PlayerCardRecentRounds player={player} rank={rank} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerCardContent;
