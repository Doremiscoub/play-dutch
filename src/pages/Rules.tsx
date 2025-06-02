
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedCard } from '@/components/ui/unified-card';
import RulesTabs from '@/components/rules/RulesTabs';

const Rules: React.FC = () => {
  const [activeTab, setActiveTab] = useState('introduction');
  const navigate = useNavigate();

  return (
    <UnifiedPageLayout
      title="Règles du Dutch"
      showBackButton
      onBack={() => navigate('/')}
      backgroundVariant="subtle"
    >
      <UnifiedCard variant="light" padding="lg">
        <RulesTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </UnifiedCard>
    </UnifiedPageLayout>
  );
};

export default Rules;
