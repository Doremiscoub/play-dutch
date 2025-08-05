
import { StructuredDataProps } from './types';

export const generateStructuredData = ({ title, description, url, image, breadcrumbs, faqItems, gameInfo }: StructuredDataProps) => {
  const baseData: any = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#webapp`,
        name: 'Dutch Card Game',
        alternateName: ['Dutch Game', 'Jeu de Cartes Dutch', 'Dutch App'],
        description,
        url,
        applicationCategory: ['Game', 'Entertainment', 'SocialNetworking'],
        operatingSystem: ['Web Browser', 'iOS', 'Android', 'Windows', 'macOS', 'Linux'],
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '2.0.0',
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
        inLanguage: ['fr-FR', 'fr'],
        isAccessibleForFree: true,
        accessibilityAPI: ['ARIA'],
        accessibilityControl: ['fullKeyboardControl', 'fullMouseControl', 'fullTouchControl'],
        accessibilityFeature: ['highContrast', 'largePrint', 'resizeText'],
        keywords: 'dutch, jeu de cartes, score, application, soirée, amis, cartes, jeu de société, digital, gratuit, PWA, hors-ligne',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2025-12-31',
          seller: {
            '@id': `${url}#organization`
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '312',
          bestRating: '5',
          worstRating: '1',
          reviewCount: '156'
        },
        author: {
          '@type': 'Organization',
          '@id': `${url}#organization`
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${url}#organization`
        },
        creator: {
          '@type': 'Organization',
          '@id': `${url}#organization`
        },
        screenshot: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630,
          caption: 'Interface de l\'application Dutch Card Game'
        },
        featureList: [
          'Suivi automatique des scores Dutch',
          'Interface moderne et intuitive',
          'Fonctionnement 100% hors-ligne',
          'Commentaires IA personnalisés (Professeur Cartouche)',
          'Support 2-10 joueurs simultanés',
          'Historique complet des parties',
          'Statistiques avancées et graphiques',
          'PWA (Progressive Web App)',
          'Optimisé mobile et desktop',
          'Système de badges et récompenses',
          'Export des résultats',
          'Thèmes personnalisables'
        ],
        gamePlayMode: ['SinglePlayer', 'MultiPlayer'],
        numberOfPlayers: '2-10',
        gamePlatform: 'Web Browser',
        genre: ['Card Game', 'Strategy Game', 'Party Game'],
        playMode: ['Offline', 'Local Multiplayer']
      },
      {
        '@type': 'Game',
        '@id': `${url}#game`,
        name: 'Dutch - Jeu de Cartes',
        alternateName: 'Dutch Card Game',
        description: 'Le Dutch est un jeu de cartes stratégique parfait pour les soirées entre amis. Objectif: avoir le score le plus bas possible en utilisant les pouvoirs spéciaux des cartes.',
        gameItem: {
          '@type': 'Thing',
          name: 'Cartes à jouer standard (52 cartes + Jokers)'
        },
        numberOfPlayers: {
          '@type': 'QuantitativeValue',
          minValue: 2,
          maxValue: 10
        },
        typicalAgeRange: '8-99',
        playMode: ['Local Multiplayer', 'Party Game'],
        genre: ['Card Game', 'Strategy Game'],
        gamePlatform: 'Digital Application',
        applicationCategory: 'Game'
      },
      {
        '@type': 'Organization',
        '@id': `${url}#organization`,
        name: 'Dutch Card Game Team',
        alternateName: 'Équipe Dutch Game',
        description: 'Équipe de développement de l\'application Dutch Card Game, spécialisée dans les applications de jeux de société digitaux.',
        url,
        logo: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630
        },
        foundingDate: '2024',
        knowsAbout: ['Développement Web', 'Jeux de Cartes', 'Applications PWA', 'UX/UI Design'],
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Support',
          availableLanguage: 'French'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: 'Dutch Card Game - Application Gratuite',
        description: 'Site officiel de l\'application Dutch Card Game. Règles, stratégies, et application gratuite pour jouer au Dutch entre amis.',
        publisher: {
          '@id': `${url}#organization`
        },
        inLanguage: 'fr-FR',
        about: {
          '@type': 'Thing',
          name: 'Jeu de cartes Dutch',
          description: 'Jeu de cartes stratégique pour 2-10 joueurs'
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${url}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          },
          {
            '@type': 'PlayAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${url}/setup`
            },
            name: 'Commencer une partie'
          }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: 'Dutch Card Game PWA',
        operatingSystem: 'Cross-platform',
        applicationCategory: 'GameApplication',
        downloadUrl: url,
        installUrl: url,
        softwareVersion: '2.0.0',
        fileSize: '2MB',
        storageRequirements: '5MB',
        memoryRequirements: '50MB',
        processorRequirements: 'Modern web browser',
        permissions: 'local storage access',
        releaseNotes: 'Version optimisée avec IA commentateur et performances améliorées'
      }
    ]
  };

  // Ajouter les breadcrumbs si disponibles
  if (breadcrumbs && breadcrumbs.length > 0) {
    baseData['@graph'].push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url
      }))
    });
  }

  // Ajouter FAQ si disponible
  if (faqItems && faqItems.length > 0) {
    baseData['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    });
  }

  // Ajouter les informations de jeu si disponibles
  if (gameInfo) {
    baseData['@graph'].push({
      '@type': 'Game',
      name: 'Dutch Card Game',
      description: 'Jeu de cartes convivial pour 2 à 10 joueurs',
      numberOfPlayers: gameInfo.players,
      playTime: gameInfo.duration,
      gameLocation: 'Indoor',
      genre: 'Card Game'
    });
  }

  return baseData;
};
