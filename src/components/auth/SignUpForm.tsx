
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthActions } from '@/hooks/useAuthActions';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const _navigate = useNavigate();
  const { signUp, loading } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, { firstName, lastName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="firstName" className="text-sm font-medium">Prénom</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jean"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName" className="text-sm font-medium">Nom</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Dupont"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="votre.email@exemple.com"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
      </div>

      <Button
        type="submit"
        variant="trinity"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Inscription...' : 'Créer un compte'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-primary hover:underline font-medium"
        >
          Se connecter
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
