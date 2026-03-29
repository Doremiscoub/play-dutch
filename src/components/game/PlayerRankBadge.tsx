import { cn } from '@/lib/utils';

interface PlayerRankBadgeProps {
  position: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export default function PlayerRankBadge({
  position,
  className,
  size = 'md',
}: PlayerRankBadgeProps) {
  const getPositionClass = () => {
    switch (position) {
      case 1:
        return "bg-amber-400 text-amber-900";
      case 2:
        return "bg-border text-foreground";
      case 3:
        return "bg-amber-700 text-amber-100";
      default:
        return position <= 5
          ? "bg-dutch-blue text-white"
          : "bg-muted-foreground/30 text-white";
    }
  };

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center font-bold rounded-full",
        getPositionClass(),
        sizeClasses[size],
        className
      )}
    >
      {position}
    </div>
  );
}
