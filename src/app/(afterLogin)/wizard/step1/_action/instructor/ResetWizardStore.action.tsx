'use client';

import { useEffect } from 'react';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

export default function ResetWizardStoreAction() {
  const reset = useWizardStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return null;
}
