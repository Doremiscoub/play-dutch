
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Crown, Zap, AlertTriangle } from 'lucide-react';
import { GameCard } from '@/components/ui/game-card';
import { GameText, ScoreText, ActionText } from '@/components/ui/game-typography';
import { GameButton } from '@/components/ui/game-button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect?: (player: Player) => void;
  isSelected?: boolean;
}

const FunPlayerCard: React.FC<FunPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected = false
}) => {
  const isWinner = rank === 1;
  const isDanger = player.totalScore >= 80;
  const roundCount = player.rounds.length;

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🎯';
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score <= 0) return 'text-green-600 bg-green-50';
    if (score <= 10) return 'text-blue-600 bg-blue-50';
    if (score <= 20) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <GameCard 
        variant={isWinner ? "pokemonCard" : "playingCard"}
        interactive={!!onSelect}
        className={`p-6 cursor-pointer transition-all ${
          isSelected ? 'ring-4 ring-dutch-purple ring-offset-2' : ''
        } ${isDanger ? 'border-red-500 bg-red-50/30' : ''}`}
        onClick={() => onSelect?.(player)}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-dutch-purple/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-dutch-blue/10 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            {/* Player info */}
            <div className="flex items-center gap-3">
              <GameCard variant="unoCard" className="w-12 h-12 flex items-center justify-center">
                <ActionText gameColor="white" className="text-xl">
                  {getRankEmoji(rank)}
                </ActionText>
              </GameCard>
              
              <div>
                <GameText variant="cardTitle" className="font-bold">
                  {player.name}
                </GameText>
                <GameText variant="caption" gameColor="default" className="opacity-70">
                  {rank === 1 ? 'En tête !' : 
                   rank === totalPlayers ? 'Dernière place' : 
                   `${rank}e position`}
                </GameText>
              </div>
            </div>

            {/* Score display */}
            <div className="text-right">
              <GameCard variant="score" className="px-4 py-2 inline-block">
                <ScoreText 
                  gameColor={isDanger ? "accent" : isWinner ? "primary" : "default"}
                  className="text-3xl"
                >
                  {player.totalScore}
                </ScoreText>
              </GameCard>
              
              {isDanger && (
                <div className="flex items-center justify-center mt-1">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  <GameText variant="caption" gameColor="accent">
                    Danger !
                  </GameText>
                </div>
              )}
            </div>
          </div>

          {/* Last round highlight */}
          {roundCount > 0 && (
            <div className="mb-3">
              <GameText variant="caption" className="text-gray-600 mb-1">
                Dernière manche :
              </GameText>
              <GameCard variant="playingCard" className="px-3 py-1 inline-block">
                <ActionText 
                  className={`text-lg ${getScoreColorClass(player.rounds[roundCount - 1].score)}`}
                >
                  {player.rounds[roundCount - 1].isDutch && '🔥 '}
                  {player.rounds[roundCount - 1].score} pts
                </ActionText>
              </GameCard>
            </div>
          )}

          {/* Round scores */}
          {roundCount > 0 && (
            <ScrollArea className="w-full" orientation="horizontal">
              <div className="flex gap-2 py-2">
                {player.rounds.map((round, idx) => (
                  <motion.div
                    key={`round-${idx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <GameCard 
                      variant={round.isDutch ? "unoCard" : "playingCard"}
                      className="min-w-[40px] h-10 flex items-center justify-center"
                    >
                      <ActionText 
                        gameColor={round.isDutch ? "white" : "default"}
                        className="text-sm font-bold"
                      >
                        {round.score}
                      </ActionText>
                    </GameCard>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Average score */}
          {roundCount > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <GameText variant="caption" gameColor="default">
                  Moyenne par manche
                </GameText>
                <GameText variant="body" className="font-semibold">
                  {(player.totalScore / roundCount).toFixed(1)} pts
                </GameText>
              </div>
            </div>
          )}
        </div>
      </GameCard>
    </motion.div>
  );
};

export default FunPlayerCard;
