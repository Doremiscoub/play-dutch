
import { useAuth } from '@/context/AuthContext';
import SignedInButtons from './SignedInButtons';
import SignedOutButtons from './SignedOutButtons';

const CTAButtons = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      {!isSignedIn ? <SignedOutButtons /> : <SignedInButtons />}
      <button className="mt-10 text-xs text-muted-foreground hidden" disabled>
        Mode multijoueur (à venir)
      </button>
    </>
  );
};

export default CTAButtons;
