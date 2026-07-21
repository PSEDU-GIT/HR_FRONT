'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/step2/_state/periodUtils';
import { AlertTriangle } from 'lucide-react';

export default function ReadWorkScheduleWarningAction() {
  const { wizDaysConfig, setHighlightAdvisory } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

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

  const isUnder15Hours = weeklyHours < 15;

  if (!isUnder15Hours) return null;

  const handleClick = () => {
    setHighlightAdvisory('under15Hours');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="클릭하여 오른쪽 자문 내용 확인"
      className="text-custom-yellow group inline-flex cursor-pointer items-center gap-1 text-xs font-bold transition-transform active:scale-95"
    >
      <AlertTriangle className="text-custom-yellow h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" />
      <span className="underline-offset-2 group-hover:underline">15시간 미만 주의</span>
    </button>
  );
}
