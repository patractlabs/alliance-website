import { useContext } from 'react';
import { ScrollContext, ScrollContextState } from '../core/providers/ScrollProvider';

export const useScroll = (): ScrollContextState => {
  const context = useContext(ScrollContext);

  if (context === undefined) {
    throw new Error('useScroll must provide by ScrollProvider');
  }

  return context;
};
