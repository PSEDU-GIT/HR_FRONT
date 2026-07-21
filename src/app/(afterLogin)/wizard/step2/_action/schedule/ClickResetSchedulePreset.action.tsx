'use client';

import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { RotateCcw } from 'lucide-react';

export default function ClickResetSchedulePresetAction() {
  const setStep2 = useWizardStore((state) => state.setStep2);

  return (
    <button
      type="button"
      onClick={() => setStep2({ wizScheduleApplied: false })}
      className="text-text-side flex cursor-pointer items-center gap-1 text-xs font-bold transition-colors hover:text-slate-900"
    >
      <RotateCcw className="h-3.5 w-3.5" />
      <span>근무 유형 재설정</span>
    </button>
  );
}
