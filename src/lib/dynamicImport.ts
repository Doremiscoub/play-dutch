
// Ce fichier sert de polyfill pour next/dynamic dans un environnement non-Next.js

import React, { lazy, Suspense } from 'react';

interface DynamicOptions {
  ssr?: boolean;
  loading?: () => JSX.Element;
}

// Fonction qui simule le comportement de next/dynamic
export default function dynamic<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: DynamicOptions = {}
): React.ComponentType<T> {
  const LazyComponent = lazy(importFn);
  
  const LoadingComponent = options.loading || (() => null);

  return function DynamicComponent(props: T): JSX.Element {
    // Utilisation de React.createElement au lieu de JSX
    return React.createElement(
      Suspense, 
      { fallback: React.createElement(LoadingComponent) },
      React.createElement(LazyComponent, props)
    );
  };
}
