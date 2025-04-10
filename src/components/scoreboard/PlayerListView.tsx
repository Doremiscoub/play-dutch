
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import PlayerScoreCard from '@/components/PlayerScoreCard';
import { animationVariants } from '@/utils/animationUtils';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import PlayerDetailedStats from '@/components/PlayerDetailedStats';

interface PlayerListViewProps {
  players: Player[];
  isDesktop: boolean;
  scoreLimit?: number;
  onPlayerSelect?: (player: Player) => void;
}

const PlayerListView: React.FC<PlayerListViewProps> = ({ 
  players, 
  isDesktop,
  scoreLimit,
  onPlayerSelect
}) => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);

  return (
    <motion.div
      key="list-view"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      variants={animationVariants.staggerChildren}
      className="space-y-4"
    >
      {sortedPlayers.map((player, index) => (
        <motion.div
          key={player.id}
          variants={animationVariants.staggerItem}
          layoutId={`player-card-${player.id}`}
          whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
          className="cursor-pointer"
          onClick={() => isDesktop && onPlayerSelect ? onPlayerSelect(player) : null}
        >
          <PlayerScoreCard 
            player={player}
            position={index + 1}
            isWinner={index === 0}
            lastRoundScore={player.rounds.length > 0 ? player.rounds[player.rounds.length - 1].score : undefined}
            warningThreshold={scoreLimit ? scoreLimit * 0.8 : undefined}
          />
        </motion.div>
      ))}
      
      {sortedPlayers.length === 0 && (
        <div className="text-center p-8 bg-white/70 rounded-2xl shadow-sm border border-white/50">
          <p className="text-gray-500">Aucun joueur pour le moment</p>
        </div>
      )}
      
      {/* Drawer for mobile stats */}
      {!isDesktop && (
        <div className="mt-8 flex justify-center">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="bg-white text-dutch-purple border border-dutch-purple/20 hover:bg-dutch-purple/10">
                Voir les statistiques détaillées
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white rounded-t-3xl p-4 max-h-[85vh]">
              <div className="space-y-6 overflow-y-auto max-h-[80vh] px-1 py-2">
                <h3 className="font-bold text-lg text-center text-dutch-purple">Statistiques détaillées</h3>
                {sortedPlayers.map((player) => (
                  <div key={player.id} className="space-y-2">
                    <h4 className="font-medium text-gray-700">{player.name}</h4>
                    <PlayerDetailedStats player={player} />
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </motion.div>
  );
};

export default PlayerListView;
