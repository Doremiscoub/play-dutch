
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthStatus from './AuthStatus';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showThemeSelector?: boolean;
  showBackButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  showThemeSelector = false,
  showBackButton = false
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative px-4 py-6">
      {/* Fond quadrillé */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Points colorés animés */}
      <motion.div 
        className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-[#A78BFA]"
        animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute top-[30%] right-[15%] w-4 h-4 rounded-full bg-[#FDBA74]"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-[40%] left-[20%] w-3 h-3 rounded-full bg-[#6EE7B7]"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />

      {/* Vagues animées en bas */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-56 pointer-events-none z-0">
        <motion.div
          animate={{ 
            x: [-20, 0, -20],
            y: [0, 5, 0]
          }}
          transition={{
            x: { duration: 20, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 10, repeat: Infinity, repeatType: "reverse" }
          }}
          className="w-[120%] h-48 bg-[#FDE68A] absolute bottom-[-10px] left-[-10%]"
          style={{
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            opacity: 0.6
          }}
        />
        <motion.div
          animate={{ 
            x: [20, 0, 20],
            y: [0, -5, 0]
          }}
          transition={{
            x: { duration: 15, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 8, repeat: Infinity, repeatType: "reverse" }
          }}
          className="w-[120%] h-40 bg-[#E9D5FF] absolute bottom-0 left-[-10%]"
          style={{
            borderRadius: "60% 70% 0 0 / 100% 100% 0 0",
            opacity: 0.6
          }}
        />
      </div>

      <AuthStatus />

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen">
        <div className="w-full max-w-4xl mx-auto">
          {showBackButton && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
