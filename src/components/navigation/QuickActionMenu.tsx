import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, History, BookOpen, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTutorial } from '@/hooks/useTutorial';
import { useNavigationVisibility } from '@/hooks/useNavigationVisibility';

interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  color: string;
}

const QuickActionMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { startTutorial } = useTutorial();
  const { showQuickActions } = useNavigationVisibility();

  if (!showQuickActions) return null;

  const quickActions: QuickAction[] = [
    {
      id: 'new-game',
      icon: Plus,
      label: 'Nouvelle partie',
      onClick: () => navigate('/setup'),
      color: 'text-green-500'
    },
    {
      id: 'multiplayer',
      icon: Users,
      label: 'Multijoueur',
      onClick: () => navigate('/multiplayer'),
      color: 'text-blue-500'
    },
    {
      id: 'history',
      icon: History,
      label: 'Historique',
      onClick: () => navigate('/history'),
      color: 'text-purple-500'
    },
    {
      id: 'tutorial',
      icon: BookOpen,
      label: 'Guide interactif',
      onClick: () => startTutorial(),
      color: 'text-orange-500'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Paramètres',
      onClick: () => navigate('/settings'),
      color: 'text-gray-500'
    }
  ];

  return (
    <div className="quick-action-menu fixed bottom-20 right-4 md:bottom-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col gap-2 mb-4"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      'glass-morphism backdrop-blur-md bg-white/10',
                      'border-white/20 hover:bg-white/20',
                      'flex items-center gap-2 text-sm font-medium',
                      'shadow-lg hover:shadow-xl transition-all'
                    )}
                  >
                    <Icon className={cn('w-4 h-4', action.color)} />
                    <span className="text-foreground">{action.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full shadow-lg',
          'glass-morphism backdrop-blur-md bg-primary/90',
          'hover:bg-primary hover:shadow-xl',
          'transition-all duration-300',
          isOpen && 'rotate-45'
        )}
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </Button>
    </div>
  );
};

export default QuickActionMenu;