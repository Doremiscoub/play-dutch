import React from 'react';
import ScoreBoardTabs from './ScoreBoardTabs';

/**
 * Version mémoïsée de ScoreBoardTabs pour éviter les re-renders inutiles
 */
const ScoreBoardTabsMemo = React.memo(ScoreBoardTabs);

export default ScoreBoardTabsMemo;
