
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RulesTabs from '@/components/rules/RulesTabs';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('introduction');

  const handleBack = () => {
    // Always return to home page
    navigate('/');
  };

  return (
    <PageShell variant="minimal">
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
    </PageShell>
  );
};

export default RulesPage;
