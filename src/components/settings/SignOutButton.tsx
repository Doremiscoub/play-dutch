
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SignOutButton = () => {
  const { signOut, isSignedIn } = useAuth();
  const navigate = useNavigate();

  if (!isSignedIn) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <Button 
      variant="destructive" 
      className="w-full justify-start mt-8"
      onClick={handleSignOut}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Se déconnecter
    </Button>
  );
};

export default SignOutButton;
