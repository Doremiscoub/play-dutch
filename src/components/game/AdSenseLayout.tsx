
import React, { ReactNode } from 'react';
import { AdProvider } from '@/contexts/AdContext';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';

interface AdSenseLayoutProps {
  children: ReactNode;
}

const AdSenseLayout: React.FC<AdSenseLayoutProps> = ({ children }) => {
  return (
    <AdProvider>
      <ResponsiveLayout showPremiumCTA={false}>
        {children}
      </ResponsiveLayout>
    </AdProvider>
  );
};

export default AdSenseLayout;
