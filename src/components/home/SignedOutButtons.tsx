
import { useNavigate } from 'react-router-dom';
import { LogIn, ExternalLink } from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';

const SignedOutButtons = () => {
  const navigate = useNavigate();

  const handlePlayOffline = () => {
    localStorage.setItem('dutch_play_offline', 'true');
    navigate('/game/setup');
  };

  return (
    <div className="w-full max-w-xs space-y-4">
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
    </div>
  );
};

export default SignedOutButtons;
