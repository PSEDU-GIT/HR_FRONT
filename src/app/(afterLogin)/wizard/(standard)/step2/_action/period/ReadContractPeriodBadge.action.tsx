'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calcPeriodLabel } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';

export default function ReadContractPeriodBadgeAction() {
  const { wizStartDate, wizEndDate } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      wizEndDate: state.step2.wizEndDate,
    })),
  );

  const periodLabel = calcPeriodLabel(wizStartDate, wizEndDate);

  if (!periodLabel) return null;

  return (
    <span className="text-text-side animate-in fade-in font-mono text-xs font-bold">
      ({periodLabel})
    </span>
  );
}
