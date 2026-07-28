'use client';

import { useEffect } from 'react';
import { useWizardStore } from '../store';

export default function LoadProvider() {
  const reset = useWizardStore((state) => state.reset);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return null;
}
