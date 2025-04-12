
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

  // If no players, show a message
  if (sortedPlayers.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/70">
        <p className="text-gray-500">Aucun joueur pour le moment</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Player score cards */}
      <div className="space-y-4 w-full">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full"
            onClick={() => isDesktop && onPlayerSelect ? onPlayerSelect(player) : null}
          >
            <PlayerScoreCard 
              player={player}
              position={index + 1}
              isWinner={index === 0}
              warningThreshold={scoreLimit ? scoreLimit * 0.8 : undefined}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Mobile stats drawer */}
      {!isDesktop && sortedPlayers.length > 0 && (
        <div className="mt-4 flex justify-center">
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
    </div>
  );
};

export default PlayerListView;
