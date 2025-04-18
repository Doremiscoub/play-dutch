
import { useNavigate } from 'react-router-dom';
import { LogIn, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SignedOutButtons = () => {
  const navigate = useNavigate();

  const handlePlayOffline = () => {
    localStorage.setItem('dutch_play_offline', 'true');
    navigate('/game/setup');
  };

  // Vérifier si la configuration Clerk est présente
  const isClerkConfigured = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || false;

  return (
    <div className="w-full max-w-xs space-y-4">
      <Button
        className="w-full h-14 rounded-full bg-white/90 hover:bg-white text-dutch-purple border border-dutch-purple/20 hover:border-dutch-purple/40 flex items-center justify-center gap-2"
        onClick={() => navigate('/sign-in')}
        disabled={!isClerkConfigured}
        title={!isClerkConfigured ? "Fonctionnalité à venir" : ""}
      >
        <LogIn className="w-5 h-5" />
        <span className="font-medium">Connexion / Inscription</span>
      </Button>

      <Button
        variant="outline"
        className="w-full h-14 rounded-full border border-dutch-purple/30 hover:bg-dutch-purple/5 text-gray-700 flex items-center justify-center gap-2"
        onClick={handlePlayOffline}
      >
        <ExternalLink className="w-5 h-5" />
        <span className="font-medium">Jouer sans compte</span>
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-dutch-purple/10">
          Rapide
        </span>
      </Button>

      {isClerkConfigured && (
        <div className="flex flex-col gap-2 pt-2">
          <div className="text-center text-sm text-gray-500 mb-1">Ou se connecter avec</div>
          <Button
            className="w-full h-12 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            variant="outline"
            onClick={() => navigate('/sign-in?provider=google')}
          >
            <img src="/icons/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
            Google
          </Button>
          
          <Button
            className="w-full h-12 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            variant="outline"
            onClick={() => navigate('/sign-in?provider=tiktok')}
          >
            <img src="/icons/tiktok-icon.svg" alt="TikTok" className="w-5 h-5 mr-2" />
            TikTok
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignedOutButtons;
