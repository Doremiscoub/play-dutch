import React from 'react';
import { motion } from 'framer-motion';
interface PlayerCardShineEffectProps {
  isWinner: boolean;
}
const PlayerCardShineEffect: React.FC<PlayerCardShineEffectProps> = ({
  isWinner
}) => {
  if (!isWinner) return null;
  return <>
      {/* Primary Shimmer Effect - Diagonal Sweep */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent -skew-x-12" animate={{
      x: ['-100%', '100%']
    }} transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 3
    }} />
      
      {/* Secondary Shimmer - Vertical Sweep */}
      
      
      {/* Golden Pulse Effect */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-amber-300/10 to-orange-400/20 rounded-3xl" animate={{
      opacity: [0.1, 0.3],
      scale: [1, 1.02]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }} />
      
      {/* Corner Sparkles */}
      {[{
      top: '10%',
      left: '10%',
      delay: 0
    }, {
      top: '10%',
      right: '10%',
      delay: 1
    }, {
      bottom: '10%',
      left: '10%',
      delay: 2
    }, {
      bottom: '10%',
      right: '10%',
      delay: 3
    }].map((pos, index) => <motion.div key={index} className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg" style={pos} animate={{
      scale: [0, 1],
      opacity: [0, 1],
      rotate: [0, 180]
    }} transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      delay: pos.delay,
      ease: "easeInOut"
    }} />)}
    </>;
};
export default PlayerCardShineEffect;