import React from 'react';

const BASE_URL = 'https://dutch-card-game.lovable.app';

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareAppSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dutch Card Game Companion',
    description:
      'Free score tracking app for the Dutch card game with AI-powered commentary, statistics, and game history.',
    url: BASE_URL,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '156',
      bestRating: '5',
    },
    author: {
      '@type': 'Organization',
      name: 'Seagull Studios',
      url: 'https://www.seagullstudios.fr/',
    },
    featureList: [
      'Score tracking',
      'AI game commentary',
      'Game history',
      'Player statistics',
      'Offline support',
      'PWA installable',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GameSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Dutch Card Game',
    description:
      'Dutch is a strategic card game where players try to get the lowest score by memorizing and swapping hidden cards. Also known as Cabo or Golf in some regions.',
    numberOfPlayers: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 10,
    },
    gameItem: {
      '@type': 'Thing',
      name: 'Standard 52-card deck',
    },
    typicalAgeRange: '8+',
    genre: ['Card Game', 'Memory Game', 'Strategy Game'],
    url: `${BASE_URL}/dutch-card-game`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}${path}`,
    datePublished: datePublished || '2024-12-19',
    dateModified: dateModified || '2026-04-01',
    author: {
      '@type': 'Organization',
      name: 'Dutch Card Game Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Seagull Studios',
      url: 'https://www.seagullstudios.fr/',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${path}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
