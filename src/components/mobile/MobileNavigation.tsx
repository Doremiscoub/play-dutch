import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, History, Settings, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigationVisibility } from '@/hooks/useNavigationVisibility';

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: Home, label: 'Accueil', path: '/' },
  { id: 'multiplayer', icon: Users, label: 'Multi', path: '/multiplayer' },
  { id: 'history', icon: History, label: 'Historique', path: '/history' },
  { id: 'rules', icon: BookOpen, label: 'Règles', path: '/rules' },
  { id: 'settings', icon: Settings, label: 'Réglages', path: '/settings' }
];

const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showMobileNav } = useNavigationVisibility();

  if (!showMobileNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div className="bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        {/* Safe area bottom for iOS */}
        <div className="flex items-center justify-around px-1 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex flex-col items-center justify-center py-1.5 px-2 rounded-lg min-w-[56px]',
                  'transition-colors duration-150',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground active:text-foreground'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive && 'text-primary')} />
                <span className={cn(
                  'text-[10px] mt-0.5 leading-tight',
                  isActive ? 'font-semibold' : 'font-medium'
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-primary rounded-full mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavigation;
