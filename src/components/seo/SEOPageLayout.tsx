import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, Gamepad2, Trophy } from 'lucide-react';
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

const internalLinks = [
  { label: 'What is Dutch?', href: '/what-is-dutch-card-game', icon: BookOpen },
  { label: 'How to Play', href: '/how-to-play-dutch', icon: Gamepad2 },
  { label: 'Scoring Guide', href: '/how-to-score-dutch', icon: Calculator },
  { label: 'Score Tracker', href: '/score-tracker', icon: Trophy },
];

export default function SEOPageLayout({
  children,
  seo,
  breadcrumbs,
  showCTA = true,
  ctaText = 'Start Playing Dutch Now',
  ctaHref = '/setup',
}: SEOPageLayoutProps) {
  useSEO(seo);

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

        {/* Internal Links */}
        <nav className="mt-10 mb-6" aria-label="Related pages">
          <h3 className="text-lg font-semibold mb-4">Explore More</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {internalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl glass-surface hover:glass-elevated transition-all text-center text-sm"
              >
                <link.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </PageContainer>
    </PageShell>
  );
}
