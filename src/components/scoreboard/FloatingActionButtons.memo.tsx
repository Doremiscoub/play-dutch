import React from 'react';
import FloatingActionButtons from './FloatingActionButtons';

/**
 * Version mémoïsée de FloatingActionButtons pour éviter les re-renders inutiles
 */
const FloatingActionButtonsMemo = React.memo(FloatingActionButtons, (prevProps, nextProps) => {
  return (
    prevProps.canUndo === nextProps.canUndo &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.hideWhenModalOpen === nextProps.hideWhenModalOpen
  );
});

export default FloatingActionButtonsMemo;
