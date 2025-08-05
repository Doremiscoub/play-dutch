import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Accueil',
  '/rules': 'Règles du Dutch',
  '/strategy': 'Guide Stratégique',
  '/faq': 'Questions Fréquentes',
  '/setup': 'Nouvelle Partie',
  '/game': 'Partie en Cours',
  '/history': 'Historique',
  '/about': 'À Propos',
  '/privacy': 'Confidentialité',
  '/terms': 'Conditions d\'Utilisation',
  '/sign-in': 'Connexion',
  '/sign-up': 'Inscription'
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Fil d'ariane"
      className={`flex items-center space-x-2 text-sm text-muted-foreground mb-6 ${className}`}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index === 0 ? (
            <Link
              to={breadcrumb.path}
              className="flex items-center hover:text-primary transition-colors"
              aria-label="Retour à l'accueil"
            >
              <Home className="h-4 w-4" />
            </Link>
          ) : index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              to={breadcrumb.path}
              className="hover:text-primary transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
          
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
};

export default Breadcrumbs;