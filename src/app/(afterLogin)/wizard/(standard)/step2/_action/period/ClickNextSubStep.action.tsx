'use client';

import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { ArrowRight } from 'lucide-react';

interface ClickNextSubStepActionProps {
  nextSubStep: 2 | 3;
}

export default function ClickNextSubStepAction({ nextSubStep }: ClickNextSubStepActionProps) {
  const setStep2 = useWizardStore((state) => state.setStep2);

  const handleClick = () => {
    setStep2((prev) => ({
      wizSubStep: nextSubStep,
      maxUnlockedSubStep: Math.max(prev.maxUnlockedSubStep, nextSubStep) as 1 | 2 | 3,
    }));
  };

  const label = nextSubStep === 2 ? '다음 (근무 요일 및 시간 설정)' : '다음 단계';

  return (
    <button
      type="button"
      onClick={handleClick}
      className="border-custom-slate-border text-text-title flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border bg-white py-2.5 text-xs font-bold transition-all hover:bg-slate-50 active:scale-[0.99]"
    >
      <span>{label}</span>
      <ArrowRight className="text-text-side h-3.5 w-3.5" />
    </button>
  );
}
