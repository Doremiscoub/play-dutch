
import { useNavigate } from 'react-router-dom';
import { Plus, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import CTAButton from '@/components/ui/CTAButton';

const SignedInButtons = () => {
  const navigate = useNavigate();
  const [hasCurrentGame, setHasCurrentGame] = useState<boolean>(false);

  useEffect(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    setHasCurrentGame(!!savedGame);
  }, []);

  return (
    <div className="w-full max-w-xs space-y-4">
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
    </div>
  );
};

export default SignedInButtons;
