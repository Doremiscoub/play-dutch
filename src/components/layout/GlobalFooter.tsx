import React from 'react';
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
    <footer className={`border-t border-border bg-white py-6 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
