'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { getAutoBreakTime } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import { Check, CalendarHeart } from 'lucide-react';
import cx from 'classnames';

const ALL_DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

export default function SelectDayScheduleToggleAction() {
  const {
    wizDaysConfig = {},
    wizWeeklyHoliday,
    batchStartTime,
    batchEndTime,
    editingDay,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      wizWeeklyHoliday: state.step2.wizWeeklyHoliday,
      batchStartTime: state.step2.batchStartTime,
      batchEndTime: state.step2.batchEndTime,
      editingDay: state.step2.editingDay,
      setStep2: state.setStep2,
    })),
  );

  const toggleOnOff = (day: string) => {
    const conf = wizDaysConfig?.[day];
    const isCurrentlyEnabled = conf?.enabled ?? false;

    if (isCurrentlyEnabled) {
      // ON -> OFF: 해당 요일 OFF 전환
      setStep2((prev) => {
        const nextConfig = {
          ...prev.wizDaysConfig,
          [day]: { ...(prev.wizDaysConfig?.[day] || {}), enabled: false },
        };
        // 만약 기존에 주휴일이 없었거나 현재 요일을 OFF로 바꿨다면 이 요일을 주휴일 기본값으로 유연하게 설정
        const nextWeeklyHoliday = !prev.wizWeeklyHoliday ? day : prev.wizWeeklyHoliday;
        return {
          wizDaysConfig: nextConfig,
          wizWeeklyHoliday: nextWeeklyHoliday,
          editingDay: prev.editingDay === day ? null : prev.editingDay,
          wizWorkDaysType: 'custom',
        };
      });
    } else {
      // OFF -> ON: 근무일 ON 전환
      setStep2((prev) => {
        const defaultStart =
          day === '토요일' || day === '일요일' ? '10:00' : batchStartTime || '14:00';
        const defaultEnd = day === '토요일' || day === '일요일' ? '15:00' : batchEndTime || '22:00';
        const startTime = prev.wizDaysConfig?.[day]?.startTime || defaultStart;
        const endTime = prev.wizDaysConfig?.[day]?.endTime || defaultEnd;
        const rawBreak = prev.wizDaysConfig?.[day]?.breakTime;
        const breakTime = getAutoBreakTime(
          startTime,
          endTime,
          rawBreak && rawBreak !== '없음' ? rawBreak : undefined,
        );

        const nextConfig = {
          ...prev.wizDaysConfig,
          [day]: {
            ...(prev.wizDaysConfig?.[day] || {}),
            enabled: true,
            startTime,
            endTime,
            breakTime,
          },
        };
        // 켜지는 요일이 현재 주휴일로 지정되어 있었다면 남아있는 OFF 요일 중 하나로 자동 변경
        let nextWeeklyHoliday = prev.wizWeeklyHoliday;
        if (prev.wizWeeklyHoliday === day) {
          const remainingOffDays = ALL_DAYS.filter(
            (d) => d !== day && (!nextConfig[d] || !nextConfig[d].enabled),
          );
          nextWeeklyHoliday = remainingOffDays[0] || '';
        }

        return {
          wizDaysConfig: nextConfig,
          wizWeeklyHoliday: nextWeeklyHoliday,
          editingDay: day,
          wizWorkDaysType: 'custom',
        };
      });
    }
  };

  const handleSetWeeklyHoliday = (day: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStep2({ wizWeeklyHoliday: day });
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {ALL_DAYS.map((day) => {
        const conf = wizDaysConfig?.[day];
        const isEditing = editingDay === day;
        const isEnabled = conf?.enabled ?? false;
        const isWeeklyHoliday = !isEnabled && wizWeeklyHoliday === day;

        return (
          <div
            key={day}
            className={cx(
              'relative flex flex-col items-center justify-between rounded-2xl border p-2.5 transition-all duration-200',
              isEnabled
                ? isEditing
                  ? 'border-custom-indigo ring-custom-indigo-border bg-custom-indigo-bg/70 text-custom-indigo shadow-2xs ring-2'
                  : 'border-custom-indigo-border/60 bg-custom-indigo-bg/40 text-custom-indigo hover:bg-custom-indigo-bg/70 dark:hover:bg-slate-900'
                : isWeeklyHoliday
                  ? 'border-indigo-300 bg-indigo-50/70 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                  : 'border-custom-slate-border-side text-text-side bg-white hover:bg-slate-50 dark:bg-slate-900/40 dark:hover:bg-slate-800',
            )}
          >
            {/* 요일명 및 ON/OFF 직관적 토글 뱃지 */}
            <div className="flex w-full items-center justify-between gap-1">
              <span
                className={cx(
                  'text-xs font-black',
                  isEnabled
                    ? 'text-custom-indigo'
                    : isWeeklyHoliday
                      ? 'text-indigo-800 dark:text-indigo-300'
                      : 'text-text-side',
                )}
              >
                {day.substring(0, 1)}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOnOff(day);
                }}
                className={cx(
                  'inline-flex cursor-pointer items-center rounded-full px-1.5 py-0.5 text-[10px] font-black transition-all active:scale-95',
                  isEnabled
                    ? 'bg-custom-indigo text-white shadow-2xs'
                    : 'bg-slate-200 text-slate-500 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-400',
                )}
              >
                {isEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* 시간 영역 및 주휴일 설정 버튼 */}
            <div className="mt-2 flex w-full flex-col items-center">
              {isEnabled ? (
                <button
                  type="button"
                  onClick={() => setStep2({ editingDay: isEditing ? null : day })}
                  className="w-full cursor-pointer text-center"
                >
                  <span className="text-custom-indigo/90 text-[10px] font-bold">
                    {conf?.startTime ? conf.startTime.split(':')[0] : '14'}~
                    {conf?.endTime ? conf.endTime.split(':')[0] : '22'}
                  </span>
                </button>
              ) : isWeeklyHoliday ? (
                <span className="inline-flex items-center gap-0.5 rounded-md border border-indigo-200 bg-indigo-100 px-1.5 py-0.5 text-[9.5px] font-black text-indigo-800 dark:border-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  <CalendarHeart className="h-2.5 w-2.5 text-indigo-600 dark:text-indigo-300" />
                  주휴일
                </span>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleSetWeeklyHoliday(day, e)}
                  title="이 휴무일을 유급 주휴일로 지정"
                  className="text-text-side rounded px-1 py-0.5 text-[9.5px] font-semibold transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/50"
                >
                  + 주휴일 지정
                </button>
              )}
            </div>

            {isEditing && (
              <span className="bg-custom-indigo absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-white shadow-2xs">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
