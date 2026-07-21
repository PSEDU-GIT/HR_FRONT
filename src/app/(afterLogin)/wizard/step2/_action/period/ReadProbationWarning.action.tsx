'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { AlertTriangle } from 'lucide-react';

export default function ReadProbationWarningAction() {
  const { wizProbation, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizProbation: state.step2.wizProbation,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const isProbationWarning = wizProbation !== '없음' && parseInt(wizProbation) > 3;

  if (!isProbationWarning) return null;

  const handleClick = () => {
    setHighlightAdvisory('probationOver3');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="클릭하여 오른쪽 자문 내용 확인"
      className="text-custom-yellow group inline-flex cursor-pointer items-center gap-1 text-xs font-bold transition-transform active:scale-95"
    >
      <AlertTriangle className="text-custom-yellow h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" />
      <span className="underline-offset-2 group-hover:underline">3개월 초과 주의</span>
    </button>
  );
}
