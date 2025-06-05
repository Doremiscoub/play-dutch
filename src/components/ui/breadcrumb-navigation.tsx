
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface BreadcrumbNavigationProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ 
  items, 
  className 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ne pas afficher sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }

  // Generate breadcrumbs from current path if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/', icon: <Home className="h-4 w-4" /> }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Map path segments to readable labels
      const labelMap: Record<string, string> = {
        'game': 'Jeu',
        'setup': 'Configuration',
        'history': 'Historique',
        'rules': 'Règles',
        'settings': 'Paramètres',
        'about': 'À propos',
        'faq': 'FAQ',
        'strategy': 'Stratégie'
      };
      
      breadcrumbs.push({
        label: labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <motion.nav 
      className={cn(
        "flex items-center space-x-1 text-sm text-gray-600 bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 border border-white/40 shadow-lg",
        className
      )}
      aria-label="Navigation"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span className="flex items-center gap-1 text-dutch-blue-500 font-medium">
              {item.icon}
              {item.label}
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleNavigate(item.href, e)}
              className="flex items-center gap-1 hover:text-dutch-blue-500 transition-colors p-1 h-auto text-gray-600"
            >
              {item.icon}
              {item.label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
};

export default BreadcrumbNavigation;
