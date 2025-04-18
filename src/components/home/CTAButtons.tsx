
import { useNavigate } from 'react-router-dom';
import { Plus, LogIn, ExternalLink, RotateCcw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import CTAButton from '@/components/ui/CTAButton';
import { useState, useEffect } from 'react';

const CTAButtons = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [hasCurrentGame, setHasCurrentGame] = useState<boolean>(false);

  useEffect(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    setHasCurrentGame(!!savedGame);
  }, []);

  const handlePlayOffline = () => {
    localStorage.setItem('dutch_play_offline', 'true');
    navigate('/game/setup');
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      {!isSignedIn ? (
        <>
          <CTAButton
            icon={<LogIn className="w-6 h-6" />}
            onClick={() => navigate('/sign-in')}
          >
            Connexion / Inscription
          </CTAButton>

          <CTAButton
            variant="outline"
            icon={<ExternalLink className="w-5 h-5" />}
            onClick={handlePlayOffline}
          >
            Jouer sans compte
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-badge-purple/30">
              Rapide
            </span>
          </CTAButton>
        </>
      ) : (
        <>
          <CTAButton
            icon={<Plus className="w-6 h-6" />}
            onClick={() => navigate('/game/setup')}
          >
            Nouvelle partie
          </CTAButton>

          {hasCurrentGame && (
            <CTAButton
              variant="outline"
              icon={<RotateCcw className="w-5 h-5" />}
              onClick={() => navigate('/game')}
            >
              Reprendre la dernière partie
            </CTAButton>
          )}
        </>
      )}

      <button className="mt-10 text-xs text-muted-foreground hidden" disabled>
        Mode multijoueur (à venir)
      </button>
    </div>
  );
};

export default CTAButtons;
