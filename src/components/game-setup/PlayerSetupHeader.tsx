
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Crown } from 'lucide-react';

interface PlayerSetupHeaderProps {
  playersCount: number;
}

const PlayerSetupHeader: React.FC<PlayerSetupHeaderProps> = ({ playersCount }) => {
  const estimatedDuration = Math.round(playersCount * 8 + 15);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6 relative z-10"
    >
      {/* Titre principal avec effet de brillance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-2 relative"
      >
        {/* Effet de brillance en arrière-plan */}
        <motion.div
          className="absolute -inset-8 bg-gradient-to-r from-dutch-blue/10 via-dutch-purple/10 to-dutch-orange/10 rounded-3xl blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.h3 
          className="text-3xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent relative z-10"
          animate={{
            backgroundPosition: ['0%', '100%', '0%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% auto'
          }}
        >
          Configuration des joueurs
        </motion.h3>
        <motion.p 
          className="text-sm text-gray-600 max-w-md mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Ajoutez vos amis et personnalisez votre partie Dutch
        </motion.p>
      </motion.div>

      {/* Statistiques en grille avec animations améliorées */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {/* Nombre de joueurs */}
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 rounded-3xl blur-lg"
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="relative bg-gradient-to-br from-dutch-blue/15 via-dutch-blue/8 to-dutch-purple/15 backdrop-blur-xl rounded-3xl px-6 py-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center gap-4">
              <motion.div 
                className="p-3 bg-dutch-blue/25 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="h-6 w-6 text-dutch-blue" />
              </motion.div>
              <div className="text-center">
                <motion.div
                  key={playersCount}
                  initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="text-3xl font-bold text-dutch-blue"
                >
                  {playersCount}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">
                  Joueur{playersCount > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Durée estimée */}
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-dutch-orange/20 to-dutch-orange/30 rounded-3xl blur-lg"
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
          />
          <div className="relative bg-gradient-to-br from-dutch-orange/15 via-dutch-orange/8 to-dutch-orange/20 backdrop-blur-xl rounded-3xl px-6 py-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center gap-4">
              <motion.div 
                className="p-3 bg-dutch-orange/25 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Clock className="h-6 w-6 text-dutch-orange" />
              </motion.div>
              <div className="text-center">
                <motion.div
                  key={estimatedDuration}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-dutch-orange"
                >
                  {estimatedDuration}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">
                  Minutes
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Niveau de difficulté */}
        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-dutch-purple/20 to-dutch-purple/30 rounded-3xl blur-lg"
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }}
          />
          <div className="relative bg-gradient-to-br from-dutch-purple/15 via-dutch-purple/8 to-dutch-purple/20 backdrop-blur-xl rounded-3xl px-6 py-6 border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center gap-4">
              <motion.div 
                className="p-3 bg-dutch-purple/25 rounded-2xl"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Crown className="h-6 w-6 text-dutch-purple" />
              </motion.div>
              <div className="text-center">
                <div className="text-xl font-bold text-dutch-purple">
                  {playersCount <= 3 ? 'Facile' : playersCount <= 6 ? 'Moyen' : 'Expert'}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Niveau
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PlayerSetupHeader;
