'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';

const ALL_DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

const PRESET_DAYS: Record<string, string[]> = {
  '5days': ['월요일', '화요일', '수요일', '목요일', '금요일'],
  '3days': ['월요일', '수요일', '금요일'],
  custom: [],
};

export default function ClickApplySchedulePresetAction() {
  const { wizWorkDaysType, batchStartTime, batchEndTime, batchBreakTime, setStep2 } =
    useWizardStore(
      useShallow((state) => ({
        wizWorkDaysType: state.step2.wizWorkDaysType,
        batchStartTime: state.step2.batchStartTime,
        batchEndTime: state.step2.batchEndTime,
        batchBreakTime: state.step2.batchBreakTime,
        setStep2: state.setStep2,
      })),
    );

  const handleApply = () => {
    const target = PRESET_DAYS[wizWorkDaysType];
    setStep2((prev) => {
      const next = { ...prev.wizDaysConfig };
      ALL_DAYS.forEach((day) => {
        const isTarget = wizWorkDaysType === 'custom' ? false : target.includes(day);
        next[day] = {
          ...next[day],
          enabled: wizWorkDaysType === 'custom' ? false : isTarget,
          ...(isTarget
            ? {
                startTime: batchStartTime,
                endTime: batchEndTime,
                breakTime: batchBreakTime,
              }
            : {}),
        };
      });
      return {
        wizDaysConfig: next,
        wizScheduleApplied: true,
        editingDay: null,
      };
    });
  };

  return (
    <button
      type="button"
      onClick={handleApply}
      className="border-custom-slate-border dark:border-slate-800 text-text-title dark:text-slate-100 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border bg-white dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 text-xs font-bold transition-all hover:bg-slate-50 active:scale-[0.99]"
    >
      <span>적용하기</span>
    </button>
  );
}
