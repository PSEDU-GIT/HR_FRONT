'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';
import { calculateDailyHours } from '@/app/(afterLogin)/wizard/(standard)/step2/_state/periodUtils';
import { calculateMonthlyHours, calculateScheduleHours, getEffectiveNonCompeteAmount, LEGAL_STANDARDS } from '@/app/(afterLogin)/wizard/_lib/wageEngine';

export default function FormMonthlySalaryAction() {
  const {
    wizSalaryAmount,
    wizDaysConfig,
    wizHasTaxFree,
    wizNonTaxFood,
    wizHasNonCompete,
    wizNonCompeteAmount,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    contractType,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizSalaryAmount: state.step2.wizSalaryAmount,
      wizDaysConfig: state.step2.wizDaysConfig,
      wizHasTaxFree: state.step2.wizHasTaxFree,
      wizNonTaxFood: state.step2.wizNonTaxFood,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType || 'percent',
      wizNonCompetePercent: state.step2.wizNonCompetePercent ?? 10,
      contractType: state.step1.contractType,
      setStep2: state.setStep2,
    })),
  );

  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');
  const overtimeRate = isUnder5 ? 1.0 : 1.5;
  const nightRate = isUnder5 ? 0.0 : 0.5;

  const { weeklyHours, weeklyOvertimeHours, weeklyNightHours } = calculateScheduleHours(wizDaysConfig);
  const { T } = calculateMonthlyHours(weeklyHours);

  const kot = weeklyOvertimeHours * overtimeRate * LEGAL_STANDARDS.WEEKS_PER_MONTH;
  const kni = weeklyNightHours * nightRate * LEGAL_STANDARDS.WEEKS_PER_MONTH;
  const effectiveT = T + kot + kni;

  const mealAllowance = wizHasTaxFree ? wizNonTaxFood : 0;
  const nonCompeteAmount = getEffectiveNonCompeteAmount({
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
    salaryType: 'monthly',
    salaryAmount: wizSalaryAmount,
  });

  // 최저임금 기준(10,320원/h) 및 연장/야간 수당을 충족하기 위한 최소 월 총 지급액
  const minRequiredSalary = Math.ceil(
    LEGAL_STANDARDS.MIN_HOURLY_WAGE * effectiveT + mealAllowance + nonCompeteAmount,
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    const updatedNonCompete = getEffectiveNonCompeteAmount({
      hasNonCompete: wizHasNonCompete,
      calcType: wizNonCompeteCalcType,
      percent: wizNonCompetePercent,
      manualAmount: wizNonCompeteAmount,
      salaryType: 'monthly',
      salaryAmount: num,
    });
    setStep2({
      wizSalaryAmount: num,
      wizNonCompeteAmount: updatedNonCompete,
    });
  };

  const koreanText = numberToKorean(wizSalaryAmount);

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
          value={wizSalaryAmount === 0 ? '' : wizSalaryAmount.toLocaleString()}
          onChange={handleAmountChange}
          placeholder="예: 2,500,000"
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold dark:text-slate-400">
          원
        </span>
      </div>

      <p className="text-custom-indigo px-1 text-[11px] leading-relaxed font-semibold dark:text-indigo-400">
        * 설정하신 근무시간(주 {weeklyHours}시간) 기준, 최소{' '}
        <strong className="font-bold underline">{minRequiredSalary.toLocaleString()}원</strong> 이상
        입력해야 최저임금법(10,320원/h) 미달에 걸리지 않습니다.
      </p>
    </div>
  );
}
