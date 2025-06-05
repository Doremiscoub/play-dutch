
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={cn(
        "flex items-center space-x-1 text-sm text-gray-600 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30",
        className
      )}
      aria-label="Navigation"
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span className="flex items-center gap-1 text-dutch-blue font-medium">
              {item.icon}
              {item.label}
            </span>
          ) : (
            <Link
              to={item.href}
              className="flex items-center gap-1 hover:text-dutch-blue transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;
