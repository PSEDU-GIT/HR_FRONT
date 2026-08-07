'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

export default function ReadWorkScheduleSummaryAction() {
  const { wizDaysConfig } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
    })),
  );

  const weeklyTotals = Object.values(wizDaysConfig || {}).reduce(
    (acc, conf) => {
      if (!conf || !conf.enabled || !conf.startTime || !conf.endTime) return acc;

      const [sH = 0, sM = 0] = conf.startTime.split(':').map(Number);
      const [eH = 0, eM = 0] = conf.endTime.split(':').map(Number);
      let dailyMinutes = eH * 60 + eM - (sH * 60 + sM);
      if (dailyMinutes < 0) dailyMinutes += 24 * 60;
      let breakMin = 0;

      if (conf.breakTime === '30분') breakMin = 30;
      else if (conf.breakTime === '1시간') breakMin = 60;
      else if (conf.breakTime === '1.5시간') breakMin = 90;
      else if (conf.breakTime === '2시간') breakMin = 120;

      acc.totalMin += dailyMinutes;
      acc.breakMin += breakMin;

      return acc;
    },
    { totalMin: 0, breakMin: 0 },
  );

  const totalWeeklyHours = parseFloat((weeklyTotals.totalMin / 60).toFixed(1));
  const totalBreakHours = parseFloat((weeklyTotals.breakMin / 60).toFixed(1));
  const contractedHours = parseFloat(
    (Math.max(0, weeklyTotals.totalMin - weeklyTotals.breakMin) / 60).toFixed(1),
  );

  return (
    <>
      주{' '}
      <span className="text-text-title font-bold dark:text-slate-200">{totalWeeklyHours}시간</span>{' '}
      · 휴게{' '}
      <span className="text-text-title font-bold dark:text-slate-200">{totalBreakHours}시간</span> ·
      소정{' '}
      <span className="text-text-title font-mono font-bold dark:text-slate-200">
        {contractedHours}시간
      </span>
    </>
  );
}
