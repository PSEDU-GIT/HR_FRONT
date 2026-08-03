'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import cx from 'classnames';

const ALL_DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

export default function SelectDayScheduleToggleAction() {
  const { wizDaysConfig, batchStartTime, batchEndTime, batchBreakTime, editingDay, setStep2 } =
    useWizardStore(
      useShallow((state) => ({
        wizDaysConfig: state.step2.wizDaysConfig,
        batchStartTime: state.step2.batchStartTime,
        batchEndTime: state.step2.batchEndTime,
        batchBreakTime: state.step2.batchBreakTime,
        editingDay: state.step2.editingDay,
        setStep2: state.setStep2,
      })),
    );

  const toggleDay = (day: string) => {
    const conf = wizDaysConfig[day];
    if (conf.enabled) {
      setStep2((prev) => ({
        wizDaysConfig: {
          ...prev.wizDaysConfig,
          [day]: { ...prev.wizDaysConfig[day], enabled: false },
        },
        editingDay: null,
        wizWorkDaysType: 'custom',
      }));
    } else {
      setStep2((prev) => ({
        wizDaysConfig: {
          ...prev.wizDaysConfig,
          [day]: {
            ...prev.wizDaysConfig[day],
            enabled: true,
            startTime: batchStartTime,
            endTime: batchEndTime,
            breakTime: batchBreakTime,
          },
        },
        editingDay: day,
        wizWorkDaysType: 'custom',
      }));
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {ALL_DAYS.map((day) => {
        const conf = wizDaysConfig[day];
        const isEditing = editingDay === day;

        return (
          <button
            key={day}
            type="button"
            onClick={() => {
              if (!conf.enabled) {
                toggleDay(day);
                setStep2({ editingDay: day });
              } else {
                if (isEditing) {
                  setStep2({ editingDay: null });
                } else {
                  setStep2({ editingDay: day });
                }
              }
            }}
            className={cx(
              'flex cursor-pointer flex-col items-center justify-center rounded-2xl border py-2.5 text-center transition-all duration-200',
              isEditing
                ? 'border-custom-indigo bg-custom-indigo text-white shadow-xs'
                : conf.enabled
                  ? 'border-custom-indigo-border/60 bg-custom-indigo-bg/40 text-custom-indigo hover:bg-custom-indigo-bg/70 dark:border-custom-indigo/60 dark:bg-slate-950/80 dark:text-custom-indigo dark:hover:bg-slate-900'
                  : 'border-custom-slate-border-side text-text-side bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-500 dark:hover:bg-slate-800',
            )}
          >
            <span
              className={cx(
                'text-xs font-black',
                isEditing
                  ? 'text-white'
                  : conf.enabled
                    ? 'text-custom-indigo dark:text-custom-indigo'
                    : 'text-text-side dark:text-slate-400',
              )}
            >
              {day.substring(0, 1)}
            </span>
            {conf.enabled ? (
              <span
                className={cx(
                  'mt-1 text-[10px] font-bold',
                  isEditing ? 'text-white/90' : 'text-custom-indigo/90 dark:text-custom-indigo/90',
                )}
              >
                {conf.startTime.split(':')[0]}~{conf.endTime.split(':')[0]}
              </span>
            ) : (
              <span className="text-text-side mt-1 text-[10px] dark:text-slate-400">-</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
