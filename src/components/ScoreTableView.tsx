
import React from 'react';
import { Player } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap, Clock, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoreTableViewProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreTableView: React.FC<ScoreTableViewProps> = ({ players, roundHistory }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Manches</h3>
        <div className="bg-white/70 rounded-xl shadow-sm p-3 border border-white/30 overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="py-2 px-3 text-left">Manche</th>
                {players.map(player => (
                  <th key={player.id} className="py-2 px-3 text-center">{player.name}</th>
                ))}
                <th className="py-2 px-3 text-center">Dutch</th>
              </tr>
            </thead>
            <tbody>
              {roundHistory.map((round, roundIndex) => (
                <tr key={roundIndex} className="border-t border-gray-100">
                  <td className="py-2 px-3 text-sm font-medium">{roundIndex + 1}</td>
                  {players.map((player, playerIndex) => {
                    const isDutch = player.id === round.dutchPlayerId;
                    return (
                      <td 
                        key={`${player.id}-${roundIndex}`} 
                        className={`py-2 px-3 text-center ${isDutch ? 'bg-dutch-orange/10 text-dutch-orange font-medium' : ''}`}
                      >
                        {round.scores[playerIndex]}
                      </td>
                    );
                  })}
                  <td className="py-2 px-3 text-center">
                    {round.dutchPlayerId && (
                      <span className="text-dutch-orange font-medium">
                        {players.find(p => p.id === round.dutchPlayerId)?.name.slice(0, 3) || ''}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Statistiques globales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/70 backdrop-blur-md shadow-sm border border-white/30 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">{player.name}</h4>
                    <div className="font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                      {player.totalScore} pts
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Trophy className="h-4 w-4 text-dutch-orange" />
                      <span>Score total: {player.totalScore}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target className="h-4 w-4 text-dutch-blue" />
                      <span>Moyenne: {player.stats?.averageScore.toFixed(1) || 0}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Zap className="h-4 w-4 text-dutch-purple" />
                      <span>Dutch: {player.stats?.dutchCount || 0}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Meilleur: {player.stats?.bestRound || '-'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Flame className="h-4 w-4 text-red-500" />
                      <span>Pire: {player.stats?.worstRound || '-'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>Manches: {player.rounds.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreTableView;
