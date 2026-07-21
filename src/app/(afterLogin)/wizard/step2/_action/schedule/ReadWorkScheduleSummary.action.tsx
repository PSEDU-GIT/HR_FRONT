'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

export default function ReadWorkScheduleSummaryAction() {
  const { wizDaysConfig } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
    })),
  );

  const weeklyTotals = Object.values(wizDaysConfig).reduce(
    (acc, conf) => {
      if (!conf.enabled) return acc;

      const [sH, sM] = conf.startTime.split(':').map(Number);
      const [eH, eM] = conf.endTime.split(':').map(Number);
      const dailyMinutes = eH * 60 + eM - (sH * 60 + sM);
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
    ((weeklyTotals.totalMin - weeklyTotals.breakMin) / 60).toFixed(1),
  );

  return (
    <>
      주 <span className="font-bold text-slate-800">{totalWeeklyHours}시간</span> · 휴게{' '}
      <span className="font-bold text-slate-800">{totalBreakHours}시간</span> · 소정{' '}
      <span className="font-mono font-bold text-slate-800">{contractedHours}시간</span>
    </>
  );
}
