
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Users, Target, Zap, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TournamentPreviewProps {
  tournamentName: string;
  players: string[];
  rounds: number;
}

const TournamentPreview: React.FC<TournamentPreviewProps> = ({
  tournamentName,
  players,
  rounds
}) => {
  const estimatedDuration = rounds * 12; // minutes
  const totalMatches = rounds;
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
  };

  const getTournamentType = () => {
    if (players.length <= 4) return { type: 'Express', color: 'bg-green-100 text-green-800 border-green-200' };
    if (players.length <= 6) return { type: 'Standard', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    return { type: 'Premium', color: 'bg-purple-100 text-purple-800 border-purple-200' };
  };

  const tournamentType = getTournamentType();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="bg-gradient-to-br from-dutch-orange/10 via-white/80 to-dutch-pink/10 backdrop-blur-sm border-white/60">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-dutch-orange" />
                  {tournamentName}
                </h3>
                <p className="text-sm text-gray-600">Aperçu du tournoi</p>
              </div>
              <Badge className={tournamentType.color}>
                {tournamentType.type}
              </Badge>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 rounded-xl p-3 text-center border border-white/50">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-4 w-4 text-dutch-blue" />
                  <span className="font-bold text-lg text-dutch-blue">{players.length}</span>
                </div>
                <p className="text-xs text-gray-600">Participants</p>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3 text-center border border-white/50">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-4 w-4 text-dutch-purple" />
                  <span className="font-bold text-lg text-dutch-purple">{rounds}</span>
                </div>
                <p className="text-xs text-gray-600">Manches</p>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3 text-center border border-white/50">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-4 w-4 text-dutch-pink" />
                  <span className="font-bold text-lg text-dutch-pink">{formatDuration(estimatedDuration)}</span>
                </div>
                <p className="text-xs text-gray-600">Durée estimée</p>
              </div>
              
              <div className="bg-white/70 rounded-xl p-3 text-center border border-white/50">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="h-4 w-4 text-dutch-orange" />
                  <span className="font-bold text-lg text-dutch-orange">{totalMatches}</span>
                </div>
                <p className="text-xs text-gray-600">Parties</p>
              </div>
            </div>
            
            {/* Tournament Features */}
            <div className="bg-dutch-blue/10 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-dutch-blue" />
                <span className="text-sm font-medium text-dutch-blue">Fonctionnalités incluses</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-dutch-blue rounded-full"></span>
                  Classement en temps réel
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-dutch-blue rounded-full"></span>
                  Statistiques détaillées
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-dutch-blue rounded-full"></span>
                  Certificat de victoire
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-dutch-blue rounded-full"></span>
                  Historique complet
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TournamentPreview;
