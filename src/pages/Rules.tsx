
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import PageHeader from '@/components/PageHeader';
import RulesTabs from '@/components/rules/RulesTabs';

const Rules: React.FC = () => {
  const [activeTab, setActiveTab] = useState('introduction');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <AnimatedBackground />
      </div>
      
      <div className="container mx-auto px-2 py-8 relative z-10">
        <PageHeader 
          title="Règles du Dutch" 
          onBack={() => navigate('/')}
        />
        
        <div className="mb-8">
          <RulesTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Rules;
