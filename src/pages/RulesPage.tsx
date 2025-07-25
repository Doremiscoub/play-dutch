
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RulesTabs from '@/components/rules/RulesTabs';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import { useSEO } from '@/hooks/useSEO';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('introduction');
  
  // SEO optimisé pour les règles du Dutch
  useSEO({
    title: 'Règles du Dutch - Guide complet du jeu de cartes | Dutch Card Game',
    description: 'Découvrez les règles complètes du jeu de cartes Dutch : objectif, valeur des cartes, pouvoirs spéciaux, stratégies. Guide détaillé avec exemples et astuces pour maîtriser ce jeu passionnant entre amis.',
    keywords: 'règles du dutch, dutch game rules, jeu de cartes dutch, comment jouer au dutch, valeur cartes dutch, pouvoirs cartes, stratégie dutch, guide complet dutch',
  });

  const handleBack = () => {
    // Always return to home page
    navigate('/');
  };

  return (
    <PageShell variant="minimal">
      <MobileOptimizer pageType="rules" className="min-h-screen">
        <UnifiedHeader 
          title="Règles du Dutch"
          showBackButton
          onBack={handleBack}
          showSettings={true}
        />

        <div className="p-4 pt-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <RulesTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </MobileOptimizer>
    </PageShell>
  );
};

export default RulesPage;
