'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateScheduleHours, LEGAL_STANDARDS } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';

export default function FormMinGuaranteeSalaryAction() {
  const { wizMinGuaranteeAmount, wizDaysConfig, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizDaysConfig: state.step2.wizDaysConfig,
      setStep2: state.setStep2,
    })),
  );

  const { weeklyHours } = calculateScheduleHours(wizDaysConfig);
  const weeklyHolidayHours = weeklyHours >= 15 ? Math.min(8, (weeklyHours / 40) * 8) : 0;
  const totalPaidWeeklyHours = weeklyHours + weeklyHolidayHours;
  const T = totalPaidWeeklyHours * LEGAL_STANDARDS.WEEKS_PER_MONTH;
  const dynamicMinPay = Math.ceil(LEGAL_STANDARDS.MIN_HOURLY_WAGE * T);

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
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type="text"
          value={amount === 0 ? '' : amount.toLocaleString()}
          onChange={handleMinGuaranteeChange}
          placeholder={dynamicMinPay.toLocaleString()}
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold">
          원
        </span>
      </div>
      {koreanText && <p className="text-text-side px-1 text-xs font-bold">{koreanText}</p>}
    </div>
  );
}
