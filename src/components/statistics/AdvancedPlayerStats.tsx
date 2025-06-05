
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Line, Bar, Radar } from 'recharts';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, BarChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';

interface AdvancedPlayerStatsProps {
  player: Player;
  gameHistory?: any[];
}

export const AdvancedPlayerStats: React.FC<AdvancedPlayerStatsProps> = ({ 
  player, 
  gameHistory = [] 
}) => {
  // Prepare data for score progression chart
  const scoreProgressionData = player.rounds.map((round, index) => ({
    round: index + 1,
    score: round.score,
    total: player.rounds.slice(0, index + 1).reduce((sum, r) => sum + r.score, 0),
    isDutch: round.isDutch
  }));

  // Prepare data for performance radar
  const performanceData = [
    {
      subject: 'Précision',
      value: Math.max(0, 100 - (player.totalScore / player.rounds.length) * 2),
      fullMark: 100,
    },
    {
      subject: 'Régularité',
      value: Math.max(0, 100 - (player.rounds.length > 1 ? 
        Math.sqrt(player.rounds.reduce((acc, round, _, arr) => {
          const avg = arr.reduce((s, r) => s + r.score, 0) / arr.length;
          return acc + Math.pow(round.score - avg, 2);
        }, 0) / player.rounds.length) : 0) * 5),
      fullMark: 100,
    },
    {
      subject: 'Efficacité',
      value: (player.rounds.filter(r => r.isDutch).length / Math.max(1, player.rounds.length)) * 100,
      fullMark: 100,
    },
    {
      subject: 'Expérience',
      value: Math.min(100, player.rounds.length * 2),
      fullMark: 100,
    },
    {
      subject: 'Amélioration',
      value: player.rounds.length > 5 ? Math.max(0, 
        (player.rounds.slice(0, Math.floor(player.rounds.length / 2)).reduce((s, r) => s + r.score, 0) / Math.floor(player.rounds.length / 2) -
         player.rounds.slice(Math.floor(player.rounds.length / 2)).reduce((s, r) => s + r.score, 0) / Math.ceil(player.rounds.length / 2)) * 2
      ) : 50,
      fullMark: 100,
    }
  ];

  // Prepare score distribution data
  const scoreDistribution = Array.from({ length: 10 }, (_, i) => {
    const range = i * 5;
    const count = player.rounds.filter(r => r.score >= range && r.score < range + 5).length;
    return {
      range: `${range}-${range + 4}`,
      count,
      percentage: (count / player.rounds.length) * 100
    };
  });

  return (
    <div className="space-y-6">
      {/* Score Progression Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-dutch-blue" />
          Progression des Scores
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreProgressionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="round" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Score manche"
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                name="Score total"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Performance Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-dutch-purple" />
          Analyse de Performance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={performanceData}>
              <PolarGrid stroke="rgba(0,0,0,0.1)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#6B7280' }}
              />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#8B5CF6"
                fill="rgba(139, 92, 246, 0.2)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Score Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-dutch-orange" />
          Distribution des Scores
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis 
                dataKey="range" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="rgba(255, 159, 10, 0.8)"
                stroke="#FF9F0A"
                strokeWidth={1}
                name="Nombre de manches"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: 'Meilleur Score',
            value: Math.min(...player.rounds.map(r => r.score)),
            icon: Target,
            color: 'text-green-600',
            bg: 'bg-green-100'
          },
          {
            label: 'Pire Score',
            value: Math.max(...player.rounds.map(r => r.score)),
            icon: TrendingUp,
            color: 'text-red-600',
            bg: 'bg-red-100'
          },
          {
            label: 'Dutch Réalisés',
            value: player.rounds.filter(r => r.isDutch).length,
            icon: Zap,
            color: 'text-yellow-600',
            bg: 'bg-yellow-100'
          },
          {
            label: 'Manches Jouées',
            value: player.rounds.length,
            icon: BarChart3,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
          }
        ].map((stat, index) => (
          <div 
            key={stat.label}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30"
          >
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
