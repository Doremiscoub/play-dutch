
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Input } from '@/components/ui/input';

interface Player {
  name: string;
  emoji: string;
}

interface PlayerCardProps {
  player: Player;
  index: number;
  onUpdateName: (index: number, name: string) => void;
  onRandomizeEmoji: (index: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  onUpdateName,
  onRandomizeEmoji
}) => {
  return (
    <motion.div
      key={`${player.name}-${index}`}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.8, rotateX: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        layout: { duration: 0.4, ease: "easeInOut" },
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative"
    >
      {/* Effet de lueur au hover */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/10 via-dutch-purple/10 to-dutch-orange/10 rounded-3xl blur-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <UnifiedCard variant="light" padding="none" interactive className="group overflow-hidden relative z-10 border-2 border-white/60 hover:border-white/80 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-6 p-6">
          {/* Position du joueur avec effet de couronne */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 border-3 border-gray-200/80 shadow-lg">
              {index + 1}
            </div>
            {index === 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-2 -right-2"
                whileHover={{ scale: 1.3, rotate: 20 }}
              >
                <Crown className="h-5 w-5 text-yellow-500 drop-shadow-lg" />
              </motion.div>
            )}
          </motion.div>

          {/* Emoji du joueur avec effets avancés */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.8, rotate: -15 }}
            onClick={() => onRandomizeEmoji(index)}
            className="
              relative p-4 rounded-3xl text-3xl transition-all duration-300 min-w-[4rem] h-16 flex items-center justify-center
              bg-gradient-to-br from-dutch-orange/20 via-dutch-orange/30 to-dutch-orange/40 
              hover:from-dutch-orange/40 hover:via-dutch-orange/50 hover:to-dutch-orange/60
              border-3 border-dutch-orange/50 hover:border-dutch-orange/80
              shadow-xl hover:shadow-2xl
              group/emoji overflow-hidden
            "
          >
            <motion.span
              key={player.emoji}
              initial={{ scale: 0, rotate: -360, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 600,
                damping: 20,
                duration: 0.5
              }}
              className="relative z-10"
            >
              {player.emoji}
            </motion.span>
            
            {/* Effet de brillance au hover */}
            <motion.div 
              className="absolute inset-0 rounded-3xl bg-white/40 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Particules magiques */}
            <AnimatePresence>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-dutch-orange rounded-full opacity-0 group-hover/emoji:opacity-100"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 40,
                    y: (Math.random() - 0.5) * 40,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.button>

          {/* Nom du joueur avec design amélioré */}
          <div className="flex-1">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <Input
                value={player.name}
                onChange={(e) => onUpdateName(index, e.target.value)}
                className="
                  bg-white/95 border-gray-200/80 focus:border-dutch-blue/90 
                  text-center font-semibold rounded-2xl text-xl h-14
                  transition-all duration-300
                  focus:ring-4 focus:ring-dutch-blue/20 focus:bg-white focus:shadow-xl
                  group-hover:bg-white group-hover:shadow-lg
                  placeholder:text-gray-400
                  border-2
                "
                placeholder={`Joueur ${index + 1}`}
                maxLength={15}
              />
              
              {/* Effet de brillance sur le champ */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 -skew-x-12"
                whileFocus={{
                  opacity: [0, 1, 0],
                  x: [-100, 100]
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Barre de progression dynamique */}
        <motion.div
          className="h-2 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          layoutId={`progress-${index}`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </UnifiedCard>
    </motion.div>
  );
};

export default PlayerCard;
