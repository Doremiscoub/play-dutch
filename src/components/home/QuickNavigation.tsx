
import { History, BookOpen, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const QuickNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 flex justify-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/80"
        onClick={() => navigate('/history')}
      >
        <History className="h-5 w-5 text-dutch-orange" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/80"
        onClick={() => navigate('/rules')}
      >
        <BookOpen className="h-5 w-5 text-dutch-purple" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/80"
        onClick={() => navigate('/settings')}
      >
        <Settings className="h-5 w-5 text-dutch-blue" />
      </Button>
    </div>
  );
};

export default QuickNavigation;
