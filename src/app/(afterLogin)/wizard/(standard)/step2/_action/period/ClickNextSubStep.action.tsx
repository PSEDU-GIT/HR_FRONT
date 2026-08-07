'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import { ArrowRight } from 'lucide-react';
import cx from 'classnames';

interface ClickNextSubStepActionProps {
  nextSubStep: 2 | 3;
}

export default function ClickNextSubStepAction({ nextSubStep }: ClickNextSubStepActionProps) {
  const { wizDaysConfig, contractType, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      contractType: state.step1.contractType,
      setStep2: state.setStep2,
    })),
  );

  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');

  const weeklyHours = parseFloat(
    Object.values(wizDaysConfig)
      .reduce(
        (sum, conf) =>
          sum +
          (conf.enabled ? calculateDailyHours(conf.startTime, conf.endTime, conf.breakTime) : 0),
        0,
      )
      .toFixed(1),
  );

  const isOver52Hours = nextSubStep === 3 && weeklyHours > 52;
  const isBlocked = isOver52Hours && !isUnder5;

  const handleClick = () => {
    if (isBlocked) return;
    setStep2((prev) => ({
      wizSubStep: nextSubStep,
      maxUnlockedSubStep: Math.max(prev.maxUnlockedSubStep, nextSubStep) as 1 | 2 | 3,
    }));
  };

  const label =
    nextSubStep === 2
      ? '다음 (근무 요일 및 시간 설정)'
      : isBlocked
        ? '주 52시간 상한 초과로 진행 불가 (5인 이상 사업장)'
        : '다음 (급여 형태 및 금액 설정)';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isBlocked}
      className={cx(
        'border-custom-slate-border flex w-full justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all dark:border-slate-800',
        isBlocked
          ? 'cursor-not-allowed bg-rose-50 text-rose-500 opacity-80 dark:bg-rose-950/40 dark:text-rose-400'
          : 'text-text-title cursor-pointer items-center bg-white hover:bg-slate-50 active:scale-[0.99] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
      )}
    >
      <span>{label}</span>
      {!isBlocked && <ArrowRight className="text-text-side h-3.5 w-3.5 dark:text-slate-400" />}
    </button>
  );
}
