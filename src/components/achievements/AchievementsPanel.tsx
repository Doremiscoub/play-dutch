
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/types/achievements';
import { AchievementCard } from './AchievementCard';
import { GameBadge } from '@/components/ui/game-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Award, Filter } from 'lucide-react';

interface AchievementsPanelProps {
  achievements: Achievement[];
  totalXP: number;
  level: number;
  playerTitle?: string;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  achievements,
  totalXP,
  level,
  playerTitle
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionRate = (unlockedCount / achievements.length) * 100;
  const nextLevelXP = (level) * 1000;
  const currentLevelProgress = ((totalXP % 1000) / 1000) * 100;

  const filteredAchievements = achievements.filter(achievement => {
    const statusMatch = filter === 'all' || 
      (filter === 'unlocked' && achievement.unlocked) || 
      (filter === 'locked' && !achievement.unlocked);
    
    const rarityMatch = rarityFilter === 'all' || achievement.rarity === rarityFilter;
    
    return statusMatch && rarityMatch;
  });

  const achievementsByRarity = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.rarity]) acc[achievement.rarity] = [];
    acc[achievement.rarity].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  return (
    <div className="space-y-6">
      {/* Player Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-dutch-blue/10 to-dutch-purple/10 rounded-2xl p-6 border border-white/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-dutch-blue flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Succès & Récompenses
            </h2>
            {playerTitle && (
              <GameBadge
                text={playerTitle}
                type="legendary"
                effect="sparkle"
                className="mt-2"
              />
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-dutch-purple">Niveau {level}</div>
            <div className="text-sm text-gray-600">{totalXP} XP total</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progression vers niveau {level + 1}</span>
            <span>{totalXP % 1000}/1000 XP</span>
          </div>
          <Progress value={currentLevelProgress} className="h-3" />
          
          <div className="flex justify-between text-sm">
            <span>Succès débloqués</span>
            <span>{unlockedCount}/{achievements.length} ({Math.round(completionRate)}%)</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
      </motion.div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <div className="flex justify-between items-center">
          <TabsList className="bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="all">Tous ({achievements.length})</TabsTrigger>
            <TabsTrigger value="unlocked">Débloqués ({unlockedCount})</TabsTrigger>
            <TabsTrigger value="locked">Verrouillés ({achievements.length - unlockedCount})</TabsTrigger>
          </TabsList>
          
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
            className="px-3 py-1 rounded-lg bg-white/60 backdrop-blur-sm border border-white/30 text-sm"
          >
            <option value="all">Toutes raretés</option>
            <option value="common">Commun</option>
            <option value="rare">Rare</option>
            <option value="epic">Épique</option>
            <option value="legendary">Légendaire</option>
          </select>
        </div>

        <TabsContent value={filter} className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${rarityFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredAchievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun succès trouvé avec ces filtres</p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Rarity Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
      >
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Star className="h-4 w-4" />
          Répartition par rareté
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {Object.entries(achievementsByRarity).map(([rarity, rarityAchievements]) => {
            const unlockedInRarity = rarityAchievements.filter(a => a.unlocked).length;
            return (
              <div key={rarity} className="space-y-2">
                <GameBadge
                  type={rarity as any}
                  text={rarity}
                  size="auto"
                  className="w-full justify-center py-2"
                />
                <div className="text-sm">
                  <div className="font-medium">{unlockedInRarity}/{rarityAchievements.length}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round((unlockedInRarity / rarityAchievements.length) * 100)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
