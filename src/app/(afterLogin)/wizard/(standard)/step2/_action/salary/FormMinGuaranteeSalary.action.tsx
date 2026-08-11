'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import { calculateDynamicMinGuaranteeAmount } from '@/app/(afterLogin)/wizard/_lib/wageEngine';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';

export default function FormMinGuaranteeSalaryAction() {
  const {
    wizMinGuaranteeAmount,
    wizDaysConfig,
    contractType,
    wizHasNonCompete,
    wizNonCompeteCalcType,
    wizNonCompetePercent,
    wizNonCompeteAmount,
    setStep2,
  } = useWizardStore(
    useShallow((state) => ({
      wizMinGuaranteeAmount: state.step2.wizMinGuaranteeAmount,
      wizDaysConfig: state.step2.wizDaysConfig,
      contractType: state.step1.contractType,
      wizHasNonCompete: state.step2.wizHasNonCompete,
      wizNonCompeteCalcType: state.step2.wizNonCompeteCalcType,
      wizNonCompetePercent: state.step2.wizNonCompetePercent,
      wizNonCompeteAmount: state.step2.wizNonCompeteAmount,
      setStep2: state.setStep2,
    })),
  );

  const isUnder5 = contractType?.includes('5인 미만') || contractType?.includes('5인 이하');
  const dynamicMinPay = calculateDynamicMinGuaranteeAmount(wizDaysConfig, isUnder5, {
    hasNonCompete: wizHasNonCompete,
    calcType: wizNonCompeteCalcType,
    percent: wizNonCompetePercent,
    manualAmount: wizNonCompeteAmount,
  });

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
