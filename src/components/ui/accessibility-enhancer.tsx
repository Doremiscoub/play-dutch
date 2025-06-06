
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
  enableSkipLinks?: boolean;
  enableFocusManagement?: boolean;
  enableKeyboardNavigation?: boolean;
}

export const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({
  children,
  enableSkipLinks = true,
  enableFocusManagement = true,
  enableKeyboardNavigation = true
}) => {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    // Détecter la navigation au clavier
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsUsingKeyboard(true);
        document.body.classList.add('keyboard-nav');
      }
    };

    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
      document.body.classList.remove('keyboard-nav');
    };

    // Gestion des raccourcis clavier globaux
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!enableKeyboardNavigation) return;

      // Alt + 1 : Aller au contenu principal
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        const main = document.querySelector('main') || document.querySelector('[role="main"]');
        if (main) {
          (main as HTMLElement).focus();
        }
      }

      // Alt + 2 : Aller à la navigation
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
        if (nav) {
          const firstLink = nav.querySelector('a, button');
          if (firstLink) {
            (firstLink as HTMLElement).focus();
          }
        }
      }

      // Escape : Fermer les modales/menus
      if (e.key === 'Escape') {
        const openDialog = document.querySelector('[role="dialog"][open]');
        if (openDialog) {
          const closeButton = openDialog.querySelector('[aria-label*="close"], [aria-label*="fermer"]');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        }
      }
    };

    if (enableKeyboardNavigation) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    // Améliorer l'accessibilité des éléments interactifs
    if (enableFocusManagement) {
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
      interactiveElements.forEach(element => {
        // Ajouter des indicateurs de focus visibles
        element.addEventListener('focus', () => {
          if (isUsingKeyboard) {
            element.classList.add('keyboard-focus');
          }
        });

        element.addEventListener('blur', () => {
          element.classList.remove('keyboard-focus');
        });
      });
    }

    // Gérer les animations selon les préférences
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.body.classList.remove('keyboard-nav');
      document.documentElement.classList.remove('reduce-motion');
    };
  }, [enableKeyboardNavigation, enableFocusManagement, isUsingKeyboard, prefersReducedMotion]);

  return (
    <>
      {enableSkipLinks && <SkipLinks />}
      <div className="accessibility-enhanced">
        {children}
      </div>
    </>
  );
};

const SkipLinks: React.FC = () => {
  return (
    <div className="skip-links fixed -top-full left-0 z-[9999] transition-all focus-within:top-0">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only absolute top-0 left-0 bg-dutch-blue text-white px-4 py-2 text-sm font-medium rounded-br-lg transition-all focus:translate-y-0"
      >
        Aller au contenu principal
      </a>
      <a 
        href="#navigation" 
        className="sr-only focus:not-sr-only absolute top-0 left-40 bg-dutch-purple text-white px-4 py-2 text-sm font-medium rounded-br-lg transition-all focus:translate-y-0"
      >
        Aller à la navigation
      </a>
    </div>
  );
};

// Styles pour l'accessibilité (à ajouter au CSS global)
export const accessibilityStyles = `
  .skip-links a:focus {
    position: relative;
    transform: translateY(0);
    z-index: 9999;
  }

  .keyboard-nav *:focus,
  .keyboard-focus {
    outline: 2px solid #0066cc !important;
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
  }

  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Améliorer le contraste pour les éléments interactifs */
  @media (prefers-contrast: high) {
    button, .button, a {
      border: 2px solid currentColor;
    }
  }

  /* Styles pour les lecteurs d'écran */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .sr-only:focus,
  .sr-only:active {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .focus\\:not-sr-only:focus {
    position: static !important;
    width: auto !important;
    height: auto !important;
    padding: inherit !important;
    margin: inherit !important;
    overflow: visible !important;
    clip: auto !important;
    white-space: normal !important;
  }
`;
