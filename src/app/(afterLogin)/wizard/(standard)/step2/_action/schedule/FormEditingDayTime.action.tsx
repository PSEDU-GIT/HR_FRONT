'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import TimePicker from '@/app/_component/time/TimePicker';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import { X, Trash2 } from 'lucide-react';

const BREAK_OPTIONS = ['없음', '30분', '1시간', '1.5시간', '2시간'];
const BREAK_SELECT_DATA: SelectDataTypes[] = BREAK_OPTIONS.map((opt) => ({
  id: opt,
  displayName: opt,
}));

export default function FormEditingDayTimeAction() {
  const { wizDaysConfig, editingDay, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      editingDay: state.step2.editingDay,
      setStep2: state.setStep2,
    })),
  );

  if (!editingDay) return null;

  const handleExcludeDay = () => {
    setStep2((prev) => ({
      wizDaysConfig: {
        ...prev.wizDaysConfig,
        [editingDay]: { ...prev.wizDaysConfig[editingDay], enabled: false },
      },
      editingDay: null,
      wizWorkDaysType: 'custom',
    }));
  };

  return (
    <div className="border-custom-indigo-border/50 bg-custom-indigo-bg/20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 shadow-2xs transition-all dark:border-custom-indigo/50 dark:bg-slate-950/80">
      <div className="flex items-center gap-1.5">
        <span className="text-text-title text-xs font-black dark:text-slate-100">
          {editingDay.substring(0, 1)}요일 시간 설정
        </span>
        <span className="text-text-side text-xs font-semibold dark:text-slate-400">
          (소정{' '}
          <strong className="text-custom-indigo font-mono text-xs font-extrabold">
            {calculateDailyHours(
              wizDaysConfig[editingDay].startTime,
              wizDaysConfig[editingDay].endTime,
              wizDaysConfig[editingDay].breakTime,
            )}
            시간
          </strong>
          )
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-text-side shrink-0 text-xs font-bold dark:text-slate-400">
            근무시간
          </span>
          <div className="flex items-center gap-1.5">
            <TimePicker
              value={wizDaysConfig[editingDay].startTime}
              onChange={(t) =>
                setStep2((prev) => ({
                  wizDaysConfig: {
                    ...prev.wizDaysConfig,
                    [editingDay]: {
                      ...prev.wizDaysConfig[editingDay],
                      startTime: t,
                    },
                  },
                }))
              }
              buttonClassName="h-[34px]"
            />
            <span className="text-text-side font-mono text-xs font-bold dark:text-slate-400">
              ~
            </span>
            <TimePicker
              value={wizDaysConfig[editingDay].endTime}
              onChange={(t) =>
                setStep2((prev) => ({
                  wizDaysConfig: {
                    ...prev.wizDaysConfig,
                    [editingDay]: {
                      ...prev.wizDaysConfig[editingDay],
                      endTime: t,
                    },
                  },
                }))
              }
              buttonClassName="h-[34px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-text-side shrink-0 text-xs font-bold dark:text-slate-400">
            휴게
          </span>
          <Select
            data={BREAK_SELECT_DATA}
            selectData={
              BREAK_SELECT_DATA.find((d) => d.id === wizDaysConfig[editingDay].breakTime) ||
              BREAK_SELECT_DATA[0]
            }
            onChangeAction={(sub) =>
              setStep2((prev) => ({
                wizDaysConfig: {
                  ...prev.wizDaysConfig,
                  [editingDay]: {
                    ...prev.wizDaysConfig[editingDay],
                    breakTime: String(sub.id),
                  },
                },
              }))
            }
            buttonClassName="h-[34px] px-3 py-0 text-xs font-bold"
          />
        </div>

        <button
          type="button"
          onClick={handleExcludeDay}
          className="border-custom-rose-border bg-custom-rose-bg text-custom-rose flex h-[34px] cursor-pointer items-center gap-1 rounded-xl border px-2.5 text-xs font-bold shadow-2xs transition-all hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300"
        >
          <Trash2 className="text-custom-rose h-3.5 w-3.5 dark:text-rose-300" />
          <span>근무 요일 제외</span>
        </button>

        <button
          type="button"
          onClick={() => setStep2({ editingDay: null })}
          className="border-custom-slate-border-side text-text-side flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-xl border bg-white transition-colors hover:bg-slate-200 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
