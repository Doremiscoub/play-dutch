
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Shuffle, Star, Zap, Sparkles } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';

interface PlayerControlsProps {
  playersCount: number;
  onAddPlayer: () => void;
  onRemovePlayer: () => void;
  onShufflePlayers: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  playersCount,
  onAddPlayer,
  onRemovePlayer,
  onShufflePlayers
}) => {
  return (
    <>
      {/* Contrôles du nombre de joueurs avec animations sophistiquées */}
      <motion.div 
        className="flex items-center justify-center gap-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          whileHover={{ scale: playersCount > 2 ? 1.15 : 1, rotate: -5 }} 
          whileTap={{ scale: playersCount > 2 ? 0.9 : 1, rotate: 5 }}
          className="relative"
        >
          {/* Effet de lueur pour le bouton moins */}
          <motion.div
            className="absolute -inset-2 bg-red-400/30 rounded-3xl blur-lg opacity-0"
            animate={playersCount > 2 ? {
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.1, 0.8]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <UnifiedButton
            variant="glass"
            size="icon-lg"
            onClick={onRemovePlayer}
            disabled={playersCount <= 2}
            animated
            className="disabled:opacity-40 shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10"
          >
            <Minus className="h-7 w-7" />
          </UnifiedButton>
        </motion.div>
        
        {/* Compteur central avec effets avancés */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Anneaux de lueur multiples */}
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange rounded-full blur-2xl opacity-40"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -inset-6 bg-gradient-to-r from-dutch-orange via-dutch-purple to-dutch-blue rounded-full blur-xl opacity-30"
            animate={{ 
              rotate: -360,
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
          
          {/* Compteur principal */}
          <div className="relative bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange rounded-3xl px-10 py-6 min-w-[6rem] shadow-2xl border-2 border-white/40">
            <motion.span
              key={playersCount}
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 20,
                duration: 0.6
              }}
              className="text-4xl font-bold text-white block text-center relative z-10"
            >
              {playersCount}
            </motion.span>
            
            {/* Étoiles décoratives */}
            <motion.div
              className="absolute -top-2 -left-2"
              animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="h-4 w-4 text-yellow-300" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -right-2"
              animate={{ rotate: -360, scale: [1.2, 0.8, 1.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Zap className="h-4 w-4 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: playersCount < 10 ? 1.15 : 1, rotate: 5 }} 
          whileTap={{ scale: playersCount < 10 ? 0.9 : 1, rotate: -5 }}
          className="relative"
        >
          {/* Effet de lueur pour le bouton plus */}
          <motion.div
            className="absolute -inset-2 bg-green-400/30 rounded-3xl blur-lg opacity-0"
            animate={playersCount < 10 ? {
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.1, 0.8]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <UnifiedButton
            variant="glass"
            size="icon-lg"
            onClick={onAddPlayer}
            disabled={playersCount >= 10}
            animated
            className="disabled:opacity-40 shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10"
          >
            <Plus className="h-7 w-7" />
          </UnifiedButton>
        </motion.div>
      </motion.div>

      {/* Bouton mélanger avec effets améliorés */}
      {playersCount > 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-dutch-purple/20 to-dutch-orange/20 rounded-3xl blur-lg opacity-0"
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          <UnifiedButton
            variant="ghost"
            size="lg"
            onClick={onShufflePlayers}
            animated
            className="text-gray-700 hover:text-gray-900 bg-white/50 hover:bg-white/70 border-2 border-white/60 hover:border-white/80 shadow-lg hover:shadow-xl relative z-10 px-8 py-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="mr-3"
            >
              <Shuffle className="h-5 w-5" />
            </motion.div>
            <span className="font-medium">Mélanger l'ordre</span>
            <motion.div
              className="ml-2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </UnifiedButton>
        </motion.div>
      )}
    </>
  );
};

export default PlayerControls;
