
import { cn } from '@/lib/utils';

export const getScoreCardContainerClass = (isWinner: boolean, isNearThreshold: boolean, isExpanded: boolean) => {
  return cn(
    "group relative p-6 rounded-3xl transition-all duration-300",
    "border shadow-sm",
    isWinner ?
      "bg-dutch-purple/5 border-dutch-purple/20" :
      "bg-white border-gray-200",
    isNearThreshold ?
      "bg-dutch-orange/5 border-dutch-orange/20" : "",
    isExpanded ?
      "ring-2 ring-dutch-blue/20 shadow-md" :
      "hover:shadow-md"
  );
};

export const getPositionBadgeClass = (position: number) => {
  return cn(
    "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm",
    position === 1 ? "bg-dutch-purple text-white" :
    position === 2 ? "bg-dutch-blue text-white" :
    position === 3 ? "bg-dutch-orange text-white" :
    "bg-gray-400 text-white"
  );
};
