
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, Target } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GameStatsCardsProps {
  playerCount: number;
  estimatedDuration: number;
  difficulty: string;
}

const GameStatsCards: React.FC<GameStatsCardsProps> = ({
  playerCount,
  estimatedDuration,
  difficulty
}) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4 }
    }
  };

  const stats = [
    {
      icon: Users,
      label: 'Nombre de joueurs',
      value: playerCount,
      color: 'dutch-blue'
    },
    {
      icon: Clock,
      label: 'Durée estimée',
      value: `${estimatedDuration} min`,
      color: 'dutch-purple'
    },
    {
      icon: Target,
      label: 'Niveau de difficulté',
      value: difficulty,
      color: 'dutch-orange'
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GameStatsCards;
