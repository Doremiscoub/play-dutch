
import { cn } from '@/lib/utils';

export const getScoreCardContainerClass = (isWinner: boolean, isNearThreshold: boolean, isExpanded: boolean) => {
  return cn(
    "group relative p-6 rounded-3xl transition-all duration-500",
    "backdrop-blur-xl border shadow-lg",
    isWinner ? 
      "bg-gradient-to-br from-dutch.purple/20 via-dutch.blue/10 to-dutch.orange/5 border-dutch.purple/30" : 
      "bg-gradient-to-br from-white/80 via-white/60 to-white/40 border-white/50",
    isNearThreshold ? 
      "bg-gradient-to-br from-dutch.orange/20 via-dutch.orange/10 to-white/60 border-dutch.orange/30" : "",
    isExpanded ? 
      "ring-2 ring-dutch.blue/20 shadow-xl scale-[1.02]" : 
      "hover:scale-[1.01] hover:shadow-xl"
  );
};

export const getPositionBadgeClass = (position: number) => {
  return cn(
    "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg",
    position === 1 ? "bg-dutch.purple text-white" :
    position === 2 ? "bg-dutch.blue text-white" :
    position === 3 ? "bg-dutch.orange text-white" :
    "bg-gray-400/80 text-white"
  );
};
