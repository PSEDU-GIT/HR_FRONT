'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calcPeriodDays } from '@/app/(afterLogin)/wizard/step2/_state/periodUtils';
import { AlertTriangle } from 'lucide-react';

export default function ReadContractPeriodWarningAction() {
  const { wizStartDate, wizEndDate, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizStartDate: state.step2.wizStartDate,
      wizEndDate: state.step2.wizEndDate,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const periodDays = calcPeriodDays(wizStartDate, wizEndDate);
  const isUnderOneYear = periodDays > 0 && periodDays < 365;

  if (!isUnderOneYear) return null;

  const handleClick = () => {
    setHighlightAdvisory('underOneYear');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="클릭하여 오른쪽 자문 내용 확인"
      className="text-custom-yellow group inline-flex cursor-pointer items-center gap-1 text-xs font-bold transition-transform active:scale-95"
    >
      <AlertTriangle className="text-custom-yellow h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" />
      <span className="underline-offset-2 group-hover:underline">1년 미만 주의</span>
    </button>
  );
}
