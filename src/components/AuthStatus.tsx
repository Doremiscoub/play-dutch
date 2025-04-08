
import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, ChevronDown, UserCircle, Settings, History, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface AuthStatusProps {
  showLoginButtons?: boolean;
  buttonStyle?: 'default' | 'minimal' | 'pill';
  className?: string;
}

const AuthStatus = ({ showLoginButtons = true, buttonStyle = 'default', className = '' }: AuthStatusProps) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Gestionnaire de déconnexion
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
      toast.error('Problème lors de la déconnexion');
    } finally {
      setIsSigningOut(false);
    }
  };

  // Activer le mode hors ligne
  const enableOfflineMode = () => {
    localStorage.setItem('clerk_auth_failed', 'true');
    toast.success('Mode hors ligne activé');
    window.location.reload();
  };

  // Si Clerk est en cours de chargement, afficher un loader
  if (!isLoaded) {
    return (
      <div className="animate-pulse flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
      </div>
    );
  }

  // Si l'utilisateur est connecté, afficher son profil
  if (isSignedIn && user) {
    const userInitials = user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user.firstName
        ? user.firstName[0]
        : '?';

    return (
      <div className={className}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="game-control"
              className="vision-button p-2 flex items-center gap-2"
            >
              <Avatar className="h-8 w-8 border border-white/40">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback className="bg-dutch-blue text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center">
                <span className="text-sm font-medium truncate max-w-[100px]">
                  {user.firstName || user.username || 'Utilisateur'}
                </span>
                <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="glass-light">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="cursor-pointer flex items-center" 
              onClick={() => navigate('/game')}
            >
              <Trophy className="mr-2 h-4 w-4 text-dutch-orange" />
              Partie en cours
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="cursor-pointer flex items-center"
              onClick={() => navigate('/history')}
            >
              <History className="mr-2 h-4 w-4 text-dutch-purple" />
              Historique
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="cursor-pointer flex items-center"
              onClick={() => navigate('/settings')}
            >
              <Settings className="mr-2 h-4 w-4 text-dutch-blue" />
              Paramètres
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="cursor-pointer flex items-center text-red-500"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isSigningOut ? 'Déconnexion...' : 'Se déconnecter'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Gérer le type d'affichage des boutons
  if (showLoginButtons) {
    // Style "pill" pour un affichage compact
    if (buttonStyle === 'pill') {
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="pill-sm"
              variant="pill-glass"
              className="text-dutch-blue"
              onClick={() => navigate('/sign-in')}
            >
              <UserCircle className="h-3.5 w-3.5 mr-1" />
              Connexion
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="pill-sm"
              variant="pill-blue"
              className="text-white"
              onClick={() => navigate('/sign-up')}
            >
              <UserCircle className="h-3.5 w-3.5 mr-1" />
              Inscription
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="pill-sm"
              variant="ghost"
              className="text-xs text-gray-500"
              onClick={enableOfflineMode}
            >
              Mode hors-ligne
            </Button>
          </motion.div>
        </div>
      );
    }
    
    // Style minimal pour un affichage discret
    if (buttonStyle === 'minimal') {
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-dutch-blue"
            onClick={() => navigate('/sign-in')}
          >
            Connexion
          </Button>
          
          <Button
            variant="dutch-blue"
            size="sm"
            onClick={() => navigate('/sign-up')}
          >
            Inscription
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500"
            onClick={enableOfflineMode}
          >
            Mode hors-ligne
          </Button>
        </div>
      );
    }
    
    // Style par défaut
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="vision-button bg-dutch-blue/90 text-white border-dutch-blue/20"
            onClick={() => navigate('/sign-in')}
          >
            <UserCircle className="mr-2 h-5 w-5" />
            Se connecter
          </Button>
          
          <Button
            variant="outline"
            className="vision-button"
            onClick={() => navigate('/sign-up')}
          >
            <UserCircle className="mr-2 h-5 w-5" />
            Créer un compte
          </Button>
        </div>
        
        <div className="text-center">
          <Button 
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500"
            onClick={enableOfflineMode}
          >
            Continuer sans compte
            <Badge variant="outline" className="ml-2 text-xs bg-gray-100">Mode hors-ligne</Badge>
          </Button>
        </div>
      </div>
    );
  }

  // Si aucun bouton ne doit être affiché
  return null;
};

export default AuthStatus;
