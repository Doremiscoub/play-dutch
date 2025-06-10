
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedCard } from '@/components/ui/unified-card';
import SitemapGenerator from '@/components/seo/SitemapGenerator';
import { useSEO } from '@/hooks/useSEO';
import PageShell from '@/components/layout/PageShell';

const SitemapPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Sitemap - Dutch Card Game',
    description: 'Générez le sitemap XML et robots.txt pour Dutch Card Game. Outils SEO pour améliorer le référencement.',
    keywords: 'sitemap, robots.txt, SEO, référencement, dutch card game'
  });

  return (
    <PageShell variant="minimal">
      <UnifiedPageLayout
        title="Génération de Sitemap"
        showBackButton
        onBack={() => navigate('/settings')}
        backgroundVariant="minimal"
      >
        <UnifiedCard variant="light" padding="lg">
          <SitemapGenerator />
        </UnifiedCard>
      </UnifiedPageLayout>
    </PageShell>
  );
};

export default SitemapPage;
