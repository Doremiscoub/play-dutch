
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { cn } from '@/lib/utils';
import ThemeSelector from '@/components/ThemeSelector';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backLink?: string;
  backText?: string;
  className?: string;
  contentClassName?: string;
  background?: 'default' | 'game' | 'vibrant' | 'minimal' | 'smooth';
  headerClassName?: string;
  hideBackButton?: boolean;
  showThemeSelector?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  backLink = '/',
  backText = 'Retour',
  className,
  contentClassName,
  background = 'default',
  headerClassName,
  hideBackButton = false,
  showThemeSelector = false,
}) => {
  return (
    <div className={cn("relative min-h-screen flex flex-col", className)}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground variant={background} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col container mx-auto px-4 pt-6 pb-16 md:px-6 md:pt-8">
        {/* Header */}
        <div className={cn("mb-6 md:mb-8", headerClassName)}>
          <div className="flex justify-between items-center">
            {!hideBackButton && (
              <div className="mb-4">
                <Link to={backLink}>
                  <Button variant="ghost" size="sm" className="gap-1 pl-2 bg-white/70 hover:bg-white/80 backdrop-blur-sm shadow-sm rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                    {backText}
                  </Button>
                </Link>
              </div>
            )}
            
            {showThemeSelector && (
              <div className="mb-4">
                <ThemeSelector />
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-dutch-blue">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </motion.div>
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn("flex-1", contentClassName)}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PageLayout;
