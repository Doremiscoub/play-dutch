
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthActions } from '@/hooks/useSupabaseAuth';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp, loading } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signUp(email, password, { firstName, lastName });
    if (result.success) {
      // Rester sur la page pour afficher le message de confirmation
      // L'utilisateur sera redirigé automatiquement après confirmation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-white/50 border-white/30 focus:border-dutch-blue focus:ring-dutch-blue/20"
            placeholder="Jean"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-white/50 border-white/30 focus:border-dutch-blue focus:ring-dutch-blue/20"
            placeholder="Dupont"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/50 border-white/30 focus:border-dutch-blue focus:ring-dutch-blue/20"
          placeholder="votre.email@exemple.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-white/50 border-white/30 focus:border-dutch-blue focus:ring-dutch-blue/20 pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className="text-xs text-gray-500">Minimum 6 caractères</p>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple hover:opacity-90 focus:ring-dutch-blue/30"
        disabled={loading}
      >
        {loading ? 'Inscription...' : 'Créer un compte'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-sm text-dutch-blue hover:text-dutch-blue-dark underline"
        >
          Déjà un compte ? Se connecter
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
