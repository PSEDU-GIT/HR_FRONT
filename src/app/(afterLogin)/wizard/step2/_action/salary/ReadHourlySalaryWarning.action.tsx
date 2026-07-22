'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { AlertTriangle } from 'lucide-react';

export default function ReadHourlySalaryWarningAction() {
  const { wizHourlyRate, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizHourlyRate: state.step2.wizHourlyRate,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const isBelowMinimum = wizHourlyRate > 0 && wizHourlyRate < 10320;

  if (!isBelowMinimum) return null;

  const handleClick = () => {
    setHighlightAdvisory('hourlyBelowMinimum');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="클릭하여 오른쪽 자문 내용 확인"
      className="group inline-flex cursor-pointer items-center gap-1 text-xs font-bold leading-none text-rose-600 transition-colors"
    >
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
      <span className="underline-offset-2 group-hover:underline">최저임금법 위반 위험</span>
    </button>
  );
}
