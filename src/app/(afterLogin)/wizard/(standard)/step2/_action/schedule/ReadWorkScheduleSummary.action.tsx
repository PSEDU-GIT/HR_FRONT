'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateScheduleHours } from '@/app/(afterLogin)/wizard/_lib/wageEngine';

export default function ReadWorkScheduleSummaryAction() {
  const { wizDaysConfig } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
    })),
  );

  const { weeklyHours, weeklyGrossHours, weeklyOvertimeHours } = calculateScheduleHours(wizDaysConfig);

  const weeklyTotals = Object.values(wizDaysConfig || {}).reduce(
    (acc, conf) => {
      if (!conf || !conf.enabled || !conf.startTime || !conf.endTime) return acc;

      let breakMin = 0;
      if (conf.breakTime === '30분') breakMin = 30;
      else if (conf.breakTime === '1시간') breakMin = 60;
      else if (conf.breakTime === '1.5시간') breakMin = 90;
      else if (conf.breakTime === '2시간') breakMin = 120;

      acc.breakMin += breakMin;
      return acc;
    },
    { breakMin: 0 },
  );

  const totalBreakHours = parseFloat((weeklyTotals.breakMin / 60).toFixed(1));
  const contractedHours = Math.min(40, weeklyHours);

  return (
    <>
      주{' '}
      <span className="text-text-title font-bold dark:text-slate-200">{weeklyGrossHours}시간</span>{' '}
      · 휴게{' '}
      <span className="text-text-title font-bold dark:text-slate-200">{totalBreakHours}시간</span> ·
      소정{' '}
      <span className="text-text-title font-mono font-bold dark:text-slate-200">
        {contractedHours}시간
      </span>
      {weeklyOvertimeHours > 0 && (
        <>
          {' · '}
          <span className="text-custom-indigo font-bold dark:text-indigo-400">
            연장 {weeklyOvertimeHours}시간
          </span>
        </>
      )}
    </>
  );
}
