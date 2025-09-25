import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  { id: 'multiplayer', icon: Users, label: 'Multijoueur', path: '/multiplayer' },
  { id: 'history', icon: History, label: 'Historique', path: '/history' },
  { id: 'rules', icon: BookOpen, label: 'Règles', path: '/rules' },
  { id: 'settings', icon: Settings, label: 'Paramètres', path: '/settings' }
];

const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showMobileNav, mobileNavBottomOffset } = useNavigationVisibility();

  if (!showMobileNav) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{ bottom: mobileNavBottomOffset }}
    >
      <div className="glass-morphism border-t border-white/20 backdrop-blur-xl bg-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex flex-col items-center justify-center p-2 rounded-xl',
                  'min-w-[60px] transition-all duration-200',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={cn('w-5 h-5 mb-1', isActive && 'text-primary')} />
                <span className="text-xs font-medium">{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-0.5 left-1/2 w-1 h-1 bg-primary rounded-full"
                    style={{ x: '-50%' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default MobileNavigation;