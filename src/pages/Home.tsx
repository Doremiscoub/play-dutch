
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Logo from '@/components/home/Logo';
import CTAButtons from '@/components/home/CTAButtons';
import QuickNavigation from '@/components/home/QuickNavigation';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <AnimatedBackground variant="default" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center text-center">
          <Logo />
          <CTAButtons />
          <QuickNavigation />
        </main>
      </div>
    </div>
  );
};

export default Home;
