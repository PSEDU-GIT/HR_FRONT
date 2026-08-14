'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calcPeriodLabel } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';

export default function ReadContractPeriodSummaryAction() {
  const { wizStartDate, wizEndDate, wizProbation } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      wizEndDate: state.step2.wizEndDate,
      wizProbation: state.step2.wizProbation,
    })),
  );

  const periodLabel = calcPeriodLabel(wizStartDate, wizEndDate);

  return (
    <>
      계약기간: <span className="font-bold text-text-title">{wizStartDate || '-'}</span> ~{' '}
      <span className="font-mono font-bold text-text-title">{wizEndDate || '-'}</span>
      {periodLabel && (
        <>
          {' '}
          <span className="font-mono font-bold text-text-title">({periodLabel})</span>
        </>
      )}
      {wizProbation !== '없음' ? (
        <>
          {' '}
          · 수습: <span className="font-mono font-bold text-text-title">{wizProbation}</span>
        </>
      ) : (
        <>
          {' '}
          · 수습: <span className="font-bold text-text-title">없음</span>
        </>
      )}
    </>
  );
}
