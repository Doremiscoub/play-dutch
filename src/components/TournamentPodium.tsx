
import React from 'react';
import { motion } from 'framer-motion';
import { TournamentPlayer } from '@/types/tournament';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TournamentPodiumProps {
  players: TournamentPlayer[];
  isFinished: boolean;
}

const TournamentPodium: React.FC<TournamentPodiumProps> = ({ players, isFinished }) => {
  if (players.length < 3) return null;
  
  const firstPlace = players[0];
  const secondPlace = players[1];
  const thirdPlace = players[2];
  
  return (
    <div className="relative py-8">
      <div className="flex items-end justify-center gap-3 md:gap-6">
        {/* Deuxième place */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="order-1 flex flex-col items-center"
        >
          <div className="relative mb-2">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dutch-purple to-dutch-pink flex items-center justify-center shadow-lg relative"
              whileHover={{ y: -5 }}
            >
              <Medal className="w-8 h-8 md:w-10 md:h-10 text-white" />
              {secondPlace.dutchCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dutch-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {secondPlace.dutchCount}
                </span>
              )}
            </motion.div>
          </div>
          <div className="w-24 md:w-32 h-28 md:h-36 bg-gradient-to-b from-dutch-purple/20 to-dutch-purple/5 rounded-t-xl border border-dutch-purple/20 border-b-0 flex flex-col items-center justify-end p-2 relative">
            <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-5">
              <Badge variant="outline" className="bg-white/80 text-dutch-purple shadow-sm">2</Badge>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm truncate w-full">{secondPlace.name}</p>
              <p className="text-xl font-bold text-dutch-purple mt-1">{secondPlace.totalScore}</p>
              <div className="text-xs text-gray-600 flex justify-center gap-1 mt-1">
                <Award className="h-3 w-3 text-dutch-purple/70" />
                <span>{secondPlace.wins}</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Première place */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="order-2 flex flex-col items-center z-10"
        >
          <motion.div 
            animate={isFinished ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 1.5, repeat: isFinished ? Infinity : 0, repeatType: "reverse" }}
            className="relative mb-2"
          >
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-dutch-yellow to-dutch-orange flex items-center justify-center shadow-lg relative"
              whileHover={{ y: -5 }}
            >
              <Trophy className="w-10 h-10 md:w-12 md:h-12 text-white" />
              {firstPlace.dutchCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dutch-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {firstPlace.dutchCount}
                </span>
              )}
            </motion.div>
            {isFinished && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-2 bg-dutch-yellow text-white text-xs font-bold rounded-full flex items-center justify-center transform rotate-12 shadow-md"
              >
                <Star className="h-6 w-6 drop-shadow-md" fill="white" />
              </motion.div>
            )}
          </motion.div>
          <div className="w-28 md:w-36 h-36 md:h-44 bg-gradient-to-b from-dutch-yellow/20 to-dutch-yellow/5 rounded-t-xl border border-dutch-yellow/20 border-b-0 flex flex-col items-center justify-end p-2 relative">
            <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-5">
              <Badge className="bg-dutch-yellow text-white shadow-sm">1</Badge>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm truncate w-full">{firstPlace.name}</p>
              <p className="text-2xl font-bold text-dutch-orange mt-1">{firstPlace.totalScore}</p>
              <div className="text-xs text-gray-600 flex justify-center gap-1 mt-1">
                <Award className="h-3 w-3 text-dutch-orange/70" />
                <span>{firstPlace.wins}</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Troisième place */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="order-3 flex flex-col items-center"
        >
          <div className="relative mb-2">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dutch-orange to-dutch-red flex items-center justify-center shadow-lg relative"
              whileHover={{ y: -5 }}
            >
              <Medal className="w-8 h-8 md:w-10 md:h-10 text-white" />
              {thirdPlace.dutchCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dutch-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {thirdPlace.dutchCount}
                </span>
              )}
            </motion.div>
          </div>
          <div className="w-24 md:w-32 h-24 md:h-32 bg-gradient-to-b from-dutch-orange/20 to-dutch-orange/5 rounded-t-xl border border-dutch-orange/20 border-b-0 flex flex-col items-center justify-end p-2 relative">
            <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-5">
              <Badge variant="outline" className="bg-white/80 text-dutch-orange shadow-sm">3</Badge>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm truncate w-full">{thirdPlace.name}</p>
              <p className="text-xl font-bold text-dutch-orange mt-1">{thirdPlace.totalScore}</p>
              <div className="text-xs text-gray-600 flex justify-center gap-1 mt-1">
                <Award className="h-3 w-3 text-dutch-orange/70" />
                <span>{thirdPlace.wins}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Le podium */}
      <div className="flex items-end justify-center mt-0">
        <div className="w-24 md:w-32 h-6 md:h-8 bg-dutch-purple/20 rounded-t-md order-1" />
        <div className="w-28 md:w-36 h-8 md:h-10 bg-dutch-yellow/20 rounded-t-md order-2" />
        <div className="w-24 md:w-32 h-4 md:h-6 bg-dutch-orange/20 rounded-t-md order-3" />
      </div>
    </div>
  );
};

export default TournamentPodium;
