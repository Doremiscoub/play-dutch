import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar,
  Trophy, 
  Users, 
  Clock, 
  Target,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Play,
  Share2,
  Trash2,
  Archive,
  Star,
  Zap
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useGameHistory } from '@/hooks/persistence/useGameHistory';
import { Player, Game } from '@/types';
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { db } from '@/lib/database';

interface GameHistoryEntry {
  id: string;
  name: string;
  players: Player[];
  winner: Player;
  totalRounds: number;
  duration: number;
  scoreLimit: number;
  completedAt: Date;
  tags: string[];
  notes?: string;
  memorable?: boolean;
  averageScore: number;
  closestGame?: boolean;
}

interface EnhancedGameHistoryProps {
  onReplayGame?: (gameId: string) => void;
  onShareGame?: (gameId: string) => void;
  className?: string;
}

export const EnhancedGameHistory: React.FC<EnhancedGameHistoryProps> = ({
  onReplayGame,
  onShareGame,
  className
}) => {
  const { gameHistory, deleteGame } = useGameHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'duration' | 'players'>('recent');

  // Transformation des données avec enrichissement
  const enrichedHistory: GameHistoryEntry[] = useMemo(() => {
    return gameHistory.map(game => {
      // Simuler les données de joueur pour la démo
      const simulatedPlayers: Player[] = game.players.map((p, index) => ({
        id: `${game.id}-player-${index}`,
        name: p.name,
        emoji: ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀'][index % 8],
        totalScore: p.score,
        rounds: [],
        avatarColor: '#8B5CF6'
      }));
      
      const winner = simulatedPlayers[0] || simulatedPlayers.reduce((prev, current) => 
        prev.totalScore < current.totalScore ? prev : current
      );
      
      const totalRounds = game.rounds || 5; // Utiliser les données stockées
      const duration = totalRounds * 5; // Estimation 5min/manche
      
      const averageScore = game.players.reduce((sum, p) => sum + p.score, 0) / game.players.length;
      const scoreSpread = Math.max(...game.players.map(p => p.score)) - Math.min(...game.players.map(p => p.score));
      const closestGame = scoreSpread < (game.scoreLimit * 0.3); // Partie serrée si écart < 30% de la limite
      
      const completedAt = new Date(game.gameStartTime || Date.now());
      
      // Tags automatiques
      const tags = [];
      if (game.players.length >= 6) tags.push('Grande partie');
      if (closestGame) tags.push('Partie serrée');
      if (totalRounds >= 10) tags.push('Marathon');
      if (totalRounds <= 3) tags.push('Partie express');
      if (isToday(completedAt)) tags.push('Aujourd\'hui');
      
      return {
        id: game.id || crypto.randomUUID(),
        name: `Partie ${format(completedAt, 'dd/MM/yyyy', { locale: fr })}`,
        players: simulatedPlayers,
        winner,
        totalRounds,
        duration,
        scoreLimit: scoreLimit,
        completedAt,
        tags,
        memorable: closestGame || game.players.length >= 8,
        averageScore: Math.round(averageScore),
        closestGame
      };
    });
  }, [storedGames]);

  // Filtrage et tri
  const filteredHistory = useMemo(() => {
    let filtered = enrichedHistory;

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.players.some(player => 
          player.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        game.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filtre par période
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(game => {
        switch (selectedFilter) {
          case 'today': return isToday(game.completedAt);
          case 'week': return isThisWeek(game.completedAt);
          case 'month': return isThisMonth(game.completedAt);
          default: return true;
        }
      });
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'duration':
          return b.duration - a.duration;
        case 'players':
          return b.players.length - a.players.length;
        default: // recent
          return b.completedAt.getTime() - a.completedAt.getTime();
      }
    });

    return filtered;
  }, [enrichedHistory, searchQuery, selectedFilter, sortBy]);

  const getTimeAgo = (date: Date) => {
    if (isToday(date)) return 'Aujourd\'hui';
    if (isYesterday(date)) return 'Hier';
    return format(date, 'dd MMM yyyy', { locale: fr });
  };

  const getGameIntensity = (game: GameHistoryEntry) => {
    if (game.totalRounds >= 10) return { color: 'red', label: 'Intense' };
    if (game.totalRounds >= 6) return { color: 'orange', label: 'Moyen' };
    return { color: 'green', label: 'Rapide' };
  };

  if (filteredHistory.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="text-center py-12">
          <div className="text-4xl mb-4">🎲</div>
          <h3 className="text-lg font-semibold mb-2">Aucune partie trouvée</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedFilter !== 'all' 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Créez votre première partie pour voir l\'historique ici'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Contrôles */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Archive className="w-5 h-5" />
              Historique des parties
            </CardTitle>
            <Badge variant="outline">
              {filteredHistory.length} partie{filteredHistory.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par joueur, date ou tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtres */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'today', 'week', 'month'].map(filter => (
              <Button
                key={filter}
                onClick={() => setSelectedFilter(filter as any)}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
              >
                {filter === 'all' ? 'Toutes' : 
                 filter === 'today' ? 'Aujourd\'hui' :
                 filter === 'week' ? 'Cette semaine' :
                 'Ce mois'}
              </Button>
            ))}
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Trier par:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm bg-transparent border border-border rounded px-2 py-1"
            >
              <option value="recent">Plus récent</option>
              <option value="duration">Durée</option>
              <option value="players">Nb joueurs</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des parties */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredHistory.map((game, index) => {
            const intensity = getGameIntensity(game);
            
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-r from-white/90 to-white/60 backdrop-blur-md border border-white/20 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        {/* En-tête avec badges */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{game.name}</h3>
                            {game.memorable && (
                              <Star className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => onReplayGame?.(game.id)}>
                                <Play className="w-4 h-4 mr-2" />
                                Rejouer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onShareGame?.(game.id)}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Partager
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteGameFromHistory(game.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Infos principales */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">{game.winner.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span>{game.players.length} joueurs</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{game.totalRounds} manches</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span>{getTimeAgo(game.completedAt)}</span>
                          </div>
                        </div>

                        {/* Stats avancées */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            <span>Limite: {game.scoreLimit}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Moy: {game.averageScore}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              intensity.color === 'red' ? 'border-red-500 text-red-700' :
                              intensity.color === 'orange' ? 'border-orange-500 text-orange-700' :
                              'border-green-500 text-green-700'
                            }`}
                          >
                            {intensity.label}
                          </Badge>
                        </div>

                        {/* Tags */}
                        {game.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {game.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {game.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{game.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Podium mini */}
                        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                          {game.players.slice(0, 3).map((player, idx) => (
                            <div key={player.id} className="flex items-center gap-1 text-xs">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                idx === 0 ? 'bg-yellow-500' : 
                                idx === 1 ? 'bg-gray-400' : 
                                'bg-amber-600'
                              }`}>
                                {idx + 1}
                              </span>
                              <span>{player.name}</span>
                              <span className="text-muted-foreground">({player.totalScore})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Barre de couleur selon l'intensité */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                    intensity.color === 'red' ? 'bg-red-500' :
                    intensity.color === 'orange' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`} />
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedGameHistory;