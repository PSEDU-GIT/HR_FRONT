'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import SummaryCardComponent from '../_component/SummaryCard.component';
import SummaryKeyValueListComponent from '../_component/SummaryKeyValueList.component';
import TimePicker from '@/app/_component/time/TimePicker';
import Select, { SelectDataTypes } from '@/app/_component/select/Select';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import { X, Trash2 } from 'lucide-react';
import cx from 'classnames';

const ALL_DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

const BREAK_OPTIONS = ['없음', '30분', '1시간', '1.5시간', '2시간'];
const BREAK_SELECT_DATA: SelectDataTypes[] = BREAK_OPTIONS.map((opt) => ({
  id: opt,
  displayName: opt,
}));

export default function SummaryScheduleCardAction() {
  const { step2, setStep2 } = useWizardStore(
    useShallow((state) => ({
      step2: state.step2,
      setStep2: state.setStep2,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draftDaysConfig, setDraftDaysConfig] = useState(step2.wizDaysConfig || {});
  const [editingDay, setEditingDay] = useState<string | null>(null);

  const handleToggleEdit = () => {
    if (isEditing) {
      setStep2({ wizDaysConfig: draftDaysConfig });
      setIsEditing(false);
      setEditingDay(null);
    } else {
      setDraftDaysConfig(step2.wizDaysConfig || {});
      setIsEditing(true);
      setEditingDay(null);
    }
  };

  const handleCancelEdit = () => {
    setDraftDaysConfig(step2.wizDaysConfig || {});
    setIsEditing(false);
    setEditingDay(null);
  };

  const toggleDay = (day: string) => {
    const conf = draftDaysConfig[day] || {
      enabled: false,
      startTime: '09:00',
      endTime: '18:00',
      breakTime: '1시간',
    };

    if (conf.enabled) {
      setDraftDaysConfig((prev) => ({
        ...prev,
        [day]: { ...conf, enabled: false },
      }));
      if (editingDay === day) {
        setEditingDay(null);
      }
    } else {
      setDraftDaysConfig((prev) => ({
        ...prev,
        [day]: {
          ...conf,
          enabled: true,
          startTime: conf.startTime || '09:00',
          endTime: conf.endTime || '18:00',
          breakTime: conf.breakTime || '1시간',
        },
      }));
      setEditingDay(day);
    }
  };

  const activeDays = Object.entries(step2.wizDaysConfig || {}).filter(([_, val]) => val.enabled);

  return (
    <SummaryCardComponent
      title="근무 요일 및 시간"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {ALL_DAYS.map((day) => {
              const conf = draftDaysConfig[day] || {
                enabled: false,
                startTime: '09:00',
                endTime: '18:00',
                breakTime: '1시간',
              };
              const isSelected = editingDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    if (!conf.enabled) {
                      toggleDay(day);
                    } else {
                      setEditingDay(isSelected ? null : day);
                    }
                  }}
                  className={cx(
                    'flex cursor-pointer flex-col items-center justify-center rounded-2xl border py-2.5 text-center transition-all duration-200',
                    isSelected
                      ? 'border-custom-indigo bg-custom-indigo text-white shadow-xs'
                      : conf.enabled
                        ? 'border-custom-indigo-border/60 bg-custom-indigo-bg/40 text-custom-indigo hover:bg-custom-indigo-bg/70 dark:border-custom-indigo/60 dark:bg-slate-950/80 dark:text-custom-indigo dark:hover:bg-slate-900'
                        : 'border-custom-slate-border-side text-text-side bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-500 dark:hover:bg-slate-800',
                  )}
                >
                  <span
                    className={cx(
                      'text-xs font-black',
                      isSelected
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
                        isSelected
                          ? 'text-white/90'
                          : 'text-custom-indigo/90 dark:text-custom-indigo/90',
                      )}
                    >
                      {conf.startTime?.split(':')[0]}~{conf.endTime?.split(':')[0]}
                    </span>
                  ) : (
                    <span className="text-text-side mt-1 text-[10px] dark:text-slate-400">-</span>
                  )}
                </button>
              );
            })}
          </div>

          {editingDay && draftDaysConfig[editingDay] && (
            <div className="border-custom-indigo-border/50 bg-custom-indigo-bg/20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 shadow-2xs transition-all dark:border-custom-indigo/50 dark:bg-slate-950/80">
              <div className="flex items-center gap-1.5">
                <span className="text-custom-indigo text-xs font-black">
                  {editingDay.substring(0, 1)}요일 시간 설정
                </span>
                <span className="text-text-side text-xs font-semibold">
                  (소정{' '}
                  <strong className="text-custom-indigo font-mono text-xs font-extrabold">
                    {calculateDailyHours(
                      draftDaysConfig[editingDay].startTime,
                      draftDaysConfig[editingDay].endTime,
                      draftDaysConfig[editingDay].breakTime,
                    )}
                    시간
                  </strong>
                  )
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-text-side shrink-0 text-xs font-bold">근무시간</span>
                  <div className="flex items-center gap-1.5">
                    <TimePicker
                      value={draftDaysConfig[editingDay].startTime}
                      onChange={(t) =>
                        setDraftDaysConfig((prev) => ({
                          ...prev,
                          [editingDay]: {
                            ...prev[editingDay],
                            startTime: t,
                          },
                        }))
                      }
                      buttonClassName="h-[34px]"
                    />
                    <span className="text-text-side font-mono text-xs font-bold">~</span>
                    <TimePicker
                      value={draftDaysConfig[editingDay].endTime}
                      onChange={(t) =>
                        setDraftDaysConfig((prev) => ({
                          ...prev,
                          [editingDay]: {
                            ...prev[editingDay],
                            endTime: t,
                          },
                        }))
                      }
                      buttonClassName="h-[34px]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-text-side shrink-0 text-xs font-bold">휴게</span>
                  <Select
                    data={BREAK_SELECT_DATA}
                    selectData={
                      BREAK_SELECT_DATA.find(
                        (d) => d.id === draftDaysConfig[editingDay].breakTime,
                      ) || BREAK_SELECT_DATA[0]
                    }
                    onChangeAction={(sub) =>
                      setDraftDaysConfig((prev) => ({
                        ...prev,
                        [editingDay]: {
                          ...prev[editingDay],
                          breakTime: String(sub.id),
                        },
                      }))
                    }
                    buttonClassName="h-[34px] px-3 py-0 text-xs font-bold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDraftDaysConfig((prev) => ({
                      ...prev,
                      [editingDay]: { ...prev[editingDay], enabled: false },
                    }));
                    setEditingDay(null);
                  }}
                  className="border-custom-rose-border bg-custom-rose-bg text-custom-rose flex h-[34px] cursor-pointer items-center gap-1 rounded-xl border px-2.5 text-xs font-bold shadow-2xs transition-all hover:bg-rose-100"
                >
                  <Trash2 className="text-custom-rose h-3.5 w-3.5" />
                  <span>근무 요일 제외</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingDay(null)}
                  className="border-custom-slate-border-side text-text-side flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-xl border bg-white transition-colors hover:bg-slate-200 hover:text-slate-800"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <SummaryKeyValueListComponent
          columns={2}
          emptyText="근무 요일이 설정되지 않았습니다."
          items={activeDays.map(([dayKey, dayVal]) => ({
            label: dayKey,
            value: `${dayVal.startTime} ~ ${dayVal.endTime} (휴게 ${dayVal.breakTime})`,
          }))}
        />
      )}
    </SummaryCardComponent>
  );
}
