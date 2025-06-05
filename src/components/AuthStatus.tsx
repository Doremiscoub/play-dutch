
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, User } from 'lucide-react';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AuthStatusProps {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ isMenuOpen, onCloseMenu }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const signOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Déconnexion réussie');
      navigate('/');
    }
    setIsLoading(false);
    onCloseMenu();
  };

  return (
    <>
      {user ? (
        <DropdownMenu open={isMenuOpen} onOpenChange={onCloseMenu}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
                <AvatarFallback>{user?.firstName?.charAt(0).toUpperCase() || user?.fullName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>{user?.fullName || user?.firstName}</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings className="mr-2 h-4 w-4" />
              <span>{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" onClick={onCloseMenu}>
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} disabled={isLoading}>
              {isLoading ? (
                <span>Déconnexion...</span>
              ) : (
                <>
                  Déconnexion
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          <Link to="/signin">
            <Button
              size="sm"
              variant="dutch-glass"
              className="px-3 py-1 text-xs rounded-full"
            >
              Connexion
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              variant="dutch-glass"
              className="px-3 py-1 text-xs rounded-full"
            >
              Inscription
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthStatus;
