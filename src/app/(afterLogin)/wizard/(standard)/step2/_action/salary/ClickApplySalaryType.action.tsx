'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

export default function ClickApplySalaryTypeAction() {
  const { setStep2 } = useWizardStore(
    useShallow((state) => ({
      setStep2: state.setStep2,
    })),
  );

  const handleApply = () => {
    setStep2({
      wizSalaryApplied: true,
      salaryEditingSection: null,
    });
  };

  return (
    <button
      type="button"
      onClick={handleApply}
      className="border-custom-slate-border text-text-title flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border bg-white dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 text-xs font-bold transition-all hover:bg-slate-50 active:scale-[0.99]"
    >
      <span>적용하기</span>
    </button>
  );
}
