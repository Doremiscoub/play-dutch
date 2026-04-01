import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, Gamepad2, Trophy, HelpCircle, BarChart3, Smartphone, Award, ClipboardList } from 'lucide-react';
import { useSEO, SEOProps } from '@/hooks/useSEO';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';

interface SEOPageLayoutProps {
  children: ReactNode;
  seo: SEOProps;
  breadcrumbs?: Array<{ label: string; href: string }>;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const seoLinkGroups = [
  {
    title: 'About Dutch',
    links: [
      { label: 'Dutch Card Game', href: '/dutch-card-game', icon: Gamepad2 },
      { label: 'What Is Dutch?', href: '/what-is-dutch-card-game', icon: HelpCircle },
      { label: 'Rules', href: '/dutch-rules', icon: BookOpen },
      { label: 'How to Play', href: '/how-to-play-dutch', icon: ClipboardList },
    ],
  },
  {
    title: 'Scoring',
    links: [
      { label: 'Scoring Guide', href: '/dutch-scoring', icon: Calculator },
      { label: 'How to Score', href: '/how-to-score-dutch', icon: BarChart3 },
      { label: 'Keep Score', href: '/how-to-keep-score-card-games', icon: ClipboardList },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Score Tracker', href: '/score-tracker', icon: Trophy },
      { label: 'Score App', href: '/card-game-score-app', icon: Smartphone },
      { label: 'Best Trackers', href: '/best-score-tracker-card-games', icon: Award },
    ],
  },
];

export default function SEOPageLayout({
  children,
  seo,
  breadcrumbs,
  showCTA = true,
  ctaText = 'Start Playing Dutch Now',
  ctaHref = '/setup',
}: SEOPageLayoutProps) {
  useSEO({ ...seo, locale: 'en' });
  const { pathname } = useLocation();

  return (
    <PageShell variant="minimal">
      <PageContainer size="md">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item" className="hover:text-foreground transition-colors">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1.5" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className="text-muted-foreground/50">/</span>
                  {i === breadcrumbs.length - 1 ? (
                    <span itemProp="name" className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.href} itemProp="item" className="hover:text-foreground transition-colors">
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  )}
                  <meta itemProp="position" content={String(i + 2)} />
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Main Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </article>

        {/* CTA Section */}
        {showCTA && (
          <div className="mt-12 p-8 rounded-2xl glass-elevated text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Play?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Dutch Card Game Companion tracks scores, provides AI commentary, and makes every game night better.
            </p>
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Internal Links — all 10 SEO pages, grouped */}
        <nav className="mt-10 mb-6" aria-label="Related pages">
          <h3 className="text-lg font-semibold mb-4">Explore More</h3>
          <div className="space-y-5">
            {seoLinkGroups.map((group) => {
              const visibleLinks = group.links.filter((l) => l.href !== pathname);
              if (visibleLinks.length === 0) return null;
              return (
                <div key={group.title}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {group.title}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {visibleLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl glass-surface hover:glass-elevated transition-all text-center text-sm"
                      >
                        <link.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </PageContainer>
    </PageShell>
  );
}
