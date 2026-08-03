'use client';

import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import {
  MAX_SALARY_AMOUNT,
  numberToKorean,
} from '@/app/(afterLogin)/wizard/(standard)/step2/_state/salaryUtils';

export default function FormMonthlySalaryAction() {
  const { wizSalaryAmount, setStep2 } = useWizardStore(
    useShallow((state) => ({
      wizSalaryAmount: state.step2.wizSalaryAmount,
      setStep2: state.setStep2,
    })),
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    let num = Number(rawValue);
    if (num > MAX_SALARY_AMOUNT) {
      num = MAX_SALARY_AMOUNT;
    }
    setStep2({ wizSalaryAmount: num });
  };

  const koreanText = numberToKorean(wizSalaryAmount);

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <input
          type="text"
          value={wizSalaryAmount === 0 ? '' : wizSalaryAmount.toLocaleString()}
          onChange={handleAmountChange}
          placeholder="0"
        />
        <span className="text-text-side absolute top-1/2 right-4 -translate-y-1/2 text-xs font-extrabold dark:text-slate-400">
          원
        </span>
      </div>
      {koreanText && <p className="text-text-side px-1 text-xs font-bold dark:text-slate-300">{koreanText}</p>}
    </div>
  );
}
