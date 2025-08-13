
import React from 'react';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowToPlaySection } from '@/components/home/HowToPlaySection';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import OnlineModeTeaser from '@/components/home/OnlineModeTeaser';
import SEOFooter from '@/components/SEOFooter';

const SEOContentSection: React.FC = () => {
  return (
    <div className="relative z-10 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        <FeaturesSection />
        <HowToPlaySection />
        <OnlineModeTeaser />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <SEOFooter className="mt-16" />
      </div>
    </div>
  );
};

export default SEOContentSection;
