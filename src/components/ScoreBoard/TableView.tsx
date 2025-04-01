
import React, { useState } from 'react';
import { Player } from '@/types';
import ProfCartouche from '@/components/ProfCartouche';
import ScoreHistoryTable from '@/components/ScoreHistoryTable';
import PlayerStatsTable from '@/components/PlayerStatsTable';
import DetailedPlayerStats from '@/components/DetailedPlayerStats';

interface TableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

/**
 * Affichage des scores sous forme de tableau et statistiques détaillées
 */
const TableView: React.FC<TableViewProps> = ({ players, roundHistory }) => {
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);
  
  const handleTogglePlayerStats = (playerId: string) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  return (
    <div className="space-y-4">
      <ProfCartouche 
        players={players} 
        roundNumber={players.length > 0 ? players[0].rounds.length : 0}
        view="table"
      />
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
            Historique des manches
          </h2>
          <ScoreHistoryTable 
            players={players}
            roundHistory={roundHistory}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
            Statistiques des joueurs
          </h2>
          <PlayerStatsTable players={players} />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
            Détails par joueur
          </h2>
          
          {sortedPlayers.map((player, index) => (
            <DetailedPlayerStats
              key={player.id}
              player={player}
              isExpanded={expandedPlayer === player.id}
              onToggle={() => handleTogglePlayerStats(player.id)}
              isFirst={index === 0}
              isLast={index === sortedPlayers.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableView;
