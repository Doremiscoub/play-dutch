import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GameSettings from '@/components/GameSettings';
import { cn } from '@/lib/utils';

interface UnifiedHeaderProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  showRulesButton?: boolean;
  variant?: 'default' | 'game' | 'simple';
  hideTitle?: boolean;
  gameStartTime?: Date;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  showBackButton = false,
  onBack,
  showSettings = true,
  showRulesButton = true,
  variant = 'default',
  hideTitle = false,
  gameStartTime
}) => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');

  useEffect(() => {
    if (!gameStartTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - gameStartTime.getTime()) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setElapsedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStartTime]);

  if (hideTitle) return null;

  return (
    <header
      data-testid="unified-header"
      className="relative z-10 w-full py-3 sm:py-4"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {variant === 'game' ? (
          /* Game header — compact info bar */
          <div className="bg-white rounded-xl border border-border shadow-sm px-4 py-2.5">
            <div className="flex items-center justify-between gap-3">
              {showBackButton && onBack && (
                <Button variant="ghost" size="icon-sm" onClick={onBack} className="shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}

              <div className="flex items-center justify-center gap-2 flex-1 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Manche {roundCount || 1}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700">
                  <Target className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{scoreLimit} pts</span>
                </div>
                {gameStartTime && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold font-mono">{elapsedTime}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {showRulesButton && (
                  <Button variant="ghost" size="icon-sm" onClick={() => navigate('/rules')}>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
                {showSettings && <GameSettings />}
              </div>
            </div>
          </div>
        ) : (
          /* Default header — simple title bar */
          <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-border/60 shadow-sm px-4 py-3">
            <div className="flex items-center justify-between min-h-[36px]">
              <div className="flex items-center gap-2 shrink-0">
                {showBackButton && onBack && (
                  <Button variant="ghost" size="icon-sm" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <h1 className={cn(
                "font-display font-bold text-foreground text-center flex-1 truncate",
                "text-base sm:text-lg"
              )}>
                {title}
              </h1>

              <div className="flex items-center gap-1.5 shrink-0">
                {showRulesButton && (
                  <Button variant="ghost" size="icon-sm" onClick={() => navigate('/rules')}>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
                {showSettings && <GameSettings />}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default UnifiedHeader;
