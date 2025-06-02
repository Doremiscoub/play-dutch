
// Redirection vers SignIn qui gère maintenant les deux flows
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/sign-in', { replace: true });
  }, [navigate]);
  
  return null;
};

export default SignUp;
