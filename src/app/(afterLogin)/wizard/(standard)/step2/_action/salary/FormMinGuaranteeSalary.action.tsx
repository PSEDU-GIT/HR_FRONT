'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  calculateDynamicMinGuaranteeAmount,
  calculateScheduleHours,
  LEGAL_STANDARDS,
} from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';

export default function FormMinGuaranteeSalaryAction() {
  const {
    wizMinGuaranteeAmount,
    wizDaysConfig,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizDaysConfig: state.step2.wizDaysConfig,
      setStep2: state.setStep2,
    })),
  );

  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig);

  const { weeklyHours } = calculateScheduleHours(wizDaysConfig);
  const cappedWeeklyHours = Math.min(weeklyHours, LEGAL_STANDARDS.MAX_WEEKLY_HOURS);

  const amount = wizMinGuaranteeAmount ?? dynamicMinPay;

  const handleMinGuaranteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    setStep2({ wizMinGuaranteeAmount: num });
  };

  const koreanText = numberToKorean(amount);

  return (
    <div className="space-y-2 pt-4">
      <div className="relative">
        {koreanText && (
          <span className="text-text-side absolute -top-5 right-1 text-[11px] font-bold dark:text-slate-300">
            {koreanText}
          </span>
        )}
        <input
          type="text"
          value={amount === 0 ? '' : amount.toLocaleString()}
          onChange={handleMinGuaranteeChange}
          placeholder={dynamicMinPay.toLocaleString()}
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold dark:text-slate-400">
          원
        </span>
      </div>

      <p className="text-custom-indigo px-1 text-[11px] leading-relaxed font-semibold dark:text-indigo-400">
        * 설정하신 소정근로시간(주 {cappedWeeklyHours}시간) 기준, 최소{' '}
        <strong className="font-bold underline">{dynamicMinPay.toLocaleString()}원</strong> 이상
        입력해야 최저임금법(10,320원/h) 미달에 걸리지 않습니다.
      </p>
    </div>
  );
}
