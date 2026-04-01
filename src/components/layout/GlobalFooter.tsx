import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface GlobalFooterProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({
  className = '',
  variant = 'default'
}) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className={`py-4 px-4 text-center ${className}`}>
        <div className="text-sm text-muted-foreground">
          Dutch Card Game
          {' · '}
          <a
            href="https://www.seagullstudios.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors"
          >
            Seagull Studios
            <ExternalLink className="h-3 w-3" />
          </a>
          {' '}© {currentYear}
        </div>
      </footer>
    );
  }

  return (
    <footer className={`border-t border-white/30 glass-surface py-6 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* SEO internal links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 mb-6 text-xs">
          <div>
            <p className="font-semibold text-foreground mb-1.5">Dutch Card Game</p>
            <nav className="flex flex-col gap-1 text-muted-foreground">
              <Link to="/dutch-card-game" className="hover:text-foreground transition-colors">About Dutch</Link>
              <Link to="/dutch-rules" className="hover:text-foreground transition-colors">Rules</Link>
              <Link to="/dutch-scoring" className="hover:text-foreground transition-colors">Scoring</Link>
            </nav>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1.5">Learn</p>
            <nav className="flex flex-col gap-1 text-muted-foreground">
              <Link to="/what-is-dutch-card-game" className="hover:text-foreground transition-colors">What Is Dutch?</Link>
              <Link to="/how-to-play-dutch" className="hover:text-foreground transition-colors">How to Play</Link>
              <Link to="/how-to-score-dutch" className="hover:text-foreground transition-colors">How to Score</Link>
            </nav>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1.5">Tools</p>
            <nav className="flex flex-col gap-1 text-muted-foreground">
              <Link to="/score-tracker" className="hover:text-foreground transition-colors">Score Tracker</Link>
              <Link to="/card-game-score-app" className="hover:text-foreground transition-colors">Score App</Link>
              <Link to="/best-score-tracker-card-games" className="hover:text-foreground transition-colors">Best Trackers</Link>
            </nav>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1.5">More</p>
            <nav className="flex flex-col gap-1 text-muted-foreground">
              <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/how-to-keep-score-card-games" className="hover:text-foreground transition-colors">Score Keeping Guide</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-foreground mb-1">
              Dutch Card Game Companion
            </h4>
            <p className="text-xs text-muted-foreground">
              Votre compagnon pour les parties de cartes Dutch
            </p>
          </div>

          <div className="text-center sm:text-right text-xs text-muted-foreground">
            <p className="mb-1">Développé par</p>
            <a
              href="https://www.seagullstudios.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-foreground font-semibold text-sm transition-colors"
            >
              Seagull Studios
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <p className="text-muted-foreground mt-1">
              © {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
