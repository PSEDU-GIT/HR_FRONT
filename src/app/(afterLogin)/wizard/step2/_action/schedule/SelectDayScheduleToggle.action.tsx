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
                ? 'border-slate-800 bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10'
                : conf.enabled
                  ? 'border-custom-slate-border-side bg-slate-100/70 text-slate-800 hover:bg-slate-200/60'
                  : 'border-custom-slate-border-side text-text-side bg-white hover:bg-slate-50',
            )}
          >
            <span
              className={cx(
                'text-xs font-black',
                isEditing ? 'text-white' : conf.enabled ? 'text-slate-900' : 'text-text-side',
              )}
            >
              {day.substring(0, 1)}
            </span>
            {conf.enabled ? (
              <span
                className={cx(
                  'mt-1 text-[10px] font-bold',
                  isEditing ? 'text-slate-300' : 'text-slate-600',
                )}
              >
                {conf.startTime.split(':')[0]}~{conf.endTime.split(':')[0]}
              </span>
            ) : (
              <span className="text-text-side mt-1 text-[10px]">-</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
