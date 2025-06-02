
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuth } from '@/context/AuthContext';
import ScoreBoard from '../ScoreBoard';
import AdSenseSkyscraper from '../ads/AdSenseSkyscraper';
import { Player } from '@/types';

interface ScoreBoardWithAdsProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
  showGameEndConfirmation?: boolean;
  onConfirmEndGame?: () => void;
  onCancelEndGame?: () => void;
  scoreLimit?: number;
  openScoreForm?: () => void;
}

const ScoreBoardWithAds: React.FC<ScoreBoardWithAdsProps> = (props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isSignedIn } = useAuth();
  
  // Show ads only on desktop for non-authenticated users
  const showAds = isDesktop && !isSignedIn;
  
  if (!showAds) {
    return <ScoreBoard {...props} />;
  }

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full max-w-[1400px] flex gap-6 px-4">
        {/* Left AdSense Column */}
        <div className="hidden lg:flex flex-col items-center pt-8">
          <AdSenseSkyscraper
            adClient="ca-pub-YOUR_PUBLISHER_ID"
            adSlot="YOUR_LEFT_AD_SLOT"
            position="left"
            format="160x600"
          />
        </div>

        {/* Main ScoreBoard */}
        <div className="flex-1 max-w-4xl">
          <ScoreBoard {...props} />
        </div>

        {/* Right AdSense Column */}
        <div className="hidden lg:flex flex-col items-center pt-8">
          <AdSenseSkyscraper
            adClient="ca-pub-YOUR_PUBLISHER_ID"
            adSlot="YOUR_RIGHT_AD_SLOT"
            position="right"
            format="120x600"
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardWithAds;
