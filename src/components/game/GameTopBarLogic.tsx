interface GameTopBarProps {
  showGameOver: boolean;
  roundHistoryLength: number;
  scoreLimit: number;
  onNavigateHome: () => void;
}

export const useGameTopBarProps = ({ 
  showGameOver, 
  roundHistoryLength, 
  scoreLimit, 
  onNavigateHome 
}: GameTopBarProps) => {
  if (showGameOver) {
    return {
      title: "Partie terminée",
      showBackButton: true,
      onBack: onNavigateHome,
      showSettings: true,
      variant: "default" as const
    };
  }
  
  return {
    title: "Partie en cours",
    roundCount: roundHistoryLength,
    scoreLimit: scoreLimit,
    showBackButton: true,
    onBack: onNavigateHome,
    showSettings: true,
    variant: "game" as const
  };
};