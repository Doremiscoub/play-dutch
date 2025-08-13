import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';

interface GameTopBarProps {
  showGameOver: boolean;
  roundHistoryLength: number;
  scoreLimit: number;
  onNavigateHome: () => void;
  gameStartTime?: Date;
}

export const useGameTopBarProps = ({ 
  showGameOver, 
  roundHistoryLength, 
  scoreLimit, 
  onNavigateHome,
  gameStartTime
}: GameTopBarProps) => {
  if (showGameOver) {
    return useUnifiedHeader({
      title: "Partie terminée",
      showBackButton: true,
      onBack: onNavigateHome,
      showSettings: true,
      variant: "default"
    });
  }
  
  return useUnifiedHeader({
    title: "Partie en cours",
    roundCount: roundHistoryLength,
    scoreLimit: scoreLimit,
    showBackButton: true,
    onBack: onNavigateHome,
    showSettings: true,
    showRulesButton: false,
    variant: "game",
    gameStartTime: gameStartTime
  });
};