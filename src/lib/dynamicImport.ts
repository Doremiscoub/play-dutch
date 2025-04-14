
// Ce fichier sert de polyfill pour next/dynamic dans un environnement non-Next.js

import React, { lazy, Suspense, ComponentType } from 'react';

interface DynamicOptions {
  ssr?: boolean;
  loading?: () => JSX.Element;
}

/**
 * Fonction qui simule le comportement de next/dynamic
 * Compatible avec un environnement React standard
 */
export default function dynamic<T extends object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicOptions = {}
): ComponentType<T> {
  // Utiliser React.lazy pour charger dynamiquement le composant
  const LazyComponent = lazy(() => {
    return importFn().catch(error => {
      console.error('Error loading dynamic component:', error);
      // Retourner un composant vide si le chargement échoue
      return { default: ((props: T) => null) as ComponentType<T> };
    });
  });
  
  const LoadingComponent = options.loading || (() => null);

  // Créer un composant sans utiliser la syntaxe JSX directement
  return function DynamicComponent(props: T): JSX.Element {
    return React.createElement(
      Suspense,
      { fallback: React.createElement(LoadingComponent) },
      React.createElement(LazyComponent, { ...props } as React.JSX.LibraryManagedAttributes<typeof LazyComponent, T>)
    );
  };
}
