'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export default function ReadWorkScheduleWarningAction() {
  const {
    wizDaysConfig = {},
    wizWeeklyHoliday,
    contractType,
    setHighlightAdvisory,
  } = useWizardStore(
    useShallow((state) => ({
      wizDaysConfig: state.step2.wizDaysConfig,
      wizWeeklyHoliday: state.step2.wizWeeklyHoliday,
      contractType: state.step1.contractType,
      setHighlightAdvisory: state.setHighlightAdvisory,
    })),
  );

  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');

  const weeklyHours = parseFloat(
    Object.values(wizDaysConfig || {})
      .reduce(
        (sum, conf) =>
          sum +
          (conf?.enabled
            ? calculateDailyHours(
                conf.startTime || '09:00',
                conf.endTime || '18:00',
                conf.breakTime || '1시간',
              )
            : 0),
        0,
      )
      .toFixed(1),
  );

  const isUnder15Hours = weeklyHours < 15;
  const isOver52Hours = weeklyHours > 52;

  // 주휴일은 지정된 요일이 존재하고 해당 요일이 OFF(enabled !== true) 상태여야 유효함
  const hasNoWeeklyHoliday = !wizWeeklyHoliday || wizDaysConfig[wizWeeklyHoliday]?.enabled === true;

  if (!isUnder15Hours && !isOver52Hours && !hasNoWeeklyHoliday) return null;

  if (hasNoWeeklyHoliday) {
    return (
      <button
        type="button"
        onClick={() => setHighlightAdvisory?.('noWeeklyHoliday')}
        title="클릭하여 오른쪽 자문 내용 확인"
        className="text-custom-rose group inline-flex cursor-pointer items-center gap-1 text-xs font-bold transition-transform active:scale-95"
      >
        <ShieldAlert className="text-custom-rose h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" />
        <span className="underline-offset-2 group-hover:underline">주휴일 미지정 (위반)</span>
      </button>
    );
  }

  if (isOver52Hours) {
    if (isUnder5) {
      return (
        <div
          title="5인 미만 사업장은 근로기준법 제53조 주 52시간 상한 미적용 (권장 주의)"
          className="text-custom-yellow inline-flex items-center gap-1 text-xs font-bold"
        >
          <AlertTriangle className="text-custom-yellow h-3.5 w-3.5 shrink-0" />
          <span>주 52시간 초과 ({weeklyHours}h - 5인 미만 권장)</span>
        </div>
      );
    }
    return (
      <div
        title="근로기준법 제53조 주 52시간 상한 초과 (위반 경고)"
        className="text-custom-rose inline-flex items-center gap-1 text-xs font-bold"
      >
        <ShieldAlert className="text-custom-rose h-3.5 w-3.5 shrink-0" />
        <span>주 52시간 초과 ({weeklyHours}h - 위반)</span>
      </div>
    );
  }

  const handleClick = () => {
    setHighlightAdvisory?.('under15Hours');
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
