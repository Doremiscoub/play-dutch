
import React from 'react';
import { motion } from 'framer-motion';
import { Medal, Trophy, Star, Award, Sparkles } from 'lucide-react';
import { Player } from '@/types';

interface PodiumStandingProps {
  player: Player;
  position: number;
}

const PodiumStanding: React.FC<PodiumStandingProps> = ({ player, position }) => {
  // Configuration based on podium position
  const config = {
    1: {
      containerClass: "relative z-10 mx-2",
      initialScale: 0.9,
      avatarSize: "w-24 h-24",
      podiumSize: "w-28 h-56",
      avatarBg: "bg-gradient-to-br from-yellow-100 to-yellow-300",
      podiumBg: "bg-gradient-to-b from-yellow-100 to-yellow-200",
      icon: <Trophy className="h-8 w-8 text-yellow-500 mb-2 drop-shadow" />,
      fontSize: "text-4xl",
      iconClass: "text-yellow-500",
      nameClass: "text-base",
      scoreClass: "text-sm text-gray-800 bg-white/70 px-3 py-1 rounded-full font-bold",
    },
    2: {
      containerClass: "relative mx-2",
      initialScale: 1,
      avatarSize: "w-20 h-20",
      podiumSize: "w-24 h-40",
      avatarBg: "bg-gradient-to-br from-gray-200 to-gray-300",
      podiumBg: "bg-gradient-to-b from-gray-100 to-gray-200",
      icon: <Medal className="h-6 w-6 text-gray-400 mb-1" />,
      fontSize: "text-3xl",
      iconClass: "text-gray-400",
      nameClass: "text-sm",
      scoreClass: "text-xs text-gray-600 bg-white/70 px-2 py-1 rounded-full",
    },
    3: {
      containerClass: "relative mx-2",
      initialScale: 1,
      avatarSize: "w-16 h-16",
      podiumSize: "w-20 h-32",
      avatarBg: "bg-gradient-to-br from-orange-100 to-orange-200",
      podiumBg: "bg-gradient-to-b from-orange-50 to-orange-100",
      icon: <Medal className="h-5 w-5 text-orange-700 mb-1" />,
      fontSize: "text-2xl",
      iconClass: "text-orange-700",
      nameClass: "text-xs",
      scoreClass: "text-xs text-gray-600 bg-white/70 px-2 py-0.5 rounded-full",
    }
  }[position];

  // If position isn't 1, 2, or 3, we shouldn't render anything
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * position }}
      className={config.containerClass}
    >
      <div className="flex flex-col items-center">
        {position === 1 && (
          <>
            {/* Couronne animée */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: [-5, -8, -5], opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2"
            >
              <Award className="h-10 w-10 text-yellow-500 filter drop-shadow-lg" />
            </motion.div>
            
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Sparkles className="h-8 w-8 text-yellow-500 mb-2" />
            </motion.div>
          </>
        )}
        
        <div className={`${config.avatarSize} rounded-full border-4 border-white ${config.avatarBg} flex items-center justify-center overflow-hidden mb-2 shadow-md`}>
          <span className={config.fontSize}>{player.name.charAt(0)}</span>
        </div>
        
        <div className={`${config.podiumSize} ${config.podiumBg} rounded-t-lg flex flex-col items-center justify-center p-2 relative shadow-lg`}>
          {config.icon}
          <p className={`font-bold ${config.nameClass} mb-1`}>{player.name}</p>
          <p className={config.scoreClass}>{player.totalScore} pts</p>
          
          {position === 1 && (
            <>
              <div className="absolute -top-2 left-0 right-0 flex justify-center">
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 filter drop-shadow" />
              </div>
              
              {/* Rayonnement derrière le vainqueur */}
              <motion.div
                className="absolute -inset-4 -z-10 opacity-20"
                animate={{ 
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 rounded-full blur-lg" />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PodiumStanding;
